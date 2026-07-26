"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "../icons/github";
import { TelegramIcon } from "../icons/telegram";
import { siteConfig, telegramLink } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileHero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const el = containerRef.current;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        el.classList.add("hero-ready");
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [ready]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "hero relative flex min-h-[100dvh] flex-col justify-end px-5 pb-10 pt-24"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(129,140,248,0.16),_transparent_55%)]" />

      <div className="relative z-10">
        <p className="hero-line mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          Привет, я
        </p>
        <h1 className="hero-line text-[3.1rem] font-bold leading-[0.95] tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="hero-line mt-3 text-sm text-white/40">{siteConfig.title}</p>
        <p className="hero-line mt-5 text-[15px] leading-relaxed text-muted/85">
          {siteConfig.tagline}
        </p>

        <div className="hero-cta mt-8 grid gap-3">
          <a
            href={telegramLink(
              "Привет! Пишу с портфолио — хочу обсудить проект."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-cream px-5 py-3.5 text-sm font-semibold text-[#0f172a]"
          >
            <TelegramIcon className="h-4 w-4" />
            Написать в Telegram
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-3.5 text-sm font-medium"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
          </a>
        </div>
      </div>
    </section>
  );
}
