import type { CSSProperties } from "react";
import Scroll from "./Scroll";
import FooterStats from "./FooterStats";
import DotMap from "./DotMap";
import Services from "./Services";
import Capabilities from "./Capabilities";
import HowItWorks from "./HowItWorks";

const KEY_ROWS = [14, 14, 13, 13, 12];

const finishes = ["Space Gray", "Silver", "Starlight", "Midnight"];
const profileColors = ["#d9dadc", "#e4d8c6", "#8b8d92", "#2f3744"];

const apps = [
  { c: "linear-gradient(135deg,#1f2937,#4b5563)", w: 300, h: 190 },
  { c: "linear-gradient(135deg,#38bdf8,#1d4ed8 60%,#0f172a)", w: 340, h: 220 },
  { c: "linear-gradient(135deg,#ef4444,#fecaca)", w: 200, h: 250 },
  { c: "linear-gradient(135deg,#f59e0b,#ec4899)", w: 320, h: 200 },
  { c: "linear-gradient(135deg,#a3e635,#14b8a6)", w: 300, h: 210 },
  { c: "linear-gradient(135deg,#6366f1,#ec4899)", w: 340, h: 220 },
];

/** Notebook visto de frente (tela + base). */
function Front({ wall, style }: { wall: string; style?: CSSProperties }) {
  return (
    <div className="mb-front" style={style}>
      <div className="mb-lid">
        <i className="mb-notch" />
        <div className={`mb-wall ${wall}`} />
      </div>
      <div className="mb-deck" />
    </div>
  );
}

/** Notebook visto de cima: tela inclinada + teclado. */
function Top({ wall }: { wall: string }) {
  return (
    <div className="mb-top">
      <div className="mb-tlid">
        <div className={`mb-wall ${wall}`} />
      </div>
      <div className="mb-tbase">
        <div className="mb-keys">
          {KEY_ROWS.map((n, r) => (
            <div key={r} className="mb-krow">
              {Array.from({ length: n }, (_, k) => (
                <i key={k} />
              ))}
            </div>
          ))}
        </div>
        <div className="mb-pad" />
      </div>
    </div>
  );
}

const SLABS = 22;
const BARS = Array.from({ length: 44 }, (_, i) => 0.22 + 0.78 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.55)));

/** Celular em 3D: corpo feito de fatias (laterais arredondadas), vidro frontal com chat e verso com câmeras em relevo. */
function Phone({ tone }: { tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div className={`ph ph-${tone}`}>
      {Array.from({ length: SLABS }, (_, i) => {
        const t = i / (SLABS - 1);
        const l = (dark ? 20 : 74) + Math.sin(t * Math.PI) * (dark ? 14 : 12);
        return (
          <i
            key={i}
            className="ph-slab"
            style={{ transform: `translateZ(calc(var(--d) * ${(t - 0.5).toFixed(3)}))`, background: `hsl(225 ${dark ? 4 : 3}% ${l.toFixed(1)}%)` }}
          />
        );
      })}

      <div className="ph-face ph-front">
        <div className="ph-scr">
          <div className="ph-island" />
          <div className="ph-status">
            <b>10:12</b>
            <span><i className="s1" /><i className="s2" /><i className="s3" /></span>
          </div>
          <div className="ph-top">
            <span className="ph-back-ch">‹</span>
            <span className="ph-av" />
            <span className="ph-name"><b>Paul</b><small>last seen recently</small></span>
            <span className="ph-call" />
            <span className="ph-more">⋮</span>
          </div>
          <p className="ph-date">21 June</p>
          <div className="ph-msg l">Hey! How is it going?<em>10:07 AM</em></div>
          <div className="ph-msg l w">I need a presentation file for the quarterly meeting that is happening next week.<em>10:03 AM</em></div>
          <div className="ph-msg r">Hi! Thanks, I am fine<em>10:05 AM ✓✓</em></div>
          <div className="ph-voice">
            <span className="ph-play" />
            <span className="ph-wave">{BARS.map((h, i) => <i key={i} style={{ height: `${(h * 100).toFixed(0)}%` }} />)}</span>
            <small>00:12 <b /></small>
            <em>10:06 AM ✓✓</em>
          </div>
          <div className="ph-file">
            <span className="ph-pdf">PDF</span>
            <span className="ph-fi"><b>Presentation.pdf</b><small>122,5 KB PDF file</small></span>
            <em>10:12 AM ✓</em>
          </div>
          <div className="ph-input"><i /><span>Message...</span><u /><u className="m" /></div>
          <div className="ph-home" />
        </div>
      </div>

      <div className="ph-face ph-back">
        <div className="ph-cam">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <i key={k} className="ph-plate" style={{ "--k": k } as CSSProperties} />
          ))}
          {[1, 2, 3].map((n) => (
            <div key={n} className={`ph-lens l${n}`}>
              {[0, 1, 2, 3, 4].map((k) => (
                <i key={k} style={{ "--k": k } as CSSProperties} />
              ))}
            </div>
          ))}
          <span className="ph-flash" />
        </div>
        <span className="ph-glyph" />
      </div>

      <div className="ph-face ph-bot">
        {dark ? (
          <>
            <i className="ph-dots" />
            <i className="ph-port" />
            <i className="ph-dots" />
          </>
        ) : null}
      </div>
      <div className="ph-face ph-topf" />
    </div>
  );
}

/** Ícone de pessoa usado nos nós da seção de segurança. */
function Person() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20c.8-4 3.5-6 7-6s6.2 2 7 6z" />
    </svg>
  );
}

/** Notebook de perfil, aberto: dois traços unidos pela dobradiça. */
function Profile({ color, className, style }: { color: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 340 430" aria-hidden="true">
      <path d="M12 12 L312 228" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M312 228 L40 408" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M12 12 L312 228" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function MacbookAir() {
  return (
    <main>
      <Scroll />

      <header className="mb-nav" data-nav data-solid="0" data-cards="0">
        <div className="mb-nav-in">
          <div className="mb-nav-title">
            <small>Modelo com chip M2</small>
            <strong>MacBook Air</strong>
          </div>
          <div className="mb-nav-dots" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((k) => (
              <i key={k} />
            ))}
          </div>
          <nav>
            <a href="#overview">Visão geral</a>
            <a href="#why">Por que Mac</a>
            <a href="#specs">Especificações</a>
            <a href="#buy" className="mb-pill">Ver preços</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="mb-scene mb-hero" data-scene data-sticky style={{ "--len": 1.9 } as CSSProperties}>
        <div className="mb-stick">
          <h1 className="mb-air" aria-label="Air">AIR</h1>
          <div className="mb-fan" aria-hidden="true">
            {profileColors.map((c, i) => (
              <Profile key={c} color={c} className="mb-prof" style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
          <div className="mb-hero-foot">
            <p className="mb-wordmark">MacBook Air</p>
            <p className="mb-avail">Disponível no próximo mês</p>
            <p className="mb-links">
              <a href="#why">Assistir ao filme ▸</a>
              <a href="#why">Assistir ao evento ›</a>
            </p>
          </div>
        </div>
      </section>

      {/* ALL-NEW DESIGN */}
      <section id="why" className="mb-scene" data-scene data-sticky style={{ "--len": 3 } as CSSProperties}>
        <div className="mb-stick mb-design-stage">
          <div className="mb-slab mb-slab-top">
            <div className="mb-swoosh" />
          </div>
          <h2 className="mb-grad mb-big mb-nd">Design totalmente novo.</h2>
          <div className="mb-slab mb-slab-bot">
            <div className="mb-miniKeys">
              {KEY_ROWS.map((n, r) => (
                <div key={r} className="mb-krow">
                  {Array.from({ length: n }, (_, k) => (
                    <i key={k} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* M2 */}
      <section className="mb-scene" data-scene data-sticky style={{ "--len": 3 } as CSSProperties}>
        <div className="mb-stick mb-m2-stage">
          <h2 className="mb-grad mb-huge">Superalimentado.</h2>
          <div className="mb-chip">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f5f5f7" />
                  <stop offset="1" stopColor="#8e8e98" />
                </linearGradient>
              </defs>
              <circle cx="22" cy="50" r="17" fill="url(#g)" />
              <circle cx="32" cy="28" r="7" fill="url(#g)" />
            </svg>
            <span>M2</span>
          </div>
        </div>
      </section>

      {/* BATTERY */}
      <section className="mb-scene" data-scene data-sticky style={{ "--len": 3 } as CSSProperties}>
        <div className="mb-stick mb-batt-stage">
          <h2 className="mb-grad mb-mid mb-batt-title">
            Até 18 horas
            <br />
            de bateria.
          </h2>
          <div className="mb-batt-lap">
            <Front wall="wa" />
          </div>
        </div>
      </section>

      {/* DESIGN: menos para carregar */}
      <section className="mb-scene mb-less" data-scene>
        <div className="mb-less-row">
          <div className="mb-side mb-side-l"><Front wall="wd" /></div>
          <div className="mb-center">
            <p className="mb-eyebrow">Design</p>
            <h2 className="mb-grad mb-hero2">
              Menos
              <br />
              para carregar.
              <br />
              Mais para
              <span className="mb-bubble" aria-hidden="true">♥</span>
            </h2>
          </div>
          <div className="mb-side mb-side-r"><Front wall="we" /></div>
        </div>
        <p className="mb-copy">
          Redesenhado em torno do chip M2 de nova geração, o MacBook Air é impressionantemente fino e entrega
          velocidade e eficiência excepcionais num gabinete resistente, todo de alumínio. É o notebook ultrarrápido
          e ultraleve para trabalhar, jogar ou criar quase qualquer coisa — em qualquer lugar.
        </p>
        <div className="mb-stats">
          <div><b>1,2</b><span>quilos</span></div>
          <div><b>11,3 mm</b><span>de espessura</span></div>
        </div>
      </section>

      {/* FINISHES */}
      <section className="mb-scene mb-fin" data-scene data-sticky data-finishes data-i="0" style={{ "--len": 4.2 } as CSSProperties}>
        <div className="mb-stick mb-fin-stage">
          <h2 className="mb-title">
            De Meia-noite a Estrelado.
            <br />
            Quatro acabamentos incríveis.
          </h2>
          <p className="mb-sub">
            O MacBook Air vem em quatro acabamentos lindos — cada um com seu cabo MagSafe combinando.
          </p>
          <div className="mb-fin-lap">
            <Top wall="wb" />
          </div>
          <p className="mb-fin-name">
            {finishes.map((f, i) => (
              <span key={f} data-n={i}>{f}</span>
            ))}
          </p>
          <div className="mb-dots" aria-hidden="true">
            {finishes.map((f, i) => (
              <i key={f} data-n={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="mb-details">
        <div className="mb-cards">
          <div className="mb-card mb-card-a">
            <div className="mb-back"><span className="mb-glyph" /></div>
          </div>
          <div className="mb-card mb-card-b">
            <div className="mb-cable" />
            <div className="mb-corner"><i /><i /><i /><i /></div>
          </div>
        </div>
        <div className="mb-points">
          <p><b>Potência em silêncio.</b> Graças à eficiência do chip M2, o MacBook Air entrega desempenho incrível sem ventoinha — fica completamente silencioso, não importa o quanto o trabalho seja intenso.</p>
          <p><b>Feito para durar.</b> Tão responsável quanto durável, o MacBook Air usa 100% de alumínio reciclado no gabinete compacto.</p>
        </div>
      </section>

      {/* SEGURANÇA */}
      <section className="mb-scene mb-sec" data-scene data-sticky style={{ "--len": 7 } as CSSProperties}>
        <div className="mb-stick mb-sec-stage">
          <svg className="mb-sec-diag" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="50" y1="62" x2="10" y2="100" />
            <line x1="50" y1="62" x2="90" y2="100" />
          </svg>
          <i className="mb-sec-line" aria-hidden="true" />
          <div className="mb-ph mb-ph-a" aria-hidden="true"><Phone tone="dark" /></div>
          <div className="mb-ph mb-ph-b" aria-hidden="true"><Phone tone="light" /></div>
          <div className="mb-sec-head">
            <h2 className="mb-sec-title">END-TO-END ENCRYPTION</h2>
            <p className="mb-sec-sub">Through decentralized network with onion routing</p>
          </div>
          <div className="mb-sec-nodes" aria-hidden="true">
            <span className="mb-node mb-node-r"><Person /></span>
            <span className="mb-node mb-node-lock">
              <svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" /></svg>
            </span>
            <span className="mb-node mb-node-t"><Person /></span>
          </div>
          <div className="mb-sec-bar">
            <div className="mb-sec-tabs">
              {["Security", "Chat", "Voice messages", "Storage", "Task setup", "Planner"].map((t) => (
                <span key={t} className={t === "Storage" ? "on" : undefined}>{t}</span>
              ))}
            </div>
            <a href="#specs" className="mb-sec-skip">Skip the intro</a>
          </div>
        </div>
      </section>

      {/* MAPA-MÚNDI DE PONTOS */}
      <section id="world" className="mb-scene mb-world" data-scene data-sticky style={{ "--len": 6 } as CSSProperties}>
        <div className="mb-stick mb-world-stage">
          <DotMap />
          <h2 className="mb-world-intro" aria-label="Onde estamos">
            ONDE
            <br />
            ESTAMOS
          </h2>
          <p className="mb-world-tag">(03) Alcance global</p>
          <div className="mb-world-foot">
            <h2 className="mb-world-title">
              Conectados
              <br />
              em todo o mundo.
            </h2>
            <p className="mb-world-copy">
              De São Paulo para oito cidades em cinco continentes: cada ponto é um lugar onde o MacBook Air já
              chegou, com entrega e suporte locais.
            </p>
          </div>
        </div>
      </section>

      {/* LISTA DE SERVIÇOS */}
      <Services />

      {/* CAPACIDADES + VITRINE ESCURA */}
      <Capabilities />
      <section id="showcase" className="mb-scene mb-sh" data-scene data-sticky style={{ "--len": 3.4 } as CSSProperties}>
        <div className="mb-stick mb-sh-stage">
          <h2 className="mb-sh-head">Em ação</h2>
          <div className="mb-sh-img">
            <div className="mb-sh-bg" />
            <svg className="mb-sh-rock" aria-hidden="true">
              <filter id="mb-rock">
                <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="4" seed="11" />
                <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .62  0 0 0 0 .72  0 0 0 1.6 -.55" />
              </filter>
              <rect width="100%" height="100%" filter="url(#mb-rock)" />
            </svg>
            <i className="mb-sh-lamp" aria-hidden="true" />
            <div className="mb-sh-lap" aria-hidden="true"><Front wall="wa" /></div>
            <h3 className="mb-sh-title">
              O MacBook Air
              <br />
              em qualquer lugar.
            </h3>
            <p className="mb-sh-meta">
              AO LONGO DO DIA
              <br />+ 18 HORAS DE BATERIA
            </p>
            <div className="mb-sh-thumbs">
              <a href="#specs" className="th t1"><span>DESEMPENHO <b>▸</b></span></a>
              <a href="#specs" className="th t2"><span>AUTONOMIA <b>▸</b></span></a>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA: frase + cartões horizontais + painel escuro */}
      <HowItWorks />

      {/* PERFORMANCE */}
      <section id="specs" className="mb-scene mb-perf" data-scene>
        <p className="mb-eyebrow">Desempenho</p>
        <h2 className="mb-grad mb-hero2 mb-center-txt">Prepare-se para decolar.</h2>
        <p className="mb-copy">
          O chip M2 inicia a próxima geração do Apple silicon, com ainda mais velocidade e eficiência que o M1.
          Faça mais em menos tempo, crie imagens e animações com GPU de até 10 núcleos e trabalhe com mais fluxos
          de vídeo 4K e 8K ProRes. E continue o dia todo, e pela noite adentro, com até 18 horas de bateria.
        </p>
        <div className="mb-stats mb-stats3">
          <div><small>Até</small><b>1,4x</b><span>mais rápido que<br />o modelo M1</span></div>
          <div><small>Até</small><b>15x</b><span>mais rápido que o<br />modelo Intel</span></div>
          <div><small>Até</small><b>18 h</b><span>de bateria</span></div>
        </div>
        <div className="mb-apps" aria-hidden="true">
          <div className="mb-apps-track">
            {apps.map((a, i) => (
              <div key={i} className="mb-app" style={{ background: a.c, width: a.w, height: a.h }} />
            ))}
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="mb-buy">
        <h2>MacBook Air</h2>
        <p>A partir de US$ 1.199 · Disponível no próximo mês</p>
        <a href="#overview" className="mb-pill mb-pill-lg">Ver preços</a>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="mb-ft">
        <svg className="mb-ft-mtn" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <filter id="mb-cloud" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="5" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="60" xChannelSelector="R" yChannelSelector="G" result="d" />
              <feGaussianBlur in="d" stdDeviation="1.2" />
            </filter>
            <filter id="mb-fog" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.005 0.016" numOctaves="3" seed="3" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 .6  0 0 0 0 .4  0 0 0 1.4 -.6" />
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <linearGradient id="mb-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8763a" /><stop offset=".35" stopColor="#c2401f" /><stop offset="1" stopColor="#7a1a12" />
            </linearGradient>
            <linearGradient id="mb-g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c8481f" /><stop offset=".4" stopColor="#8f2314" /><stop offset="1" stopColor="#3a0b09" />
            </linearGradient>
            <linearGradient id="mb-g3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a2214" /><stop offset=".5" stopColor="#4a0f0b" /><stop offset="1" stopColor="#1c0505" />
            </linearGradient>
          </defs>
          <g filter="url(#mb-cloud)">
            <path d="M-100 600 L150 520 L330 440 L520 560 L700 620 L900 560 L1100 430 L1300 340 L1500 430 L1700 400 L1700 900 L-100 900Z" fill="url(#mb-g1)" />
            <path d="M-100 690 L100 640 L300 570 L480 660 L680 700 L880 660 L1080 580 L1300 520 L1500 590 L1700 560 L1700 900 L-100 900Z" fill="url(#mb-g2)" />
            <path d="M-100 790 L200 750 L420 720 L640 780 L900 770 L1150 720 L1400 690 L1700 740 L1700 900 L-100 900Z" fill="url(#mb-g3)" />
          </g>
          <rect width="1600" height="900" filter="url(#mb-fog)" opacity=".35" />
        </svg>
        <div className="mb-ft-grid">
          <div>
            <p className="mb-ft-logo">MacBook Air</p>
            <FooterStats />
          </div>

          <nav className="mb-ft-nav" aria-label="Explorar">
            <small>Explorar</small>
            <a href="#overview">Início</a>
            <a href="#why">Por que Mac</a>
            <a href="#specs">Especificações</a>
            <a href="#buy">Comprar</a>
            <a href="#contact">Contato</a>
          </nav>

          <div className="mb-ft-info">
            <div>
              <small>E-mail</small>
              <a href="mailto:contato@exemplo.com">contato@exemplo.com</a>
            </div>
            <div>
              <small>Localização</small>
              <address>
                Av. Paulista, 1000<br />
                Bela Vista<br />
                São Paulo, SP<br />
                01310-100
              </address>
            </div>
            <a href="#contact">LinkedIn</a>
            <a href="#contact">Política de privacidade</a>
            <p className="mb-ft-copy">© 2026 MacBook Air</p>
          </div>
        </div>

        <svg className="mb-ft-word" viewBox="0 0 1000 150" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
          <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs">MACBOOK AIR</text>
        </svg>
      </footer>
    </main>
  );
}
