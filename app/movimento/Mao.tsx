import type { CSSProperties } from "react";

const TEXT =
  "Tudo isso cabe na palma da sua mão. Crie o perfil, escolha seus esportes e encontre quem treina no seu ritmo, onde você estiver.";

/**
 * A mão em 3D é o embed da Thrine, com a animação do modelo (abre e fecha em laço).
 * O embed congela a animação quando o sistema pede "menos movimento", e o computador do usuário sempre pede.
 * Por isso ele roda dentro de um iframe próprio, onde só ele enxerga `prefers-reduced-motion` como desligado;
 * o resto da página continua respeitando a preferência.
 */
const EMBED = `<!doctype html><html><head><meta charset="utf-8"><meta name="color-scheme" content="light">
<style>html,body{margin:0;height:100%;background:transparent;overflow:hidden}</style>
<script>
(function () {
  var mm = window.matchMedia.bind(window);
  window.matchMedia = function (q) {
    var r = mm(q);
    if (!/prefers-reduced-motion/.test(q)) return r;
    return { matches: false, media: q, onchange: null, addEventListener: function () {}, removeEventListener: function () {}, addListener: function () {}, removeListener: function () {}, dispatchEvent: function () { return false; } };
  };
})();
</script>
<script type="module" src="https://thrine.app/embed/v1.js"></script></head>
<body><model-embed project="e_3989bdae6b03b181c948" style="display:block;width:100%;aspect-ratio:292/394"></model-embed></body></html>`;

/** Seção final do app: a mão em 3D animada ao lado de palavra gigante, frase que escurece e botão, como em Ritmo. */
export default function Mao() {
  const words = TEXT.split(" ");
  return (
    <section id="mao" className="mx-cl-sec mao" aria-label="O aplicativo na palma da mão">
      <i className="mx-cl-idx">6</i>

      <div className="mao-grid">
        <div className="mao-copy">
          <h2 className="mx-cl-giant mao-giant">Na mão</h2>
          <div className="mx-cl-say mao-say" data-scene style={{ "--n": words.length } as CSSProperties}>
            <span className="lab mx-cl-mono mx-cl-br">Comece agora</span>
            <div>
              <p>
                {words.map((w, i) => (
                  <span key={i} className="mx-cl-w" style={{ "--i": i } as CSSProperties}>
                    {w}{" "}
                  </span>
                ))}
              </p>
              <a className="mao-cta" href="#comecar">
                Criar meu perfil
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13m-5-5 5 5-5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mao-embed" aria-hidden="true">
          <iframe className="mao-frame" srcDoc={EMBED} title="Mão em 3D" loading="lazy" tabIndex={-1} />
        </div>
      </div>
    </section>
  );
}
