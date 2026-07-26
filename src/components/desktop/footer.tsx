"use client";

import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";

export function DesktopFooter() {
  return (
    <footer className="border-t border-white/8 px-4 py-8 md:px-5">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-white/30 hover:bg-white/5 hover:text-foreground"
          aria-label="Наверх"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
