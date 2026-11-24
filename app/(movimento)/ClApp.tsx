import type { CSSProperties } from "react";
import ClVideo from "./ClVideo";

const TEXT =
  "Perfil, match e agenda num só app: do primeiro oi ao treino marcado em menos de vinte minutos, com chat, localização ao vivo e avaliação depois de cada encontro.";

/** Palavra gigante, frase que escurece palavra por palavra e um vídeo grande com legendas em colchetes. */
export default function ClApp() {
  const words = TEXT.split(" ");
  return (
    <section id="plataforma" className="mx-cl-sec mx-cl-app">
      <i className="mx-cl-idx">4</i>
      <h2 className="mx-cl-giant mx-cl-huge">App</h2>

      <div className="mx-cl-say" data-scene style={{ "--n": words.length } as CSSProperties}>
        <span className="lab mx-cl-mono mx-cl-br">Plataforma</span>
        <p>
          {words.map((w, i) => (
            <span key={i} className="mx-cl-w" style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>

      <figure className="mx-cl-vid" data-scene>
        <div className="frame">
          <ClVideo src="/media/movimento/academia-agachamento.mp4" poster="/media/movimento/academia-agachamento.jpg" />
        </div>
        <figcaption>
          <span className="mx-cl-mono mx-cl-br">Academia</span>
          <span className="mx-cl-mono mx-cl-br">Treino marcado</span>
        </figcaption>
      </figure>
    </section>
  );
}
