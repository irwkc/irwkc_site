"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GitHubIcon } from "../icons/github";
import { TelegramIcon } from "../icons/telegram";
import { siteConfig, navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function DesktopNavbar({ coffeeMode = false }: { coffeeMode?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (coffeeMode) setMenuOpen(false);
  }, [coffeeMode]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          coffeeMode
            ? "bg-white py-2.5 shadow-sm sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
        style={
          coffeeMode ? { fontFamily: "Arial, Helvetica, sans-serif" } : undefined
        }
      >
        {coffeeMode ? (
          <div className="flex w-full items-center justify-between gap-3 px-3 text-[12px] text-[#222] sm:px-4 sm:text-[13px] md:px-10">
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              <span className="shrink-0 text-[14px] font-bold tracking-tight sm:text-[15px]">
                COFFEE HOUSE
              </span>
              <nav className="hidden gap-5 text-[#555] sm:flex">
                <span>Меню</span>
                <span>О нас</span>
                <span>Контакты</span>
              </nav>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-none bg-[#6f4e37] px-2.5 py-1.5 text-[11px] font-medium text-white sm:px-3 sm:text-[12px]"
            >
              <span className="sm:hidden">Бронь</span>
              <span className="hidden sm:inline">Забронировать стол</span>
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between px-4 md:px-5">
            <a
              href="#"
              className="flex items-center transition-opacity hover:opacity-70"
              aria-label={siteConfig.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt={siteConfig.name}
                className="h-6 w-auto md:h-7"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </a>

            <div className="hidden items-center gap-6 md:flex">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground"
              >
                <TelegramIcon className="h-4 w-4" />
                <span className="font-mono">{siteConfig.telegramHandle}</span>
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
                <span className="font-mono">GitHub</span>
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                className="rounded-full border border-white/10 p-2.5 transition-colors hover:border-white/20"
                aria-label="Открыть меню"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-white/10 p-2.5 md:hidden"
              aria-label="Открыть меню"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      <AnimatePresence>
        {menuOpen && !coffeeMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/10 p-3"
                  aria-label="Закрыть меню"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-bold tracking-tight transition-colors hover:text-accent sm:text-4xl md:text-6xl"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 flex items-center gap-2 text-lg font-medium text-accent sm:text-xl"
                >
                  <TelegramIcon className="h-5 w-5" />
                  {siteConfig.telegramHandle}
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
