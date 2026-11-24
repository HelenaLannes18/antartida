"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { Clip } from "./clips";
import { Montage } from "./engine";
import { createMix, type Mix } from "./sound";

const PRE = ["O mundo é a nossa academia.", "Venha treinar com a gente."] as const;
const PRE_TOTAL = PRE[0].length + PRE[1].length;
const TITLE = ["Treine como", "você nunca", "imaginou"] as const;
const TICKS = 24;

// pré-loader: branco → cursor sozinho no centro → texto digitado → pausa com o texto inteiro → o branco se abre
const BLANK_MS = 160;
const LONE_MS = 340;
const HOLD_MS = 1000;

/** A n-ésima letra digitada (a partir de 1), contando as duas linhas em sequência. */
const typedChar = (n: number) => (n <= PRE[0].length ? PRE[0][n - 1] : PRE[1][n - PRE[0].length - 1]);

/** Quando cada letra aparece, em ms desde a primeira tecla: ritmo de quem digita sem pressa, com uma hesitação de vez em quando. */
function keySchedule() {
  const at: number[] = [];
  let t = 0;
  for (let n = 1; n <= PRE_TOTAL; n += 1) {
    t += 28 + Math.random() * 34;
    if (typedChar(n) === " ") t += 16;
    if (Math.random() < 0.1) t += 70 + Math.random() * 90;
    if (n === PRE[0].length + 1) t += 90; // respira antes da segunda linha
    at.push(t);
  }
  return at;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const reducedNow = () => window.matchMedia(REDUCED).matches;
const reducedOnServer = () => false;

const two = (n: number) => String(n).padStart(2, "0");

function Mark() {
  return (
    <svg viewBox="0 0 56 52" aria-hidden="true">
      <circle cx="20" cy="26" r="14" fill="none" stroke="#fff" strokeWidth="2.6" />
      <circle cx="36" cy="26" r="14" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M28 14.51 A14 14 0 0 1 28 37.49 A14 14 0 0 1 28 14.51Z" fill="#05caad" />
    </svg>
  );
}

/** Fita cassete: os carretéis giram quando a trilha está tocando. */
function Cassette() {
  // o <g> de fora só posiciona; o de dentro é o que gira (transform em CSS sobrescreveria o do atributo)
  const hub = (cx: number) => (
    <g transform={`translate(${cx} 47)`}>
      <g className="mv-hub">
        <circle r="8.5" fill="#f7f2e4" />
        <circle r="3.4" fill="#1d1a16" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d="M0 -3.4V-7" stroke="#1d1a16" strokeWidth="1.5" transform={`rotate(${a})`} />
        ))}
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 120 76" aria-hidden="true">
      <rect x="1.5" y="1.5" width="117" height="73" rx="7" fill="#e9e0cb" stroke="#1d1a16" strokeWidth="3" />
      <rect x="9" y="8" width="102" height="26" rx="3" fill="#f7f2e4" />
      <rect x="9" y="8" width="102" height="7" rx="3" fill="#05caad" />
      <text x="14" y="28" fontSize="7.4" fontFamily="ui-monospace,monospace" fontWeight="700" letterSpacing=".6" fill="#1d1a16">
        SQUADFIT MIX
      </text>
      <circle cx="99" cy="25" r="6.2" fill="#1d1a16" />
      <text x="99" y="27.6" fontSize="6.4" fontFamily="ui-monospace,monospace" fontWeight="700" textAnchor="middle" fill="#f7f2e4">
        90
      </text>
      <rect x="27" y="36" width="66" height="22" rx="11" fill="#1d1a16" />
      {hub(46)}
      {hub(74)}
      <path d="M22 75 L29 62 H91 L98 75Z" fill="#cdc2a8" stroke="#1d1a16" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="44" cy="69" r="2.2" fill="#1d1a16" />
      <circle cx="76" cy="69" r="2.2" fill="#1d1a16" />
      <circle cx="7" cy="7" r="1.8" fill="#1d1a16" />
      <circle cx="113" cy="7" r="1.8" fill="#1d1a16" />
      <circle cx="7" cy="69" r="1.8" fill="#1d1a16" />
      <circle cx="113" cy="69" r="1.8" fill="#1d1a16" />
    </svg>
  );
}

function Ruler({ side }: { side: "l" | "r" }) {
  return (
    <div className={`mv-ruler mv-ruler-${side}`} aria-hidden="true">
      <i className="mv-tick mv-tick-top" />
      {Array.from({ length: TICKS }, (_, k) => (
        <i key={k} className="mv-tick" style={{ "--i": k } as CSSProperties} />
      ))}
    </div>
  );
}

export default function Reel({ clips }: { clips: Clip[] }) {
  const reduced = useSyncExternalStore(subscribeReduced, reducedNow, reducedOnServer);
  const [typed, setTyped] = useState(-1); // -1: só o branco · 0: cursor sozinho · n: letras já digitadas
  const [held, setHeld] = useState(false); // o texto acabou e já deu tempo de ler
  const [ready, setReady] = useState(clips.length === 0); // o primeiro corte já pode tocar
  const [idx, setIdx] = useState(0); // corte que está na tela
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);

  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const montage = useRef<Montage | null>(null);
  const mix = useRef<Mix | null>(null);

  const live = held && ready;
  const playing = live && !paused;
  const waiting = held && !ready; // texto pronto, mas o primeiro corte ainda carrega: o cursor pisca para mostrar que está vivo
  const line1 = Math.min(Math.max(typed, 0), PRE[0].length);
  const line2 = Math.max(0, typed - PRE[0].length);
  const clip = clips[idx];

  /* ---------- pré-loader: um cursor aparece, o texto é digitado e o cursor fica parado no fim ---------- */
  useEffect(() => {
    const at = keySchedule();
    let id = window.setTimeout(() => {
      setTyped(0);
      id = window.setTimeout(() => {
        // o relógio manda, não a fila de timers: se a página engasgar, as letras atrasadas aparecem juntas
        const t0 = performance.now();
        let n = 0;
        const step = () => {
          const now = performance.now() - t0;
          while (n < PRE_TOTAL && at[n] <= now) n += 1;
          setTyped(n);
          if (n >= PRE_TOTAL) {
            id = window.setTimeout(() => setHeld(true), HOLD_MS);
            return;
          }
          id = window.setTimeout(step, Math.max(4, at[n] - now));
        };
        step();
      }, LONE_MS);
    }, BLANK_MS);
    return () => window.clearTimeout(id);
  }, []);

  /* ---------- montagem de vídeos: começa a carregar já no pré-loader ---------- */
  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b || !clips.length) return;
    const m = new Montage(clips, [a, b], setIdx);
    montage.current = m;
    let alive = true;
    void m.firstReady().then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
      m.destroy();
      montage.current = null;
    };
  }, [clips]);

  useEffect(() => {
    const m = montage.current;
    if (!m || !live) return;
    m.reveal();
    if (playing && !document.hidden) m.play();
    else m.pause();
  }, [live, playing]);

  /* ---------- aba em segundo plano: para o vídeo e o som ---------- */
  useEffect(() => {
    const onVisibility = () => {
      const m = montage.current;
      if (document.hidden) m?.pause();
      else if (playing) m?.play();
      mix.current?.setOn(sound && !document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing, sound]);

  /* ---------- trilha sonora (só depois de um clique) ---------- */
  useEffect(() => {
    return () => {
      mix.current?.close();
      mix.current = null;
    };
  }, []);

  const toggleSound = () => {
    const on = !sound;
    mix.current ??= createMix();
    mix.current.setOn(on);
    setSound(on);
  };

  // --p: quanto da montagem já passou (enche as réguas); --ticks: quantas marcas cada régua tem
  const rootStyle = { "--p": clips.length ? (idx + 1) / clips.length : 1, "--ticks": TICKS } as CSSProperties;

  return (
    <div className={`mv${live ? " is-live" : ""}`} style={rootStyle}>
      <noscript>
        <style>{".mv-pre{display:none!important}"}</style>
      </noscript>

      <div className="mv-reel" aria-hidden="true">
        <video ref={videoA} className="mv-vid" muted playsInline preload="auto" disablePictureInPicture />
        <video ref={videoB} className="mv-vid" muted playsInline preload="auto" disablePictureInPicture />
      </div>
      <div className="mv-shade" aria-hidden="true" />

      <div className="mv-stage" inert={!live}>
        <header className="mv-top">
          <Link className="mv-logo" href="/" aria-label="SquadFit — início">
            <Mark />
            <b>SquadFit</b>
          </Link>
          <nav className="mv-nav" aria-label="Principal">
            <Link href="/esportes">Esportes</Link>
            <a href="#comecar">Avise-me</a>
          </nav>
        </header>

        <Ruler side="l" />
        <Ruler side="r" />

        <div className="mv-hero">
          <h1 className="mv-title">
            {TITLE.map((text) => (
              <span className="mv-line" key={text}>
                {text}
              </span>
            ))}
          </h1>
          {clip ? (
            <p className="mv-cap" key={clip.id} aria-hidden="true">
              <span>{clip.label}</span>
              <span>
                {two(idx + 1)} / {two(clips.length)}
              </span>
            </p>
          ) : null}
        </div>

        <p className="mv-tagline">Trilhas, ondas, neve, pista e ferro.</p>

        {reduced ? (
          <button type="button" className="mv-play" onClick={() => setPaused((p) => !p)}>
            [{paused ? "Reproduzir" : "Pausar"}]
          </button>
        ) : null}

        <button type="button" className={`mv-tape${sound ? " is-on" : ""}`} aria-pressed={sound} aria-label="Trilha sonora" onClick={toggleSound}>
          <span className="mv-tape-tip" aria-hidden="true">
            {sound ? "Som ligado" : "Som desligado"}
          </span>
          <Cassette />
        </button>
      </div>

      <div className="mv-pre" role="status" aria-label={`${PRE[0]} ${PRE[1]}`}>
        {typed === 0 ? (
          <i className="mv-cur mv-cur-lone" aria-hidden="true" />
        ) : typed > 0 ? (
          <p aria-hidden="true">
            {PRE.map((text, li) => {
              const n = li === 0 ? line1 : line2;
              const hasCursor = li === (typed <= PRE[0].length ? 0 : 1);
              return (
                <span className="mv-pre-line" key={text}>
                  {text.slice(0, n)}
                  {hasCursor ? <i className={`mv-cur${waiting ? " is-wait" : ""}`} /> : null}
                  <span className="mv-pre-rest">{text.slice(n)}</span>
                </span>
              );
            })}
          </p>
        ) : null}
      </div>
    </div>
  );
}
