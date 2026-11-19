"use client";

import { useEffect, useRef, useState } from "react";

/** Segundos que cada esporte fica na tela antes de passar para o próximo. */
const DUR = 7;

const LABELS = ["Grupo", "Duração", "Nível", "Alcance", "Horário", "Locais"];

const SPORTS = [
  {
    id: "montanha",
    name: "Montanha",
    photo: "/media/movimento/montanha.jpg",
    pos: "34% 50%",
    text: "Cumes, travessias e acampamentos com gente que sobe no seu ritmo. Combine o ponto de encontro, divida o transporte e volte com uma boa história.",
    spec: ["2–6", "4–8 h", "Todos", "8–25 km", "Madrugada", "210"],
    tags: ["Cume", "Travessia", "Acampamento", "Altitude"],
  },
  {
    id: "ciclismo",
    name: "Ciclismo",
    photo: "/media/esportes/ciclismo.jpg",
    pos: "50% 55%",
    text: "Pedal de estrada, trilha ou cidade com quem mantém a sua cadência. Escolha a rota, o ritmo do grupo e a hora da saída.",
    spec: ["2–12", "1–4 h", "Todos", "30–120 km", "Manhã", "480"],
    tags: ["Estrada", "Mountain bike", "Urbano", "Gravel"],
  },
  {
    id: "esqui",
    name: "Esqui",
    photo: "/media/esportes/esqui.jpg",
    pos: "50% 50%",
    text: "Neve fresca, pistas e travessias com parceiros do mesmo nível. Saiba quem vai, onde a turma se encontra e como estão as condições do dia.",
    spec: ["2–8", "3–6 h", "Todos", "Pistas e off", "Dia todo", "60"],
    tags: ["Pista", "Off-piste", "Snowboard", "Travessia"],
  },
  {
    id: "funcional",
    name: "Funcional",
    photo: "/media/movimento/academia-cordas.jpg",
    pos: "62% 50%",
    text: "Cordas, séries e treino em dupla com quem tem o mesmo horário. Quem divide a carga divide também a constância.",
    spec: ["2–4", "1 h", "Todos", "Bairro", "Noite", "85"],
    tags: ["Força", "Cordas", "Cross", "Dupla"],
  },
];

/**
 * Palavra gigante, abas de esporte e, embaixo, texto, tabela de dados, foto e etiquetas.
 * A troca é automática (pausa com o mouse, o foco ou o botão) e também dá para clicar.
 */
export default function ClEsportes() {
  const sec = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const playRef = useRef(true);
  const hold = useRef(false);
  const prog = useRef(0);
  const visible = useRef(false);

  useEffect(() => {
    const s = sec.current!;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!visible.current) return;
      if (playRef.current && !hold.current) {
        prog.current += dt / DUR;
        if (prog.current >= 1) {
          prog.current = 0;
          setI((v) => (v + 1) % SPORTS.length);
        }
      }
      s.style.setProperty("--k", prog.current.toFixed(4));
    };
    const io = new IntersectionObserver(([en]) => {
      visible.current = en.isIntersecting;
    }, { threshold: 0.2 });
    io.observe(s);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const pick = (k: number) => {
    prog.current = 0;
    setI(k);
  };
  const toggle = () => {
    playRef.current = !playRef.current;
    setPlaying(playRef.current);
  };
  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="esportes-mais"
      ref={sec}
      className="mx-cl-sec mx-cl-esp"
      aria-label="Esportes"
      onPointerEnter={() => {
        hold.current = true;
      }}
      onPointerLeave={() => {
        hold.current = false;
      }}
      onFocusCapture={() => {
        hold.current = true;
      }}
      onBlurCapture={() => {
        hold.current = false;
      }}
    >
      <i className="mx-cl-idx">2</i>
      <h2 className="mx-cl-giant">Esportes</h2>

      <ul className="mx-cl-tabs" role="tablist" aria-label="Esportes">
        {SPORTS.map((s, k) => (
          <li key={s.id}>
            <button
              type="button"
              role="tab"
              id={`mx-cl-tab-${s.id}`}
              aria-selected={i === k}
              aria-controls={`mx-cl-panel-${s.id}`}
              className="mx-cl-tab"
              onClick={() => pick(k)}
            >
              {s.name}
              <i className="bar" aria-hidden="true" />
            </button>
          </li>
        ))}
        <li className="grow" aria-hidden="true" />
        <li>
          <button type="button" className="mx-cl-play mx-cl-mono" onClick={toggle}>
            {playing ? "Pausar" : "Reproduzir"}
          </button>
        </li>
      </ul>

      <div className="mx-cl-esp-grid">
        <div className="mx-cl-stack mx-cl-esp-left">
          {SPORTS.map((s, k) => (
            <div key={s.id} id={`mx-cl-panel-${s.id}`} role="tabpanel" aria-labelledby={`mx-cl-tab-${s.id}`} data-on={i === k ? "1" : "0"} hidden={false}>
              <p className="lead">{s.text}</p>
              <div className="mx-cl-spec">
                {LABELS.map((l, n) => (
                  <div key={l}>
                    <small>{l}</small>
                    <b>{s.spec[n]}</b>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-cl-esp-right">
          <div className="mx-cl-esp-photo" aria-hidden="true">
            {SPORTS.map((s, k) => (
              <i key={s.id} className="ph" data-on={i === k ? "1" : "0"} style={{ backgroundImage: `url(${s.photo})`, backgroundPosition: s.pos }} />
            ))}
            <span className="cap l mx-cl-mono mx-cl-br">{SPORTS[i].name}</span>
            <span className="cap r mx-cl-mono mx-cl-br">{two(i + 1)} / {two(SPORTS.length)}</span>
          </div>
          <div className="mx-cl-stack mx-cl-tags">
            {SPORTS.map((s, k) => (
              <div key={s.id} data-on={i === k ? "1" : "0"}>
                {s.tags.map((t) => (
                  <span key={t} className="mx-cl-mono">{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
