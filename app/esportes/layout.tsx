import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./esportes.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FitMatch — Seu ritmo",
  description: "Ciclismo, surfe, esqui e corrida: encontre o esporte e as pessoas certas para o seu ritmo.",
};

export default function EsportesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`es-root ${inter.variable} ${anton.variable}`}>{children}</div>;
}
