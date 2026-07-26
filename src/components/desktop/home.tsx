"use client";

import dynamic from "next/dynamic";
import { DesktopNavbar } from "./navbar";
import { DesktopHero } from "./hero";
import { DesktopProjects } from "./projects";
import { DesktopTechStack } from "./tech-stack";
import { DesktopContact } from "./contact";
import { DesktopFooter } from "./footer";

const Particles = dynamic(
  () => import("../particles").then((m) => m.Particles),
  { ssr: false }
);

const CoffeeParody = dynamic(
  () => import("../coffee-parody").then((m) => m.CoffeeParody),
  { ssr: false }
);

export function DesktopHome({
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
      <div data-chrome="portfolio">
        <Particles />
      </div>
      <DesktopNavbar coffeeMode={coffeeMode} />
      <DesktopHero ready={ready} />
      <DesktopProjects />
      <CoffeeParody onActiveChange={onCoffeeActive} />
      <DesktopTechStack />
      <DesktopContact />
      <DesktopFooter />
    </main>
  );
}
