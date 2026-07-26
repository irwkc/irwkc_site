"use client";

import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "../icons/github";
import { TelegramIcon } from "../icons/telegram";
import { siteConfig, telegramLink } from "@/data/site";
import { useHeroReveal } from "@/hooks/use-hero-reveal";
import { cn } from "@/lib/utils";

export function DesktopHero({ ready }: { ready: boolean }) {
  const containerRef = useHeroReveal(ready);

  return (
    <section
      ref={containerRef}
      className={cn("hero relative flex min-h-screen items-center pt-24")}
    >
      <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[80px]" />

      <div className="section-padding relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="hero-line mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Привет, я
          </p>

          <h1 className="hero-line text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>

          <p className="hero-line mt-3 text-sm font-medium tracking-wide text-white/35 md:text-base">
            {siteConfig.title}
          </p>

          <p className="hero-line mt-6 max-w-xl text-base leading-relaxed text-muted/80">
            {siteConfig.tagline}
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <a
              href={telegramLink(
                "Привет! Пишу с портфолио — хочу обсудить проект."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-[#0f172a] transition-transform hover:scale-105"
            >
              <TelegramIcon className="h-4 w-4" />
              Написать в Telegram
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition-all hover:border-white/30 hover:bg-white/5"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-500",
          ready ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/60 animate-scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
