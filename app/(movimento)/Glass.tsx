import type { ReactNode } from "react";

/** Barra de status do celular (hora, sinal, wi-fi e bateria), nas cores da tela que está por baixo. */
export function Status() {
  return (
    <div className="mxph-status">
      <b>07:12</b>
      <span>
        <i className="s1" />
        <i className="s2" />
        <i className="s3" />
      </span>
    </div>
  );
}

/**
 * Vidro do celular com uma tela do protótipo (390×844) por baixo da ilha, da barra de status e da barra de início.
 * `anchors` marca, em % da tela, onde ficam os pontos de detalhe que seguem o aparelho.
 */
export default function Glass({ light, anchors, children }: { light?: boolean; anchors?: [number, number][]; children: ReactNode }) {
  return (
    <div className={light ? "mxph-scr mxph-app light" : "mxph-scr mxph-app"}>
      <div className="ap">{children}</div>
      {anchors?.map(([x, y], i) => (
        <i key={i} className="mxm-anchor" data-anchor={i} style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <Status />
      <i className="mxph-home" />
      <div className="mxph-island" />
    </div>
  );
}
