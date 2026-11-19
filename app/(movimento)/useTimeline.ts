"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const cl = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const num = (v: number) => (Math.round(v * 1000) / 1000).toString();

/**
 * Linha do tempo de uma pista "sticky" com `n` capítulos. Escreve variáveis CSS na própria seção:
 *  --p  progresso da pista (0–1)            --k  posição em capítulos (0–n)
 *  --q{j}  avanço linear dentro do capítulo j (0–1)
 *  --e{j}  entrada suavizada da palavra do capítulo j      --x{j}  saída suavizada (1 = já saiu)
 *  --w{j}  peso suavizado do capítulo j (platô no meio, cruza com o vizinho nas fronteiras; soma 1)
 * Devolve o capítulo atual e `go(k)`, que rola até o meio do capítulo k.
 */
export function useTimeline(pin: RefObject<HTMLElement | null>, n: number) {
  const [step, setStep] = useState(0);
  const cur = useRef(0);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    let raf = 0;
    let last = "";
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      const r = el.getBoundingClientRect();
      const p = cl(-r.top / Math.max(1, r.height - vh));
      const k = p * n;
      const key = num(p) + "|" + vh;
      if (key === last) return;
      last = key;
      const set = (name: string, v: number) => el.style.setProperty(name, num(v));
      set("--p", p);
      set("--k", k);
      for (let j = 0; j < n; j += 1) {
        const q = cl(k - j);
        const lead = j === 0 ? 0.12 : 0; // o primeiro capítulo começa com o celular sozinho
        set(`--q${j}`, q);
        set(`--e${j}`, ease(cl((q - 0.04 - lead) / 0.18)));
        set(`--x${j}`, ease(cl((q - 0.8) / 0.16)));
        const kk = j === 0 ? Math.max(k, 0.5) : j === n - 1 ? Math.min(k, n - 0.5) : k;
        set(`--w${j}`, ease(cl((0.58 - Math.abs(kk - (j + 0.5))) / 0.16)));
      }
      const s = Math.min(n - 1, Math.floor(p * n * 0.9999));
      if (s !== cur.current) {
        cur.current = s;
        setStep(s);
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
  }, [pin, n]);

  return { step };
}
