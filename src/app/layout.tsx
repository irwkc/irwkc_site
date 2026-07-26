import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "200 800",
  display: "swap",
  // Safari iOS delays first paint on font preload — load fonts after paint.
  preload: false,
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "irwkc | Full-Stack Developer",
  description:
    "Портфолио irwkc — Full-Stack Developer, создаю современные высокопроизводительные веб-приложения.",
  openGraph: {
    title: "irwkc | Full-Stack Developer",
    description: "Создаю современные высокопроизводительные веб-приложения.",
    type: "website",
  },
};

const bootSplashStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 200,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: "2rem",
  background: "#030712",
  pointerEvents: "none" as const,
};

const bootPctStyle = {
  font: '700 clamp(3.5rem, 12vw, 6rem)/1 ui-monospace, SFMono-Regular, Menlo, monospace',
  letterSpacing: "-0.04em",
  color: "rgba(248, 250, 252, 0.9)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" style={{ background: "#030712" }}>
      <head>
        {/* Keep a tiny blocking style early for browsers that wait on head CSS */}
        <style>{`html,body{background:#030712;margin:0}`}</style>
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
        style={{ background: "#030712", margin: 0 }}
      >
        <div id="boot-splash" aria-hidden="true" style={bootSplashStyle}>
          <span id="boot-splash-pct" style={bootPctStyle}>
            0 %
          </span>
        </div>
        {children}
      </body>
    </html>
  );
}
