"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { SafariScroll } from "@/components/safari-scroll";
import { DesktopHome } from "@/components/desktop/home";
import { MobileHome } from "@/components/mobile/home";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function HomeApp() {
  const [ready, setReady] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);
  const isMobile = useIsMobile(768);

  const onCoffeeActive = useCallback((active: boolean) => {
    setCoffeeMode(active);
  }, []);

  return (
    <>
      <SafariScroll />
      <AnimatePresence>
        {!ready && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      {isMobile === null ? null : isMobile ? (
        <MobileHome
          ready={ready}
          coffeeMode={coffeeMode}
          onCoffeeActive={onCoffeeActive}
        />
      ) : (
        <DesktopHome
          ready={ready}
          coffeeMode={coffeeMode}
          onCoffeeActive={onCoffeeActive}
        />
      )}
    </>
  );
}
