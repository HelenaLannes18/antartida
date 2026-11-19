"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, StageCtx, clamp } from "./stage";
import { SCENES } from "./scenes";
import type { MediaMap } from "./media";

const SCENE_SECONDS = 9; // duração de cada cena em velocidade normal
const UNITS_PER_SEC = 5; // distância de mundo por segundo (só para as cenas desenhadas)
const SPEED_IDLE = 0.16;
const SPEED_BASE = 1;
const SPEED_HOLD = 3.4;
const RATE_IDLE = 0.85; // velocidade do vídeo enquanto está apagado
const RATE_HOLD = 2.4; // velocidade do vídeo ao segurar
const BLINK_CLOSE_MS = 520;
const BLINK_OPEN_MS = 760;

type Bubble = { text: string | null };
type Audio = { ctx: AudioContext; gain: GainNode; filter: BiquadFilterNode };

/** Vento contínuo (ruído marrom filtrado) — o volume e o timbre seguem a velocidade. */
function createWind(): Audio {
  const ctx = new AudioContext();
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 420;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start();
  return { ctx, gain, filter };
}

function Mark() {
  return (
    <svg viewBox="0 0 56 52" aria-hidden="true">
      <circle cx="20" cy="26" r="14" fill="none" stroke="#fff" strokeWidth="2.6" />
      <circle cx="36" cy="26" r="14" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M28 14.51 A14 14 0 0 1 28 37.49 A14 14 0 0 1 28 14.51Z" fill="#05caad" />
    </svg>
  );
}

export default function Hero({ media }: { media: MediaMap }) {
  const [phase, setPhase] = useState<"intro" | "play">("intro");
  const [scene, setScene] = useState(0);
  const [blink, setBlink] = useState<"" | "closing" | "opening">("");
  const [chat, setChat] = useState<Bubble[]>([]);
  const [held, setHeld] = useState(false);
  const [hinted, setHinted] = useState<Record<number, boolean>>({});
  const [night, setNight] = useState(false);
  const [muted, setMuted] = useState(true);
  const [broken, setBroken] = useState<Record<string, boolean>>({}); // vídeos que não carregaram

  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<Audio | null>(null);
  const timers = useRef<number[]>([]);

  // estado mutável do laço (fora do React para não re-renderizar a cada frame)
  const st = useRef({
    phase: "intro" as "intro" | "play",
    scene: 0,
    speed: SPEED_IDLE,
    travel: 0,
    time: 0,
    prog: 0,
    hold: false,
    blinking: false,
    muted: true,
    mx: 0,
    my: 0,
    tmx: 0,
    tmy: 0,
  });

  const [stage] = useState(() => new Stage());

  /* ---------- troca de cena com a "piscada" ---------- */
  const go = useCallback((to: number) => {
    const s = st.current;
    const n = SCENES.length;
    const target = ((to % n) + n) % n;
    if (s.blinking || target === s.scene) return;
    s.blinking = true;
    const swap = () => {
      s.scene = target;
      s.prog = 0;
      lineRef.current?.style.setProperty("--p", (target / n).toFixed(4));
      setScene(target);
      setChat([]);
    };
    setBlink("closing");
    timers.current.push(
      window.setTimeout(() => {
        swap();
        setBlink("opening");
      }, BLINK_CLOSE_MS),
      window.setTimeout(() => {
        s.blinking = false;
        setBlink("");
      }, BLINK_CLOSE_MS + BLINK_OPEN_MS),
    );
  }, []);
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  }, [go]);

  const start = useCallback(() => {
    if (st.current.phase === "play") return;
    st.current.phase = "play";
    setPhase("play");
    void videoRef.current?.play(); // com "reduzir movimento" o vídeo só toca depois do clique
  }, []);

  const press = useCallback(() => {
    const s = st.current;
    if (s.phase !== "play" || s.hold) return;
    s.hold = true;
    setHeld(true);
    setHinted((h) => (h[s.scene] ? h : { ...h, [s.scene]: true }));
  }, []);
  const release = useCallback(() => {
    if (!st.current.hold) return;
    st.current.hold = false;
    setHeld(false);
  }, []);

  const toggleSound = useCallback(() => {
    const s = st.current;
    s.muted = !s.muted;
    setMuted(s.muted);
    if (!s.muted) {
      audioRef.current ??= createWind();
      void audioRef.current.ctx.resume();
    }
  }, []);

  /* ---------- laço principal ---------- */
  useEffect(() => {
    const s = st.current;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let prev = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const playing = s.phase === "play";
      const target = !playing ? SPEED_IDLE : s.hold ? SPEED_HOLD : SPEED_BASE;
      s.speed += (target - s.speed) * (1 - Math.exp(-dt * (target > s.speed ? 3.4 : 2.1)));
      s.travel += s.speed * UNITS_PER_SEC * dt;
      s.time += dt;

      const hold = clamp((s.speed - SPEED_BASE) / (SPEED_HOLD - SPEED_BASE));
      s.mx += (s.tmx - s.mx) * (1 - Math.exp(-dt * 4));
      s.my += (s.tmy - s.my) * (1 - Math.exp(-dt * 4));
      root.style.setProperty("--hold", hold.toFixed(3));
      root.style.setProperty("--mx", s.mx.toFixed(3));
      root.style.setProperty("--my", s.my.toFixed(3));

      stage.emit({ travel: s.travel, speed: s.speed, time: s.time });

      // o vídeo acelera junto com o "segure"
      const v = videoRef.current;
      if (v) {
        const rate = playing ? 1 + hold * (RATE_HOLD - 1) : RATE_IDLE;
        if (Math.abs(v.playbackRate - rate) > 0.02) v.playbackRate = rate;
      }

      if (playing && !s.blinking) {
        const rate = 1 + hold * (RATE_HOLD - 1);
        s.prog += (dt * rate) / SCENE_SECONDS;
        lineRef.current?.style.setProperty("--p", ((s.scene + clamp(s.prog)) / SCENES.length).toFixed(4));
        if (s.prog >= 1) goRef.current(s.scene + 1);
      }

      const a = audioRef.current;
      if (a) {
        const t = a.ctx.currentTime;
        a.gain.gain.setTargetAtTime(s.muted || !playing ? 0 : 0.05 + 0.2 * hold, t, 0.2);
        a.filter.frequency.setTargetAtTime(380 + 1500 * hold, t, 0.2);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      pending.forEach((id) => window.clearTimeout(id));
      void audioRef.current?.ctx.close();
      audioRef.current = null;
    };
  }, [stage]);

  /* ---------- teclado, mouse e toque ---------- */
  useEffect(() => {
    const isCtl = (t: EventTarget | null) => t instanceof Element && !!t.closest("button,a");
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goRef.current(st.current.scene + 1);
      else if (e.key === "ArrowLeft") goRef.current(st.current.scene - 1);
      else if ((e.key === " " || e.key === "Enter") && !isCtl(e.target)) {
        e.preventDefault();
        if (st.current.phase === "intro") start();
        else if (!e.repeat) press();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === " " && !isCtl(e.target)) release();
    };
    const move = (e: PointerEvent) => {
      st.current.tmx = (e.clientX / window.innerWidth) * 2 - 1;
      st.current.tmy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, [press, release, start]);

  /* ---------- balões de chat ---------- */
  useEffect(() => {
    const msgs = SCENES[scene].chat;
    const ids: number[] = [];
    const at = (ms: number, fn: () => void) => ids.push(window.setTimeout(fn, ms));
    const typing = () => setChat((c) => (c.length && c[c.length - 1].text === null ? c : [...c, { text: null }]));
    const say = (text: string) =>
      setChat((c) => (c.length && c[c.length - 1].text === null ? [...c.slice(0, -1), { text }] : [...c, { text }]));
    if (phase === "intro") {
      at(900, typing);
    } else {
      msgs.forEach((m, i) => {
        at(700 + i * 2300, typing);
        at(1800 + i * 2300, () => say(m));
      });
    }
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [scene, phase]);

  const cur = SCENES[scene];
  const m = media[cur.id];
  const video = m?.video && !broken[cur.id] ? m.video : null;
  const photo = !video ? (m?.image ?? null) : null;
  const rootClass = ["es", phase === "intro" ? "is-intro" : "is-play", blink && `is-${blink}`, night && "es-night", held && "is-hold"]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={rootClass}
      onPointerDown={(e) => {
        if ((e.target as Element).closest("button,a")) return;
        if (st.current.phase === "intro") start();
        else press();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {video ? (
        <div className="es-media" aria-hidden="true">
          <video
            key={cur.id}
            ref={(el) => {
              videoRef.current = el;
              // quem pede menos movimento não recebe vídeo tocando sozinho antes de interagir
              if (el && st.current.phase === "intro" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.pause();
            }}
            className="es-video"
            src={video}
            poster={m?.image ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setBroken((b) => ({ ...b, [cur.id]: true }))}
          />
        </div>
      ) : photo ? (
        <div className="es-media" aria-hidden="true">
          <div key={cur.id} className="es-photo" style={{ backgroundImage: `url(${photo})` }} />
        </div>
      ) : (
        <StageCtx.Provider value={stage}>
          <div className="es-art" aria-hidden="true">
            <cur.Art key={cur.id} />
          </div>
        </StageCtx.Provider>
      )}

      <div className="es-layer es-grade" />
      <div className="es-layer es-night-ov" />
      <div className="es-layer es-streaks" />
      <div className="es-layer es-vig" />
      <div className="es-layer es-grain" />
      <div className="es-layer es-dim" />
      <div className="es-lid es-lid-t" />
      <div className="es-lid es-lid-b" />

      <header className="es-nav">
        <div className="es-ticks" role="tablist" aria-label="Esportes">
          {SCENES.map((s, i) => (
            <button key={s.id} className="es-tick" role="tab" aria-selected={i === scene} aria-label={s.label} onClick={() => go(i)}>
              <i />
            </button>
          ))}
        </div>
        <nav className="es-links" aria-label="Principal">
          <span className="es-cur" aria-live="polite">
            {cur.label}
          </span>
          <a href="#parceiros">Parceiros</a>
          <a href="#treinos">Treinos</a>
          <a href="#comecar">Criar perfil</a>
        </nav>
      </header>

      <div className="es-copy">
        <h1 className="es-title">
          <span>Seu</span>
          <span>Ritmo</span>
        </h1>
        <p className="es-tag">
          Sem pressa. Tem um esporte
          <br />
          esperando por você.
        </p>
      </div>

      {phase === "play" && !hinted[scene] && !blink ? (
        <div key={cur.id} className="es-chip" aria-hidden="true">
          <svg viewBox="0 0 12 14" width="9" height="11">
            <path d="M1 1l9 5.5-4 1.2L4.6 12z" fill="#fff" />
          </svg>
          {cur.chip}
        </div>
      ) : null}

      <div className="es-chat" aria-live="polite">
        {chat.map((b, i) =>
          b.text === null ? (
            <div key={`${i}-t`} className="es-bub typing" aria-label="digitando">
              <i />
              <i />
              <i />
            </div>
          ) : (
            <div key={`${i}-m`} className="es-bub">
              {b.text}
            </div>
          ),
        )}
      </div>

      <button className="es-play" onClick={start} aria-label="Começar">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6 3.5v17l14-8.5z" fill="#fff" />
        </svg>
      </button>

      <footer className="es-bar">
        <a className="es-logo" href="#" aria-label="FitMatch">
          <Mark />
          <b>FitMatch</b>
        </a>
        <div ref={lineRef} className="es-line" aria-hidden="true">
          <i />
          {SCENES.slice(1).map((s, i) => (
            <u key={s.id} style={{ left: `${((i + 1) / SCENES.length) * 100}%` }} />
          ))}
        </div>
        <button className="es-ic" onClick={toggleSound} aria-label={muted ? "Ligar o som" : "Desligar o som"} aria-pressed={!muted}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
            {muted ? <path d="M16 9.5l5 5M21 9.5l-5 5" /> : <path d="M16 9a4.2 4.2 0 0 1 0 6M18.6 6.6a8 8 0 0 1 0 10.8" />}
          </svg>
        </button>
        <button className="es-ic" onClick={() => setNight((n) => !n)} aria-label={night ? "Modo dia" : "Modo noite"} aria-pressed={night}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {night ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
              </>
            ) : (
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            )}
          </svg>
        </button>
      </footer>
    </div>
  );
}
