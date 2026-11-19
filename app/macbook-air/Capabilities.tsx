"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

const STATEMENT =
  "Aproveitando nosso profundo conhecimento em design e engenharia, criamos um notebook que transforma potência bruta em produtividade de verdade.";

const ico = (children: ReactNode) => (
  <svg viewBox="0 0 40 40" className="ic" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const CARDS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Design",
    text: "Alumínio 100% reciclado, apenas 11,3 mm de espessura e 1,2 kg para levar para qualquer lugar.",
    icon: ico(<><rect x="5" y="6" width="30" height="28" rx="4" /><path d="M5 15h30M17 15v19" /></>),
  },
  {
    title: "Chip M2 e Desempenho",
    text: "CPU de 8 núcleos e GPU de até 10 núcleos, sem ventoinha e sem nenhum ruído, mesmo sob carga.",
    icon: ico(<><rect x="10" y="10" width="20" height="20" rx="3" /><rect x="16" y="16" width="8" height="8" rx="1.5" /><path d="M15 5v5M20 5v5M25 5v5M15 30v5M20 30v5M25 30v5M5 15h5M5 20h5M5 25h5M30 15h5M30 20h5M30 25h5" /></>),
  },
  {
    title: "Tela Liquid Retina",
    text: "13,6 polegadas com 500 nits de brilho, mais de um bilhão de cores e cantos arredondados.",
    icon: ico(<><path d="M20 4l4 6 7-1-1 7 6 4-6 4 1 7-7-1-4 6-4-6-7 1 1-7-6-4 6-4-1-7 7 1z" /><circle cx="20" cy="20" r="4" /></>),
  },
  {
    title: "Bateria e Carregamento",
    text: "Até 18 horas de autonomia e carregamento rápido com o cabo MagSafe que combina com o acabamento.",
    icon: ico(<><rect x="4" y="12" width="28" height="16" rx="3.5" /><path d="M36 17v6M9 17v6M14 17v6M19 17v6" /></>),
  },
  {
    title: "Conectividade",
    text: "Duas portas Thunderbolt, MagSafe 3, Wi-Fi 6 e entrada para fones para conectar tudo com facilidade.",
    icon: ico(<><rect x="4" y="9" width="10" height="8" rx="2.5" /><rect x="26" y="23" width="10" height="8" rx="2.5" /><path d="M14 13h6a6 6 0 0 1 6 6v4" /></>),
  },
];

/** Frase que escurece palavra por palavra + grade de cartões que ficam laranja ao passar o mouse. */
export default function Capabilities() {
  const grid = useRef<HTMLDivElement>(null);
  const words = STATEMENT.split(" ");

  useEffect(() => {
    const els = Array.from(grid.current!.querySelectorAll<HTMLElement>(".mb-cap-card"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <section id="capabilities" className="mb-cap">
      <div className="mb-cap-say" data-scene style={{ "--n": words.length } as CSSProperties}>
        <p>
          <span className="mb-cap-tag">MACBOOK</span>
          {words.map((w, i) => (
            <span key={i} className="w" style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <div ref={grid} className="mb-cap-grid">
        {CARDS.map((c, i) => (
          <article key={c.title} className="mb-cap-card" style={{ "--d": `${(i % 3) * 90}ms` } as CSSProperties} tabIndex={0}>
            {c.icon}
            <div className="txt">
              <h3>{c.title}</h3>
              <div className="more"><p>{c.text}</p></div>
            </div>
          </article>
        ))}
        <div className="mb-cap-card mb-cap-pic" style={{ "--d": "180ms" } as CSSProperties} aria-hidden="true">
          <i className="s1" /><i className="s2" /><i className="s3" /><i className="s4" /><i className="s5" /><i className="glow" />
        </div>
      </div>

      <a href="#specs" className="mb-cap-more">
        <span>···</span> VER TUDO <b>▸</b>
      </a>
    </section>
  );
}
