"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Particles } from "@/components/particles";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CoffeeParody } from "@/components/coffee-parody";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SafariScroll } from "@/components/safari-scroll";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);
  const onCoffeeActive = useCallback((active: boolean) => {
    setCoffeeMode(active);
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
        <Navbar coffeeMode={coffeeMode} />
        <Hero ready={ready} />
        <Projects />
        <CoffeeParody onActiveChange={onCoffeeActive} />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
