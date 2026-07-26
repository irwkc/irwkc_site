"use client";

import dynamic from "next/dynamic";
import { MobileNavbar } from "./navbar";
import { MobileHero } from "./hero";
import { MobileProjects } from "./projects";
import { MobileTechStack } from "./tech-stack";
import { MobileContact } from "./contact";
import { MobileFooter } from "./footer";

const CoffeeParody = dynamic(
  () => import("../coffee-parody").then((m) => m.CoffeeParody),
  { ssr: false }
);

export function MobileHome({
  ready,
  coffeeMode,
  onCoffeeActive,
}: {
  ready: boolean;
  coffeeMode: boolean;
  onCoffeeActive: (active: boolean) => void;
}) {
  return (
    <main className="relative">
      <MobileNavbar coffeeMode={coffeeMode} />
      <MobileHero ready={ready} />
      <MobileProjects />
      <CoffeeParody onActiveChange={onCoffeeActive} />
      <MobileTechStack />
      <MobileContact />
      <MobileFooter />
    </main>
  );
}
