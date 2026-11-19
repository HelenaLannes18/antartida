"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useScene } from "./useScene";

/** Cada linha: o nome em duas partes (a foto entra no meio), o vídeo do fundo e a foto pequena. */
const ROWS = [
  { id: "trilha", a: "Trilha", b: "na mata", video: "/media/movimento/trilha.mp4", poster: "/media/movimento/trilha.jpg", pos: "52% 70%" },
  { id: "surfe", a: "Surfe", b: "na maré", video: "/media/esportes/surfe.mp4", poster: "/media/esportes/surfe.jpg", pos: "36% 62%" },
  { id: "corrida", a: "Corrida", b: "de pista", video: "/media/esportes/corrida.mp4", poster: "/media/esportes/corrida.jpg", pos: "42% 24%" },
  { id: "dupla", a: "Treino", b: "em dupla", video: "/media/movimento/academia-agachamento.mp4", poster: "/media/movimento/academia-agachamento.jpg", pos: "36% 36%" },
  { id: "pedal", a: "Pedal", b: "na serra", video: "/media/esportes/ciclismo.mp4", poster: "/media/esportes/ciclismo.jpg", pos: "56% 56%" },
  { id: "paddle", a: "Paddle", b: "no lago", video: "/media/movimento/paddle.mp4", poster: "/media/movimento/paddle.jpg", pos: "58% 62%" },
  { id: "esqui", a: "Esqui", b: "na neve", video: "/media/esportes/esqui.mp4", poster: "/media/esportes/esqui.jpg", pos: "48% 46%" },
  { id: "cume", a: "Subida", b: "ao cume", video: "/media/movimento/montanha.mp4", poster: "/media/movimento/montanha.jpg", pos: "33% 40%" },
  { id: "cordas", a: "Força", b: "com cordas", video: "/media/movimento/academia-cordas.mp4", poster: "/media/movimento/academia-cordas.jpg", pos: "78% 56%" },
];

/**
 * Índice de modalidades em letras gigantes: a lista sobe com a rolagem (as pontas esmaecem); ao passar o mouse numa linha
 * o nome fica vermelho, uma foto pequena entra no meio dele e o fundo todo vira o vídeo daquela modalidade.
 * Em telas de toque (sem mouse) vale a linha que está no meio da tela.
 */
export default function Modalidades() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [armed, setArmed] = useState<number[]>([]); // vídeos já pedidos (só baixam depois do primeiro uso)
  const cur = useRef<number | null>(null);
  const s = useRef({ y: -1, inside: false, vis: false, coarse: false, focus: null as number | null });
  useScene(pin, 1);

  useEffect(() => {
    const st = stage.current!;
    const m = s.current;
    m.coarse = window.matchMedia("(hover: none)").matches;
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!m.vis) return;
      let found: number | null = null;
      if (m.focus !== null) found = m.focus;
      else if (m.coarse) {
        const mid = (window.innerHeight || 800) * 0.5;
        let best = Infinity;
        rows.current.forEach((el, k) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < best) {
            best = d;
            found = k;
          }
        });
      } else if (m.inside) {
        rows.current.forEach((el, k) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (m.y >= r.top && m.y < r.bottom) found = k;
        });
      }
      if (found !== cur.current) {
        cur.current = found;
        setActive(found);
        if (found !== null) setArmed((a) => (a.includes(found as number) ? a : [...a, found as number]));
      }
    };
    const onMove = (e: PointerEvent) => {
      m.y = e.clientY;
      m.inside = true;
    };
    const onLeave = () => {
      m.inside = false;
    };
    const io = new IntersectionObserver(([en]) => {
      m.vis = en.isIntersecting;
    }, { threshold: 0.1 });
    io.observe(st);
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

  // só o vídeo da linha ativa toca
  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return;
      if (k === active) void v.play().catch(() => {});
      else v.pause();
    });
  }, [active, armed]);

  return (
    <section id="modalidades" className="mx-ml" aria-label="Modalidades">
      <div ref={pin} className="mx-ml-pin" style={{ "--n": ROWS.length } as CSSProperties}>
        <div ref={stage} className="mx-ml-stage" data-active={active ?? -1}>
          <div className="mx-ml-bg" aria-hidden="true">
            {ROWS.map((r, k) => (
              <div key={r.id} className="layer" data-on={active === k ? "1" : "0"} style={armed.includes(k) ? { backgroundImage: `url(${r.poster})` } : undefined}>
                {armed.includes(k) ? (
                  <video
                    ref={(el) => {
                      vids.current[k] = el;
                    }}
                    src={r.video}
                    poster={r.poster}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                  />
                ) : null}
              </div>
            ))}
            <i className="shade" />
          </div>

          <div className="mx-ml-view">
            <ul className="mx-ml-list">
              {ROWS.map((r, k) => (
                <li
                  key={r.id}
                  ref={(el) => {
                    rows.current[k] = el;
                  }}
                  className="row"
                  data-on={active === k ? "1" : "0"}
                >
                  <Link
                    href="/esportes"
                    className="link"
                    onFocus={() => {
                      s.current.focus = k;
                    }}
                    onBlur={() => {
                      s.current.focus = null;
                    }}
                  >
                    <span className="w a">{r.a}</span>
                    <i className="thumb" style={{ backgroundImage: `url(${r.poster})`, backgroundPosition: r.pos }} aria-hidden="true" />
                    <span className="w b">{r.b}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-ml-cap" aria-hidden="true">
            <span className="tl">[ Modalidades ]</span>
            <span className="tr">{String(ROWS.length).padStart(2, "0")}</span>
            <span className="bl">Passe o mouse num nome</span>
          </div>
        </div>
      </div>
    </section>
  );
}
