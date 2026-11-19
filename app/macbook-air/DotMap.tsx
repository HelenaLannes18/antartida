"use client";

import { useEffect, useRef } from "react";
import { buildLand, CITIES, LAT_BOTTOM, LAT_TOP } from "./world";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const PRIMARY = 46;
const INK = "#0a0a0a";
const ACCENT = "#00b8a6";

/**
 * Pontos soltos que, ao rolar, voam até formar um mapa-múndi de pontilhado.
 * O progresso vem de `--p`, escrito pelo <Scroll /> na seção `[data-scene]`.
 */
export default function DotMap() {
  const cv = useRef<HTMLCanvasElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = cv.current!;
    const stage = canvas.parentElement!;
    const section = stage.closest<HTMLElement>("[data-scene]")!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1;
    let mapX = 0, mapY = 0, mapW = 0, mapH = 0, spacing = 0;
    let n = 0;
    let tx = new Float32Array(0), ty = new Float32Array(0);
    let sx = new Float32Array(0), sy = new Float32Array(0);
    let delay = new Float32Array(0), curve = new Float32Array(0), phase = new Float32Array(0), r0 = new Float32Array(0);
    let cities: { x: number; y: number; name: string }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const rg = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    const project = (lon: number, lat: number) => ({
      x: mapX + ((lon + 180) / 360) * mapW,
      y: mapY + ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * mapH,
    });

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const aspect = 360 / (LAT_TOP - LAT_BOTTOM);
      mapW = Math.min(W * 0.92, H * 0.66 * aspect);
      mapH = mapW / aspect;
      mapX = (W - mapW) / 2;
      mapY = H * 0.47 - mapH / 2;
      spacing = clamp(mapW / 150, 5, 9);
      const land = buildLand(Math.round(mapW / spacing));
      n = land.length;
      tx = new Float32Array(n); ty = new Float32Array(n);
      sx = new Float32Array(n); sy = new Float32Array(n);
      delay = new Float32Array(n); curve = new Float32Array(n);
      phase = new Float32Array(n); r0 = new Float32Array(n);
      const rand = rng(7);
      const order = Array.from({ length: n }, (_, i) => i);
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      for (let k = 0; k < n; k++) {
        const pt = project(land[order[k]].lon, land[order[k]].lat);
        tx[k] = pt.x; ty[k] = pt.y;
        sx[k] = W * (0.1 + rand() * 0.8);
        sy[k] = H * (0.18 + rand() * 0.68);
        delay[k] = rand() * 0.5;
        curve[k] = (rand() - 0.5) * 0.5;
        phase[k] = rand() * 6.283;
        r0[k] = k < PRIMARY ? (4 + rand() * 3) * clamp(W / 1440, 0.6, 1.3) : 0;
      }
      cities = CITIES.map((c) => ({ ...project(c.lon, c.lat), name: c.name }));
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = now / 1000;
      const p = parseFloat(section.style.getPropertyValue("--p")) || 0;
      const enter = ease(clamp(p / 0.1));
      const q = clamp((p - 0.2) / 0.45);
      const mr = spacing * 0.27;
      const R = Math.max(60, mapW * 0.07);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = INK;
      ctx.globalAlpha = enter;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const e = ease(clamp((q - delay[i]) / 0.5));
        const wob = reduce ? 0 : 1 - e;
        let x0 = sx[i] + Math.sin(t * 0.6 + phase[i]) * 9 * wob;
        let y0 = sy[i] + Math.cos(t * 0.5 + phase[i]) * 9 * wob - p * H * 0.5 * (1 - e) + (1 - enter) * H * 0.3;
        const dx = tx[i] - sx[i], dy = ty[i] - sy[i];
        const sw = Math.sin(Math.PI * e) * curve[i];
        let x = x0 + (tx[i] - x0) * e - dy * sw;
        let y = y0 + (ty[i] - y0) * e + dx * sw;
        if (e > 0.98 && mouse.x > -999) {
          const mx = x - mouse.x, my = y - mouse.y;
          const d = Math.hypot(mx, my);
          if (d < R && d > 0.01) {
            const f = (1 - d / R) ** 2 * R * 0.45;
            x += (mx / d) * f;
            y += (my / d) * f;
          }
        }
        const r = r0[i] + (mr - r0[i]) * e;
        if (r < 0.2) continue;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, 6.2832);
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      // conexões a partir de São Paulo
      const a = clamp((p - 0.66) / 0.2);
      if (a > 0 && cities.length) {
        const hub = cities[0];
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = ACCENT;
        for (let i = 1; i < cities.length; i++) {
          const c = cities[i];
          const g = clamp(a * (cities.length - 1) - (i - 1));
          if (g <= 0) continue;
          const mx = (hub.x + c.x) / 2;
          const my = Math.min(hub.y, c.y) - Math.hypot(c.x - hub.x, c.y - hub.y) * 0.28;
          const at = (u: number) => ({
            x: (1 - u) * (1 - u) * hub.x + 2 * (1 - u) * u * mx + u * u * c.x,
            y: (1 - u) * (1 - u) * hub.y + 2 * (1 - u) * u * my + u * u * c.y,
          });
          ctx.globalAlpha = 0.65;
          ctx.beginPath();
          const steps = 48;
          for (let s = 0; s <= steps * g; s++) {
            const pt = at(s / steps);
            if (s === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
          if (g >= 1 && !reduce) {
            const pt = at((t * 0.22 + i * 0.17) % 1);
            ctx.globalAlpha = 1;
            ctx.fillStyle = ACCENT;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.4, 0, 6.2832);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        ctx.font = "11px var(--font-mono), ui-monospace, monospace";
        ctx.textBaseline = "middle";
        cities.forEach((c, i) => {
          const g = i === 0 ? a : clamp(a * (cities.length - 1) - (i - 1));
          if (g <= 0) return;
          const pulse = reduce ? 0 : (t * 0.8 + i * 0.3) % 1;
          ctx.globalAlpha = g * (1 - pulse);
          ctx.strokeStyle = ACCENT;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 5 + pulse * 16, 0, 6.2832);
          ctx.stroke();
          ctx.globalAlpha = g;
          ctx.fillStyle = ACCENT;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 4, 0, 6.2832);
          ctx.fill();
          ctx.fillStyle = INK;
          ctx.fillText(c.name, c.x + 10, c.y - 9);
        });
        ctx.globalAlpha = 1;
      }

      // cursor em anel (como na referência)
      const rEl = ring.current;
      if (rEl) {
        rg.x += (mouse.x - rg.x) * 0.2;
        rg.y += (mouse.y - rg.y) * 0.2;
        rEl.style.transform = `translate(${rg.x}px,${rg.y}px)`;
        rEl.style.opacity = mouse.x > -999 ? "1" : "0";
      }
    };

    const onMove = (e: PointerEvent) => {
      const b = stage.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(stage);
    const ro = new ResizeObserver(build);
    ro.observe(stage);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    build();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={cv} className="mb-world-cv" aria-hidden="true" />
      <div ref={ring} className="mb-world-ring" aria-hidden="true"><i /></div>
    </>
  );
}
