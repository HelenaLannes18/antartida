"use client";

import { useRef, type CSSProperties } from "react";
import { useScene } from "./useScene";

const STEPS = [
  {
    name: "Raio",
    stat: "25 km",
    text: "Encontre parceiros num raio de até 25 km, com filtro por esporte, nível e horário.",
    photo: "/media/movimento/trilha.jpg",
    pos: "52% 60%",
    chip: "Raio de busca",
  },
  {
    name: "Resposta",
    stat: "4 min",
    text: "É o tempo médio até o primeiro match depois de criar o perfil. Menos espera, mais treino.",
    photo: "/media/esportes/surfe.jpg",
    pos: "40% 62%",
    chip: "Primeiro match",
  },
  {
    name: "Constância",
    stat: "3×",
    text: "Quem treina em dupla mantém a rotina três vezes mais do que quem treina sozinho.",
    photo: "/media/movimento/paddle.jpg",
    pos: "50% 58%",
    chip: "Rotina em dupla",
  },
];

/** Palavra gigante fixa no alto e, embaixo, lista, foto e número que mudam de passo com a rolagem. */
export default function ClNumeros() {
  const pin = useRef<HTMLDivElement>(null);
  const { step, go } = useScene(pin, STEPS.length);

  return (
    <section id="numeros" className="mx-cl-num" aria-label="Números">
      <div ref={pin} className="mx-cl-npin" style={{ "--len": 3.6 } as CSSProperties}>
        <div className="mx-cl-nstage" data-step={step}>
          <i className="mx-cl-idx">3</i>
          <h2 className="mx-cl-giant">Números</h2>

          <div className="mx-cl-ngrid">
            <div className="col list">
              <ul>
                {STEPS.map((s, k) => (
                  <li key={s.name}>
                    <button type="button" aria-current={step === k} onClick={() => go(k)}>
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
              <span className="mx-cl-mono mx-cl-br">Dados</span>
            </div>

            <div className="col panel" aria-hidden="true">
              {STEPS.map((s, k) => (
                <i key={s.name} className="ph" data-on={step === k ? "1" : "0"} style={{ backgroundImage: `url(${s.photo})`, backgroundPosition: s.pos }} />
              ))}
              <span className="chip mx-cl-mono mx-cl-br">{STEPS[step].chip}</span>
            </div>

            <div className="col stat">
              <div className="mx-cl-stack">
                {STEPS.map((s, k) => (
                  <div key={s.name} data-on={step === k ? "1" : "0"}>
                    <b>{s.stat}</b>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
              <span className="mx-cl-mono mx-cl-br">Resumo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
