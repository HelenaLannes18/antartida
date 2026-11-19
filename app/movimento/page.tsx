import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import Link from "next/link";
import Reel from "./Reel";
import { CLIPS, type Clip } from "./clips";
import Scroll from "./Scroll";
import DotMap from "./DotMap";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import FooterStats from "./FooterStats";
import Expedicoes from "./Expedicoes";
import Difference from "./Difference";
import Mao from "./Mao";
import ClBar from "./ClBar";
import ClRitmo from "./ClRitmo";
import ClDial from "./ClDial";
import ClEsportes from "./ClEsportes";
import ClNumeros from "./ClNumeros";
import ClApp from "./ClApp";
import Modalidades from "./Modalidades";
import Tour from "./Tour";

/** Só entram na montagem os vídeos que existem em /public; a capa só vale se o arquivo existir. */
function availableClips(): Clip[] {
  const pub = path.join(process.cwd(), "public");
  const has = (file: string) => existsSync(path.join(pub, file));
  return CLIPS.filter((c) => has(c.src)).map((c) => ({ ...c, poster: c.poster && has(c.poster) ? c.poster : undefined }));
}

const len = (n: number) => ({ "--len": n }) as CSSProperties;

export default function Movimento() {
  return (
    <main>
      <Reel clips={availableClips()} />

      <div className="mx">
        <Scroll />

        {/* TOUR DO APP (fundo branco): um celular que troca de tela a cada capítulo, com as telas reais do aplicativo */}
        <Tour />

        {/* MAPA-MÚNDI DE PONTOS */}
        <section id="world" className="mx-scene mx-world" data-scene data-sticky style={len(6)}>
          <div className="mx-stick mx-world-stage">
            <DotMap />
            <h2 className="mx-world-intro" aria-label="Onde treinamos">
              ONDE
              <br />
              TREINAMOS
            </h2>
            <p className="mx-world-tag">(01) Comunidade global</p>
            <div className="mx-world-foot">
              <h2 className="mx-world-title">
                Gente treinando
                <br />
                em todo o mundo.
              </h2>
              <p className="mx-world-copy">
                De São Paulo para oito cidades em cinco continentes: cada ponto é um lugar onde a comunidade FitMatch
                já combinou trilhas, ondas, corridas e treinos.
              </p>
            </div>
          </div>
        </section>

        {/* LISTA DE ESPORTES */}
        <Services />

        {/* A DIFERENÇA: celular 3D que gira ao rolar, com pontos de detalhe */}
        <Difference />

        {/* NA MÃO: uma mão em 3D segura o celular, que passa pelas telas do app ao rolar */}
        <div className="mx-cl mao-wrap">
          <Mao />
        </div>

        {/* CAPÍTULO LIMPO: ritmo, esportes, números e app */}
        <div className="mx-cl">
          <ClBar />
          <ClRitmo />
          <ClDial />
          <ClEsportes />
          <ClNumeros />
          <ClApp />
        </div>

        {/* ÍNDICE DE MODALIDADES: nomes gigantes, foto no meio e vídeo de fundo no hover */}
        <Modalidades />
        {/* COMO FUNCIONA: carrossel 3D girado pela rolagem + revelação com zoom */}
        <HowItWorks />

        {/* NOSSAS EXPEDIÇÕES */}
        <Expedicoes />

        {/* RODAPÉ */}
        <footer id="comecar" className="mx-ft">
          <svg className="mx-ft-mtn" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <filter id="mx-cloud" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="5" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="60" xChannelSelector="R" yChannelSelector="G" result="d" />
                <feGaussianBlur in="d" stdDeviation="1.2" />
              </filter>
              <filter id="mx-fog" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.005 0.016" numOctaves="3" seed="3" />
                <feColorMatrix values="0 0 0 0 1  0 0 0 0 .6  0 0 0 0 .4  0 0 0 1.4 -.6" />
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <linearGradient id="mx-g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e8763a" /><stop offset=".35" stopColor="#c2401f" /><stop offset="1" stopColor="#7a1a12" />
              </linearGradient>
              <linearGradient id="mx-g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c8481f" /><stop offset=".4" stopColor="#8f2314" /><stop offset="1" stopColor="#3a0b09" />
              </linearGradient>
              <linearGradient id="mx-g3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8a2214" /><stop offset=".5" stopColor="#4a0f0b" /><stop offset="1" stopColor="#1c0505" />
              </linearGradient>
            </defs>
            <g filter="url(#mx-cloud)">
              <path d="M-100 600 L150 520 L330 440 L520 560 L700 620 L900 560 L1100 430 L1300 340 L1500 430 L1700 400 L1700 900 L-100 900Z" fill="url(#mx-g1)" />
              <path d="M-100 690 L100 640 L300 570 L480 660 L680 700 L880 660 L1080 580 L1300 520 L1500 590 L1700 560 L1700 900 L-100 900Z" fill="url(#mx-g2)" />
              <path d="M-100 790 L200 750 L420 720 L640 780 L900 770 L1150 720 L1400 690 L1700 740 L1700 900 L-100 900Z" fill="url(#mx-g3)" />
            </g>
            <rect width="1600" height="900" filter="url(#mx-fog)" opacity=".35" />
          </svg>
          <div className="mx-ft-grid">
            <div>
              <p className="mx-ft-logo">FitMatch</p>
              <FooterStats />
            </div>

            <nav className="mx-ft-nav" aria-label="Explorar">
              <small>Explorar</small>
              <Link href="/movimento">Início</Link>
              <Link href="/esportes">Esportes</Link>
              <a href="#world">Comunidade</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#comecar">Criar perfil</a>
            </nav>

            <div className="mx-ft-info">
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
              <a href="#comecar">Instagram</a>
              <a href="#comecar">Política de privacidade</a>
              <p className="mx-ft-copy">© 2026 FitMatch</p>
            </div>
          </div>

          <svg className="mx-ft-word" viewBox="0 0 1000 150" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
            <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs">FITMATCH</text>
          </svg>
        </footer>
      </div>
    </main>
  );
}
