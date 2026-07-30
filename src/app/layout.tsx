import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  preload: false,
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
});

const siteUrl = "https://irwkc.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "irwkc | Full-Stack Developer",
    template: "%s | irwkc",
  },
  description:
    "Портфолио irwkc — Full-Stack Developer. Современные высокопроизводительные веб-приложения с уникальным дизайном.",
  applicationName: "irwkc",
  authors: [{ name: "irwkc", url: siteUrl }],
  creator: "irwkc",
  keywords: [
    "irwkc",
    "full-stack",
    "developer",
    "Next.js",
    "React",
    "портфолио",
    "веб-разработка",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "irwkc | Full-Stack Developer",
    description:
      "Создаю современные высокопроизводительные веб-приложения с уникальным дизайном.",
    url: siteUrl,
    siteName: "irwkc",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "irwkc | Full-Stack Developer",
    description:
      "Создаю современные высокопроизводительные веб-приложения с уникальным дизайном.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "48x48" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const bootSplashStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 200,
  background: "#101010",
  pointerEvents: "none" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" style={{ background: "#101010" }}>
      <head>
        <style>{`html,body{background:#101010;margin:0}`}</style>
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
        style={{ background: "#101010", margin: 0 }}
      >
        <div id="boot-splash" aria-hidden="true" style={bootSplashStyle} />
        {children}
      </body>
    </html>
  );
}
