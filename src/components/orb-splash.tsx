"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Orb = dynamic(() => import("./bits/orb").then((m) => m.Orb), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "grow" | "handoff" | "gone";

export function OrbSplash({
  onHandoff,
  onDone,
}: {
  onHandoff: () => void;
  onDone: () => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "gone" : "grow");

  useEffect(() => {
    document.getElementById("boot-splash")?.remove();
  }, []);

  useEffect(() => {
    if (reduced) {
      onHandoff();
      onDone();
      return;
    }

    const y = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";

    const handoff = window.setTimeout(() => {
      setPhase("handoff");
      onHandoff();
    }, 1200);

    const gone = window.setTimeout(() => setPhase("gone"), 2200);

    return () => {
      window.clearTimeout(handoff);
      window.clearTimeout(gone);
      html.style.overflow = prevHtml;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [reduced, onHandoff, onDone]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {phase !== "gone" && (
        <motion.div
          key="orb-splash"
          className="pointer-events-none fixed inset-0 z-[200]"
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-obsidian"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "handoff" ? 0 : 1 }}
            transition={{ duration: 0.9, ease }}
          />

          <motion.div
            className="absolute inset-[-10%]"
            initial={{ scale: 0.12, opacity: 0.4 }}
            animate={{
              scale: 1,
              opacity: phase === "handoff" ? 0 : 0.7,
            }}
            transition={{
              scale: { duration: 1.15, ease },
              opacity: {
                duration: phase === "handoff" ? 0.9 : 0.55,
                ease,
              },
            }}
            style={{ transformOrigin: "50% 45%" }}
          >
            <Orb
              hue={0}
              hoverIntensity={2}
              rotateOnHover
              forceHoverState={false}
              backgroundColor="#000000"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
