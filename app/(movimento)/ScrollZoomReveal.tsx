"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";

/**
 * Revelação com zoom pela rolagem: "Scroll Zoom Reveal" para o Framer, portado para o Next (sem framer-motion).
 * Mesma estrutura, medidas por tamanho de tela, fonte (Inter, peso 500), cores, mola e textos padrão da referência:
 * uma pílula com imagem entre dois textos cresce até a tela inteira enquanto a página rola pela pista sticky,
 * o botão aparece quando a imagem já está grande e, com `videoUrl`, toca o vídeo ali mesmo.
 * Diferenças em relação à referência: a página não ganha barra horizontal, os textos não encolhem (senão a imagem
 * cheia fica uns pixels deslocada), o botão só é clicável quando visível e o vídeo ganha controles ao tocar.
 */

export type ScrollZoomRevealProps = {
  image: string;
  imageAlt?: string;
  videoUrl?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  leftText?: string;
  rightText?: string;
  buttonText?: string;
  buttonLink?: string;
  textColor?: string;
  buttonTextColor?: string;
  buttonBgColor?: string;
  iconType?: "play" | "arrow" | "none";
  /** Mola do raio da borda. */
  animationStiffness?: number;
  animationDamping?: number;
  animationMass?: number;
  /** Altura da pista sticky, em telas (a referência usa 4). */
  length?: number;
};

/* ----------------------------------
   CONFIGURAÇÃO RESPONSIVA (a mesma da referência)
----------------------------------- */
const RESPONSIVE = {
  desktop: { leftFont: "55px", rightFont: "55px", textWidth: "250px", centerFont: "56px", playSize: "60px", gap: "20px", startWidth: 15, startHeight: 5 },
  tablet: { leftFont: "40px", rightFont: "40px", textWidth: "160px", centerFont: "42px", playSize: "52px", gap: "16px", startWidth: 15, startHeight: 5 },
  mobile: { leftFont: "22px", rightFont: "22px", textWidth: "100px", centerFont: "26px", playSize: "42px", gap: "10px", startWidth: 15, startHeight: 5 },
};
type Screen = keyof typeof RESPONSIVE;

// a referência troca de tela em 810px e 1799px de largura
const subscribeScreen = (notify: () => void) => {
  window.addEventListener("resize", notify);
  return () => window.removeEventListener("resize", notify);
};
const getScreen = (): Screen => (window.innerWidth <= 810 ? "mobile" : window.innerWidth <= 1799 ? "tablet" : "desktop");

const INTER = 'var(--font-inter), "Inter", sans-serif';
const cl = (v: number) => Math.max(0, Math.min(1, v));

/* ----------------------------------
   ÍCONE DO BOTÃO
----------------------------------- */
const renderIcon = (iconType: NonNullable<ScrollZoomRevealProps["iconType"]>, screen: Screen, bg: string, fg: string) => {
  if (iconType === "none") return null;
  const current = RESPONSIVE[screen];
  const circle = { display: "flex", alignItems: "center", justifyContent: "center", background: bg, width: current.playSize, height: current.playSize, borderRadius: "50%", flexShrink: 0 } as const;
  if (iconType === "play") {
    return (
      <div style={circle}>
        <div style={{ position: "relative", left: "2px", borderStyle: "solid", borderWidth: screen === "mobile" ? "7px 0px 7px 14px" : "10px 0px 10px 20px", borderColor: `transparent transparent transparent ${fg}` }} />
      </div>
    );
  }
  const size = screen === "mobile" ? 14 : 20;
  return (
    <div style={circle}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default function ScrollZoomReveal({
  image,
  imageAlt = "Showreel background",
  videoUrl,
  autoPlay = false,
  loop = true,
  muted = false,
  leftText = "©2026",
  rightText = "Showreel",
  buttonText = "Play showreel",
  buttonLink = "#",
  textColor = "#000000",
  buttonTextColor = "#FFFFFF",
  buttonBgColor = "#000000",
  iconType = "play",
  animationStiffness = 90,
  animationDamping = 25,
  animationMass = 0.6,
  length = 4,
}: ScrollZoomRevealProps) {
  const section = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const screen = useSyncExternalStore(subscribeScreen, getScreen, () => "desktop" as Screen);
  const current = RESPONSIVE[screen];
  const { startWidth, startHeight } = current;

  useEffect(() => {
    const sec = section.current!;
    const boxEl = box.current!;
    let progress = 0;
    let radius = 50;
    let velocity = 0;
    let last = 0;
    let raf = 0;

    // mesmo progresso de useScroll com offset ["start start", "end end"]
    const read = () => {
      const r = sec.getBoundingClientRect();
      progress = cl(-r.top / Math.max(1, r.height - window.innerHeight));
    };
    const paint = () => {
      boxEl.style.width = `${startWidth + (100 - startWidth) * progress}vw`;
      boxEl.style.height = `${startHeight + (100 - startHeight) * progress}vh`;
      boxEl.style.borderRadius = `${radius}px`;
      const b = btn.current;
      if (b) {
        const t = cl((progress - 0.45) / 0.15);
        b.style.opacity = `${t}`;
        b.style.transform = `translate(-50%, calc(-50% + ${(1 - t) * 60}px))`;
        b.style.pointerEvents = t > 0.5 ? "auto" : "none";
      }
    };
    // o raio da borda (50 → 0) vai atrás do alvo com uma mola, como o useSpring da referência
    const frame = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const target = 50 * (1 - progress);
      const steps = Math.max(1, Math.ceil(dt / 0.008));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        velocity += ((-animationStiffness * (radius - target) - animationDamping * velocity) / animationMass) * h;
        radius += velocity * h;
      }
      const settled = Math.abs(radius - target) < 0.05 && Math.abs(velocity) < 0.05;
      if (settled) {
        radius = target;
        velocity = 0;
      }
      paint();
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    const onScroll = () => {
      read();
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    read();
    radius = 50 * (1 - progress);
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [startWidth, startHeight, animationStiffness, animationDamping, animationMass]);

  const handlePlayClick = (e: MouseEvent) => {
    if (videoUrl) {
      e.preventDefault();
      setIsPlaying(true);
      void videoRef.current?.play();
    }
  };

  return (
    <section ref={section} style={{ height: `${length * 100}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: current.gap, padding: "0 20px", overflow: "hidden" }}>
        <div style={{ flexShrink: 0, whiteSpace: "nowrap", width: current.textWidth, textAlign: "right", fontWeight: 500, color: textColor, fontFamily: INTER, fontSize: current.leftFont }}>{leftText}</div>

        <div ref={box} style={{ width: `${startWidth}vw`, height: `${startHeight}vh`, borderRadius: 50, overflow: "hidden", position: "relative", flexShrink: 0, background: "#000" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            style={{ position: "absolute", left: "50%", top: "50%", width: "100vw", height: "100vh", objectFit: "cover", transform: "translate(-50%, -50%)", opacity: isPlaying ? 0 : 1, transition: "opacity 0.4s ease" }}
          />
          {videoUrl && (
            <video
              ref={videoRef}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline
              preload={autoPlay ? "auto" : "none"}
              controls={isPlaying}
              style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", opacity: isPlaying ? 1 : 0, pointerEvents: isPlaying ? "auto" : "none", transition: "opacity 0.4s ease" }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
          {!isPlaying && (
            <a
              ref={btn}
              href={buttonLink}
              onClick={handlePlayClick}
              aria-label={buttonText || "Play showreel"}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                opacity: 0,
                transform: "translate(-50%, calc(-50% + 60px))",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontFamily: INTER,
                fontWeight: 500,
                color: buttonTextColor,
                textAlign: "center",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontSize: current.centerFont,
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              {buttonText}
              {renderIcon(iconType, screen, buttonBgColor, buttonTextColor)}
            </a>
          )}
        </div>

        <div style={{ flexShrink: 0, whiteSpace: "nowrap", width: current.textWidth, textAlign: "left", fontWeight: 500, color: textColor, fontFamily: INTER, fontSize: current.rightFont }}>{rightText}</div>
      </div>
    </section>
  );
}
