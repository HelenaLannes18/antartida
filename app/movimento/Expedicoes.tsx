"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const trips = [
  {
    id: "picos",
    img: "/media/picos.jpg",
    title: ["Picos", "em Brasa"],
    text: "Voe sobre cordilheiras iluminadas pelo sol da meia-noite e acampe aos pés de montanhas que poucos viram.",
    shade: 0.14,
    open: true,
  },
  {
    id: "aurora",
    img: "/media/aurora.jpg",
    title: ["Aurora", "Austral"],
    text: "No fim da temporada, quando o céu volta a escurecer, veja as luzes do sul dançando sobre o gelo.",
    shade: 0.14,
  },
  {
    id: "geleiras",
    img: "/media/geleiras.jpg",
    title: ["Geleiras", "Azuis"],
    text: "Caminhe por campos de gelo azul polidos pelo vento e explore as formações escondidas sob a superfície.",
    shade: 0.18,
  },
  {
    id: "acampamento",
    img: "/media/acampamento.jpg",
    title: ["Acampamento", "no Gelo"],
    text: "Durma em um acampamento remoto com conforto de hotel, cercado apenas pelo silêncio do continente.",
    shade: 0.22,
  },
  {
    id: "polo-sul",
    img: "/media/polo-sul.jpg",
    title: ["Rumo ao", "Polo Sul"],
    text: "Siga os passos dos grandes exploradores e pise no ponto mais ao sul do planeta.",
    shade: 0.22,
  },
];

const cl = (v: number) => Math.max(0, Math.min(1, v));

/** "Nossas expedições": o título sobe e o filete se desenha ao rolar; os painéis sobem e abrem no hover (--h e --t vêm da rolagem). */
export default function Expedicoes() {
  const sec = useRef<HTMLElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current!;
    const h = head.current!;
    const l = list.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      s.style.setProperty("--h", cl((vh * 0.95 - h.getBoundingClientRect().top) / (vh * 0.4)).toFixed(3));
      s.style.setProperty("--t", cl((vh - l.getBoundingClientRect().top) / (vh * 0.55)).toFixed(3));
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
    };
  }, []);

  return (
    <section id="expedicoes" ref={sec} className="mx-exp">
      <div ref={head} className="mx-exp-head">
        <h2>Nossas expedições.</h2>
        <span className="count">[ {String(trips.length).padStart(2, "0")} DESTINOS ]</span>
      </div>

      <div ref={list} className="mx-exp-trips">
        {trips.map((t, k) => (
          <a
            key={t.id}
            className={`mx-exp-trip${t.open ? " open" : ""}`}
            href={`#${t.id}`}
            style={{ "--k": k, "--shade": t.shade } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="art" src={t.img} alt="" />
            <span className="idx">{String(k + 1).padStart(2, "0")}</span>
            <span className="go" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3 11 11 3M4.5 3H11v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="info">
              <h3>
                {t.title[0]}
                <br />
                {t.title[1]}
              </h3>
              <div className="more">
                <div className="meta">
                  <span>[PREÇO]</span>
                  <span>[TEMPORADA]</span>
                </div>
                <p>{t.text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mx-exp-all">
        <a className="mx-exp-btn" href="#todas">
          VER TODAS AS EXPEDIÇÕES <b>▸</b>
        </a>
      </div>
    </section>
  );
}
