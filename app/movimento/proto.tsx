/* Telas e trechos de tela do aplicativo FitMatch, gerados a partir do protótipo (FitMatch.html): a marcação e os estilos
   são os do protótipo (390×844 px), sem a lógica. As telas são "Scr…" e os trechos ampliados, "Chip…". */

export function ScrInicio() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(14, 15, 16)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(255, 255, 255)" }}>
      <div style={{ padding: "60px 20px 0px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 14, color: "rgb(154, 155, 158)" }}>
              Olá, Helena!
            </span>
            <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.4 }}>
              Bora treinar!
            </span>
          </div>
          <button aria-label="Notificações" type="button" style={{ position: "relative", width: 50, height: 50, borderRadius: "50%", background: "rgb(35, 36, 38)", border: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"></path>
            </svg>
            <span style={{ position: "absolute", top: 12, right: 13, width: 8, height: 8, borderRadius: "50%", background: "rgb(5, 202, 173)" }}></span>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0px, 1fr))", gap: 8 }}>
          <button type="button" style={{ height: 54, borderRadius: 20, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)", border: 0, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>
            Match do dia
          </button>
          <a style={{ height: 54, borderRadius: 20, background: "rgb(35, 36, 38)", color: "rgb(201, 202, 204)", textDecoration: "none", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            Meus parceiros
          </a>
        </div>
        <div style={{ borderRadius: 30, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", padding: "20px 18px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 23, fontWeight: 600, letterSpacing: -0.3 }}>
              Marina, 29
            </span>
            <a aria-label="Ver compatibilidade" style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(14, 15, 16, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </a>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 999, background: "rgba(14, 15, 16, 0.1)", fontSize: 12 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"></path>
                <circle cx="12" cy="9" r="2.5"></circle>
              </svg>
              {" 1,2 km"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 999, background: "rgba(14, 15, 16, 0.1)", fontSize: 12 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13" cy="4" r="2"></circle>
                <path d="M7 21l3-6 3 2v5M10 15l1-5 4 3 3 1M6 11l3-3h3"></path>
              </svg>
              {" Corrida"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 168 }}>
            <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  4x
                </span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>
                  Semana
                </span>
              </div>
              <div style={{ height: 22, borderRadius: "12px 12px 0px 0px", background: "rgb(14, 15, 16)" }}></div>
            </div>
            <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  70%
                </span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>
                  Nível
                </span>
              </div>
              <svg width="100%" height="78" style={{ display: "block", borderRadius: "12px 12px 0px 0px" }}>
                <defs>
                  <pattern id="inicio-ondaA" width="7" height="22" patternUnits="userSpaceOnUse">
                    <path d="M3.5 0 Q7.5 5.5 3.5 11 T3.5 22" fill="none" stroke="#0e0f10" strokeWidth="1.3"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="78" fill="url(#inicio-ondaA)"></rect>
              </svg>
            </div>
            <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  92%
                </span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>
                  Ritmo
                </span>
              </div>
              <div style={{ height: 118, borderRadius: "14px 14px 0px 0px", backgroundImage: "radial-gradient(rgb(14, 15, 16) 1.7px, transparent 2px)", backgroundSize: "8px 8px" }}></div>
            </div>
            <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  80%
                </span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>
                  Horário
                </span>
              </div>
              <div style={{ height: 54, borderRadius: "14px 14px 0px 0px", background: "linear-gradient(rgba(14, 15, 16, 0.9), rgba(14, 15, 16, 0.05))" }}></div>
            </div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <span style={{ width: 18, height: 5, borderRadius: 3, background: "rgb(14, 15, 16)" }}></span>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: "rgba(14, 15, 16, 0.3)" }}></span>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: "rgba(14, 15, 16, 0.3)" }}></span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0px, 1fr))", gap: 10 }}>
          <div style={{ height: 148, boxSizing: "border-box", padding: 16, borderRadius: 26, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-end", width: 44, height: 44, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L4 14h7l-1 8 9-12h-7z"></path>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 300, lineHeight: 1 }}>
                24
              </span>
              <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", marginTop: 4 }}>
                Treinos em dupla
              </span>
            </div>
          </div>
          <div style={{ height: 148, boxSizing: "border-box", padding: 16, borderRadius: 26, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-end", width: 44, height: 44, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9a5c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"></path>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 300, lineHeight: 1 }}>
                87%
              </span>
              <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", marginTop: 4 }}>
                Compatibilidade média
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav style={{ position: "absolute", left: 20, right: 20, bottom: 24, padding: 8, borderRadius: 999, background: "rgb(28, 29, 31)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a aria-label="Início" style={{ width: 50, height: 50, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#05caad">
            <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"></path>
          </svg>
        </a>
        <a aria-label="Parceiros" style={{ width: 50, height: 50, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.5"></circle>
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"></path>
          </svg>
        </a>
        <a aria-label="Encontrar match" style={{ width: 62, height: 50, borderRadius: 18, background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="18" viewBox="0 0 34 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#0e0f10" strokeWidth="2.6"></circle>
            <circle cx="23" cy="11" r="8" stroke="#0e0f10" strokeWidth="2.6"></circle>
          </svg>
        </a>
        <a aria-label="Agenda de treinos" style={{ width: 50, height: 50, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="16" rx="3"></rect>
            <path d="M3 10h18M8 3v4M16 3v4"></path>
          </svg>
        </a>
        <button aria-label="Perfil" type="button" style={{ width: 50, height: 50, borderRadius: "50%", background: "rgb(42, 43, 45)", border: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21a8 8 0 0 1 16 0"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
}

export function ChipParceiros() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0px, 1fr))", gap: 10 }}>
      <div style={{ height: 150, boxSizing: "border-box", padding: 16, borderRadius: 26, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ alignSelf: "flex-end", width: 44, height: 44, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.5"></circle>
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"></path>
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 42, fontWeight: 300, lineHeight: 1 }}>
            12
          </span>
          <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", marginTop: 4 }}>
            Matches ativos
          </span>
        </div>
      </div>
      <div style={{ height: 150, boxSizing: "border-box", padding: 16, borderRadius: 26, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ alignSelf: "flex-end", width: 44, height: 44, borderRadius: "50%", background: "rgba(14, 15, 16, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="16" rx="3"></rect>
            <path d="M3 10h18M8 3v4M16 3v4"></path>
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 42, fontWeight: 300, lineHeight: 1 }}>
            4
          </span>
          <span style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
            Treinos esta semana
          </span>
        </div>
      </div>
    </div>
  );
}

export function ChipRecentes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <a style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px 12px 14px", borderRadius: 22, background: "rgb(28, 29, 31)", color: "rgb(255, 255, 255)", textDecoration: "none" }}>
        <span style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: "50%", background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>
          MA
        </span>
        <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>
            Marina Alves
          </span>
          <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9b9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="3"></rect>
              <path d="M3 10h18M8 3v4M16 3v4"></path>
            </svg>
            {" Corrida · há 2 dias"}
          </span>
        </div>
        <span style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"></path>
          </svg>
        </span>
      </a>
      <a style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px 12px 14px", borderRadius: 22, background: "rgb(28, 29, 31)", color: "rgb(255, 255, 255)", textDecoration: "none" }}>
        <span style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: "50%", background: "rgb(230, 231, 233)", color: "rgb(14, 15, 16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>
          RC
        </span>
        <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>
            Rafael Costa
          </span>
          <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9b9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="3"></rect>
              <path d="M3 10h18M8 3v4M16 3v4"></path>
            </svg>
            {" Ciclismo · há 5 dias"}
          </span>
        </div>
        <span style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"></path>
          </svg>
        </span>
      </a>
      <a style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px 12px 14px", borderRadius: 22, background: "rgb(28, 29, 31)", color: "rgb(255, 255, 255)", textDecoration: "none" }}>
        <span style={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: "50%", background: "rgb(58, 59, 62)", color: "rgb(255, 255, 255)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>
          JS
        </span>
        <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>
            Júlia Santos
          </span>
          <span style={{ fontSize: 12, color: "rgb(154, 155, 158)", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9b9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="3"></rect>
              <path d="M3 10h18M8 3v4M16 3v4"></path>
            </svg>
            {" Tênis · há 1 semana"}
          </span>
        </div>
        <span style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6"></path>
          </svg>
        </span>
      </a>
    </div>
  );
}

export function ChipRitmo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0px, 1fr))", gap: 10 }}>
      <div style={{ padding: "14px 14px 16px", borderRadius: 24, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14 }}>
            Ritmo
          </span>
          <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8"></circle>
              <path d="M12 9v4l2 2M9 2h6"></path>
            </svg>
          </span>
        </div>
        <div style={{ position: "relative", width: 68, height: 68 }}>
          <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="34" cy="34" r="27" fill="none" stroke="#2a2b2d" strokeWidth="6"></circle>
            <circle cx="34" cy="34" r="27" fill="none" stroke="#05caad" strokeWidth="6" strokeLinecap="round" strokeDasharray="156 170" className="tx-ring tx-r1"></circle>
          </svg>
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
            92%
          </span>
        </div>
      </div>
      <div style={{ padding: "14px 14px 16px", borderRadius: 24, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14 }}>
            Nível
          </span>
          <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20V14M10 20V9M16 20V4M22 20H2"></path>
            </svg>
          </span>
        </div>
        <div style={{ position: "relative", width: 68, height: 68 }}>
          <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="34" cy="34" r="27" fill="none" stroke="#2a2b2d" strokeWidth="6" strokeDasharray="2 3"></circle>
            <circle cx="34" cy="34" r="27" fill="none" stroke="#a2f2e3" strokeWidth="6" strokeLinecap="round" strokeDasharray="119 170" className="tx-ring tx-r2"></circle>
          </svg>
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
            70%
          </span>
        </div>
      </div>
    </div>
  );
}

export function ChipRitmoMedio() {
  return (
    <div style={{ padding: "14px 16px 16px", borderRadius: 24, background: "rgb(28, 29, 31)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 14 }}>
          Ritmo médio em comum
        </span>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(42, 43, 45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13" cy="4" r="2"></circle>
            <path d="M7 21l3-6 3 2v5M10 15l1-5 4 3 3 1M6 11l3-3h3"></path>
          </svg>
        </span>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 44, paddingTop: 22 }}>
        <span style={{ position: "absolute", left: "40%", top: 0, transform: "translateX(-50%)", padding: "2px 7px", borderRadius: 6, background: "rgb(42, 43, 45)", fontSize: 11 }}>
          {"5'10\""}
        </span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 22, background: "rgb(5, 202, 173)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 12, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 9, background: "rgb(74, 75, 78)" }}></span>
        <span style={{ width: 2, borderRadius: 1, height: 18, background: "rgb(74, 75, 78)" }}></span>
      </div>
      <div style={{ display: "flex", gap: 3, height: 14 }}>
        <div style={{ width: "40%", borderRadius: 999, background: "rgb(5, 202, 173)" }}></div>
        <div style={{ flex: "1 1 0%", borderRadius: 999, background: "repeating-linear-gradient(135deg, rgb(58, 59, 62) 0px, rgb(58, 59, 62) 2px, transparent 2px, transparent 6px)" }}></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgb(154, 155, 158)" }}>
        <span>
          {"4'00\""}
        </span>
        <span>
          {"5'30\""}
        </span>
        <span>
          {"7'00\""}
        </span>
      </div>
    </div>
  );
}

export function ScrMatch() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(13, 23, 22)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(255, 255, 255)" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -80, top: -40, width: 380, height: 380, borderRadius: "50%", background: "rgb(31, 59, 55)", filter: "blur(80px)" }}></div>
        <div style={{ position: "absolute", right: -120, bottom: 60, width: 360, height: 360, borderRadius: "50%", background: "rgb(35, 48, 45)", filter: "blur(80px)" }}></div>
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, top: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a aria-label="Meu perfil" style={{ width: 46, height: 46, borderRadius: "50%", background: "rgb(182, 186, 186)", color: "rgb(14, 15, 16)", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          HL
        </a>
        <div style={{ display: "flex", gap: 8 }}>
          <a aria-label="Mensagens, 3 novas" style={{ position: "relative", width: 46, height: 46, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
            </svg>
            <span style={{ position: "absolute", top: -3, right: -3, minWidth: 18, height: 18, borderRadius: 9, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              3
            </span>
          </a>
          <a aria-label="Filtros" style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
              <circle cx="7" cy="7" r="2.2"></circle>
              <circle cx="17" cy="7" r="2.2"></circle>
              <circle cx="7" cy="17" r="2.2"></circle>
              <circle cx="17" cy="17" r="2.2"></circle>
            </svg>
          </a>
        </div>
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: 50, right: 50, top: 118, height: 60, borderRadius: "26px 26px 0px 0px", background: "rgb(43, 59, 57)", border: "1px solid rgba(255, 255, 255, 0.1)" }}></div>
      <div aria-hidden="true" style={{ position: "absolute", left: 32, right: 32, top: 130, height: 60, borderRadius: "28px 28px 0px 0px", background: "rgb(59, 76, 73)", border: "1px solid rgba(255, 255, 255, 0.12)" }}></div>
      <div style={{ position: "absolute", left: 14, right: 14, top: 142, height: 556, borderRadius: 36, overflow: "hidden", background: "rgb(51, 65, 63)", border: "1px solid rgba(255, 255, 255, 0.14)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "url(/media/movimento/trilha.jpg) 51% 40% / cover" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: "linear-gradient(rgba(8, 14, 13, 0), rgba(8, 14, 13, 0.92))" }}></div>
        </div>
        <div style={{ position: "absolute", left: 16, right: 16, top: 16, display: "flex", justifyContent: "space-between" }}>
          <span style={{ padding: "8px 12px", borderRadius: 999, background: "rgba(255, 255, 255, 0.16)", fontSize: 12, fontWeight: 500 }}>
            <span>
              Corrida
            </span>
          </span>
          <span style={{ padding: "8px 12px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 700 }}>
            <span>
              92%
            </span>
            {" match"}
          </span>
        </div>
        <div style={{ position: "absolute", left: 20, right: 20, bottom: 92, display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 42, fontWeight: 500, lineHeight: 1, letterSpacing: -1 }}>
            <span>
              Marina
            </span>
            {" "}
            <span style={{ fontWeight: 300, color: "rgb(201, 205, 205)" }}>
              <span>
                29
              </span>
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgb(221, 225, 225)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dde1e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
            <span>
              Pinheiros · 1,2 km
            </span>
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            <span style={{ padding: "6px 11px", borderRadius: 999, background: "rgba(255, 255, 255, 0.14)", border: "1px solid rgba(255, 255, 255, 0.16)", fontSize: 12 }}>
              <span>
                Corrida
              </span>
            </span>
            <span style={{ padding: "6px 11px", borderRadius: 999, background: "rgba(255, 255, 255, 0.14)", border: "1px solid rgba(255, 255, 255, 0.16)", fontSize: 12 }}>
              <span>
                Trilha
              </span>
            </span>
            <span style={{ padding: "6px 11px", borderRadius: 999, background: "rgba(255, 255, 255, 0.14)", border: "1px solid rgba(255, 255, 255, 0.16)", fontSize: 12 }}>
              <span>
                Yoga
              </span>
            </span>
            <span style={{ padding: "6px 11px", borderRadius: 999, background: "rgba(255, 255, 255, 0.14)", border: "1px solid rgba(255, 255, 255, 0.16)", fontSize: 12 }}>
              <span>
                Manhã
              </span>
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button aria-label="Passar" type="button" style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255, 255, 255, 0.14)", border: "1px solid rgba(255, 255, 255, 0.2)", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"></path>
            </svg>
          </button>
          <a style={{ padding: "10px 16px", borderRadius: 999, background: "rgba(255, 255, 255, 0.1)", color: "rgb(255, 255, 255)", textDecoration: "none", fontSize: 12 }}>
            Ver compatibilidade
          </a>
          <button aria-label="Dar match" type="button" style={{ width: 60, height: 60, borderRadius: "50%", background: "rgb(5, 202, 173)", border: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "rgba(5, 202, 173, 0.45) 0px 0px 24px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0e0f10">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"></path>
            </svg>
          </button>
        </div>
      </div>
      <nav style={{ position: "absolute", left: 40, right: 40, bottom: 26, height: 74, padding: "0px 10px", boxSizing: "border-box", borderRadius: 999, background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.14)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a aria-label="Início" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinejoin="round">
            <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"></path>
          </svg>
        </a>
        <a aria-label="Match" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="16" viewBox="0 0 34 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#0e0f10" strokeWidth="2.6"></circle>
            <circle cx="23" cy="11" r="8" stroke="#0e0f10" strokeWidth="2.6"></circle>
          </svg>
        </a>
        <a aria-label="Mapa" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"></path>
            <path d="M9 4v14M15 6v14"></path>
          </svg>
        </a>
        <a aria-label="Eventos" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.5"></circle>
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"></path>
          </svg>
        </a>
      </nav>
    </div>
  );
}

export function ScrMapa() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(6, 7, 7)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(255, 255, 255)" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", left: -10, top: -10, width: 73, height: 59, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 73, top: -10, width: 51, height: 59, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 134, top: -10, width: 69, height: 59, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 213, top: -10, width: 96, height: 59, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 319, top: -10, width: 63, height: 59, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 59, width: 80, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 80, top: 59, width: 69, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 159, top: 59, width: 81, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 250, top: 59, width: 73, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 333, top: 59, width: 46, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 389, top: 59, width: 100, height: 72, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 141, width: 65, height: 42, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 65, top: 141, width: 47, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 122, top: 141, width: 73, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 205, top: 141, width: 54, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 269, top: 141, width: 103, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 382, top: 141, width: 50, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 193, width: 45, height: 51, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 45, top: 193, width: 59, height: 51, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 114, top: 193, width: 40, height: 51, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 164, top: 193, width: 51, height: 51, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 225, top: 193, width: 67, height: 51, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 302, top: 193, width: 76, height: 51, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 388, top: 193, width: 87, height: 51, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 254, width: 50, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 50, top: 254, width: 40, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 100, top: 254, width: 63, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 173, top: 254, width: 79, height: 42, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 262, top: 254, width: 57, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 329, top: 254, width: 69, height: 42, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 306, width: 66, height: 75, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 66, top: 306, width: 52, height: 75, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 128, top: 306, width: 86, height: 75, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 224, top: 306, width: 53, height: 75, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 287, top: 306, width: 94, height: 75, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 391, width: 94, height: 79, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 94, top: 391, width: 79, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 183, top: 391, width: 36, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 229, top: 391, width: 59, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 298, top: 391, width: 62, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 370, top: 391, width: 86, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 480, width: 34, height: 80, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 34, top: 480, width: 75, height: 80, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 119, top: 480, width: 40, height: 80, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 169, top: 480, width: 66, height: 80, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 245, top: 480, width: 75, height: 80, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 330, top: 480, width: 43, height: 80, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 383, top: 480, width: 97, height: 80, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 570, width: 45, height: 37, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 45, top: 570, width: 83, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 138, top: 570, width: 95, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 243, top: 570, width: 92, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 345, top: 570, width: 37, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 617, width: 72, height: 37, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 72, top: 617, width: 93, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 175, top: 617, width: 69, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 254, top: 617, width: 54, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 318, top: 617, width: 38, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 366, top: 617, width: 50, height: 37, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 664, width: 44, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 44, top: 664, width: 34, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 88, top: 664, width: 40, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 138, top: 664, width: 42, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 190, top: 664, width: 63, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 263, top: 664, width: 87, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 360, top: 664, width: 86, height: 72, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 746, width: 84, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 84, top: 746, width: 53, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 147, top: 746, width: 39, height: 79, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 196, top: 746, width: 40, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 246, top: 746, width: 47, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 303, top: 746, width: 36, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 349, top: 746, width: 65, height: 79, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: -10, top: 835, width: 97, height: 61, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 97, top: 835, width: 64, height: 61, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 171, top: 835, width: 97, height: 61, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 278, top: 835, width: 69, height: 61, borderRadius: 8, background: "rgb(30, 32, 34)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
        <div style={{ position: "absolute", left: 357, top: 835, width: 81, height: 61, borderRadius: 8, background: "rgb(20, 22, 23)", boxShadow: "rgba(255, 255, 255, 0.05) 0px 1px 0px inset" }}></div>
      </div>
      <svg aria-hidden="true" width="390" height="844" viewBox="0 0 390 844" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="mapa-brilho" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          </filter>
        </defs>
        <polyline className="tx-route" pathLength={1} points="292,168 112,282 272,388 124,486 214,548" fill="none" stroke="#05caad" strokeWidth="8" strokeLinejoin="round" opacity="0.45" filter="url(#mapa-brilho)"></polyline>
        <polyline className="tx-route" pathLength={1} points="292,168 112,282 272,388 124,486 214,548" fill="none" stroke="#05caad" strokeWidth="2.5" strokeLinejoin="round"></polyline>
        <circle className="tx-halo" cx="214" cy="548" r="34" fill="#05caad" opacity="0.14"></circle>
        <circle className="tx-dest tx-ping" cx="214" cy="548" r="18" fill="none" stroke="#05caad" strokeWidth="2"></circle>
        <circle className="tx-dest" cx="214" cy="548" r="6" fill="#05caad"></circle>
      </svg>
      <div className="tx-pin tx-p0" style={{ position: "absolute", left: 266, top: 112, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ width: 52, height: 52, borderRadius: "50%", background: "rgb(169, 180, 184)", border: "3px solid rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "rgba(5, 202, 173, 0.5) 0px 0px 20px" }}>
          RC
        </span>
        <span style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid rgb(5, 202, 173)" }}></span>
      </div>
      <span className="tx-pin tx-p1" style={{ position: "absolute", left: 92, top: 262, width: 40, height: 40, borderRadius: "50%", background: "rgb(201, 179, 162)", border: "2px solid rgb(255, 255, 255)", color: "rgb(14, 15, 16)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
        MA
      </span>
      <span className="tx-pin tx-p2" style={{ position: "absolute", left: 252, top: 368, width: 40, height: 40, borderRadius: "50%", background: "rgb(214, 192, 168)", border: "2px solid rgb(255, 255, 255)", color: "rgb(14, 15, 16)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
        JS
      </span>
      <span className="tx-pin tx-p3" style={{ position: "absolute", left: 104, top: 466, width: 40, height: 40, borderRadius: "50%", background: "rgb(142, 154, 152)", border: "2px solid rgb(255, 255, 255)", color: "rgb(14, 15, 16)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
        PH
      </span>
      <div style={{ position: "absolute", left: 18, right: 18, top: 54, display: "flex", justifyContent: "space-between" }}>
        <button aria-label="Minha localização" type="button" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(40, 42, 44, 0.8)", border: "1px solid rgba(255, 255, 255, 0.12)", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="1.5" fill="#ffffff"></circle>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>
          </svg>
        </button>
        <button aria-label="Mais opções" type="button" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(40, 42, 44, 0.8)", border: "1px solid rgba(255, 255, 255, 0.12)", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
            <circle cx="5" cy="12" r="1.7"></circle>
            <circle cx="12" cy="12" r="1.7"></circle>
            <circle cx="19" cy="12" r="1.7"></circle>
          </svg>
        </button>
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, top: 600, padding: 12, borderRadius: 28, background: "rgba(38, 40, 42, 0.82)", border: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 48, height: 48, flex: "0 0 auto", borderRadius: "50%", background: "rgb(169, 180, 184)", color: "rgb(14, 15, 16)", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            RC
          </span>
          <div style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              {"Rafael Costa "}
              <span style={{ fontWeight: 300, color: "rgb(169, 171, 174)" }}>
                31
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgb(169, 171, 174)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a9abae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"></path>
                <circle cx="12" cy="9" r="2.5"></circle>
              </svg>
              Vila Madalena
            </span>
          </div>
          <a aria-label="Ver compatibilidade" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M9 7h8v8"></path>
            </svg>
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0px, 1fr))", gap: 6 }}>
          <span style={{ padding: "8px 0px", borderRadius: 999, background: "rgba(255, 255, 255, 0.08)", fontSize: 12, textAlign: "center" }}>
            2,4 km
          </span>
          <span style={{ padding: "8px 0px", borderRadius: 999, background: "rgba(255, 255, 255, 0.08)", fontSize: 12, textAlign: "center" }}>
            Ciclismo
          </span>
          <span style={{ padding: "8px 0px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 600, textAlign: "center" }}>
            88% match
          </span>
        </div>
      </div>
      <nav style={{ position: "absolute", left: 40, right: 40, bottom: 26, height: 74, padding: "0px 10px", boxSizing: "border-box", borderRadius: 999, background: "rgba(38, 40, 42, 0.82)", border: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a aria-label="Início" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinejoin="round">
            <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"></path>
          </svg>
        </a>
        <a aria-label="Match" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="16" viewBox="0 0 34 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#ffffff" strokeWidth="2.2"></circle>
            <circle cx="23" cy="11" r="8" stroke="#ffffff" strokeWidth="2.2"></circle>
          </svg>
        </a>
        <a aria-label="Mapa" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"></path>
            <path d="M9 4v14M15 6v14"></path>
          </svg>
        </a>
        <a aria-label="Eventos" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.5"></circle>
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"></path>
          </svg>
        </a>
      </nav>
    </div>
  );
}

export function ScrChat() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(255, 255, 255)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(14, 15, 16)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "54px 16px 12px", background: "rgb(255, 255, 255)", borderBottom: "1px solid rgb(238, 240, 242)", display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}>
        <a aria-label="Voltar" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6"></path>
          </svg>
        </a>
        <a style={{ flex: "1 1 0%", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "rgb(14, 15, 16)" }}>
          <span style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: "rgb(201, 179, 162)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            MA
            <span style={{ position: "absolute", right: 0, bottom: 0, width: 11, height: 11, borderRadius: "50%", background: "rgb(5, 202, 173)", border: "2px solid rgb(255, 255, 255)" }}></span>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>
              Marina Alves
            </span>
            <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
              online · 92% match
            </span>
          </span>
        </a>
        <button aria-label="Ligar" type="button" style={{ width: 44, height: 44, borderRadius: "50%", background: "rgb(238, 240, 242)", border: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path>
          </svg>
        </button>
      </div>
      <div style={{ position: "absolute", inset: "122px 0px 132px", overflowY: "hidden", padding: "16px 16px 8px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ alignSelf: "center", padding: "4px 10px", borderRadius: 999, background: "rgb(238, 240, 242)", fontSize: 11, color: "rgb(85, 87, 92)" }}>
          Hoje · match de 92% em corrida
        </span>
        <div style={{ alignSelf: "flex-start", maxWidth: "76%", padding: "10px 14px", borderRadius: "20px 20px 20px 6px", background: "rgb(238, 240, 242)", fontSize: 14, lineHeight: 1.4 }}>
          Oi! Vi que você corre de manhã também!
        </div>
        <div style={{ alignSelf: "flex-end", maxWidth: "76%", padding: "10px 14px", borderRadius: "20px 20px 6px", background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", fontSize: 14, lineHeight: 1.4 }}>
          Siim! Tô treinando pra uma 10K
        </div>
        <div style={{ alignSelf: "flex-start", maxWidth: "76%", padding: "10px 14px", borderRadius: "20px 20px 20px 6px", background: "rgb(238, 240, 242)", fontSize: 14, lineHeight: 1.4 }}>
          Bora sábado 7h? Te mandei um convite
        </div>
        <div style={{ alignSelf: "flex-start", width: 270, padding: 14, borderRadius: 24, background: "rgb(5, 202, 173)", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>
              CONVITE DE TREINO
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13" cy="4" r="2"></circle>
              <path d="M7 21l3-6 3 2v5M10 15l1-5 4 3 3 1M6 11l3-3h3"></path>
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>
              07:00
            </span>
            <span style={{ fontSize: 13 }}>
              Sáb, 18 out
            </span>
          </div>
          <span style={{ fontSize: 13 }}>
            {"Corrida 10 km · ritmo 5'15\" · [local do encontro]"}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button type="button" style={{ flex: "1 1 0%", height: 42, borderRadius: 14, border: 0, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Aceitar
            </button>
            <a style={{ flex: "1 1 0%", height: 42, borderRadius: 14, background: "rgba(255, 255, 255, 0.5)", color: "rgb(14, 15, 16)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
              Outro horário
            </a>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "10px 14px 28px", background: "rgb(255, 255, 255)", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 6, overflowX: "hidden" }}>
          <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
            <span>
              Bora!
            </span>
          </button>
          <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
            <span>
              Qual seu ritmo?
            </span>
          </button>
          <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
            <span>
              Levo água
            </span>
          </button>
          <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
            <span>
              Me manda a localização
            </span>
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a aria-label="Criar convite de treino" style={{ width: 48, height: 48, flex: "0 0 auto", borderRadius: "50%", background: "rgb(238, 240, 242)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </a>
          <input aria-label="Mensagem" placeholder="Mensagem" readOnly style={{ flex: "1 1 0%", minWidth: 0, height: 48, padding: "0px 18px", boxSizing: "border-box", borderRadius: 999, border: 0, background: "rgb(238, 240, 242)", outline: "none", fontFamily: "inherit", fontSize: 14, color: "rgb(14, 15, 16)" }} />
          <button aria-label="Enviar" type="button" style={{ width: 48, height: 48, flex: "0 0 auto", borderRadius: "50%", background: "rgb(14, 15, 16)", border: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChipConvite() {
  return (
    <div style={{ width: 270, padding: 14, borderRadius: 24, background: "rgb(5, 202, 173)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>
          CONVITE DE TREINO
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13" cy="4" r="2"></circle>
          <path d="M7 21l3-6 3 2v5M10 15l1-5 4 3 3 1M6 11l3-3h3"></path>
        </svg>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>
          07:00
        </span>
        <span style={{ fontSize: 13 }}>
          Sáb, 18 out
        </span>
      </div>
      <span style={{ fontSize: 13 }}>
        {"Corrida 10 km · ritmo 5'15\" · [local do encontro]"}
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <button type="button" style={{ flex: "1 1 0%", height: 42, borderRadius: 14, border: 0, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Aceitar
        </button>
        <a style={{ flex: "1 1 0%", height: 42, borderRadius: 14, background: "rgba(255, 255, 255, 0.5)", color: "rgb(14, 15, 16)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
          Outro horário
        </a>
      </div>
    </div>
  );
}

export function ChipRespostas() {
  return (
    <div style={{ display: "flex", gap: 6, overflowX: "hidden" }}>
      <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
        <span>
          Bora!
        </span>
      </button>
      <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
        <span>
          Qual seu ritmo?
        </span>
      </button>
      <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
        <span>
          Levo água
        </span>
      </button>
      <button type="button" style={{ flex: "0 0 auto", height: 34, padding: "0px 12px", borderRadius: 999, border: "1px solid rgb(213, 216, 220)", background: "rgb(255, 255, 255)", fontFamily: "inherit", fontSize: 12, color: "rgb(14, 15, 16)", cursor: "pointer" }}>
        <span>
          Me manda a localização
        </span>
      </button>
    </div>
  );
}

export function ScrAgenda() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(239, 238, 232)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(14, 15, 16)" }}>
      <div style={{ padding: "60px 18px 0px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 13, color: "rgb(107, 109, 114)" }}>
              Outubro
            </span>
            <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.6 }}>
              Sua semana
            </span>
          </div>
          <a aria-label="Novo treino ou rolê" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgb(14, 15, 16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0px, 1fr))", gap: 4 }}>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                S
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                13
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "transparent" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                T
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                14
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "transparent" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                Q
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                15
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "transparent" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                Q
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                16
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgb(2, 122, 105)" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                S
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                17
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "transparent" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                S
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                18
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgb(5, 202, 173)" }}></span>
          </button>
          <button type="button" style={{ height: 74, border: 0, borderRadius: 18, fontFamily: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)" }}>
            <span style={{ fontSize: 11, opacity: 0.7 }}>
              <span>
                D
              </span>
            </span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>
              <span>
                19
              </span>
            </span>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgb(2, 122, 105)" }}></span>
          </button>
        </div>
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, top: 262, display: "flex", flexDirection: "column" }}>
        <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, borderRadius: 30, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)", textDecoration: "none", transform: "rotate(-2.5deg)", boxShadow: "rgba(14, 15, 16, 0.08) 0px 10px 24px", position: "relative", zIndex: 1 }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 600 }}>
              Corrida com Marina
            </span>
            <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(5, 202, 173)", fontSize: 12 }}>
              Sáb · 10 km
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
              07:00
            </span>
            <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
              começar agora →
            </span>
          </span>
        </a>
        <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, marginTop: -12, borderRadius: 30, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", textDecoration: "none", transform: "rotate(1.5deg)", position: "relative", zIndex: 2 }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 600 }}>
              Pelada de quinta
            </span>
            <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12 }}>
              Qui · 8/14 vagas
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
              19:30
            </span>
            <span style={{ fontSize: 12, color: "rgb(169, 171, 174)" }}>
              society 7x7
            </span>
          </span>
        </a>
        <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, marginTop: -12, borderRadius: 30, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", textDecoration: "none", transform: "rotate(-1.5deg)", position: "relative", zIndex: 3 }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 600 }}>
              Escalada de domingo
            </span>
            <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(255, 255, 255)", fontSize: 12 }}>
              Dom · ginásio
            </span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
              09:00
            </span>
            <span style={{ fontSize: 12, color: "rgba(14, 15, 16, 0.7)" }}>
              5 pessoas
            </span>
          </span>
        </a>
      </div>
      <div style={{ position: "absolute", left: 18, right: 18, top: 618, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 22, border: "1.5px dashed rgb(196, 199, 203)" }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(255, 255, 255)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#027a69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14h7l-1 8 9-12h-7z"></path>
          </svg>
        </span>
        <span style={{ flex: "1 1 0%", fontSize: 13, lineHeight: 1.35 }}>
          {"Meta: 4 treinos. Faltam "}
          <b>
            1
          </b>
          {" pra fechar a semana."}
        </span>
        <a style={{ fontSize: 13, fontWeight: 600 }}>
          Achar dupla
        </a>
      </div>
      <nav style={{ position: "absolute", left: 18, right: 18, bottom: 20, height: 64, display: "flex", gap: 8 }}>
        <a aria-label="Início" style={{ width: 64, borderRadius: 20, background: "rgb(14, 15, 16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"></path>
          </svg>
        </a>
        <div style={{ flex: "1 1 0%", borderRadius: 20, background: "rgb(14, 15, 16)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <a aria-label="Match" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="16" viewBox="0 0 34 22" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#c9cacc" strokeWidth="2.2"></circle>
              <circle cx="23" cy="11" r="8" stroke="#c9cacc" strokeWidth="2.2"></circle>
            </svg>
          </a>
          <a aria-label="Eventos" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3.5"></circle>
              <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"></path>
            </svg>
          </a>
          <a aria-label="Mensagens" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"></path>
            </svg>
          </a>
          <a aria-label="Perfil" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9cacc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 21a8 8 0 0 1 16 0"></path>
            </svg>
          </a>
        </div>
        <a aria-label="Agenda" style={{ width: 64, borderRadius: 20, background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="16" rx="3"></rect>
            <path d="M3 10h18M8 3v4M16 3v4"></path>
          </svg>
        </a>
      </nav>
    </div>
  );
}

export function ChipSemana() {
  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, borderRadius: 30, background: "rgb(255, 255, 255)", color: "rgb(14, 15, 16)", textDecoration: "none", transform: "rotate(-2.5deg)", boxShadow: "rgba(14, 15, 16, 0.08) 0px 10px 24px", position: "relative", zIndex: 1 }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>
            Corrida com Marina
          </span>
          <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(5, 202, 173)", fontSize: 12 }}>
            Sáb · 10 km
          </span>
        </span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            07:00
          </span>
          <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
            começar agora →
          </span>
        </span>
      </a>
      <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, marginTop: -12, borderRadius: 30, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", textDecoration: "none", transform: "rotate(1.5deg)", position: "relative", zIndex: 2 }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>
            Pelada de quinta
          </span>
          <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12 }}>
            Qui · 8/14 vagas
          </span>
        </span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            19:30
          </span>
          <span style={{ fontSize: 12, color: "rgb(169, 171, 174)" }}>
            society 7x7
          </span>
        </span>
      </a>
      <a style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 22, marginTop: -12, borderRadius: 30, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", textDecoration: "none", transform: "rotate(-1.5deg)", position: "relative", zIndex: 3 }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>
            Escalada de domingo
          </span>
          <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "rgb(255, 255, 255)", fontSize: 12 }}>
            Dom · ginásio
          </span>
        </span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            09:00
          </span>
          <span style={{ fontSize: 12, color: "rgba(14, 15, 16, 0.7)" }}>
            5 pessoas
          </span>
        </span>
      </a>
    </div>
  );
}

export function ChipMeta() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 22, border: "1.5px dashed rgb(196, 199, 203)", position: "relative" }}>
      <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(255, 255, 255)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#027a69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4 14h7l-1 8 9-12h-7z"></path>
        </svg>
      </span>
      <span style={{ flex: "1 1 0%", fontSize: 13, lineHeight: 1.35 }}>
        {"Meta: 4 treinos. Faltam "}
        <b>
          1
        </b>
        {" pra fechar a semana."}
      </span>
      <a style={{ fontSize: 13, fontWeight: 600 }}>
        Achar dupla
      </a>
    </div>
  );
}

export function ScrEvento() {
  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "rgb(5, 6, 6)", fontFamily: "var(--font-outfit), sans-serif", color: "rgb(255, 255, 255)" }}>
      <div style={{ position: "absolute", left: 16, right: 16, top: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a aria-label="Voltar" style={{ width: 52, height: 52, borderRadius: "50%", background: "rgb(26, 27, 28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6"></path>
          </svg>
        </a>
        <a style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "rgb(255, 255, 255)", fontSize: 13 }}>
          {"14 pessoas "}
          <span style={{ display: "flex" }}>
            <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(169, 180, 184)", border: "2px solid rgb(5, 6, 6)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              RC
            </span>
            <span style={{ width: 40, height: 40, marginLeft: -12, borderRadius: "50%", background: "rgb(201, 179, 162)", border: "2px solid rgb(5, 6, 6)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              MA
            </span>
            <span style={{ width: 40, height: 40, marginLeft: -12, borderRadius: "50%", background: "rgb(42, 43, 45)", border: "2px solid rgb(5, 6, 6)", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              +12
            </span>
          </span>
        </a>
      </div>
      <span style={{ position: "absolute", left: 22, top: 118, fontSize: 36, fontWeight: 500, lineHeight: 1, letterSpacing: -1 }}>
        Pelada de
        <br />
        quinta
      </span>
      <div style={{ position: "absolute", left: 30, top: 214, width: 400, height: 318, borderRadius: 34, overflow: "hidden", transform: "rotate(-6deg)", transformOrigin: "0px 0px", background: "rgb(43, 74, 54)", boxShadow: "rgba(0, 0, 0, 0.6) 0px 20px 50px" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", left: -40, top: 140, width: 520, height: 260, borderRadius: "50%", background: "rgb(79, 138, 85)", filter: "blur(30px)" }}></div>
          <div style={{ position: "absolute", left: 60, top: -60, width: 300, height: 200, borderRadius: "50%", background: "rgb(159, 196, 201)", filter: "blur(50px)", opacity: 0.7 }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 160, height: 2, background: "rgba(255, 255, 255, 0.35)" }}></div>
        </div>
        <span style={{ position: "absolute", left: 24, top: 24, fontSize: 30, fontWeight: 500, lineHeight: 1.05, letterSpacing: -0.5 }}>
          Society
          <br />
          Pinheiros
        </span>
        <span style={{ position: "absolute", right: 64, top: 20, width: 48, height: 48, borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"></path>
            <circle cx="12" cy="9" r="2.5"></circle>
          </svg>
        </span>
        <div style={{ position: "absolute", left: 14, top: 150, width: 300, display: "grid", gridTemplateColumns: "repeat(2, minmax(0px, 1fr))", gap: 6 }}>
          <div style={{ padding: "10px 14px", borderRadius: 20, background: "rgba(60, 62, 64, 0.6)" }}>
            <div style={{ fontSize: 20 }}>
              Médio
            </div>
            <div style={{ fontSize: 11, color: "rgb(201, 205, 205)" }}>
              Nível
            </div>
          </div>
          <div style={{ padding: "10px 14px", borderRadius: 20, background: "rgba(60, 62, 64, 0.6)" }}>
            <div style={{ fontSize: 20 }}>
              1h30
            </div>
            <div style={{ fontSize: 11, color: "rgb(201, 205, 205)" }}>
              Qui 19:30
            </div>
          </div>
          <div style={{ padding: "10px 14px", borderRadius: 20, background: "rgba(60, 62, 64, 0.6)" }}>
            <div style={{ fontSize: 20 }}>
              R$ 20
            </div>
            <div style={{ fontSize: 11, color: "rgb(201, 205, 205)" }}>
              Por pessoa
            </div>
          </div>
          <div style={{ padding: "10px 14px", borderRadius: 20, background: "rgba(60, 62, 64, 0.6)" }}>
            <div style={{ fontSize: 20 }}>
              14/14
            </div>
            <div style={{ fontSize: 11, color: "rgb(5, 202, 173)" }}>
              Lotado
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 16, right: 16, top: 560, display: "flex", flexWrap: "wrap", gap: 6 }}>
        <span style={{ padding: "7px 12px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 600 }}>
          Resenha
        </span>
        <span style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgb(42, 43, 45)", fontSize: 12 }}>
          LGBTQIA+ friendly
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 999, border: "1px solid rgb(42, 43, 45)", fontSize: 12 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path>
            <path d="M8.5 12l2.5 2.5 4.5-5"></path>
          </svg>
          Só verificados
        </span>
      </div>
      <div style={{ position: "absolute", left: 16, right: 16, top: 612, display: "grid", gridTemplateColumns: "repeat(4, minmax(0px, 1fr))", gap: 6 }}>
        <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="13" rx="3"></rect>
            <path d="M3 10h18M7 15h3"></path>
          </svg>
          Rachadinha
        </a>
        <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16l1.5-5a2 2 0 0 1 2-1.5h7a2 2 0 0 1 2 1.5L19 16M4 16h16v3H4zM7 19v1.5M17 19v1.5"></path>
          </svg>
          Caronas
        </a>
        <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
          <svg width="20" height="20" viewBox="0 0 34 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#05caad" strokeWidth="2.4"></circle>
            <circle cx="23" cy="11" r="8" stroke="#05caad" strokeWidth="2.4"></circle>
          </svg>
          Duplas
        </a>
        <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path>
          </svg>
          Segurança
        </a>
      </div>
      <a style={{ position: "absolute", left: "50%", bottom: 28, width: 250, height: 74, marginLeft: -125, padding: 6, boxSizing: "border-box", borderRadius: 999, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 62, height: 62, flex: "0 0 auto", borderRadius: "50%", background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-10"></path>
          </svg>
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            Entrar na fila
          </span>
          <span style={{ fontSize: 11, color: "rgb(142, 144, 149)" }}>
            3 pessoas na frente
          </span>
        </span>
        <span aria-hidden="true" style={{ marginLeft: "auto", paddingRight: 16, color: "rgb(142, 144, 149)", letterSpacing: -2 }}>
          ›››
        </span>
      </a>
    </div>
  );
}

export function ChipTags() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, position: "relative" }}>
      <span style={{ padding: "7px 12px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 12, fontWeight: 600 }}>
        Resenha
      </span>
      <span style={{ padding: "7px 12px", borderRadius: 999, border: "1px solid rgb(42, 43, 45)", fontSize: 12 }}>
        LGBTQIA+ friendly
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 999, border: "1px solid rgb(42, 43, 45)", fontSize: 12 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path>
          <path d="M8.5 12l2.5 2.5 4.5-5"></path>
        </svg>
        Só verificados
      </span>
    </div>
  );
}

export function ChipAcoes() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0px, 1fr))", gap: 6, position: "relative" }}>
      <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="13" rx="3"></rect>
          <path d="M3 10h18M7 15h3"></path>
        </svg>
        Rachadinha
      </a>
      <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 16l1.5-5a2 2 0 0 1 2-1.5h7a2 2 0 0 1 2 1.5L19 16M4 16h16v3H4zM7 19v1.5M17 19v1.5"></path>
        </svg>
        Caronas
      </a>
      <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
        <svg width="20" height="20" viewBox="0 0 34 22" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#05caad" strokeWidth="2.4"></circle>
          <circle cx="23" cy="11" r="8" stroke="#05caad" strokeWidth="2.4"></circle>
        </svg>
        Duplas
      </a>
      <a style={{ height: 76, borderRadius: 20, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05caad" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path>
        </svg>
        Segurança
      </a>
    </div>
  );
}

export function ChipFila() {
  return (
    <a style={{ width: 250, height: 74, padding: 6, boxSizing: "border-box", borderRadius: 999, background: "rgb(26, 27, 28)", color: "rgb(255, 255, 255)", textDecoration: "none", display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
      <span style={{ width: 62, height: 62, flex: "0 0 auto", borderRadius: "50%", background: "rgb(5, 202, 173)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e0f10" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 9-10"></path>
        </svg>
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          Entrar na fila
        </span>
        <span style={{ fontSize: 11, color: "rgb(142, 144, 149)" }}>
          3 pessoas na frente
        </span>
      </span>
      <span aria-hidden="true" style={{ marginLeft: "auto", paddingRight: 16, color: "rgb(142, 144, 149)", letterSpacing: -2 }}>
        ›››
      </span>
    </a>
  );
}

export function ChipRole() {
  return (
    <div style={{ padding: 16, borderRadius: 26, background: "rgb(14, 15, 16)", color: "rgb(255, 255, 255)", display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 17, fontWeight: 500 }}>
            Trilha da Pedra Grande
          </span>
          <span style={{ fontSize: 12, color: "rgb(169, 171, 174)" }}>
            Dom 06:30 · Atibaia · ~6h
          </span>
        </span>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgb(5, 202, 173)", color: "rgb(14, 15, 16)", fontSize: 11, fontWeight: 600 }}>
          volta 13:00
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "flex" }}>
          <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgb(169, 180, 184)", border: "2px solid rgb(14, 15, 16)", color: "rgb(14, 15, 16)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            RC
          </span>
          <span style={{ width: 32, height: 32, marginLeft: -8, borderRadius: "50%", background: "rgb(201, 179, 162)", border: "2px solid rgb(14, 15, 16)", color: "rgb(14, 15, 16)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            MA
          </span>
          <span style={{ width: 32, height: 32, marginLeft: -8, borderRadius: "50%", background: "rgb(42, 43, 45)", border: "2px solid rgb(14, 15, 16)", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            +7
          </span>
        </span>
        <span style={{ fontSize: 12, color: "rgb(169, 171, 174)" }}>
          9 pessoas · 7 com identidade verificada
        </span>
      </div>
      <span style={{ fontSize: 12, color: "rgb(169, 171, 174)", paddingTop: 10, borderTop: "1px solid rgb(35, 36, 38)" }}>
        Organizador: Rafael C. · identidade verificada · 4,9 de reputação
      </span>
    </div>
  );
}

export function ChipContatos() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
      <span style={{ fontSize: 13, color: "rgb(85, 87, 92)", paddingLeft: 4 }}>
        Contatos de emergência
      </span>
      <button role="checkbox" aria-checked="true" type="button" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px 10px 10px", borderRadius: 20, border: 0, background: "rgb(255, 255, 255)", fontFamily: "inherit", color: "rgb(14, 15, 16)", cursor: "pointer", textAlign: "left" }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(238, 240, 242)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
          <span>
            MÃ
          </span>
        </span>
        <span style={{ flex: "1 1 0%", display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            <span>
              Mãe
            </span>
          </span>
          <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
            <span>
              Contato principal
            </span>
          </span>
        </span>
        <span style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(14, 15, 16)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-10"></path>
          </svg>
        </span>
      </button>
      <button role="checkbox" aria-checked="true" type="button" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px 10px 10px", borderRadius: 20, border: 0, background: "rgb(255, 255, 255)", fontFamily: "inherit", color: "rgb(14, 15, 16)", cursor: "pointer", textAlign: "left" }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(238, 240, 242)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
          <span>
            LU
          </span>
        </span>
        <span style={{ flex: "1 1 0%", display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            <span>
              Lucas
            </span>
          </span>
          <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
            <span>
              Irmão
            </span>
          </span>
        </span>
        <span style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(14, 15, 16)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-10"></path>
          </svg>
        </span>
      </button>
      <button role="checkbox" aria-checked="false" type="button" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px 10px 10px", borderRadius: 20, border: 0, background: "rgb(255, 255, 255)", fontFamily: "inherit", color: "rgb(14, 15, 16)", cursor: "pointer", textAlign: "left" }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgb(238, 240, 242)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
          <span>
            AN
          </span>
        </span>
        <span style={{ flex: "1 1 0%", display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            <span>
              Ana
            </span>
          </span>
          <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
            <span>
              Amiga
            </span>
          </span>
        </span>
        <span style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", boxShadow: "rgb(196, 199, 203) 0px 0px 0px 1.5px inset" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-10"></path>
          </svg>
        </span>
      </button>
      <button role="switch" aria-checked="true" type="button" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 20, border: 0, background: "rgb(255, 255, 255)", fontFamily: "inherit", color: "rgb(14, 15, 16)", cursor: "pointer", textAlign: "left" }}>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            Localização ao vivo
          </span>
          <span style={{ fontSize: 12, color: "rgb(107, 109, 114)" }}>
            {"Só durante o rolê · e \"cheguei bem\" no fim"}
          </span>
        </span>
        <span style={{ flex: "0 0 auto", width: 50, height: 30, padding: 3, boxSizing: "border-box", borderRadius: 999, display: "flex", transition: "background 0.2s", justifyContent: "flex-end", background: "rgb(14, 15, 16)" }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgb(255, 255, 255)" }}></span>
        </span>
      </button>
    </div>
  );
}
