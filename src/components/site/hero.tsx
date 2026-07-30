"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { telegramLink } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Orb = dynamic(() => import("../bits/orb").then((m) => m.Orb), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteHero({ intro = false }: { intro?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden border-b border-graphite">
      {/* Orb stays put — splash morphs into this layer */}
      <div className="pointer-events-none absolute inset-0">
        {!reduced && (
          <div className="absolute inset-[-10%] opacity-70 md:opacity-80">
            <Orb
              hue={30}
              hoverIntensity={0.25}
              forceHoverState
              backgroundColor="#101010"
            />
          </div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/25"
          initial={false}
          animate={{ opacity: intro ? 0 : 1 }}
          transition={{ duration: 0.95, ease, delay: intro ? 0 : 0.08 }}
        />
      </div>

      <motion.div
        className="site-container relative z-10 pb-12 pt-24 md:pb-16 md:pt-28"
        initial={false}
        animate={{ opacity: intro ? 0 : 1, y: intro ? 18 : 0 }}
        transition={{ duration: 0.9, ease, delay: intro ? 0 : 0.18 }}
      >
        <h1 className="max-w-[16ch] text-[1.85rem] font-normal leading-[1.15] tracking-tight text-chalk md:max-w-[20ch] md:text-[2.75rem] md:leading-[1.1]">
          Сильный веб для
          <br />
          растущих продуктов.
        </h1>

        <a
          href={telegramLink(
            "Привет! Пишу с портфолио — хочу обсудить проект."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill mt-8"
        >
          Начать проект
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}
