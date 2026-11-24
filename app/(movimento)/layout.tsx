import type { Metadata } from "next";
import { Archivo, Barlow_Condensed, Inter, Inter_Tight, JetBrains_Mono, Orbitron, Outfit, Roboto_Mono } from "next/font/google";
import "./movimento.css";
import "./sections.css";
import "./app-screens.css";
import "./difference.css";
import "./clean.css";
import "./modalidades.css";
import "./tour.css";
import "./mao.css";
import "./contato.css";

const grotesk = Inter_Tight({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

// o componente "Scroll Zoom Reveal" usa o Inter normal (não o Inter Tight do resto da página), como na referência do Framer
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// só o hero usa estas duas: título largo e pesado + mono de caixa alta (como no site de referência)
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const heroMono = Roboto_Mono({
  variable: "--font-hero-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const cond = Barlow_Condensed({
  variable: "--font-cond",
  subsets: ["latin"],
  weight: ["700", "800"],
});

// a mesma fonte do aplicativo, usada nas telas dentro dos celulares 3D
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SquadFit",
  description: "Trilha, surfe, neve, pista e academia: o mundo é o seu lugar de treinar. Encontre o esporte e as pessoas certas.",
};

export default function MovimentoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`mv-root ${grotesk.variable} ${inter.variable} ${mono.variable} ${archivo.variable} ${heroMono.variable} ${orbitron.variable} ${cond.variable} ${outfit.variable}`}>
      {children}
    </div>
  );
}
