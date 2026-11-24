import type { CSSProperties } from "react";

const TEXT =
  "Pensado em torno do seu pace, do seu nível e do seu horário. O SquadFit compara cada sinal a cada treino e mostra quem realmente corre, nada ou caminha no mesmo passo que você.";

/** Palavra gigante e frase que escurece palavra por palavra conforme a seção sobe na tela. */
export default function ClRitmo() {
  const words = TEXT.split(" ");
  return (
    <section id="ritmo" className="mx-cl-sec mx-cl-ritmo">
      <i className="mx-cl-idx">1</i>
      <h2 className="mx-cl-giant">Ritmo</h2>
      <div className="mx-cl-say" data-scene style={{ "--n": words.length } as CSSProperties}>
        <span className="lab mx-cl-mono mx-cl-br">Escopo</span>
        <p>
          {words.map((w, i) => (
            <span key={i} className="mx-cl-w" style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
