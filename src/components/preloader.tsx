"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({
  onReveal,
  onComplete,
}: {
  onReveal: () => void;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;
  const finishedRef = useRef(false);

  useEffect(() => {
    document.getElementById("boot-splash")?.remove();

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const blockScroll = (e: Event) => e.preventDefault();
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, []);

  useEffect(() => {
    const boot = document.getElementById("boot-splash-pct");
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment =
          prev < 70 ? Math.random() * 18 + 8 : Math.random() * 10 + 4;
        const next = Math.min(100, prev + increment);
        if (boot) boot.textContent = `${Math.floor(next)} %`;
        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100 || finishedRef.current) return;
    finishedRef.current = true;

    // Start hero while splash is still covering the page
    onRevealRef.current();

    const exitTimer = window.setTimeout(() => {
      setVisible(false);
    }, 120);

    const doneTimer = window.setTimeout(() => {
      onCompleteRef.current();
    }, 620);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-end justify-end bg-[#030712] p-8 md:p-12"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
          </div>
          <span className="font-mono text-6xl font-bold tracking-tighter text-white/90 md:text-8xl">
            {Math.floor(progress)} %
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
