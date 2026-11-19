"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const cl = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Progresso (0–1) de uma pista "sticky" e o passo atual (0 … steps-1).
 * Escreve --p na própria pista e devolve `go(k)` para rolar até o meio do passo k.
 */
export function useScene(pin: RefObject<HTMLElement | null>, steps: number) {
  const [step, setStep] = useState(0);
  const cur = useRef(0);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      const r = el.getBoundingClientRect();
      const p = cl(-r.top / Math.max(1, r.height - vh));
      el.style.setProperty("--p", p.toFixed(4));
      const k = Math.min(steps - 1, Math.floor(p * steps * 0.9999));
      if (k !== cur.current) {
        cur.current = k;
        setStep(k);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pin, steps]);

  const go = (k: number) => {
    const el = pin.current;
    if (!el) return;
    const vh = window.innerHeight || 800;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - vh) * ((k + 0.5) / steps), behavior: "smooth" });
  };
  return { step, go };
}
