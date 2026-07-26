import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "200 800",
  display: "swap",
  // Safari iOS can delay first paint until preloaded fonts finish —
  // keep swap, skip preload so the splash shows immediately.
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

const bootCriticalCss = `
html,body{background:#030712;margin:0}
#boot-splash{position:fixed;inset:0;z-index:200;display:flex;align-items:flex-end;justify-content:flex-end;padding:2rem;background:#030712;pointer-events:none}
#boot-splash-pct{font:700 clamp(3.5rem,12vw,6rem)/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-.04em;color:rgba(248,250,252,.9)}
`.replace(/\n/g, "");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{ __html: bootCriticalCss }} />
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
        style={{ background: "#030712" }}
      >
        <div id="boot-splash" aria-hidden="true">
          <span id="boot-splash-pct">0 %</span>
        </div>
        {children}
      </body>
    </html>
  );
}
