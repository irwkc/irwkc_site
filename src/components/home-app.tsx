"use client";

import { useCallback, useState } from "react";
import { Preloader } from "@/components/preloader";
import { SafariScroll } from "@/components/safari-scroll";
import { DesktopHome } from "@/components/desktop/home";
import { MobileHome } from "@/components/mobile/home";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function HomeApp() {
  const [reveal, setReveal] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);
  const isMobile = useIsMobile(768);

  const onCoffeeActive = useCallback((active: boolean) => {
    setCoffeeMode(active);
  }, []);

  return (
    <>
      <SafariScroll />

      {/* Home mounts under the splash so the hero is already painted */}
      {isMobile ? (
        <MobileHome
          ready={reveal}
          coffeeMode={coffeeMode}
          onCoffeeActive={onCoffeeActive}
        />
      ) : (
        <DesktopHome
          ready={reveal}
          coffeeMode={coffeeMode}
          onCoffeeActive={onCoffeeActive}
        />
      )}

      {!splashDone && (
        <Preloader
          onReveal={() => setReveal(true)}
          onComplete={() => setSplashDone(true)}
        />
      )}
    </>
  );
}
