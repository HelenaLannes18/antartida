"use client";

import { useRef, type CSSProperties } from "react";
import { useScene } from "./useScene";

const STEPS = [
  { tag: "Pace", num: "5'40\"", label: "Pace médio", photo: "/media/esportes/corrida.jpg", pos: "42% 38%" },
  { tag: "Distância", num: "2,1 km", label: "Distância até o match", photo: "/media/movimento/trilha.jpg", pos: "52% 62%" },
  { tag: "Compatibilidade", num: "92%", label: "Compatibilidade média", photo: "/media/movimento/academia-agachamento.jpg", pos: "38% 46%" },
];

/** Marcas esparsas fora do arco (como o "escaneamento" da referência): ângulo, comprimento e opacidade fixos. */
const TICKS = Array.from({ length: 34 }, (_, i) => {
  const a = Number((-90 + (i + 0.5) * (180 / 34)).toFixed(2));
  const r = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return { a, l: 5 + Math.round(r * 11), o: Number((0.3 + r * 0.55).toFixed(2)) };
});
const MARKERS = [-58, 0, 58];
const trig = (a: number) => ({ s: Math.sin((a * Math.PI) / 180).toFixed(4), c: Math.cos((a * Math.PI) / 180).toFixed(4) });

/** Mostrador em arco: uma foto em forma de arco, três números e um ponto que muda de passo com a rolagem. */
export default function ClDial() {
  const pin = useRef<HTMLDivElement>(null);
  const { step, go } = useScene(pin, STEPS.length);
  const cur = STEPS[step];

  return (
    <section id="mostrador" className="mx-cl-dial" aria-label="Ritmo em números">
      <div ref={pin} className="mx-cl-dpin" style={{ "--len": 3.7 } as CSSProperties}>
        <div className="mx-cl-dstage" data-step={step}>
          <div className="mx-cl-arch">
            <div className="ring" aria-hidden="true">
              {TICKS.map((t, i) => {
                const { s, c } = trig(t.a);
                return <i key={i} className="tk" style={{ "--a": `${t.a}deg`, "--s": s, "--c": c, "--l": `${t.l}px`, opacity: t.o } as CSSProperties} />;
              })}
              {MARKERS.map((a, k) => {
                const { s, c } = trig(a);
                return <i key={a} className={`mk${step === k ? " on" : ""}`} style={{ "--a": `${a}deg`, "--s": s, "--c": c } as CSSProperties} />;
              })}
            </div>
            <div className="photo" aria-hidden="true">
              {STEPS.map((s, k) => (
                <i key={s.tag} className="ph" data-on={step === k ? "1" : "0"} style={{ backgroundImage: `url(${s.photo})`, backgroundPosition: s.pos }} />
              ))}
            </div>
          </div>

          <div className="mx-cl-base" aria-hidden="true" />
          <p className="mx-cl-dtag mx-cl-mono mx-cl-br" key={cur.tag} aria-live="polite">{cur.tag}</p>
          <span className="mx-cl-orb" data-step={step} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </span>

          <div className="mx-cl-stats">
            {STEPS.map((s, k) => (
              <button key={s.tag} type="button" className="stat" aria-current={step === k} onClick={() => go(k)}>
                <b>{s.num}</b>
                <span className="mx-cl-mono mx-cl-br">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
