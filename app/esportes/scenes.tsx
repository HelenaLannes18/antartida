"use client";

import type { ComponentType, CSSProperties, ReactNode } from "react";
import {
  Dots,
  Drift,
  HZ,
  Marks,
  Scenery,
  VH,
  VW,
  dashes,
  dots,
  groundPoly,
  props,
  ridge,
  rng,
  specks,
  swell,
  type Prop,
} from "./stage";

/** Camada com paralaxe leve ligada ao mouse (--mx/--my vêm do Hero). */
function Par({ px, py = 0, children }: { px: number; py?: number; children: ReactNode }) {
  return (
    <g className="es-par" style={{ "--px": px, "--py": py } as CSSProperties}>
      {children}
    </g>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg className="es-svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Foreground que balança de leve e acompanha o mouse. */
function Fg({ children }: { children: ReactNode }) {
  return (
    <g className="es-fg-move">
      <g className="es-fg">
        <g transform="translate(0 -64)">{children}</g>
      </g>
    </g>
  );
}

function Clouds({ id, y, fill, rate }: { id: string; y: number[]; fill: string; rate: number }) {
  const r = rng(y.length * 31 + 7);
  const one = y.map((cy, i) => ({ cx: 120 + (i / y.length) * 1500 + r() * 120, cy, rx: 220 + r() * 260, ry: 14 + r() * 20 }));
  const row = (dx: number) =>
    one.map((c, i) => <ellipse key={`${dx}-${i}`} cx={c.cx + dx} cy={c.cy} rx={c.rx} ry={c.ry} fill={`url(#${id})`} />);
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={fill} stopOpacity=".85" />
          <stop offset="1" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Drift rate={rate} period={VW}>
        {row(0)}
        {row(VW)}
        {row(VW * 2)}
      </Drift>
    </>
  );
}

/* ================================================================== */
/* 1 · Ciclismo — estrada ao entardecer, guidão em primeira pessoa */

const K1 = 270;
const C_DASH = dashes(0, 0.035, 1.0, 1.4, 26);
const C_GRASS = specks(11, 90, [1.35, 9], [0.02, 0.07], [0.2, 0.7], 62);
const C_PINES = props(5, 34, [1.9, 6.5], 62, [0.75, 1.15]);
const C_FAR = ridge(3, 396, 62, 0.9);
const C_MID = ridge(8, 420, 36, 0.35);
const C_NEAR = ridge(21, 440, 22);

function Pine({ lit }: { lit: string }) {
  return (
    <g>
      <rect x="-5" y="-42" width="10" height="42" fill="#07181d" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = -40 - i * 62;
        const w = 80 - i * 14;
        return (
          <g key={i}>
            <polygon points={`0,${y - 92} ${-w},${y} 0,${y}`} fill="#0b2a31" />
            <polygon points={`0,${y - 92} ${w},${y} 0,${y}`} fill={lit} />
          </g>
        );
      })}
    </g>
  );
}

function Cycling() {
  return (
    <Svg>
      <defs>
        <linearGradient id="c1-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HZ + 10}>
          <stop offset="0" stopColor="#050f1a" />
          <stop offset=".34" stopColor="#0d3347" />
          <stop offset=".62" stopColor="#2f7886" />
          <stop offset=".84" stopColor="#a9c8bd" />
          <stop offset="1" stopColor="#f3d6a8" />
        </linearGradient>
        <radialGradient id="c1-sun">
          <stop offset="0" stopColor="#ffe7b8" stopOpacity=".95" />
          <stop offset=".25" stopColor="#ffd59a" stopOpacity=".45" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c1-verge" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#5f8b82" />
          <stop offset=".18" stopColor="#2a5a54" />
          <stop offset=".6" stopColor="#123a3d" />
          <stop offset="1" stopColor="#081c24" />
        </linearGradient>
        <linearGradient id="c1-road" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#5b7380" />
          <stop offset=".12" stopColor="#2f4553" />
          <stop offset=".55" stopColor="#14232d" />
          <stop offset="1" stopColor="#0a131a" />
        </linearGradient>
        <linearGradient id="c1-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dcb0" stopOpacity="0" />
          <stop offset=".35" stopColor="#f6dcb0" stopOpacity=".55" />
          <stop offset="1" stopColor="#f6dcb0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="c1-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa0aa" />
          <stop offset=".45" stopColor="#3a4852" />
          <stop offset="1" stopColor="#10161b" />
        </linearGradient>
      </defs>

      <rect width={VW} height={VH} fill="url(#c1-sky)" />
      <circle cx="1040" cy="318" r="440" fill="url(#c1-sun)" />
      <circle cx="1040" cy="318" r="40" fill="#fff0cc" />
      <Clouds id="c1-cl" y={[150, 230, 300, 96]} fill="#ffd9a8" rate={0.6} />

      <Par px={-6}>
        <path d={C_FAR} fill="#4a7f8c" opacity=".85" />
      </Par>
      <Par px={-12}>
        <path d={C_MID} fill="#2b5967" />
      </Par>
      <Par px={-18}>
        <path d={C_NEAR} fill="#17404a" />
      </Par>

      <rect y={HZ} width={VW} height={VH - HZ} fill="url(#c1-verge)" />
      <Marks K={K1} items={C_GRASS} period={62} fill="#9ccbb4" opacity={0.28} />
      <polygon points={groundPoly(K1, -1, 1)} fill="url(#c1-road)" />
      <polygon points={groundPoly(K1, -0.97, -0.9)} fill="#e9f0f2" opacity=".72" />
      <polygon points={groundPoly(K1, 0.9, 0.97)} fill="#e9f0f2" opacity=".72" />
      <Marks K={K1} items={C_DASH} period={62.4} fill="#eef4f5" opacity={0.9} />

      <Scenery K={K1} items={C_PINES} period={62} draw={(p) => <Pine lit={p.X > 0 ? "#1f5254" : "#174548"} />} />

      <rect x="0" y={HZ - 36} width={VW} height="150" fill="url(#c1-haze)" />

      <Fg>
        <ellipse cx="800" cy="910" rx="640" ry="70" fill="#000" opacity=".4" />
        {/* barra */}
        <path d="M236 908 C330 844 478 820 800 820 C1122 820 1270 844 1364 908" fill="none" stroke="url(#c1-bar)" strokeWidth="30" strokeLinecap="round" />
        <path d="M262 890 C350 836 490 812 800 812 C1110 812 1250 836 1338 890" fill="none" stroke="#b9cbd3" strokeOpacity=".32" strokeWidth="3" strokeLinecap="round" />
        {/* manoplas */}
        {[-1, 1].map((s) => (
          <g key={s} transform={s < 0 ? "" : "translate(1600 0) scale(-1 1)"}>
            <path d="M250 900 C292 862 326 842 376 830" stroke="#10161a" strokeWidth="50" strokeLinecap="round" fill="none" />
            <path d="M250 897 C292 859 326 839 376 827" stroke="#3b4953" strokeWidth="46" strokeLinecap="round" fill="none" opacity=".35" />
            <path d="M262 880 C300 848 332 832 372 822" stroke="#7d909b" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".7" />
            {[0, 1, 2, 3, 4].map((k) => (
              <line key={k} x1={290 + k * 17} y1={868 - k * 9} x2={298 + k * 17} y2={846 - k * 9} stroke="#000" strokeWidth="3" opacity=".6" />
            ))}
            {/* alavanca de freio */}
            <path d="M388 826 C352 782 346 736 372 690" stroke="#aab6bd" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M388 826 C352 782 346 736 372 690" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" fill="none" transform="translate(-2 -1)" />
          </g>
        ))}
        {/* mesa e ciclocomputador */}
        <path d="M764 826 L836 826 L824 742 L776 742Z" fill="#202a31" />
        <path d="M776 826 L790 742 L776 742Z" fill="#fff" opacity=".12" />
        <rect x="770" y="726" width="60" height="24" rx="9" fill="#10171c" />
        <g transform="translate(800 684)">
          <rect x="-76" y="-42" width="152" height="84" rx="15" fill="#04080c" stroke="#2b3b46" strokeWidth="2" />
          <rect x="-67" y="-33" width="134" height="66" rx="9" fill="#09202b" />
          <path d="M-46 14 A46 46 0 0 1 46 14" fill="none" stroke="#1d4252" strokeWidth="7" strokeLinecap="round" />
          <path d="M-46 14 A46 46 0 0 1 24 -22" fill="none" stroke="#05caad" strokeWidth="7" strokeLinecap="round" />
          <circle cx="0" cy="12" r="5" fill="#fff" />
        </g>
      </Fg>
    </Svg>
  );
}

/* ================================================================== */
/* 2 · Surfe — nascer do sol, bico da prancha sobre a ondulação */

const K2 = 120;
const ZN2 = 0.22;
const BOARD = "M800 548 C888 548 948 690 984 912 L1002 1010 L598 1010 L616 912 C652 690 712 548 800 548Z";
const STRIPE = "M800 640 C846 650 880 730 906 912 L918 1010 L682 1010 L694 912 C720 730 754 650 800 640Z";
const S_GLINT = specks(21, 70, [0, 1.1], [0.02, 0.07], [0.05, 0.18], 62, true);
const S_SPARK = specks(22, 90, [0.1, 9], [0.03, 0.2], [0.03, 0.1], 62, true);
const S_SPRAY = dots(23, 46, 2.2, [0.05, 1.3], [0.008, 0.02], 40);
const SWELLS = [
  { seed: 1, base: 456, amp: 8, rate: 0.5, top: "#59b0b4", bot: "#13566a", crest: 0.6, bob: 1 },
  { seed: 2, base: 512, amp: 22, rate: 0.9, top: "#3c9aa7", bot: "#0c465b", crest: 0.5, bob: 2 },
  { seed: 3, base: 604, amp: 38, rate: 1.4, top: "#237c8f", bot: "#07323f", crest: 0.4, bob: 3 },
  { seed: 4, base: 736, amp: 66, rate: 2.1, top: "#126075", bot: "#031a24", crest: 0.34, bob: 5 },
].map((s) => {
  const d = swell(s.seed * 17, s.base, s.amp);
  return { ...s, d, area: `${d} L${VW * 2} ${VH + 20} L0 ${VH + 20} Z` };
});

function Surf() {
  return (
    <Svg>
      <defs>
        <linearGradient id="s2-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HZ + 6}>
          <stop offset="0" stopColor="#06162a" />
          <stop offset=".4" stopColor="#1d5870" />
          <stop offset=".72" stopColor="#d79a86" />
          <stop offset="1" stopColor="#fcd9ac" />
        </linearGradient>
        <radialGradient id="s2-sun">
          <stop offset="0" stopColor="#fff0cf" stopOpacity="1" />
          <stop offset=".22" stopColor="#ffd4a0" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffd4a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s2-sea" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#f0c7a2" />
          <stop offset=".05" stopColor="#58a3a8" />
          <stop offset=".22" stopColor="#1b7184" />
          <stop offset=".6" stopColor="#0a3d50" />
          <stop offset="1" stopColor="#051f2b" />
        </linearGradient>
        <linearGradient id="s2-board" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d8dc" />
          <stop offset=".4" stopColor="#fffaf0" />
          <stop offset=".62" stopColor="#f1ece2" />
          <stop offset="1" stopColor="#b9c9ce" />
        </linearGradient>
        <linearGradient id="s2-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".3" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#04202c" stopOpacity=".28" />
        </linearGradient>
        <linearGradient id="s2-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe0b4" stopOpacity="0" />
          <stop offset=".4" stopColor="#ffe0b4" stopOpacity=".5" />
          <stop offset="1" stopColor="#ffe0b4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={VW} height={VH} fill="url(#s2-sky)" />
      <circle cx="846" cy="438" r="460" fill="url(#s2-sun)" />
      <circle cx="846" cy="440" r="70" fill="#fff4d8" />
      <Clouds id="s2-cl" y={[140, 210, 290, 90]} fill="#ffc7a0" rate={0.5} />

      <rect y={HZ} width={VW} height={VH - HZ} fill="url(#s2-sea)" />
      <Marks K={K2} items={S_GLINT} period={62} fill="#ffe3b8" opacity={0.85} zNear={ZN2} />
      <Marks K={K2} items={S_SPARK} period={62} fill="#c9f6ee" opacity={0.3} zNear={ZN2} />

      {SWELLS.map((s, i) => (
        <Par key={s.seed} px={-4 - i * 5} py={-i}>
          <Drift rate={s.rate * 14} period={VW} bob={s.bob}>
            <path d={s.area} fill={`url(#s2-sw${i})`} />
            <path d={s.d} fill="none" stroke="#e2fff9" strokeOpacity={s.crest} strokeWidth={1.6 + i * 0.5} />
          </Drift>
          <defs>
            <linearGradient id={`s2-sw${i}`} gradientUnits="userSpaceOnUse" x1="0" y1={s.base - s.amp} x2="0" y2={VH}>
              <stop offset="0" stopColor={s.top} />
              <stop offset="1" stopColor={s.bot} />
            </linearGradient>
          </defs>
        </Par>
      ))}

      <rect x="0" y={HZ - 22} width={VW} height="120" fill="url(#s2-haze)" />
      <Dots K={K2} items={S_SPRAY} period={40} fill="#fff" opacity={0.8} fall={0.25} range={1.5} zNear={0.3} />

      <Fg>
        <path d={BOARD} fill="#021a24" opacity=".35" transform="translate(8 14)" />
        <path d={BOARD} fill="url(#s2-board)" stroke="#5f8590" strokeWidth="6" />
        <path d={BOARD} fill="url(#s2-shade)" />
        {/* faixa turquesa e longarina */}
        <path d={STRIPE} fill="#05caad" opacity=".9" />
        <path d={STRIPE} fill="url(#s2-shade)" />
        <line x1="800" y1="556" x2="800" y2="1010" stroke="#0a2a34" strokeOpacity=".28" strokeWidth="3" />
        <ellipse cx="760" cy="640" rx="26" ry="64" fill="#fff" opacity=".35" transform="rotate(12 760 640)" />
        <path d="M640 912 C676 760 722 620 800 566" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
        {/* água escorrendo pela prancha */}
        <path d="M500 1010 L560 912 C600 860 720 846 800 860 C880 846 1000 860 1040 912 L1100 1010Z" fill="#0a5266" opacity=".75" />
        <path d="M560 912 C600 860 720 846 800 860 C880 846 1000 860 1040 912" fill="none" stroke="#e8fffb" strokeOpacity=".7" strokeWidth="3" />
      </Fg>
    </Svg>
  );
}

/* ================================================================== */
/* 3 · Esqui — pista nevada ao entardecer, pontas dos esquis */

const K3 = 300;
const N_SPARK = specks(31, 90, [0, 6], [0.03, 0.14], [0.05, 0.3], 62, true);
const N_SHADE = specks(32, 40, [0, 7], [0.2, 0.7], [0.08, 0.3], 62, true);
const N_PINES = props(33, 36, [2.6, 8], 62, [0.8, 1.3]);
const N_GATES: Prop[] = Array.from({ length: 10 }, (_, i) => ({ X: (i % 2 ? 1 : -1) * 1.5, z0: 6 + i * 6, s: 1, flip: i % 2 === 1 }));
const N_FLAKES = dots(34, 110, 3.6, [0, 3.2], [0.006, 0.018], 40);
const N_FAR = ridge(41, 372, 120, 1.1);
const N_MID = ridge(42, 408, 70, 0.8);
const N_NEAR = ridge(43, 434, 26);

function SnowPine() {
  return (
    <g>
      <rect x="-5" y="-40" width="10" height="40" fill="#071a20" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = -38 - i * 64;
        const w = 84 - i * 14;
        const h = 96;
        return (
          <g key={i}>
            <polygon points={`0,${y - h} ${-w},${y} 0,${y}`} fill="#0b2b36" />
            <polygon points={`0,${y - h} ${w},${y} 0,${y}`} fill="#1b4a5c" />
            <polygon
              points={`0,${y - h} ${-w * 0.58},${y - h * 0.42} ${-w * 0.26},${y - h * 0.54} 0,${y - h * 0.4} ${w * 0.26},${y - h * 0.54} ${w * 0.58},${y - h * 0.42}`}
              fill="#eef5fa"
            />
          </g>
        );
      })}
    </g>
  );
}

/** Bandeira de slalom; o Scenery espelha as do lado direito para apontarem para a pista. */
function Gate() {
  return (
    <g>
      <rect x="-2" y="-170" width="4" height="170" fill="#e9f1f6" />
      <path d="M2 -170 L58 -156 L2 -132Z" fill="#05caad" />
    </g>
  );
}

function Ski() {
  return (
    <Svg>
      <defs>
        <linearGradient id="n3-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HZ + 6}>
          <stop offset="0" stopColor="#081c3a" />
          <stop offset=".42" stopColor="#3b6a99" />
          <stop offset=".74" stopColor="#a8c2da" />
          <stop offset="1" stopColor="#f5d8d2" />
        </linearGradient>
        <radialGradient id="n3-glow">
          <stop offset="0" stopColor="#ffd2c4" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffd2c4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="n3-snow" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#f2e4e4" />
          <stop offset=".1" stopColor="#dbe8f3" />
          <stop offset=".5" stopColor="#a9c3dc" />
          <stop offset="1" stopColor="#6f94b8" />
        </linearGradient>
        <linearGradient id="n3-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7dcd6" stopOpacity="0" />
          <stop offset=".45" stopColor="#f7dcd6" stopOpacity=".6" />
          <stop offset="1" stopColor="#f7dcd6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="n3-ski" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a1a2a" />
          <stop offset=".5" stopColor="#25445d" />
          <stop offset="1" stopColor="#08131f" />
        </linearGradient>
        <linearGradient id="n3-m" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f0f7" />
          <stop offset=".5" stopColor="#8aa9c8" />
          <stop offset="1" stopColor="#4d6f94" />
        </linearGradient>
      </defs>

      <rect width={VW} height={VH} fill="url(#n3-sky)" />
      <circle cx="560" cy="400" r="520" fill="url(#n3-glow)" />
      <Clouds id="n3-cl" y={[120, 200, 270]} fill="#ffe0d6" rate={0.4} />

      <Par px={-5}>
        <path d={N_FAR} fill="url(#n3-m)" opacity=".7" />
      </Par>
      <Par px={-10}>
        <path d={N_MID} fill="#7a9dbf" />
      </Par>
      <Par px={-16}>
        <path d={N_NEAR} fill="#274d6c" />
      </Par>

      <rect y={HZ} width={VW} height={VH - HZ} fill="url(#n3-snow)" />
      <Marks K={K3} items={N_SHADE} period={62} fill="#7d9fc4" opacity={0.22} />
      <Marks K={K3} items={N_SPARK} period={62} fill="#ffffff" opacity={0.7} />

      <Scenery K={K3} items={N_PINES} period={62} draw={() => <SnowPine />} />
      <Scenery K={K3} items={N_GATES} period={62} draw={() => <Gate />} />

      <rect x="0" y={HZ - 40} width={VW} height="150" fill="url(#n3-haze)" />
      <Dots K={K3} items={N_FLAKES} period={40} fill="#fff" opacity={0.9} fall={0.3} range={3.2} zNear={0.8} />

      <Fg>
        <ellipse cx="800" cy="906" rx="420" ry="40" fill="#1d3a58" opacity=".35" />
        {[
          { x: 706, r: 2.2 },
          { x: 894, r: -2.2 },
        ].map((s) => (
          <g key={s.x} transform={`rotate(${s.r} ${s.x} 912)`}>
            <path
              d={`M${s.x - 36} 1010 L${s.x - 36} 770 C${s.x - 36} 696 ${s.x - 28} 646 ${s.x} 598 C${s.x + 28} 646 ${s.x + 36} 696 ${s.x + 36} 770 L${s.x + 36} 1010Z`}
              fill="url(#n3-ski)"
              stroke="#02070d"
              strokeWidth="3"
            />
            <path
              d={`M${s.x} 1010 L${s.x} 640`}
              stroke="#05caad"
              strokeWidth="9"
              strokeLinecap="round"
              opacity=".95"
            />
            <path d={`M${s.x - 26} 912 L${s.x - 26} 780 C${s.x - 26} 720 ${s.x - 20} 676 ${s.x - 6} 640`} fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="3" />
            <rect x={s.x - 38} y="900" width="76" height="90" rx="10" fill="#0b141d" />
            <rect x={s.x - 22} y="916" width="44" height="12" rx="3" fill="#c8d4dc" opacity=".85" />
          </g>
        ))}
        {/* neve levantada */}
        <ellipse cx="700" cy="640" rx="70" ry="16" fill="#fff" opacity=".55" />
        <ellipse cx="900" cy="636" rx="64" ry="14" fill="#fff" opacity=".45" />
      </Fg>
    </Svg>
  );
}

/* ================================================================== */
/* 4 · Corrida — pista iluminada à noite, luzes de ritmo turquesa */

const K4 = 240;
const LANES = Array.from({ length: 8 }, (_, i) => -3.5 + i); // quem corre fica no meio de uma raia
const R_CROSS = Array.from({ length: 6 }, (_, i) => ({ X: 0, w: 3.5, len: 0.1, z0: i * 10.4 }));
const R_LED_L = dashes(-3.95, 0.09, 0.3, 1.1, 45);
const R_LED_R = dashes(3.95, 0.09, 0.3, 1.1, 45);
const R_GRAIN = specks(51, 110, [0, 3.4], [0.02, 0.06], [0.1, 0.5], 62, true);
const R_FAR = ridge(61, 414, 14);
const R_NEAR = ridge(62, 426, 8);
const MASTS = [210, 520, 1090, 1400];
const R_WIN = (() => {
  const r = rng(77);
  return Array.from({ length: 170 }, () => ({ x: r() * VW, y: 388 + r() * 38, r: 0.7 + r() * 1.4, o: 0.3 + r() * 0.5 }));
})();

function Track() {
  return (
    <Svg>
      <defs>
        <linearGradient id="r4-sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HZ + 6}>
          <stop offset="0" stopColor="#030b14" />
          <stop offset=".5" stopColor="#0b2c42" />
          <stop offset=".82" stopColor="#1f6a82" />
          <stop offset="1" stopColor="#ecdcb6" />
        </linearGradient>
        <radialGradient id="r4-flood">
          <stop offset="0" stopColor="#fff7de" stopOpacity="1" />
          <stop offset=".18" stopColor="#d9f3f0" stopOpacity=".55" />
          <stop offset="1" stopColor="#9fe6df" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="r4-track" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#6d92a4" />
          <stop offset=".1" stopColor="#2c556c" />
          <stop offset=".6" stopColor="#14354a" />
          <stop offset="1" stopColor="#0a2030" />
        </linearGradient>
        <linearGradient id="r4-grass" gradientUnits="userSpaceOnUse" x1="0" y1={HZ} x2="0" y2={VH}>
          <stop offset="0" stopColor="#2a5a58" />
          <stop offset=".3" stopColor="#0f3033" />
          <stop offset="1" stopColor="#051318" />
        </linearGradient>
        <linearGradient id="r4-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2e6c4" stopOpacity="0" />
          <stop offset=".45" stopColor="#f2e6c4" stopOpacity=".55" />
          <stop offset="1" stopColor="#f2e6c4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={VW} height={VH} fill="url(#r4-sky)" />

      <Par px={-4}>
        <path d={R_FAR} fill="#07151e" />
        <path d={R_NEAR} fill="#040d13" />
        {R_WIN.map((w, i) => (
          <circle key={i} cx={w.x} cy={w.y} r={w.r} fill="#ffe9b8" opacity={w.o} />
        ))}
        {MASTS.map((x) => (
          <g key={x}>
            <line x1={x} y1={HZ} x2={x} y2="236" stroke="#06131b" strokeWidth="4" />
            <rect x={x - 36} y="214" width="72" height="26" rx="3" fill="#0c1d29" />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <circle key={k} cx={x - 26 + (k % 3) * 26} cy={222 + Math.floor(k / 3) * 13} r="4.2" fill="#fffbe8" />
            ))}
            <circle cx={x} cy="228" r="230" fill="url(#r4-flood)" style={{ mixBlendMode: "screen" }} opacity=".85" />
          </g>
        ))}
      </Par>

      <rect y={HZ} width={VW} height={VH - HZ} fill="url(#r4-grass)" />
      <polygon points={groundPoly(K4, -3.62, 3.62)} fill="#e8f1f3" opacity=".8" />
      <polygon points={groundPoly(K4, -3.5, 3.5)} fill="url(#r4-track)" />
      <Marks K={K4} items={R_GRAIN} period={62} fill="#cfe6ef" opacity={0.1} />
      {LANES.map((X) => (
        <polygon key={X} points={groundPoly(K4, X - 0.026, X + 0.026)} fill="#eaf3f6" opacity=".88" />
      ))}
      <Marks K={K4} items={R_CROSS} period={62.4} fill="#eaf3f6" opacity={0.55} />
      <Marks K={K4} items={R_LED_L} period={63.7} fill="#05caad" opacity={0.95} />
      <Marks K={K4} items={R_LED_R} period={63.7} fill="#05caad" opacity={0.95} />

      <rect x="0" y={HZ - 30} width={VW} height="140" fill="url(#r4-haze)" />
    </Svg>
  );
}

/* ================================================================== */

export type SceneMeta = {
  id: string;
  label: string;
  chip: string;
  chat: string[];
  /** Desenho usado só quando a cena não tem foto nem vídeo em public/media/esportes. */
  Art: ComponentType;
};

export const SCENES: SceneMeta[] = [
  {
    id: "ciclismo",
    label: "Ciclismo",
    chip: "Segure e acelere",
    chat: ["Bora pedalar?"],
    Art: Cycling,
  },
  {
    id: "surfe",
    label: "Surfe",
    chip: "Segure e reme",
    chat: ["Segure em qualquer lugar.", "O mar faz o resto."],
    Art: Surf,
  },
  {
    id: "esqui",
    label: "Esqui",
    chip: "Segure e desça",
    chat: ["Segure em qualquer lugar.", "Confie na descida."],
    Art: Ski,
  },
  {
    id: "corrida",
    label: "Corrida",
    chip: "Segure e corra",
    chat: ["Mais um quilômetro.", "Só mais um."],
    Art: Track,
  },
];
