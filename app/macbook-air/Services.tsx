"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = [
  { n: "01", title: "Design", left: ["LEVEZA", "FINURA", "ALUMÍNIO"], right: ["ESTÉTICA", "1,2 KG", "11,3 MM"] },
  { n: "02", title: "Desempenho", left: ["VELOCIDADE", "SILÊNCIO", "GPU 10 NÚCLEOS"], right: ["POTÊNCIA", "SEM VENTOINHA", "CHIP M2"] },
  { n: "03", title: "Bateria", left: ["AUTONOMIA", "MAGSAFE", "EFICIÊNCIA"], right: ["18 HORAS", "CARGA RÁPIDA", "O DIA TODO"] },
  { n: "04", title: "Acabamentos", left: ["MEIA-NOITE", "ESTRELADO", "PRATA"], right: ["CINZA-ESPACIAL", "COR", "MATERIAL"] },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Lista de serviços: barra preta que desliza entre as linhas, tags que trocam e uma imagem que segue o cursor. */
export default function Services() {
  const sec = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, on: false });
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const [hop, setHop] = useState(false);
  const [tag, setTag] = useState(0);
  const prev = useRef(0);

  // posiciona a barra na linha ativa
  useEffect(() => {
    const place = () => {
      const r = rows.current[active];
      const l = list.current;
      if (r && l && bar.current) bar.current.style.transform = `translateY(${l.offsetTop + r.offsetTop}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // "salto" da barra ao trocar de linha
  useEffect(() => {
    if (prev.current === active) return;
    prev.current = active;
    setHop(true);
    setTag(0);
    const id = setTimeout(() => setHop(false), 320);
    return () => clearTimeout(id);
  }, [active]);

  // troca as palavras laterais enquanto a linha está ativa
  useEffect(() => {
    if (!hover) return;
    const id = setInterval(() => setTag((t) => (t + 1) % 3), 1100);
    return () => clearInterval(id);
  }, [hover]);

  // imagem e anel seguem o cursor
  useEffect(() => {
    const s = sec.current!;
    const m = mouse.current;
    const im = { x: 0, y: 0, vx: 0 };
    const rg = { x: 0, y: 0 };
    let raf = 0;
    const move = (e: PointerEvent) => {
      const b = s.getBoundingClientRect();
      m.x = e.clientX - b.left;
      m.y = e.clientY - b.top;
      m.on = true;
    };
    const leave = () => { m.on = false; };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const w = s.clientWidth;
      const iw = img.current ? img.current.offsetWidth : 0;
      const tx = clamp(m.x + 26, 0, w - iw * 0.35);
      const ty = m.y + 72;
      const px = im.x;
      im.x += (tx - im.x) * 0.13;
      im.y += (ty - im.y) * 0.13;
      im.vx = im.vx * 0.8 + (im.x - px) * 0.2;
      if (img.current) {
        img.current.style.transform = `translate(${im.x}px,${im.y}px) perspective(900px) rotateY(${clamp(im.vx * 1.2, -18, 18)}deg) rotateZ(${clamp(im.vx * 0.25, -5, 5)}deg)`;
      }
      rg.x += (m.x - rg.x) * 0.22;
      rg.y += (m.y - rg.y) * 0.22;
      if (ring.current) {
        ring.current.style.transform = `translate(${rg.x}px,${rg.y}px)`;
        ring.current.style.opacity = m.on ? "1" : "0";
      }
    };
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="services" ref={sec} className="mb-svc" data-hover={hover ? "1" : "0"}>
      <div ref={bar} className="mb-svc-bar" aria-hidden="true">
        <i className={hop ? "hop" : undefined} />
      </div>

      <ul
        ref={list}
        className="mb-svc-list"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {ROWS.map((r, i) => (
          <li
            key={r.n}
            ref={(el) => { rows.current[i] = el; }}
            className={active === i && hover ? "on" : undefined}
            onPointerEnter={() => setActive(i)}
          >
            <span className="mb-svc-side l">
              <b className="num">({r.n})</b>
              <em key={`l${tag}`}>{r.left[tag]}</em>
            </span>
            <h3>{r.title}</h3>
            <span className="mb-svc-side r">
              <em key={`r${tag}`}>{r.right[tag]}</em>
            </span>
          </li>
        ))}
      </ul>

      <div ref={img} className="mb-svc-img" data-on={hover ? "1" : "0"} aria-hidden="true">
        <div className={`pic p0${active === 0 ? " on" : ""}`}>
          <span>AIR</span>
          <i />
        </div>
        <div className={`pic p1${active === 1 ? " on" : ""}`}>
          <div className="tab"><b>M2</b></div>
        </div>
        <div className={`pic p2${active === 2 ? " on" : ""}`}>
          <div className="card c1" />
          <div className="card c2">
            <u>18 h</u>
            <s /><s />
          </div>
          <div className="card c3" />
        </div>
        <div className={`pic p3${active === 3 ? " on" : ""}`}>
          <i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" />
        </div>
      </div>

      <div ref={ring} className="mb-world-ring" aria-hidden="true"><i /></div>
    </section>
  );
}
