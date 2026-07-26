"use client";

import { useLayoutEffect, useRef } from "react";

/** Starts the CSS hero stagger only after the splash hands off. */
export function useHeroReveal(ready: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!ready) {
      el.classList.remove("hero-ready");
      return;
    }

    el.classList.remove("hero-ready");
    void el.offsetWidth;

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

  return containerRef;
}
