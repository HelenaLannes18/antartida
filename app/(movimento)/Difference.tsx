"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Glass from "./Glass";
import Phone from "./Phone";
import { ScrMatch } from "./proto";

/** Onde os três pontos de detalhe pousam na tela (em % da tela): o selo de match, o nome e o botão de curtir. */
const ANCHORS: [number, number][] = [
  [84, 21.4],
  [66, 61.8],
  [81, 77],
];

const SPOTS = [
  {
    n: "01",
    title: "Match por ritmo",
    text: "Pace, nível e horário parecidos com os seus. A compatibilidade é calculada, não adivinhada.",
  },
  {
    n: "02",
    title: "Perfis verificados",
    text: "Cada pessoa passa por uma checagem de identidade antes de aparecer para você. Treinar com gente nova, com tranquilidade.",
  },
  {
    n: "03",
    title: "Treino marcado",
    text: "Escolha o lugar, confirme a presença e compartilhe a localização ao vivo durante o treino.",
  },
];

const TEXT =
  "Acreditamos que o melhor treino acontece em boa companhia. Por isso cada detalhe foi pensado para aproximar você de quem tem o seu ritmo, com menos fricção, mais confiança e um app que sai da frente para você se mover.";

const cl = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Celular em 3D preso na tela: ao rolar ele vira do verso para a frente e se acomoda, o texto entra
 * e três pontos "+" aparecem sobre a tela (passe o mouse ou toque para abrir os detalhes).
 * Tudo é guiado por variáveis CSS escritas aqui; os pontos seguem a tela do celular em tempo real.
 */
export default function Difference() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ph = useRef<HTMLDivElement>(null);
  const spots = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const clicked = useRef<number | null>(null); // aberto por clique: não fecha quando o mouse sai

  useEffect(() => {
    const pinEl = pin.current!;
    const st = stage.current!;
    const phEl = ph.current!;
    const hot = spots.current.filter((e): e is HTMLDivElement => !!e);
    const anchors = Array.from(phEl.querySelectorAll<HTMLElement>("[data-anchor]"));
    const cards = hot.map((el) => el.querySelector<HTMLElement>(".card"));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const put = (k: string, v: string) => st.style.setProperty(k, v);
    let visible = false;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      // primeiro lê todas as posições, depois escreve: assim o navegador recalcula o estilo uma vez só por quadro
      const sr = st.getBoundingClientRect();
      const pinBox = pinEl.getBoundingClientRect();
      const pr = phEl.getBoundingClientRect();
      const pts = anchors.map((an) => an.getBoundingClientRect());

      const p = cl(-pinBox.top / Math.max(1, pinBox.height - sr.height));
      const a = easeInOut(cl(p / 0.5));
      const t = smooth(cl((p - 0.4) / 0.2));
      const h = cl((p - 0.6) / 0.2);
      // a flutuação sozinha respeita "menos movimento"; o giro com a rolagem e a inclinação com o mouse são o efeito principal
      const idle = calm.matches ? 0 : 1;
      mouse.sx += (mouse.x - mouse.sx) * 0.07;
      mouse.sy += (mouse.y - mouse.sy) * 0.07;
      const s = now / 1000;

      put("--p", p.toFixed(4));
      put("--a", a.toFixed(4));
      put("--t", t.toFixed(4));
      put("--h", h.toFixed(4));
      put("--fy", `${(Math.sin(s * 0.9) * 7 * a * idle).toFixed(2)}px`);
      put("--ry", `${(mouse.sx * 6 * a).toFixed(2)}deg`);
      put("--rx", `${(-mouse.sy * 4 * a).toFixed(2)}deg`);
      put("--sh", cl(a * 0.9 + 0.06 + mouse.sx * 0.12).toFixed(3));

      // os pontos acompanham a tela do celular; o cartão fica à direita do aparelho sem sair da tela
      const gap = Math.max(40, sr.width * 0.035);
      hot.forEach((el, k) => {
        const hk = cl(h * 1.7 - k * 0.32);
        el.style.setProperty("--hk", hk.toFixed(3));
        el.dataset.live = hk > 0.04 ? "1" : "0";
        const b = pts[k];
        if (!b) return;
        const x = b.left + b.width / 2 - sr.left;
        const y = b.top + b.height / 2 - sr.top;
        const card = cards[k];
        const room = sr.width - 20 - (card?.offsetWidth ?? 280) - x;
        const lead = Math.max(96, Math.min(pr.right - sr.left + gap - x, room));
        el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        el.style.setProperty("--lead", `${lead.toFixed(0)}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    }, { rootMargin: "200px 0px" });
    io.observe(pinEl);
    st.addEventListener("pointermove", onMove);
    st.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      st.removeEventListener("pointermove", onMove);
      st.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Esc ou toque fora fecha o detalhe aberto
  useEffect(() => {
    if (open === null) return;
    const close = () => {
      clicked.current = null;
      setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest(".mx-hs, .mx-dif-sheet")) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const toggle = (k: number) => {
    if (open === k && clicked.current === k) {
      clicked.current = null;
      setOpen(null);
    } else {
      clicked.current = k;
      setOpen(k);
    }
  };

  const cur = open === null ? null : SPOTS[open];

  return (
    <section id="diferenca" className="mx-dif" aria-label="A diferença FitMatch">
      <noscript>
        <style>{".mx-dif-stage{--a:1!important;--t:1!important;--h:1!important}.mx-dif-pin{height:auto!important}"}</style>
      </noscript>
      <div ref={pin} className="mx-dif-pin" style={{ "--len": 4.8 } as CSSProperties}>
        <div ref={stage} className="mx-dif-stage">
          <div className="mx-dif-copy">
            <h2 className="mx-cl-giant mx-dif-giant" aria-label="A diferença FitMatch">
              <span className="ln" aria-hidden="true"><span>Diferença</span></span>
            </h2>
            <div className="mx-dif-say" style={{ "--n": TEXT.split(" ").length } as CSSProperties}>
              <span className="lab mx-cl-mono mx-cl-br">O aplicativo</span>
              <p>
                {TEXT.split(" ").map((w, i) => (
                  <span key={i} className="mx-dif-w" style={{ "--i": i } as CSSProperties}>
                    {w}{" "}
                  </span>
                ))}
              </p>
            </div>
            <p className="mx-dif-hint mx-cl-mono"><i /> Explore os detalhes</p>
          </div>

          <div className="mx-dif-shadow" aria-hidden="true" />
          <div ref={ph} className="mx-dif-ph" aria-hidden="true">
            <Phone tone="green">
              <Glass anchors={ANCHORS}>
                <ScrMatch />
              </Glass>
            </Phone>
          </div>

          <div className="mx-hot">
            {SPOTS.map((s, k) => (
              <div
                key={s.n}
                ref={(el) => {
                  spots.current[k] = el;
                }}
                className="mx-hs"
                data-live="0"
                data-open={open === k ? "1" : "0"}
                style={{ "--i": k } as CSSProperties}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setOpen(k);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse" && clicked.current !== k) setOpen((o) => (o === k ? null : o));
                }}
              >
                <span className="reveal">
                  <span className="halo"><i /></span>
                  <span className="ping" />
                  <button
                    type="button"
                    className="dot"
                    aria-label={`${s.title}: ver detalhes`}
                    aria-expanded={open === k}
                    aria-controls={`mx-hs-${k}`}
                    onClick={() => toggle(k)}
                  >
                    <span className="mk"><span className="mk-in"><i /><i /></span></span>
                  </button>
                </span>
                <i className="lead" aria-hidden="true" />
                <div id={`mx-hs-${k}`} className="card" role="region" aria-label={s.title}>
                  <small>({s.n})</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-dif-sheet" data-has={cur ? "1" : "0"} aria-live="polite">
            {cur ? (
              <>
                <small>({cur.n})</small>
                <b>{cur.title}</b>
                <p>{cur.text}</p>
              </>
            ) : null}
          </div>

          <div className="mx-dif-cue" aria-hidden="true">
            Role para girar
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
