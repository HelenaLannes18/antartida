"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Dock from "./Dock";
import { Status } from "./Glass";
import Phone from "./Phone";
import { useTimeline } from "./useTimeline";
import {
  ChipAcoes,
  ChipContatos,
  ChipConvite,
  ChipFila,
  ChipMeta,
  ChipParceiros,
  ChipRecentes,
  ChipRespostas,
  ChipRitmo,
  ChipRitmoMedio,
  ChipRole,
  ChipSemana,
  ChipTags,
  ScrAgenda,
  ScrChat,
  ScrEvento,
  ScrInicio,
  ScrMapa,
  ScrMatch,
} from "./proto";

const st = (o: Record<string, string | number>) => o as CSSProperties;

/** Trecho ampliado de uma tela do app, que flutua ao lado do celular. `panel` repõe o fundo da tela quando o trecho é claro. */
type Chip = { C: () => ReactNode; w: number; ink: string; panel?: string; flat?: boolean; fade?: boolean };

/** Etiquetas e atalhos do rolê, juntos sobre o fundo escuro da tela (são claros sobre escuro). */
function GrupoAcoes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <ChipTags />
      <ChipAcoes />
    </div>
  );
}

type Chapter = {
  /** A palavra gigante, igual à da seção Ritmo. */
  tag: string;
  /** O rótulo entre colchetes ao lado da frase. */
  label: string;
  text: string;
  Screen: () => ReactNode;
  light: boolean;
  chips: Chip[];
};

const DARK = "#ffffff";
const LIGHT = "#0e0f10";

/** Um capítulo por tela do app. A ordem acompanha o dock. */
const CHAPTERS: Chapter[] = [
  {
    tag: "Início",
    label: "Painel",
    text: "Abriu o app, já viu o match do dia, seus parceiros e os treinos em dupla da semana. Sem procurar, sem fricção: o treino de hoje já está na sua frente.",
    Screen: ScrInicio,
    light: false,
    chips: [
      { C: ChipParceiros, w: 350, ink: DARK },
      { C: ChipRecentes, w: 350, ink: DARK },
    ],
  },
  {
    tag: "Match",
    label: "Compatibilidade",
    text: "Deslize até achar a sua dupla. Cada perfil mostra esporte, ritmo e distância, e você vê o quanto vocês combinam antes mesmo de dar oi.",
    Screen: ScrMatch,
    light: false,
    chips: [
      { C: ChipRitmo, w: 350, ink: DARK },
      { C: ChipRitmoMedio, w: 350, ink: DARK },
    ],
  },
  {
    tag: "Chat",
    label: "Conversa",
    text: "Deu match? A conversa já começa com contexto: um convite de treino com horário, ritmo e ponto de encontro, e respostas rápidas para fechar com um toque.",
    Screen: ScrChat,
    light: true,
    chips: [
      { C: ChipConvite, w: 298, ink: LIGHT },
      { C: ChipRespostas, w: 330, ink: LIGHT, flat: true, fade: true },
    ],
  },
  {
    tag: "Locais",
    label: "Segurança",
    text: "Sua rota só com quem você escolhe. Compartilhe o trajeto e a localização ao vivo apenas durante o rolê, e avise quem se importa quando chegar bem.",
    Screen: ScrMapa,
    light: false,
    chips: [
      { C: ChipRole, w: 362, ink: DARK },
      { C: ChipContatos, w: 362, ink: LIGHT, panel: "#f4f5f6" },
    ],
  },
  {
    tag: "Agenda",
    label: "Semana",
    text: "Treinos marcados, rolês em grupo e a meta semanal num só lugar, com lembrete uma hora antes de cada saída e sugestão de dupla quando falta um treino.",
    Screen: ScrAgenda,
    light: true,
    chips: [
      { C: ChipSemana, w: 362, ink: LIGHT, panel: "#efeee8" },
      { C: ChipMeta, w: 354, ink: LIGHT, flat: true },
    ],
  },
  {
    tag: "Grupos",
    label: "Comunidade",
    text: "Pelada, escalada ou skate: vagas, nível, rachadinha e caronas resolvidos no mesmo lugar, com fila de espera quando o rolê lota.",
    Screen: ScrEvento,
    light: false,
    chips: [
      { C: GrupoAcoes, w: 358, ink: DARK, panel: "#050606" },
      { C: ChipFila, w: 250, ink: DARK },
    ],
  },
];

const N = CHAPTERS.length;

/** Variáveis de entrada/saída do capítulo `j` (escritas por useTimeline). O primeiro já começa visível e o último não sai. */
const enter = (j: number) => (j === 0 ? 1 : `var(--e${j})`);
const leave = (j: number) => (j === N - 1 ? 0 : `var(--x${j})`);

export default function Tour() {
  const pin = useRef<HTMLElement>(null);
  const { step } = useTimeline(pin, N);

  return (
    <section id="tour" ref={pin} className="tx" data-steps={N} aria-label="Tour do aplicativo" style={st({ "--len": 9.2 })}>
      <div className="tx-stage">
        <div className="tx-idxbox" aria-hidden="true">
          {CHAPTERS.map((c, j) => (
            <i key={c.tag} className="tx-idx" style={st({ "--e": enter(j), "--x": leave(j) })}>
              {j + 1}
            </i>
          ))}
        </div>

        <div className="tx-copy">
          {CHAPTERS.map((c, j) => {
            const words = c.text.split(" ");
            return (
              <div key={c.tag} className="tx-ch" style={st({ "--e": enter(j), "--x": leave(j), "--q": `var(--q${j})`, "--n": words.length })}>
                <h2 className="mx-cl-giant tx-giant">
                  <span className="ln">
                    <span>{c.tag}</span>
                  </span>
                </h2>
                <div className="tx-say">
                  <span className="lab mx-cl-mono mx-cl-br">{c.label}</span>
                  <p>
                    {words.map((w, i) => (
                      <span key={i} className="tx-w" style={st({ "--i": i })}>
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tx-shadow" aria-hidden="true" />
        <div className="tx-ph" aria-hidden="true" inert>
          <Phone tone="dark">
            <div className="mxph-scr mxph-app">
              {CHAPTERS.map((c, j) => (
                <div key={c.tag} className={c.light ? "tx-layer light" : "tx-layer"} style={{ opacity: enter(j), zIndex: j }}>
                  <div className="ap">
                    <c.Screen />
                  </div>
                  <Status />
                  <i className="mxph-home" />
                </div>
              ))}
              <div className="mxph-island" />
            </div>
          </Phone>
        </div>

        <div className="tx-chips" aria-hidden="true" inert>
          <div className="tx-cs">
            {CHAPTERS.map((c, j) => (
              <div key={c.tag} className="tx-cg" style={st({ "--e": enter(j), "--x": leave(j), "--q": `var(--q${j})` })}>
                {c.chips.map((k, i) => (
                  <div key={i} className={k.flat ? "tx-chip flat" : "tx-chip"} style={st({ "--i": i, width: k.w + (k.panel ? 28 : 0), color: k.ink })}>
                    <div
                      className="tx-chip-in"
                      style={{
                        ...(k.panel ? { background: k.panel, padding: 14, borderRadius: 30 } : null),
                        ...(k.fade ? { WebkitMaskImage: "linear-gradient(90deg,#000 80%,transparent)", maskImage: "linear-gradient(90deg,#000 80%,transparent)" } : null),
                      }}
                    >
                      <k.C />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Dock active={step} skip="#world" />
      </div>
    </section>
  );
}
