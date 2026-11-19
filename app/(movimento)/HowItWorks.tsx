"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import DragableCarousel, { type DragableCarouselHandle } from "./DragableCarousel";
import ScrollZoomReveal from "./ScrollZoomReveal";

/** Fotos do carrossel; a rolagem passa por todas, da primeira à última. */
const GALLERY = [
  { src: "/media/movimento/trilha.jpg", alt: "Trilha" },
  { src: "/media/esportes/surfe.jpg", alt: "Surfe" },
  { src: "/media/esportes/corrida.jpg", alt: "Corrida" },
  { src: "/media/esportes/esqui.jpg", alt: "Esqui" },
  { src: "/media/esportes/ciclismo.jpg", alt: "Ciclismo" },
  { src: "/media/movimento/paddle.jpg", alt: "Paddle" },
  { src: "/media/movimento/academia-agachamento.jpg", alt: "Academia, agachamento" },
  { src: "/media/movimento/montanha.jpg", alt: "Montanha" },
  { src: "/media/movimento/academia-cordas.jpg", alt: "Academia, cordas" },
];

/** Altura da pista sticky em telas: o carrossel fica parado e gira enquanto a página rola por ela. */
const LEN = 6;
/** Rapidez com que o carrossel alcança a rolagem (maior = mais colado ao scroll). */
const FOLLOW = 10;

const cl = (v: number) => Math.max(0, Math.min(1, v));

const subscribeSize = (notify: () => void) => {
  window.addEventListener("resize", notify);
  return () => window.removeEventListener("resize", notify);
};
const sizeKey = () => `${window.innerWidth}x${window.innerHeight}`;

/**
 * Carrossel 3D girado pela rolagem: a pista sticky segura o carrossel na tela e o progresso da rolagem vira a posição dele
 * (suavizada). Arrastar, as setas, os pontos e o teclado também rolam a página até o slide pedido.
 * Slides em retrato (4:5) que crescem com a largura da janela sem passar de 70% da altura.
 */
function Gallery() {
  const [vw, vh] = useSyncExternalStore(subscribeSize, sizeKey, () => "1520x662").split("x").map(Number);
  const narrow = vw < 760;
  const h = Math.round(Math.min((narrow ? vw * 0.62 : Math.min(Math.max(vw * 0.24, 300), 440)) * 1.2, vh * 0.7));
  const last = GALLERY.length - 1;
  const pin = useRef<HTMLDivElement>(null);
  const car = useRef<DragableCarouselHandle>(null);

  // posição pedida pelo carrossel (índice fracionário) -> rolagem da janela
  const request = useCallback(
    (position: number) => {
      const el = pin.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY + cl(position / last) * Math.max(1, r.height - window.innerHeight);
      window.scrollTo({ top, behavior: "auto" });
    },
    [last],
  );

  useEffect(() => {
    const el = pin.current!;
    let target = 0;
    let current = 0;
    let prev = 0;
    let raf = 0;

    const read = () => {
      const r = el.getBoundingClientRect();
      target = cl(-r.top / Math.max(1, r.height - window.innerHeight)) * last;
    };
    // aproxima a posição do alvo a cada quadro, para a rolagem em degraus do mouse virar um giro contínuo
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      current += (target - current) * (1 - Math.exp(-dt * FOLLOW));
      if (Math.abs(target - current) < 0.001) current = target;
      car.current?.setPosition(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      read();
      if (!raf) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    read();
    current = target;
    car.current?.setPosition(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [last]);

  return (
    <div ref={pin} className="mx-hw-pin" style={{ "--len": LEN } as CSSProperties}>
      <div className="mx-hw-stage">
        <div className="mx-hw-car" style={{ height: h }}>
          <DragableCarousel
            ref={car}
            onRequestPosition={request}
            label="Esportes do FitMatch"
            images={GALLERY.map((g) => g.src)}
            alts={GALLERY.map((g) => g.alt)}
            slideWidth={Math.round(h / 1.2)}
            slideHeight={h}
            gap={narrow ? 12 : 20}
            borderRadius={narrow ? 16 : 22}
            arrowColor="#fff"
            arrowBackground="#0a0a0a"
            arrowSize={narrow ? 36 : 44}
            dotColor="#fff"
          />
        </div>
      </div>
    </div>
  );
}

/** Carrossel 3D girado pela rolagem + revelação com zoom: a pílula com a foto cresce até a tela inteira e toca o vídeo. */
export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-hw" aria-label="Como funciona">
      <Gallery />

      <ScrollZoomReveal
        image="/media/movimento/montanha.jpg"
        imageAlt="Pessoa de braços abertos no alto de uma montanha nevada"
        videoUrl="/media/movimento/montanha.mp4"
      />
    </section>
  );
}
