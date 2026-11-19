import type { CSSProperties, ReactNode } from "react";

const SLABS = 22;

type Tone = "dark" | "light" | "green";

/** Matiz, saturação e faixa de luminosidade das laterais de cada acabamento (o verde tem moldura de titânio natural). */
const FRAME: Record<Tone, { h: number; s: number; base: number; amp: number }> = {
  dark: { h: 225, s: 4, base: 20, amp: 14 },
  light: { h: 225, s: 3, base: 74, amp: 12 },
  green: { h: 38, s: 9, base: 42, amp: 26 },
};

/**
 * Celular em 3D: corpo feito de fatias (laterais arredondadas), vidro frontal com a tela do app e verso com câmeras em relevo.
 * `children` é o conteúdo do vidro (veja <Glass />); o aparelho tem a proporção 1 : 2,115 da tela do protótipo.
 */
export default function Phone({ tone, children }: { tone: Tone; children: ReactNode }) {
  const f = FRAME[tone];
  const green = tone === "green";
  return (
    <div className={`mxph mxph-${tone}`}>
      {Array.from({ length: SLABS }, (_, i) => {
        const t = i / (SLABS - 1);
        const l = f.base + Math.sin(t * Math.PI) * f.amp;
        return (
          <i
            key={i}
            className="mxph-slab"
            style={{ transform: `translateZ(calc(var(--d) * ${(t - 0.5).toFixed(3)}))`, background: `hsl(${f.h} ${f.s}% ${l.toFixed(1)}%)` }}
          />
        );
      })}

      <div className="mxph-face mxph-front">{children}</div>

      <div className="mxph-face mxph-back">
        <div className="mxph-cam">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <i key={k} className="mxph-plate" style={{ "--k": k } as CSSProperties} />
          ))}
          {[1, 2, 3].map((n) => (
            <div key={n} className={`mxph-lens l${n}`}>
              {[0, 1, 2, 3, 4].map((k) => (
                <i key={k} style={{ "--k": k } as CSSProperties} />
              ))}
            </div>
          ))}
          <span className="mxph-flash" />
        </div>
        {green ? (
          <svg className="mxph-mark" viewBox="0 0 56 52" aria-hidden="true">
            <circle cx="20" cy="26" r="14" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" />
            <circle cx="36" cy="26" r="14" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" />
            <path d="M28 14.51 A14 14 0 0 1 28 37.49 A14 14 0 0 1 28 14.51Z" fill="#05caad" fillOpacity=".85" />
          </svg>
        ) : (
          <span className="mxph-glyph" />
        )}
      </div>

      <div className="mxph-face mxph-bot">
        {tone === "dark" || green ? (
          <>
            <i className="mxph-dots" />
            <i className="mxph-port" />
            <i className="mxph-dots" />
          </>
        ) : null}
      </div>
      <div className="mxph-face mxph-topf" />

      {green || tone === "dark" ? (
        <>
          <i className="mxph-face mxph-key mxph-pwr" />
          <i className="mxph-face mxph-key mxph-vol mxph-vol1" />
          <i className="mxph-face mxph-key mxph-vol mxph-vol2" />
          <i className="mxph-face mxph-key mxph-act" />
        </>
      ) : null}
    </div>
  );
}
