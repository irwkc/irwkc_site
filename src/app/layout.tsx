import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.ttf",
  variable: "--font-space-grotesk",
  weight: "200 800",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
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
        {children}
      </body>
    </html>
  );
}
