import type { Clip } from "./clips";

type Slot = 0 | 1;

const FADE_MS = 160; // o corte anterior fica por baixo enquanto o novo aparece
const WAIT_NEXT_MS = 2400; // quanto esperar um corte que ainda não carregou
const RETRY_MS = 700;

/**
 * Montagem com dois <video> que se alternam: um está na tela enquanto o outro já carrega o
 * próximo corte, então só há dois vídeos decodificando por vez. O estado visual de cada slot
 * fica em `data-state` ("on" | "out" | ""), que o CSS lê — o React não mexe nesse atributo.
 */
export class Montage {
  private front: Slot = 0;
  private cur = 0;
  private timer = 0;
  private running = false;
  private busy = false;
  private gone = false;

  constructor(
    private clips: Clip[],
    private slots: [HTMLVideoElement, HTMLVideoElement],
    private onCut: (index: number) => void,
  ) {
    this.load(0, 0);
    if (clips.length > 1) this.load(1, 1);
  }

  /** Resolve quando o primeiro corte pode tocar (ou depois de `ms`, para não prender a página). */
  firstReady(ms = 6000) {
    return this.until(this.slots[0], ms);
  }

  /** Põe o primeiro corte na tela, parado. */
  reveal() {
    this.slots[this.front].dataset.state = "on";
  }

  /** Começa a tocar e a cortar de um para o outro. */
  play() {
    if (this.running || this.gone) return;
    this.running = true;
    this.reveal();
    this.start(this.slots[this.front]);
    this.schedule(this.clips[this.cur].len * 1000);
  }

  pause() {
    this.running = false;
    window.clearTimeout(this.timer);
    this.slots.forEach((v) => v.pause());
  }

  destroy() {
    this.gone = true;
    this.running = false;
    window.clearTimeout(this.timer);
    for (const v of this.slots) {
      v.pause();
      v.removeAttribute("src");
      v.load(); // cancela o download em andamento
      delete v.dataset.state;
      delete v.dataset.clip;
    }
  }

  private load(slot: Slot, index: number) {
    const v = this.slots[slot];
    const c = this.clips[index];
    v.dataset.clip = String(index);
    v.poster = c.poster ?? "";
    v.src = `${c.src}#t=${c.start}`; // o #t= faz o vídeo já abrir no trecho escolhido
    v.load();
  }

  private start(v: HTMLVideoElement) {
    v.play().catch(() => {}); // sem permissão para tocar, a capa continua na tela
  }

  private until(v: HTMLVideoElement, ms: number) {
    return new Promise<boolean>((resolve) => {
      if (v.readyState >= 3) return resolve(true);
      const done = (ok: boolean) => {
        window.clearTimeout(t);
        v.removeEventListener("canplay", yes);
        v.removeEventListener("error", no);
        resolve(ok);
      };
      const yes = () => done(true);
      const no = () => done(false);
      const t = window.setTimeout(() => done(false), ms);
      v.addEventListener("canplay", yes);
      v.addEventListener("error", no);
    });
  }

  private schedule(ms: number) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => void this.next(), ms);
  }

  private async next() {
    if (this.gone || !this.running || this.busy) return;
    const n = this.clips.length;
    if (n < 2) {
      // um clipe só: volta ao começo do trecho
      const v = this.slots[this.front];
      v.currentTime = this.clips[0].start;
      this.start(v);
      this.schedule(this.clips[0].len * 1000);
      return;
    }

    const slot: Slot = this.front === 0 ? 1 : 0;
    const incoming = this.slots[slot];
    this.busy = true;
    const ok = await this.until(incoming, WAIT_NEXT_MS);
    this.busy = false;
    if (this.gone || !this.running) return;
    if (!ok) {
      this.schedule(RETRY_MS); // o próximo ainda não chegou: o atual segura e tentamos de novo
      return;
    }

    const prev = this.front;
    this.front = slot;
    this.cur = (this.cur + 1) % n;
    this.slots[prev].dataset.state = "out";
    incoming.dataset.state = "on";
    this.start(incoming);
    this.onCut(this.cur);

    // depois do fade, o slot que saiu para e já carrega o corte seguinte
    window.setTimeout(() => {
      if (this.gone) return;
      const old = this.slots[prev];
      old.pause();
      old.dataset.state = "";
      this.load(prev, (this.cur + 1) % n);
    }, FADE_MS + 60);

    this.schedule(this.clips[this.cur].len * 1000);
  }
}
