"use client";

import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";

export function MobileFooter() {
  return (
    <footer className="border-t border-white/8 px-5 py-7">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-muted"
          aria-label="Наверх"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
