"use client";

import { useCallback, useState } from "react";
import { Preloader } from "@/components/preloader";
import { SafariScroll } from "@/components/safari-scroll";
import { DesktopHome } from "@/components/desktop/home";

export function HomeApp() {
  const [reveal, setReveal] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);

  const onCoffeeActive = useCallback((active: boolean) => {
    setCoffeeMode(active);
  }, []);

  return (
    <>
      <SafariScroll />

      <DesktopHome
        ready={reveal}
        coffeeMode={coffeeMode}
        onCoffeeActive={onCoffeeActive}
      />

      {!splashDone && (
        <Preloader
          onReveal={() => setReveal(true)}
          onComplete={() => setSplashDone(true)}
        />
      )}
    </>
  );
}
