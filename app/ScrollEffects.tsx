"use client";

import { useEffect } from "react";

/** Liga os efeitos de scroll/cursor do site via variáveis CSS no elemento [data-root]. */
export default function ScrollEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-root]");
    if (!root) return;
    const hero = root.querySelector("[data-hero]");
    const man = root.querySelector("[data-man]");
    const land = root.querySelector("[data-land]");
    const tripsHead = root.querySelector("[data-trips-head]");
    const trips = root.querySelector("[data-trips]");

    const cl = (v: number) => Math.max(0, Math.min(1, v));
    const set = (k: string, v: number) =>
      root.style.setProperty(k, String(Math.round(v * 1000) / 1000));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const p = cl(-r.top / (r.height * 0.85));
        set("--p", p);
        set("--tab", p > 0.4 ? 1 : 0);
      }
      if (man) {
        const m = man.getBoundingClientRect();
        set("--q", cl((vh * 0.92 - m.top) / (vh * 0.5 + m.height * 0.55)));
      }
      if (land) {
        const l = land.getBoundingClientRect();
        set("--e", cl((vh - l.top) / (vh * 0.75)));
        root.style.setProperty(
          "--pl",
          ((l.top + l.height / 2 - vh / 2) * -0.08).toFixed(1) + "px",
        );
      }
      if (tripsHead) {
        const h = tripsHead.getBoundingClientRect();
        set("--h", cl((vh * 0.95 - h.top) / (vh * 0.4)));
      }
      if (trips) {
        const t = trips.getBoundingClientRect();
        set("--t", cl((vh - t.top) / (vh * 0.55)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // cursor personalizado
    let mx = -100, my = -100, tx = -100, ty = -100, cr = 0;
    const follow = () => {
      mx += (tx - mx) * 0.2;
      my += (ty - my) * 0.2;
      root.style.setProperty("--mx", mx.toFixed(1) + "px");
      root.style.setProperty("--my", my.toFixed(1) + "px");
      cr =
        Math.abs(tx - mx) + Math.abs(ty - my) > 0.4
          ? requestAnimationFrame(follow)
          : 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (mx < -50) {
        mx = tx;
        my = ty;
      }
      if (!cr) cr = requestAnimationFrame(follow);
      root.style.setProperty("--cur", "1");
      const el = e.target as Element | null;
      const t = el && el.closest ? el.closest("a, button, input") : null;
      root.style.setProperty("--cs", t ? "3.4" : "1");
    };
    const onLeave = () => root.style.setProperty("--cur", "0");

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (cr) cancelAnimationFrame(cr);
    };
  }, []);

  return null;
}
