"use client";

import { useCallback, useState } from "react";
import { SafariScroll } from "@/components/safari-scroll";
import { OrbSplash } from "@/components/orb-splash";
import { SiteShell } from "@/components/site/shell";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HomeApp() {
  const reduced = useReducedMotion();
  const [splash, setSplash] = useState(!reduced);
  const [handoff, setHandoff] = useState(reduced);

  const onHandoff = useCallback(() => setHandoff(true), []);
  const onSplashDone = useCallback(() => setSplash(false), []);

  return (
    <>
      <SafariScroll />
      {splash && <OrbSplash onHandoff={onHandoff} onDone={onSplashDone} />}
      <SiteShell intro={!handoff} />
    </>
  );
}
