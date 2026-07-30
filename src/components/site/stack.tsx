"use client";

import { techStack } from "@/data/site";
import { Reveal } from "./reveal";

export function SiteStack() {
  return (
    <section id="tech-stack" className="section-y border-b border-graphite">
      <div className="site-container">
        <Reveal className="mb-10 md:mb-14">
          <p className="meta-label mb-3">Инструменты</p>
          <h2 className="section-title">Стек</h2>
        </Reveal>

        <Reveal>
          <div className="border-t border-graphite pt-8 md:pt-10">
            <p className="font-mono text-xs leading-relaxed text-iron md:text-sm">
              {techStack.map((t) => t.short.toLowerCase()).join(" · ")}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
              {techStack.map((tech) => (
                <li
                  key={tech.name}
                  className="font-mono text-sm text-ash transition-colors duration-300 hover:text-steel-bright"
                >
                  <span className="text-steel">{tech.short}</span>
                  <span className="mx-2 text-iron">/</span>
                  <span className="text-smoke">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
