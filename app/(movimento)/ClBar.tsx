"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Barra fina que acompanha o capítulo: marca, título, hora local ao vivo e um atalho. */
export default function ClBar() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const off = -d.getTimezoneOffset() / 60;
      const hh = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      setClock(`GMT${off >= 0 ? "+" : "-"}${Math.abs(off)} ${hh}`);
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="mx-cl-bar">
      <div className="l">
        <Link className="brand" href="/" aria-label="SquadFit — início">
          <svg viewBox="0 0 56 52" aria-hidden="true">
            <circle cx="20" cy="26" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="36" cy="26" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M28 14.51 A14 14 0 0 1 28 37.49 A14 14 0 0 1 28 14.51Z" fill="#05caad" />
          </svg>
          squadfit
        </Link>
        <i className="sq" aria-hidden="true" />
        <span className="sub">Movimento</span>
      </div>
      <span className="c">Encontre o seu ritmo</span>
      <div className="r">
        <span className="clock" suppressHydrationWarning>{clock}</span>
        <a className="pill" href="#comecar">Criar perfil</a>
      </div>
    </header>
  );
}
