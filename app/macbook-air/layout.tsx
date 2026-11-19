import type { Metadata } from "next";
import { Inter, Space_Mono, Orbitron } from "next/font/google";
import "./macbook.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "MacBook Air — Chip M2",
  description: "Recriação da página de produto do MacBook Air com chip M2.",
};

export default function MacbookLayout({ children }: { children: React.ReactNode }) {
  return <div className={`mb ${inter.variable} ${mono.variable} ${orbitron.variable}`}>{children}</div>;
}
