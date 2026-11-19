/**
 * Trilha sonora gerada na hora com Web Audio (nenhum arquivo de áudio): um pad suave,
 * um pulso de coração e um arpejo com eco, em Lá menor. Só é criada depois de um clique.
 */

const BPM = 92;
const STEP = 60 / BPM / 2; // uma colcheia
const STEPS_PER_CHORD = 16; // dois compassos
const LEVEL = 0.34;

// Am7 · Fmaj7 · C · G — a nota grave e as quatro do acorde, em números MIDI
const CHORDS = [
  { bass: 45, notes: [57, 60, 64, 67] },
  { bass: 41, notes: [53, 57, 60, 64] },
  { bass: 48, notes: [55, 60, 64, 67] },
  { bass: 43, notes: [55, 59, 62, 66] },
];
const ARP = [0, 1, 2, 3, 2, 1, 3, 2];

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

export type Mix = {
  setOn: (on: boolean) => void;
  close: () => void;
};

export function createMix(): Mix {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // eco do arpejo: três colcheias, com o agudo se apagando a cada volta
  const echo = ctx.createDelay(1);
  echo.delayTime.value = STEP * 3;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.34;
  const damp = ctx.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 2200;
  echo.connect(damp);
  damp.connect(feedback);
  feedback.connect(echo);
  damp.connect(master);

  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const samples = noise.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;

  const pad = (chord: (typeof CHORDS)[number], t: number, dur: number) => {
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1100;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.03, t + 1.6);
    g.gain.setValueAtTime(0.03, t + dur);
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 1.8);
    lp.connect(g);
    g.connect(master);
    for (const note of chord.notes) {
      for (const detune of [-5, 5]) {
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.value = hz(note);
        o.detune.value = detune;
        o.connect(lp);
        o.start(t);
        o.stop(t + dur + 2);
      }
    }
    const sub = ctx.createOscillator();
    const sg = ctx.createGain();
    sub.type = "sine";
    sub.frequency.value = hz(chord.bass);
    sg.gain.setValueAtTime(0.0001, t);
    sg.gain.linearRampToValueAtTime(0.16, t + 0.9);
    sg.gain.setValueAtTime(0.16, t + dur);
    sg.gain.linearRampToValueAtTime(0.0001, t + dur + 1.2);
    sub.connect(sg);
    sg.connect(master);
    sub.start(t);
    sub.stop(t + dur + 1.4);
  };

  const kick = (t: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(44, t + 0.12);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.4);
  };

  const hat = (t: number) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.045, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    s.connect(hp);
    hp.connect(g);
    g.connect(master);
    s.start(t);
    s.stop(t + 0.08);
  };

  const pluck = (note: number, t: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = hz(note + 12);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g);
    g.connect(master);
    g.connect(echo);
    o.start(t);
    o.stop(t + 0.55);
  };

  const play = (step: number, t: number) => {
    const chord = CHORDS[Math.floor(step / STEPS_PER_CHORD) % CHORDS.length];
    const inChord = step % STEPS_PER_CHORD;
    if (inChord === 0) pad(chord, t, STEPS_PER_CHORD * STEP);
    if (step % 2 === 0) kick(t);
    else hat(t);
    pluck(chord.notes[ARP[step % ARP.length]], t);
  };

  // agenda alguns passos à frente do relógio do áudio; com o contexto suspenso o relógio para
  let step = 0;
  let next = ctx.currentTime + 0.12;
  const clock = window.setInterval(() => {
    while (next < ctx.currentTime + 0.4) {
      play(step++, next);
      next += STEP;
    }
  }, 100);

  let wanted = false;
  return {
    setOn(on) {
      wanted = on;
      if (on) {
        void ctx.resume();
        master.gain.setTargetAtTime(LEVEL, ctx.currentTime, 0.5);
      } else {
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
        window.setTimeout(() => {
          if (!wanted) void ctx.suspend();
        }, 1200);
      }
    },
    close() {
      window.clearInterval(clock);
      void ctx.close();
    },
  };
}
