"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { TelegramIcon } from "../icons/telegram";
import { siteConfig, navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileNavbar({ coffeeMode = false }: { coffeeMode?: boolean }) {
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
          "fixed left-0 right-0 top-0 z-50",
          coffeeMode ? "bg-white py-2.5 shadow-sm" : "bg-transparent py-3"
        )}
        style={
          coffeeMode ? { fontFamily: "Arial, Helvetica, sans-serif" } : undefined
        }
      >
        {coffeeMode ? (
          <div className="flex items-center justify-between px-3 text-[12px] text-[#222]">
            <span className="font-bold">COFFEE HOUSE</span>
            <button
              type="button"
              className="bg-[#6f4e37] px-2.5 py-1.5 text-[11px] font-medium text-white"
            >
              Бронь
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt={siteConfig.name} className="h-6 w-auto" />
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-white/10 p-2.5"
              aria-label="Открыть меню"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        )}
      </header>

      {menuOpen && !coffeeMode && (
        <div className="fixed inset-0 z-[60] bg-[#030712]">
          <div className="flex h-full flex-col px-5 pb-10 pt-4">
            <div className="flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/10 p-3"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-bold tracking-tight"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center gap-2 text-lg text-accent"
              >
                <TelegramIcon className="h-5 w-5" />
                {siteConfig.telegramHandle}
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
