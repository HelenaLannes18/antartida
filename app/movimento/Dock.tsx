"use client";

import type { CSSProperties } from "react";
import { CHAPTERS, goChapter } from "./chapters";

/**
 * Dock de capítulos: a aba ativa se enche conforme o capítulo avança (usa --k da seção) e o botão ao lado pula o tour.
 * `active` é o capítulo atual.
 */
export default function Dock({ active, skip }: { active: number; skip: string }) {
  return (
    <div className="tx-dock">
      <nav className="tx-tabs" aria-label="Capítulos do tour">
        {CHAPTERS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === active ? "on" : i < active ? "past" : undefined}
            style={{ "--j": i } as CSSProperties}
            aria-current={i === active ? "step" : undefined}
            onClick={() => goChapter(i)}
          >
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <a className="tx-skip" href={skip}>
        Pular introdução
      </a>
    </div>
  );
}
