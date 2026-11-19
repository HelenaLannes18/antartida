"use client";

import { useEffect, useRef, useState } from "react";

const M_PER_PX = 0.000264583; // 1px CSS = 1/96 pol
const MS_PER_KNOT = 0.514444;

const quip = (knots: number) =>
  knots < 0.05
    ? "Parece uma pena flutuando num mar de espelho"
    : knots < 0.5
      ? "Um passeio tranquilo de veleiro num domingo"
      : knots < 3
        ? "Agora sim, vento a favor"
        : "Segura o chapéu, é uma tempestade!";

/** Distância percorrida e velocidade média de rolagem da página. */
export default function FooterStats() {
  const [meters, setMeters] = useState(0);
  const [knots, setKnots] = useState(0);
  const dist = useRef(0);

  useEffect(() => {
    let last = window.scrollY;
    const t0 = performance.now();
    const onScroll = () => {
      dist.current += Math.abs(window.scrollY - last);
      last = window.scrollY;
    };
    const tick = window.setInterval(() => {
      const m = dist.current * M_PER_PX;
      const s = (performance.now() - t0) / 1000;
      setMeters(m);
      setKnots(m / s / MS_PER_KNOT);
    }, 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <div className="mb-ft-stats">
      <small>Distância rolada</small>
      <p className="mb-ft-num">
        {meters.toFixed(1)}
        <span>metros</span>
      </p>
      <small>Velocidade média</small>
      <p className="mb-ft-num">
        {knots.toFixed(3)}
        <span>nós</span>
      </p>
      <p className="mb-ft-quip">{quip(knots)}</p>
    </div>
  );
}
