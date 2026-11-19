"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type CSSProperties, type Ref } from "react";
import { gsap } from "gsap";

/**
 * Carrossel 3D arrastável (coverflow): "Dragable Carousel", da AliThemes para o Framer, portado para o Next.
 * Cada slide gira, recua, encolhe e some conforme a distância até o centro; ao soltar, a velocidade do arrasto
 * escolhe em qual slide o carrossel encaixa (animação com GSAP). Setas, pontos, autoplay e toque continuam como no original.
 * Acréscimos em relação ao original: slide inicial, recentralização ao redimensionar, teclado, rolagem vertical no celular,
 * giro limitado a um slide de distância, loop que dá a volta de verdade (sem varrer todos os slides de volta)
 * e modo "conduzido" (`ref.setPosition` + `onRequestPosition`) para a posição vir da rolagem da página.
 */

const PRESETS = {
  Default: { perspective: 1000, rotateY: 45, depth: 150, activeScale: 1, inactiveScale: 0.85, inactiveOpacity: 0.5, snapDuration: 0.6, snapEase: "power3.out" },
  "Flat Minimal": { perspective: 1000, rotateY: 0, depth: 0, activeScale: 1, inactiveScale: 0.9, inactiveOpacity: 0.4, snapDuration: 0.5, snapEase: "power2.out" },
  "Deep 3D": { perspective: 800, rotateY: 65, depth: 300, activeScale: 1.05, inactiveScale: 0.7, inactiveOpacity: 0.3, snapDuration: 0.8, snapEase: "power4.out" },
  "Soft Cover": { perspective: 1200, rotateY: 30, depth: 80, activeScale: 1, inactiveScale: 0.92, inactiveOpacity: 0.6, snapDuration: 0.7, snapEase: "power3.out" },
  "Elastic Pop": { perspective: 900, rotateY: 40, depth: 200, activeScale: 1.1, inactiveScale: 0.75, inactiveOpacity: 0.4, snapDuration: 0.8, snapEase: "elastic.out(1,0.5)" },
};

type Look = (typeof PRESETS)["Default"];

/** Controle externo: `position` é o índice fracionário do slide que fica no centro (0 = primeiro, 1.5 = entre o segundo e o terceiro). */
export type DragableCarouselHandle = { setPosition: (position: number) => void };

export type DragableCarouselProps = Partial<Look> & {
  images: string[];
  /** Texto alternativo de cada imagem, na mesma ordem. */
  alts?: string[];
  /** Descrição do carrossel para leitores de tela. */
  label?: string;
  /** Com "Custom", valem perspective, rotateY, depth, activeScale, inactiveScale, inactiveOpacity, snapDuration e snapEase. */
  preset?: keyof typeof PRESETS | "Custom";
  initialIndex?: number;
  slideWidth?: number;
  slideHeight?: number;
  gap?: number;
  borderRadius?: number;
  objectFit?: CSSProperties["objectFit"];
  showArrows?: boolean;
  arrowColor?: string;
  arrowBackground?: string;
  arrowSize?: number;
  showDots?: boolean;
  dotColor?: string;
  dotSize?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  ref?: Ref<DragableCarouselHandle>;
  /**
   * Modo conduzido: arrasto, setas, pontos e teclado não movem o carrossel; pedem uma posição por aqui
   * (quem chama, por exemplo, rola a página) e a posição volta por `ref.setPosition`. Nesse modo o loop não dá a volta nas setas.
   */
  onRequestPosition?: (position: number) => void;
};

const arrowBtn = (size: number, background: string): CSSProperties => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 200,
  width: size,
  height: size,
  borderRadius: "50%",
  border: "none",
  background,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
});

export default function DragableCarousel({
  images,
  alts,
  label = "Galeria",
  preset = "Default",
  initialIndex = 0,
  slideWidth = 320,
  slideHeight = 400,
  gap = 20,
  borderRadius = 12,
  objectFit = "cover",
  showArrows = true,
  arrowColor = "#333333",
  arrowBackground = "rgba(255,255,255,0.85)",
  arrowSize = 44,
  showDots = true,
  dotColor = "#333333",
  dotSize = 8,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  ref,
  onRequestPosition,
  ...custom
}: DragableCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;
  const start = Math.max(0, Math.min(count - 1, initialIndex));
  const [activeIndex, setActiveIndex] = useState(start);
  const indexRef = useRef(start);
  const posRef = useRef(start);
  const trackX = useRef(0);
  const drag = useRef({ active: false, startX: 0, startTrackX: 0, startPos: 0, lastX: 0, lastTime: 0, velocity: 0 });

  const look: Look = preset === "Custom" ? { ...PRESETS.Default, ...custom } : PRESETS[preset];
  const { perspective, rotateY: maxRotateY, depth, activeScale, inactiveScale, inactiveOpacity, snapDuration, snapEase } = look;
  const step = slideWidth + gap;

  const centerXFor = useCallback(
    (i: number) => {
      const el = containerRef.current;
      if (!el) return -i * step;
      return el.offsetWidth / 2 - i * step - slideWidth / 2;
    },
    [step, slideWidth],
  );

  // transformações 3D de cada slide, calculadas a partir da distância até o centro
  const render = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    track.style.transform = `translateX(${trackX.current}px)`;
    const center = el.offsetWidth / 2;
    posRef.current = (center - slideWidth / 2 - trackX.current) / step;
    slidesRef.current.forEach((slide, i) => {
      if (!slide) return;
      const slideCenter = i * step + slideWidth / 2 + trackX.current;
      let norm = (slideCenter - center) / step;
      // com loop, cada slide aparece na posição equivalente mais próxima do centro, então o carrossel nunca esvazia nas pontas
      let shift = 0;
      if (loop && count > 1) {
        const wrapped = norm - count * Math.round(norm / count);
        shift = (wrapped - norm) * step;
        norm = wrapped;
      }
      const abs = Math.abs(norm);
      // sem limitar, a partir de 2 slides do centro a foto vira de lado e depois aparece espelhada
      const ry = Math.max(-1, Math.min(1, norm)) * maxRotateY;
      const tz = -abs * depth;
      const sc = Math.max(inactiveScale, activeScale - abs * (activeScale - inactiveScale));
      const op = Math.max(inactiveOpacity, 1 - abs * (1 - inactiveOpacity));
      slide.style.transform = `translateX(${shift}px) perspective(${perspective}px) rotateY(${ry}deg) translateZ(${tz}px) scale(${sc})`;
      slide.style.opacity = `${op}`;
      slide.style.zIndex = `${100 - Math.round(abs * 10)}`;
    });
  }, [loop, count, step, slideWidth, maxRotateY, depth, activeScale, inactiveScale, inactiveOpacity, perspective]);

  // põe o carrossel numa posição (índice fracionário) sem animar
  const place = useCallback(
    (position: number) => {
      gsap.killTweensOf(trackX);
      trackX.current = centerXFor(0) - position * step;
      render();
      const rounded = Math.round(position);
      const index = loop ? ((rounded % count) + count) % count : Math.max(0, Math.min(count - 1, rounded));
      if (index !== indexRef.current) {
        indexRef.current = index;
        setActiveIndex(index);
      }
    },
    [centerXFor, step, render, loop, count],
  );

  useImperativeHandle(ref, () => ({ setPosition: place }), [place]);

  const snapTo = useCallback(
    (i: number) => {
      const wraps = loop && !onRequestPosition;
      const index = wraps ? ((i % count) + count) % count : Math.max(0, Math.min(count - 1, i));
      if (onRequestPosition) {
        onRequestPosition(index);
        return;
      }
      // entre as posições equivalentes do slide, vai para a mais próxima do ponto atual (caminho mais curto)
      const target = wraps ? index + count * Math.round((posRef.current - index) / count) : index;
      indexRef.current = index;
      setActiveIndex(index);
      gsap.killTweensOf(trackX);
      gsap.to(trackX, { current: centerXFor(target), duration: snapDuration, ease: snapEase, onUpdate: render });
    },
    [centerXFor, count, loop, onRequestPosition, snapDuration, snapEase, render],
  );

  // posição inicial; repete (sem animar) quando o tamanho ou o visual mudam
  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, count);
    place(posRef.current);
    if (trackRef.current) trackRef.current.style.opacity = "1";
  }, [count, place]);

  // acompanha o tamanho do contêiner
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => place(posRef.current));
    ro.observe(el);
    return () => ro.disconnect();
  }, [place]);

  // arrasto com mouse e toque, medindo a velocidade
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const d = drag.current;

    const pointX = (e: MouseEvent | TouchEvent) => ("touches" in e ? e.touches[0].clientX : e.clientX);

    const onStart = (e: MouseEvent | TouchEvent) => {
      if ((e.target as Element).closest("button")) return;
      gsap.killTweensOf(trackX);
      const x = pointX(e);
      d.active = true;
      d.startX = x;
      d.startTrackX = trackX.current;
      d.startPos = posRef.current;
      d.lastX = x;
      d.lastTime = Date.now();
      d.velocity = 0;
      container.style.cursor = "grabbing";
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!d.active) return;
      if (e.cancelable) e.preventDefault();
      const x = pointX(e);
      const now = Date.now();
      const dt = now - d.lastTime;
      if (dt > 0) d.velocity = ((x - d.lastX) / dt) * 1000;
      d.lastX = x;
      d.lastTime = now;
      if (onRequestPosition) {
        onRequestPosition(d.startPos - (x - d.startX) / step);
      } else {
        trackX.current = d.startTrackX + (x - d.startX);
        render();
      }
    };

    const onEnd = () => {
      if (!d.active) return;
      d.active = false;
      container.style.cursor = "grab";
      // projeta o ponto de parada a partir da velocidade do arrasto
      snapTo(Math.round(d.startPos - (d.lastX - d.startX + d.velocity * 0.12) / step));
    };

    container.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    container.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);
    return () => {
      container.removeEventListener("mousedown", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      container.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [step, onRequestPosition, render, snapTo]);

  // autoplay
  useEffect(() => {
    if (!autoplay || count <= 1) return;
    const container = containerRef.current;
    const tick = () => {
      const next = indexRef.current + 1;
      snapTo(!loop && next >= count ? 0 : next);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    const play = () => {
      stop();
      autoplayRef.current = setInterval(tick, autoplayDelay);
    };
    play();
    if (container && pauseOnHover) {
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", play);
    }
    return () => {
      stop();
      if (container && pauseOnHover) {
        container.removeEventListener("mouseenter", stop);
        container.removeEventListener("mouseleave", play);
      }
    };
  }, [autoplay, autoplayDelay, pauseOnHover, loop, count, snapTo]);

  // para o GSAP não mexer num carrossel que já saiu da tela
  useEffect(() => () => void gsap.killTweensOf(trackX), []);

  const goPrev = () => snapTo(indexRef.current - 1);
  const goNext = () => snapTo(indexRef.current + 1);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const chevron = (points: string) => (
    <svg width={arrowSize * 0.45} height={arrowSize * 0.45} viewBox="0 0 24 24" fill="none" stroke={arrowColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", cursor: "grab", userSelect: "none", position: "relative", touchAction: "pan-y" }}
    >
      <div ref={trackRef} style={{ display: "flex", gap, alignItems: "center", opacity: 0, transition: "opacity .5s ease" }}>
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            ref={(el) => {
              slidesRef.current[i] = el;
            }}
            aria-hidden={i !== activeIndex}
            style={{ width: slideWidth, height: slideHeight, borderRadius, overflow: "hidden", flexShrink: 0, willChange: "transform, opacity" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alts?.[i] ?? ""} draggable={false} style={{ width: "100%", height: "100%", objectFit, display: "block", pointerEvents: "none" }} />
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button type="button" onClick={goPrev} aria-label="Ver slide anterior" style={{ ...arrowBtn(arrowSize, arrowBackground), left: 12 }}>
            {chevron("15 18 9 12 15 6")}
          </button>
          <button type="button" onClick={goNext} aria-label="Ver próximo slide" style={{ ...arrowBtn(arrowSize, arrowBackground), right: 12 }}>
            {chevron("9 6 15 12 9 18")}
          </button>
        </>
      )}

      {showDots && (
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 200 }}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => snapTo(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              aria-current={i === activeIndex}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: dotColor,
                boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                opacity: i === activeIndex ? 1 : 0.3,
                transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
