"use client";

import { useEffect } from "react";
import { isSafari } from "@/lib/utils";

/** Disables CSS smooth-scroll on Safari (no Lenis in this project — same idea). */
export function SafariScroll() {
  useEffect(() => {
    if (!isSafari()) return;
    document.documentElement.classList.add("is-safari");
    return () => {
      document.documentElement.classList.remove("is-safari");
    };
  }, []);

  return null;
}
