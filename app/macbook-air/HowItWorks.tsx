"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

const STATEMENT =
  "Escolher um notebook leva semanas. Escolher o MacBook Air leva minutos. Chip M2. Até 18 horas de bateria. Sem ventoinha. Sem concessões.";

/** Fração da pista usada na rolagem horizontal; o resto expande o último cartão. */
const H = 0.64;
const GROW0 = 0.66;
const GROW1 = 0.94;

const cl = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => t * t * (3 - 2 * t);

const ico = (children: ReactNode) => (
  <svg viewBox="0 0 28 28" className="ic" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const TOOLS: { c: string; bg: boolean; d: ReactNode }[] = [
  { c: "#0071e3", bg: true, d: <path d="M13 2 5 13h6l-1 9 8-11h-6z" /> },
  { c: "#1d1d1f", bg: false, d: <><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.5" r="1" /></> },
  { c: "#e0457b", bg: true, d: <><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="7" rx="1.5" /><rect x="17" y="14" width="4" height="7" rx="1.5" /></> },
  { c: "#e8732a", bg: true, d: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /></> },
  { c: "#1d1d1f", bg: false, d: <><rect x="3" y="8" width="18" height="8" rx="4" /><rect x="8" y="11" width="8" height="2" rx="1" /></> },
  { c: "#2f9e5b", bg: true, d: <><rect x="2" y="7" width="18" height="10" rx="2.5" /><path d="M22 10.5v3M6 10v4M10 10v4" /></> },
  { c: "#2a9de8", bg: true, d: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></> },
  { c: "#1d1d1f", bg: true, d: <><rect x="3" y="7" width="18" height="12" rx="3" /><circle cx="12" cy="13" r="3.5" /><path d="m8 7 1.5-2.5h5L16 7" /></> },
  { c: "#7a4de0", bg: false, d: <><rect x="2" y="6" width="20" height="12" rx="2.5" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></> },
  { c: "#d8402f", bg: true, d: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></> },
  { c: "#e8732a", bg: false, d: <><rect x="6" y="3" width="12" height="18" rx="3" /><circle cx="12" cy="14" r="3" /><circle cx="12" cy="7.5" r="1" /></> },
  { c: "#0071e3", bg: true, d: <path d="m7 7 10 10-5 4V3l5 4L7 17" /> },
];

/** 5×5: a = ponto de destaque, g = glifo, d = ponto cinza. */
const GRID = ["aggaa", "gaaag", "agddd", "ddddd", "ddddd"];

const CARDS: { title: string; text: string; icon: ReactNode; tile: ReactNode }[] = [
  {
    title: "Leve como o ar",
    text: "Apenas 1,2 kg e 11,3 mm de espessura. Um notebook inteiro que some na mochila e acompanha você a qualquer lugar.",
    icon: ico(<><rect x="5" y="6" width="18" height="12" rx="2" /><path d="M3 22h22" /></>),
    tile: (
      <div className="mb-hw-t1">
        <div className="mb-front">
          <div className="mb-lid">
            <i className="mb-notch" />
            <div className="mb-wall wa" />
          </div>
          <div className="mb-deck" />
        </div>
        <span className="chip c1">1,2 kg</span>
        <span className="chip c2">11,3 mm</span>
      </div>
    ),
  },
  {
    title: "Tela Liquid Retina",
    text: "13,6 polegadas, 500 nits de brilho e mais de um bilhão de cores. Tudo nítido, de dia ou de noite.",
    icon: ico(<><rect x="3" y="5" width="22" height="15" rx="2.5" /><path d="M10 24h8M14 20v4" /></>),
    tile: (
      <div className="mb-hw-t2">
        <i className="side l" />
        <div className="scr">
          <b>Cores que saltam da tela.</b>
          <p>Liquid Retina de 13,6 polegadas, com 500 nits e mais de um bilhão de cores.</p>
        </div>
        <i className="side r" />
      </div>
    ),
  },
  {
    title: "18 horas de bateria",
    text: "Trabalhe o dia todo e pela noite adentro sem procurar tomada. Carregamento rápido pelo MagSafe.",
    icon: ico(<path d="M15.5 3 6 15.5h7L12 25l10-13h-7.5z" />),
    tile: (
      <div className="mb-hw-t3">
        {GRID.flatMap((row, r) =>
          row.split("").map((k, c) => (
            <span key={`${r}-${c}`} className={`cell ${k}`}>
              {k === "g" ? <i /> : null}
            </span>
          )),
        )}
      </div>
    ),
  },
  {
    title: "Conecta com tudo",
    text: "Thunderbolt, MagSafe 3, Wi-Fi 6 e entrada para fones. Funciona com o que você já usa no dia a dia.",
    icon: ico(<><rect x="3" y="6" width="22" height="16" rx="3" /><path d="m9 14 3.5 3.5L19 11" /></>),
    tile: (
      <div className="mb-hw-t4">
        {TOOLS.map((t, i) => (
          <span key={i} className={t.bg ? "tool bg" : "tool"} style={{ color: t.c }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {t.d}
            </svg>
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Silencioso e eficiente",
    text: "Sem ventoinha: o chip M2 entrega desempenho de sobra sem fazer nenhum ruído, mesmo sob carga.",
    icon: ico(<><path d="M5 12h4l5-5v14l-5-5H5z" /><path d="M19 10a5 5 0 0 1 0 8" /></>),
    tile: null,
  },
];

/** Frase que escurece palavra por palavra + cartões que correm na horizontal e o último expande em painel escuro. */
export default function HowItWorks() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const grow = useRef<HTMLDivElement>(null);
  const words = STATEMENT.split(" ");

  useEffect(() => {
    const pinEl = pin.current!;
    const stageEl = stage.current!;
    const trackEl = track.current!;
    const slotEl = slot.current!;
    const growEl = grow.current!;
    const cards = Array.from(trackEl.children) as HTMLElement[];
    const n = cards.length;
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const dots = nav ? Array.from(nav.querySelectorAll<HTMLElement>(".mb-nav-dots i")) : [];
    let raf = 0;

    const update = () => {
      raf = 0;
      const vw = window.innerWidth || 1280;
      const vh = window.innerHeight || 800;
      const r = pinEl.getBoundingClientRect();
      const p = cl(-r.top / Math.max(1, r.height - vh));
      const first = cards[0];
      const last = cards[n - 1];
      const hp = cl(p / H);

      const x = (vw - first.offsetWidth) / 2 - first.offsetLeft - (last.offsetLeft - first.offsetLeft) * hp;
      trackEl.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;

      // painel que cobre o último cartão e expande até a tela inteira
      const e = ease(cl((p - GROW0) / (GROW1 - GROW0)));
      const sr = stageEl.getBoundingClientRect();
      const tr = slotEl.getBoundingClientRect();
      growEl.style.left = `${((tr.left - sr.left) * (1 - e)).toFixed(1)}px`;
      growEl.style.top = `${((tr.top - sr.top) * (1 - e)).toFixed(1)}px`;
      growEl.style.width = `${(tr.width + (sr.width - tr.width) * e).toFixed(1)}px`;
      growEl.style.height = `${(tr.height + (sr.height - tr.height) * e).toFixed(1)}px`;
      stageEl.style.setProperty("--e", e.toFixed(4));

      // a nav vira bolinhas de progresso enquanto os cartões correm
      if (nav) {
        const pinned = r.top <= 0 && r.bottom > vh && e < 0.3;
        nav.dataset.cards = pinned ? "1" : "0";
        const ci = hp * (n - 1);
        dots.forEach((d, k) => d.style.setProperty("--w", cl(1 - Math.abs(ci - k)).toFixed(3)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (nav) nav.dataset.cards = "0";
    };
  }, []);

  return (
    <section id="how" className="mb-hw" aria-label="Como funciona">
      <div className="mb-hw-say">
        <p data-scene style={{ "--n": words.length } as CSSProperties}>
          {words.map((w, i) => (
            <span key={i} className="w" style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div ref={pin} className="mb-hw-pin" style={{ "--len": 7 } as CSSProperties}>
        <div ref={stage} className="mb-hw-stage">
          <div ref={track} className="mb-hw-track">
            {CARDS.map((c, i) => (
              <article key={c.title} className="mb-hw-card">
                <div ref={i === CARDS.length - 1 ? slot : undefined} className="mb-hw-tile">
                  {c.tile}
                </div>
                <div className="mb-hw-copy">
                  <h3>
                    {c.icon}
                    {c.title}
                  </h3>
                  <p>{c.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div ref={grow} className="mb-hw-grow" aria-hidden="true">
            <i className="cloud c1"><b /><b /><b /><b /></i>
            <i className="cloud c2"><b /><b /><b /><b /></i>
            <div className="mark"><i className="lid" /><i className="base" /></div>
          </div>
        </div>
      </div>

      <div className="mb-hw-end">
        <div className="mb-hw-dark">
          <h2>
            Histórias de
            <br />
            quem usa.
          </h2>
          <p>O que muda no dia a dia de quem troca de notebook.</p>
        </div>
      </div>
    </section>
  );
}
