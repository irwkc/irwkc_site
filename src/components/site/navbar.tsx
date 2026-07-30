"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig, telegramLink } from "@/data/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const items = [
  { label: "услуги", href: "#services" },
  { label: "проекты", href: "#projects" },
  { label: "стек", href: "#tech-stack" },
  { label: "контакты", href: "#contact" },
  {
    label: "написать",
    href: telegramLink("Привет! Пишу с портфолио."),
    external: true,
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function TypeLine({
  text,
  active,
  reduced,
  delay,
}: {
  text: string;
  active: boolean;
  reduced: boolean;
  delay: number;
}) {
  const [shown, setShown] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let i = 0;
    let tick: number | undefined;
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length && tick) window.clearInterval(tick);
      }, 28);
    }, delay);
    return () => {
      window.clearTimeout(start);
      if (tick) window.clearInterval(tick);
    };
  }, [text, delay, reduced]);

  return (
    <span className="inline-flex items-center">
      <span>{text.slice(0, shown)}</span>
      {shown < text.length ? (
        <span
          className="caret-blink ml-0.5 inline-block h-[0.85em] w-[0.45em] bg-chalk"
          aria-hidden
        />
      ) : (
        <span
          className={cn(
            "ml-3 inline-block h-2 w-2 rounded-full bg-steel transition-opacity duration-300",
            active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
        />
      )}
    </span>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    return () => {
      html.style.overflow = prevHtml;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActive(0);
      return;
    }

    const run = (i: number) => {
      const item = items[i];
      if (!item) return;
      setOpen(false);
      if ("external" in item && item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.hash = item.href.slice(1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((v) => (v + 1) % items.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((v) => (v - 1 + items.length) % items.length);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        run(active);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 bg-transparent",
          open ? "z-[70]" : "z-50"
        )}
      >
        <div className="site-container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <a
            href="/"
            className="flex items-center transition-opacity hover:opacity-70"
            aria-label={siteConfig.name}
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt={siteConfig.name}
              className="h-6 w-auto md:h-7"
              decoding="async"
            />
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-chalk transition-colors hover:border-white/30"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.22, ease }}
                className="inline-flex"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[60] bg-carbon/97 backdrop-blur-sm"
            style={{ height: "100dvh" }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease, delay: 0.05 }}
              className="site-container flex h-full flex-col justify-center gap-3 pb-[env(safe-area-inset-bottom)] pt-16 md:gap-5"
            >
              {items.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    ease,
                    delay: 0.08 + i * 0.07,
                  }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-mono text-[clamp(2.4rem,9vw,5.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.04em] transition-colors duration-300",
                    active === i ? "text-chalk" : "text-iron hover:text-ash"
                  )}
                >
                  <TypeLine
                    text={item.label}
                    active={active === i}
                    reduced={reduced}
                    delay={120 + i * 180}
                  />
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
