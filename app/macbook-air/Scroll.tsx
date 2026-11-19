"use client";

import { useEffect } from "react";

const FINISHES = 4;

/**
 * Escreve o progresso de rolagem (0–1) em `--p` de cada `[data-scene]`.
 * `data-sticky`: progresso ao longo da pista sticky; senão, da entrada à saída da viewport.
 */
export default function Scroll() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const cl = (v: number) => Math.max(0, Math.min(1, v));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      for (const el of scenes) {
        const r = el.getBoundingClientRect();
        const p =
          el.dataset.sticky !== undefined
            ? cl(-r.top / Math.max(1, r.height - vh))
            : cl((vh - r.top) / (vh + r.height));
        el.style.setProperty("--p", p.toFixed(4));
        if (el.dataset.finishes !== undefined) {
          el.dataset.i = String(Math.min(FINISHES - 1, Math.floor(p * FINISHES)));
        }
      }
      if (nav) nav.dataset.solid = window.scrollY > 4 ? "1" : "0";
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

  return null;
}
