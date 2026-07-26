"use client";

import { techStack } from "@/data/site";

export function MobileTechStack() {
  return (
    <section id="tech-stack" className="px-5 py-14">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Стек</h2>
      <ul className="grid grid-cols-2 gap-2.5">
        {techStack.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.icon}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
              loading="lazy"
            />
            <span className="text-sm font-medium">{tech.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
