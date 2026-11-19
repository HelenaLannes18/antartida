"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

/* Palco das cenas: câmera em primeira pessoa olhando para um horizonte.
   Tudo é projetado com a mesma perspectiva, então estrada, árvores e neve
   se aproximam de forma coerente quando o `travel` (distância percorrida) cresce. */

export const VW = 1600;
export const VH = 900;
export const HZ = 430; // y do horizonte
export const VPX = 800; // x do ponto de fuga
export const SP = 620; // px por unidade de mundo em z = 1
export const Z_NEAR = 0.55;
export const Z_FAR = 64;

export type TickInfo = { travel: number; speed: number; time: number };
export type Tick = (t: TickInfo) => void;
export type StageApi = { subscribe: (f: Tick) => () => void };

/** Distribui o quadro atual para todos os elementos animados da cena. */
export class Stage implements StageApi {
  private subs = new Set<Tick>();
  private last: TickInfo = { travel: 0, speed: 0, time: 0 };

  subscribe(f: Tick) {
    this.subs.add(f);
    f(this.last);
    return () => {
      this.subs.delete(f);
    };
  }

  emit(t: TickInfo) {
    this.last = t;
    this.subs.forEach((f) => f(t));
  }
}

export const StageCtx = createContext<StageApi | null>(null);

/** Recebe um quadro por frame do laço do Hero (e um imediato ao montar). */
export function useStageTick(cb: Tick) {
  const stage = useContext(StageCtx);
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => stage?.subscribe((t) => cbRef.current(t)), [stage]);
}

export const mod = (a: number, n: number) => ((a % n) + n) % n;
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/** Gerador pseudoaleatório determinístico (evita diferença entre servidor e cliente). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const gx = (X: number, z: number) => VPX + (X * SP) / z;
export const gy = (K: number, z: number) => HZ + K / z;
const f1 = (n: number) => n.toFixed(1);

/** Polígono estático no chão (X1..X2 lateral, zA perto → zB longe). */
export function groundPoly(K: number, X1: number, X2: number, zA = 0.3, zB = Z_FAR) {
  return `${f1(gx(X1, zA))},${f1(gy(K, zA))} ${f1(gx(X2, zA))},${f1(gy(K, zA))} ${f1(gx(X2, zB))},${f1(gy(K, zB))} ${f1(gx(X1, zB))},${f1(gy(K, zB))}`;
}

/** Silhueta de montanhas/colinas por soma de senos. */
export function ridge(seed: number, base: number, amp: number, peaky = 0, step = 16) {
  const r = rng(seed);
  const ph = [r() * 6.28, r() * 6.28, r() * 6.28, r() * 6.28];
  let d = `M-40 ${VH}`;
  for (let x = -40; x <= VW + 40; x += step) {
    const a =
      Math.sin(x * 0.0042 + ph[0]) * 0.5 +
      Math.sin(x * 0.0111 + ph[1]) * 0.3 +
      Math.sin(x * 0.0263 + ph[2]) * 0.15 +
      Math.sin(x * 0.061 + ph[3]) * 0.05;
    const peak = peaky ? (1 - Math.abs(Math.sin(x * 0.0057 + ph[1]))) * peaky : 0;
    d += ` L${x} ${(base - amp * (a + peak)).toFixed(1)}`;
  }
  return `${d} L${VW + 40} ${VH} Z`;
}

/* ------------------------------------------------------------------ */
/* Marcas no chão (faixas, pontos, texturas): polígonos recalculados a cada frame */

export type Mark = { X: number; w: number; z0: number; len: number };

export function Marks({
  K,
  items,
  period,
  fill,
  opacity = 1,
  zNear = Z_NEAR,
}: {
  K: number;
  items: Mark[];
  period: number;
  fill: string;
  opacity?: number;
  zNear?: number;
}) {
  const refs = useRef<(SVGPolygonElement | null)[]>([]);
  useStageTick(({ travel }) => {
    for (let i = 0; i < items.length; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const m = items[i];
      const z1 = zNear + mod(m.z0 - travel, period);
      if (z1 >= Z_FAR) {
        el.setAttribute("points", "");
        continue;
      }
      const z2 = Math.min(z1 + m.len, Z_FAR);
      const y1 = gy(K, z1);
      const y2 = gy(K, z2);
      el.setAttribute(
        "points",
        `${f1(gx(m.X - m.w, z1))},${f1(y1)} ${f1(gx(m.X + m.w, z1))},${f1(y1)} ${f1(gx(m.X + m.w, z2))},${f1(y2)} ${f1(gx(m.X - m.w, z2))},${f1(y2)}`,
      );
    }
  });
  return (
    <g fill={fill} opacity={opacity}>
      {items.map((_, i) => (
        <polygon
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        />
      ))}
    </g>
  );
}

/** Faixas tracejadas regulares. */
export function dashes(X: number, w: number, len: number, gap: number, n: number): Mark[] {
  return Array.from({ length: n }, (_, i) => ({ X, w, len, z0: i * (len + gap) }));
}

/** Pontinhos/riscos espalhados (textura que dá sensação de velocidade). */
export function specks(
  seed: number,
  n: number,
  xr: [number, number],
  w: [number, number],
  len: [number, number],
  period: number,
  bothSides = true,
): Mark[] {
  const r = rng(seed);
  return Array.from({ length: n }, () => {
    const side = bothSides && r() > 0.5 ? -1 : 1;
    return {
      X: side * (xr[0] + r() * (xr[1] - xr[0])),
      w: w[0] + r() * (w[1] - w[0]),
      len: len[0] + r() * (len[1] - len[0]),
      z0: r() * period,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Objetos em pé (árvores, bandeiras, postes). Desenhados em unidades locais
   de 100 por unidade de mundo, com a base na origem. */

export type Prop = { X: number; z0: number; s?: number; flip?: boolean };

export function Scenery({
  K,
  items,
  period,
  draw,
  zNear = Z_NEAR,
}: {
  K: number;
  items: Prop[];
  period: number;
  draw: (p: Prop, i: number) => ReactNode;
  zNear?: number;
}) {
  const refs = useRef<(SVGGElement | null)[]>([]);
  const last = useRef<number[]>([]);
  const shown = useRef<boolean[]>([]);
  // do mais longe para o mais perto: ordem de pintura correta no instante zero
  const sorted = useMemo(() => [...items].sort((a, b) => b.z0 - a.z0), [items]);

  useStageTick(({ travel }) => {
    for (let i = 0; i < sorted.length; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const p = sorted[i];
      const z = zNear + mod(p.z0 - travel, period);
      const prev = last.current[i];
      if (prev !== undefined && z > prev + period * 0.5 && el.parentNode) {
        el.parentNode.insertBefore(el, el.parentNode.firstChild); // virou o mais distante
      }
      last.current[i] = z;
      const visible = z < Z_FAR;
      if (visible !== shown.current[i]) {
        el.style.display = visible ? "" : "none";
        shown.current[i] = visible;
      }
      if (!visible) continue;
      const sc = (SP * 0.01 * (p.s ?? 1)) / z;
      el.setAttribute("transform", `translate(${f1(gx(p.X, z))} ${f1(gy(K, z))}) scale(${((p.flip ? -1 : 1) * sc).toFixed(4)} ${sc.toFixed(4)})`);
      el.setAttribute("opacity", clamp((Z_FAR - z) / 16).toFixed(2));
    }
  });

  return (
    <g>
      {sorted.map((p, i) => (
        <g
          key={i}
          style={{ display: "none" }}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {draw(p, i)}
        </g>
      ))}
    </g>
  );
}

export function props(
  seed: number,
  n: number,
  xr: [number, number],
  period: number,
  size: [number, number] = [0.8, 1.2],
): Prop[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => ({
    X: (i % 2 ? 1 : -1) * (xr[0] + r() * (xr[1] - xr[0])),
    z0: ((i + r() * 0.6) / n) * period,
    s: size[0] + r() * (size[1] - size[0]),
  }));
}

/* ------------------------------------------------------------------ */
/* Partículas (neve, respingos, poeira) */

export type Dot = { X: number; Y: number; z0: number; r: number };

export function Dots({
  K,
  items,
  period,
  fill,
  opacity = 1,
  fall = 0,
  range = 3,
  zNear = 0.7,
}: {
  K: number;
  items: Dot[];
  period: number;
  fill: string;
  opacity?: number;
  fall?: number;
  range?: number;
  zNear?: number;
}) {
  const refs = useRef<(SVGCircleElement | null)[]>([]);
  const cam = K / SP;
  useStageTick(({ travel, time }) => {
    for (let i = 0; i < items.length; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const d = items[i];
      const z = zNear + mod(d.z0 - travel, period);
      if (z >= Z_FAR * 0.6) {
        el.setAttribute("r", "0");
        continue;
      }
      const Y = mod(d.Y - fall * time, range);
      const edge = Math.min(1, Y * 5, (range - Y) * 5, (Z_FAR * 0.6 - z) / 10);
      el.setAttribute("cx", f1(gx(d.X, z)));
      el.setAttribute("cy", f1(HZ + ((cam - Y) * SP) / z));
      el.setAttribute("r", Math.min(16, Math.max(0.5, (d.r * SP) / z)).toFixed(1));
      el.setAttribute("opacity", Math.max(0, edge).toFixed(2));
    }
  });
  return (
    <g fill={fill} opacity={opacity}>
      {items.map((_, i) => (
        <circle
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        />
      ))}
    </g>
  );
}

export function dots(seed: number, n: number, xr: number, yr: [number, number], rr: [number, number], period: number): Dot[] {
  const r = rng(seed);
  return Array.from({ length: n }, () => ({
    X: (r() * 2 - 1) * xr,
    Y: yr[0] + r() * (yr[1] - yr[0]),
    z0: r() * period,
    r: rr[0] + r() * (rr[1] - rr[0]),
  }));
}

/** Camada que se desloca na horizontal (ondas, nuvens) segundo o `travel`. */
export function Drift({ rate, period, bob = 0, children }: { rate: number; period: number; bob?: number; children: ReactNode }) {
  const ref = useRef<SVGGElement | null>(null);
  useStageTick(({ travel, time }) => {
    const x = -mod(travel * rate, period);
    const y = bob ? Math.sin(time * 0.9 + rate * 7) * bob : 0;
    ref.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  });
  return <g ref={ref}>{children}</g>;
}

/** Caminho de onda periódico (período `per`), repetido em largura 2×per para o laço contínuo. */
export function swell(seed: number, base: number, amp: number, per = VW) {
  const r = rng(seed);
  const harm = [1, 2, 3, 5].map((k) => ({ k, a: 1 / k ** 0.8, p: r() * 6.28 }));
  const norm = harm.reduce((s, h) => s + h.a, 0);
  let d = "";
  for (let x = 0; x <= per * 2; x += 20) {
    const v = harm.reduce((s, h) => s + h.a * Math.sin((2 * Math.PI * h.k * x) / per + h.p), 0) / norm;
    d += `${x === 0 ? "M" : " L"}${x} ${(base - amp * v).toFixed(1)}`;
  }
  return d;
}
