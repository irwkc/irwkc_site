"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons/github";
import { TelegramIcon } from "./icons/telegram";
import gsap from "gsap";
import { siteConfig, telegramLink } from "@/data/site";
import { cn, isSafari } from "@/lib/utils";

export function Hero({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    // Safari: GSAP opacity + transform after overlay often sticks at 0 — CSS reveal instead.
    if (isSafari()) {
      containerRef.current.classList.add("hero-ready");
      return;
    }

    let ctx: gsap.Context | undefined;
    const id = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
        const ctas = gsap.utils.toArray<HTMLElement>(".hero-cta");

        gsap.set([...lines, ...ctas], { opacity: 0, y: 28 });

        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        });
        gsap.to(ctas, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.28,
        });
      }, containerRef);
    });

    return () => {
      cancelAnimationFrame(id);
      ctx?.revert();
    };
  }, [ready]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "hero relative flex min-h-screen items-center pt-24",
        ready && isSafari() && "hero-ready"
      )}
    >
      <div className="absolute right-1/4 top-1/3 h-[240px] w-[240px] rounded-full bg-indigo-600/10 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 h-[200px] w-[200px] rounded-full bg-purple-600/10 blur-[60px] sm:h-[300px] sm:w-[300px] sm:blur-[80px]" />

      <div className="section-padding relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="hero-line mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent sm:mb-4 sm:text-sm">
            Привет, я
          </p>

          <h1 className="hero-line text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>

          <p className="hero-line mt-3 text-sm font-medium tracking-wide text-white/35 md:text-base">
            {siteConfig.title}
          </p>

          <p className="hero-line mt-5 max-w-xl text-sm leading-relaxed text-muted/80 sm:mt-6 sm:text-base">
            {siteConfig.tagline}
          </p>

          <div className="hero-cta mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={telegramLink(
                "Привет! Пишу с портфолио — хочу обсудить проект."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-[#0f172a] transition-transform hover:scale-105 sm:px-7"
            >
              <TelegramIcon className="h-4 w-4" />
              Написать в Telegram
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition-all hover:border-white/30 hover:bg-white/5"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-500 sm:bottom-8 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/60 animate-scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
