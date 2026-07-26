import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-space-grotesk",
  weight: "200 800",
  display: "swap",
  preload: true,
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: true,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
      >
        <div id="boot-splash" className="boot-splash" aria-hidden="true">
          <span id="boot-splash-pct" className="boot-splash-pct">
            0 %
          </span>
        </div>
        {children}
      </body>
    </html>
  );
}
