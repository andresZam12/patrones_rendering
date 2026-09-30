import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fulbito UCC",
  description: "Demo de SSG, ISR, SSR y CSR en un mismo proyecto Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">Fulbito UCC</Link>
          <nav>
            <Link href="/">Inicio</Link>
            <Link href="/standings">Tabla</Link>
            <Link href="/matches/m4">Partido</Link>
            <Link href="/live">En vivo</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
