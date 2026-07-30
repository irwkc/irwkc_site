"use client";

import dynamic from "next/dynamic";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ASCIIText = dynamic(
  () => import("../bits/ascii-text").then((m) => m.ASCIIText),
  { ssr: false }
);

export function SiteFooter() {
  const reduced = useReducedMotion();

  return (
    <footer className="border-t border-graphite">
      <div className="site-container pt-8 pb-0">
        <div className="flex items-center justify-between gap-4 border-b border-graphite pb-8">
          <p className="text-sm text-smoke">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <button
            type="button"
            aria-label="Наверх"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-smoke transition-colors hover:border-white/30 hover:text-chalk"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <div className="relative -mx-5 mt-4 mb-0 h-44 w-[calc(100%+2.5rem)] overflow-hidden sm:mx-0 sm:h-48 sm:w-full md:h-52 lg:h-60">
          {reduced ? (
            <p className="flex h-full items-end px-5 font-mono text-[clamp(4.5rem,22vw,8rem)] leading-none tracking-tighter text-chalk/90 sm:px-0">
              {siteConfig.name}
            </p>
          ) : (
            <ASCIIText
              text={siteConfig.name}
              asciiFontSize={7}
              textFontSize={280}
              textColor="#f3f3f3"
              planeBaseHeight={7}
              enableWaves={false}
            />
          )}
        </div>
      </div>
    </footer>
  );
}
