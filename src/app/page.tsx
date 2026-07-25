"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Particles } from "@/components/particles";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TildaParody } from "@/components/tilda-parody";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SafariScroll } from "@/components/safari-scroll";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [tildaMode, setTildaMode] = useState(false);
  const onTildaActive = useCallback((active: boolean) => {
    setTildaMode(active);
  }, []);

  return (
    <>
      <SafariScroll />
      <AnimatePresence>
        {!ready && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <main className="relative">
        <div data-chrome="portfolio">
          <Particles />
        </div>
        <Navbar tildaMode={tildaMode} />
        <Hero ready={ready} />
        <Projects />
        <TildaParody onActiveChange={onTildaActive} />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
