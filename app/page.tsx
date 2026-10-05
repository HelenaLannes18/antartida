import type { CSSProperties } from "react";
import ScrollEffects from "./ScrollEffects";

const ACCENT = "#C9580B";
const INK = "#1C2340";

const sans = "var(--font-dm), sans-serif";
const display = "var(--font-oswald), sans-serif";
const serif = "var(--font-cormorant), serif";

const manifesto =
  "Vasta, majestosa e inimaginavelmente bela — pisar no interior lendário da Antártida continua sendo uma experiência rara e extraordinária.".split(
    " ",
  );

const trips = [
  {
    id: "picos",
    img: "/media/picos.jpg",
    title: ["Picos", "em Brasa"],
    text: "Voe sobre cordilheiras iluminadas pelo sol da meia-noite e acampe aos pés de montanhas que poucos viram.",
    shade: 0.14,
    open: true,
  },
  {
    id: "aurora",
    img: "/media/aurora.jpg",
    title: ["Aurora", "Austral"],
    text: "No fim da temporada, quando o céu volta a escurecer, veja as luzes do sul dançando sobre o gelo.",
    shade: 0.14,
  },
  {
    id: "geleiras",
    img: "/media/geleiras.jpg",
    title: ["Geleiras", "Azuis"],
    text: "Caminhe por campos de gelo azul polidos pelo vento e explore as formações escondidas sob a superfície.",
    shade: 0.18,
  },
  {
    id: "acampamento",
    img: "/media/acampamento.jpg",
    title: ["Acampamento", "no Gelo"],
    text: "Durma em um acampamento remoto com conforto de hotel, cercado apenas pelo silêncio do continente.",
    shade: 0.22,
  },
  {
    id: "polo-sul",
    img: "/media/polo-sul.jpg",
    title: ["Rumo ao", "Polo Sul"],
    text: "Siga os passos dos grandes exploradores e pise no ponto mais ao sul do planeta.",
    shade: 0.22,
  },
];

const arrow = (
  <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
    <path d="M0 5 H16 M12 1 L16 5 L12 9" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const cssVar = (v: Record<string, string | number>) => v as CSSProperties;

export default function Home() {
  return (
    <div
      className="root"
      data-root="1"
      id="topo"
      style={{
        position: "relative",
        fontFamily: sans,
        color: INK,
        background: "#FFFFFF",
        overflow: "clip",
      }}
    >
      <ScrollEffects />
      <div className="cursor" aria-hidden="true" style={{ background: ACCENT }} />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "2.5% 9% 15% 16.5% 16.5% 16.5% 16.5% 7.5%",
          pointerEvents: "none",
          zIndex: 8,
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={i < 7 ? { borderRight: "1px solid rgba(28,35,64,0.06)" } : undefined} />
        ))}
      </div>

      <header
        data-hero="1"
        style={{
          position: "relative",
          height: "min(100vh, 920px)",
          minHeight: 640,
          overflow: "hidden",
          background: "#A9B4C0",
        }}
      >
        <div className="hero-zoom" style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-img"
            src="/media/hero.jpg"
            alt="Maciço rochoso coberto de neve em meio à névoa"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 60%",
            }}
          />
        </div>

        <nav
          className="nav fade-out"
          aria-label="Principal"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 84,
            padding: "0 3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 6,
            fontSize: 14,
            letterSpacing: "0.04em",
          }}
        >
          <div className="nav-side" style={{ display: "flex", gap: 32 }}>
            <a href="#experiencias">Experiências</a>
            <a href="#operacao">Operação</a>
            <a href="#sobre">Sobre</a>
          </div>
          <a
            href="#topo"
            style={{ fontFamily: display, fontWeight: 400, fontSize: 16, letterSpacing: "0.44em" }}
          >
            POLAR ATLAS
          </a>
          <div className="nav-side" style={{ display: "flex", gap: 32 }}>
            <a href="#reservar">Reservar</a>
            <a href="#contato">Contato</a>
          </div>
        </nav>

        <p
          className="intro"
          style={{
            position: "absolute",
            top: 150,
            left: "3.5%",
            margin: 0,
            maxWidth: 270,
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 23,
            lineHeight: 1.22,
            color: "#FFFFFF",
            zIndex: 6,
          }}
        >
          <span className="fade-out" style={{ display: "block" }}>
            Luxo e aventura no lugar mais remoto da Terra
            <span style={{ color: ACCENT }}>.</span>
          </span>
        </p>

        <div className="intro" style={{ position: "absolute", top: 146, right: "9%", zIndex: 6 }}>
          <a
            className="film fade-out"
            href="#filme"
            style={{
              width: 250,
              height: 60,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 26px",
              borderTop: "1px solid rgba(255,255,255,0.4)",
              borderBottom: "1px solid rgba(255,255,255,0.4)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: 16,
            }}
          >
            <span>Ver o filme</span>
            <svg className="film-ic" width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
              <path d="M1 1 L11 7 L1 13 Z" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "6%",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <h1
            className="hero-title"
            style={{
              margin: 0,
              textAlign: "center",
              whiteSpace: "nowrap",
              fontFamily: display,
              fontWeight: 400,
              fontSize: "clamp(88px, 17.5vw, 280px)",
              lineHeight: 1,
              letterSpacing: "0.03em",
              color: "#FFFFFF",
              textShadow: "0 0 30px rgba(255,255,255,0.35)",
            }}
          >
            {"ANTÁRTIDA".split("").map((c, i) => (
              <span key={i} className="letter" style={cssVar({ "--i": i })}>
                {c}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="mist-wrap"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mist2"
            src="/media/mist.png"
            alt=""
            style={{ position: "absolute", left: "-15%", width: "130%", bottom: "-8%", height: "80%", objectFit: "cover" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mist1"
            src="/media/mist.png"
            alt=""
            style={{ position: "absolute", left: "-10%", width: "120%", bottom: "-12%", height: "90%", objectFit: "cover" }}
          />
          <div className="whiteout" style={{ position: "absolute", inset: 0, background: "#FFFFFF" }} />
        </div>
      </header>

      <section
        data-man="1"
        id="sobre"
        style={{ position: "relative", padding: "170px 6% 120px", zIndex: 5, background: "#FFFFFF" }}
      >
        <div className="man-box" style={{ marginLeft: "24%", maxWidth: 940 }}>
          <div
            className="label-in"
            style={{ position: "relative", display: "inline-block", marginBottom: 30, padding: "20px 46px" }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: -90,
                top: -14,
                width: "calc(100% + 150px)",
                height: "calc(100% + 24px)",
                overflow: "visible",
              }}
            >
              <path
                className="ring"
                d="M40 52 C 20 30, 120 8, 210 16 C 290 24, 300 54, 230 64 C 160 74, 40 70, 30 50 C 22 34, 90 18, 170 20"
                fill="none"
                stroke={INK}
                strokeOpacity="0.45"
                strokeWidth="0.9"
              />
            </svg>
            <span style={{ position: "relative", fontFamily: serif, fontStyle: "italic", fontSize: 25 }}>
              O Último Continente
            </span>
          </div>
          <p
            className="man-text"
            style={cssVar({
              "--n": manifesto.length,
              margin: 0,
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 60px)",
              lineHeight: 1.02,
              textTransform: "uppercase",
              textIndent: "33%",
            })}
          >
            {manifesto.map((w, i) => (
              <span key={i}>
                <span className="w" style={cssVar({ "--i": i })}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section data-land="1" id="como-funciona" style={{ position: "relative", zIndex: 5, background: "#FFFFFF" }}>
        <div
          id="operacao"
          className="season"
          style={{ position: "relative", zIndex: 2, marginLeft: "11.5%", width: 250, padding: "0 0 48px" }}
        >
          <h2 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em" }}>
            NOSSA TEMPORADA
          </h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#3A4160" }}>
            Durante o curto verão austral, levamos pequenos grupos de viajantes e cientistas até o interior do
            continente. Nossos acampamentos remotos oferecem uma experiência íntima e imersiva, com uma equipe
            dedicada à sua segurança e conforto — mesmo no fim do mundo.
          </p>
        </div>
        <div className="land-clip" style={{ position: "relative", height: 680, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="land-img"
            src="/media/land.jpg"
            alt="Picos de rocha avermelhada emergindo de um vasto campo de neve"
            style={{ position: "absolute", left: 0, top: "-10%", width: "100%", height: "120%", objectFit: "cover" }}
          />
        </div>
      </section>

      <a
        className="tab"
        href="#como-funciona"
        style={{
          position: "fixed",
          right: 0,
          top: "clamp(200px, 38vh, 1000px)",
          width: 58,
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: ACCENT,
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: 14,
          zIndex: 40,
        }}
      >
        <svg className="plus" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M6 0 V12 M0 6 H12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}>
          Como funciona
        </span>
      </a>

      <section id="experiencias" style={{ position: "relative", padding: "200px 0 0", zIndex: 5, background: "#FFFFFF" }}>
        <div
          data-trips-head="1"
          className="trips-head"
          style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: 150 }}
        >
          <h2
            style={{
              position: "relative",
              margin: 0,
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(44px, 4.6vw, 70px)",
              letterSpacing: "0.01em",
              color: INK,
            }}
          >
            NOSSAS EXPEDIÇÕES
            <svg
              aria-hidden="true"
              viewBox="0 0 400 60"
              style={{ position: "absolute", left: "-12%", top: "62%", width: "124%", height: 70, overflow: "visible" }}
            >
              <path
                className="swoosh"
                d="M10 40 C 80 58, 200 60, 300 42 C 360 32, 390 20, 360 14 C 320 8, 220 30, 150 44"
                fill="none"
                stroke={INK}
                strokeOpacity="0.4"
                strokeWidth="0.9"
              />
            </svg>
          </h2>
        </div>

        <div data-trips="1" className="trips" style={{ margin: "0 1%" }}>
          {trips.map((t, k) => (
            <a key={t.id} className={`trip${t.open ? " open" : ""}`} href={`#${t.id}`} style={cssVar({ "--k": k })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="art" src={t.img} alt="" />
              <div
                className="info"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "44px 40px 40px",
                  background: `rgba(12,18,36,${t.shade})`,
                  textShadow: "0 1px 16px rgba(12,18,36,0.5)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 52,
                    lineHeight: 1,
                  }}
                >
                  {t.title[0]}
                  <br />
                  {t.title[1]}
                </h3>
                <div style={{ maxWidth: 400 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 15, fontWeight: 500 }}>
                    <span>[PREÇO]</span>
                    <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.8)" }} />
                    <span>[TEMPORADA]</span>
                  </div>
                  <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.5 }}>{t.text}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div id="reservar" style={{ display: "flex", justifyContent: "center", padding: "72px 0 160px" }}>
          <a
            className="btn-line"
            href="#todas"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              minHeight: 52,
              padding: "0 32px",
              border: `1px solid ${INK}`,
              color: INK,
              textDecoration: "none",
              fontSize: 14,
              letterSpacing: "0.12em",
            }}
          >
            VER TODAS AS EXPEDIÇÕES
            {arrow}
          </a>
        </div>
      </section>

      <footer
        id="contato"
        style={{ position: "relative", zIndex: 9, background: INK, color: "#E9ECF2", padding: "80px 6% 56px" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 48,
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: display, fontSize: 18, letterSpacing: "0.44em", color: "#FFFFFF" }}>
              POLAR ATLAS
            </div>
            <p style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontSize: 24, color: "#C9CEDA" }}>
              Expedições ao último continente.
            </p>
          </div>
          <form style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 300 }}>
            <label htmlFor="news" style={{ fontSize: 13, letterSpacing: "0.14em", color: "#C9CEDA" }}>
              RECEBA NOSSAS NOVIDADES
            </label>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
              <input
                id="news"
                type="email"
                placeholder="seu@email.com"
                style={{
                  flex: 1,
                  minHeight: 44,
                  background: "transparent",
                  border: 0,
                  color: "#FFFFFF",
                  font: "inherit",
                  fontSize: 16,
                }}
              />
              <button
                type="button"
                aria-label="Inscrever-se"
                style={{ minWidth: 44, minHeight: 44, background: "transparent", border: 0, color: "#FFFFFF" }}
              >
                {arrow}
              </button>
            </div>
          </form>
        </div>
        <div
          style={{
            marginTop: 56,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
            fontSize: 13,
            color: "#B6BCCB",
          }}
        >
          <span>© {new Date().getFullYear()} Polar Atlas</span>
          <span>Expedições · Como funciona · Sobre · Contato</span>
        </div>
      </footer>
    </div>
  );
}
