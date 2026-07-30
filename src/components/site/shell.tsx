"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteNavbar } from "./navbar";
import { SiteHero } from "./hero";
import { SiteServices } from "./services";
import { SiteProjects } from "./projects";
import { SiteStack } from "./stack";
import { SiteContact } from "./contact";
import { SiteFooter } from "./footer";

const DotGrid = dynamic(() => import("../bits/dot-grid").then((m) => m.DotGrid), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteShell({ intro = false }: { intro?: boolean }) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-chalk">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        initial={false}
        animate={{ opacity: intro ? 0 : 0.8 }}
        transition={{ duration: 0.9, ease, delay: intro ? 0 : 0.15 }}
      >
        <div className="h-full w-full md:opacity-90">
          <DotGrid
            dotSize={mobile ? 2.5 : 2}
            gap={mobile ? 22 : 28}
            baseColor="#212121"
            activeColor="#c1c1c1"
            proximity={mobile ? 100 : 140}
          />
        </div>
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={false}
          animate={{ opacity: intro ? 0 : 1, y: intro ? -8 : 0 }}
          transition={{ duration: 0.75, ease, delay: intro ? 0 : 0.2 }}
        >
          <SiteNavbar />
        </motion.div>

        <main>
          <SiteHero intro={intro} />
          <motion.div
            initial={false}
            animate={{ opacity: intro ? 0 : 1 }}
            transition={{ duration: 0.8, ease, delay: intro ? 0 : 0.25 }}
          >
            <SiteServices />
            <SiteProjects />
            <SiteStack />
            <SiteContact />
          </motion.div>
        </main>

        <motion.div
          initial={false}
          animate={{ opacity: intro ? 0 : 1 }}
          transition={{ duration: 0.8, ease, delay: intro ? 0 : 0.3 }}
        >
          <SiteFooter />
        </motion.div>
      </div>
    </div>
  );
}
