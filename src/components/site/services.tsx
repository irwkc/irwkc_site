"use client";

import { services } from "@/data/site";
import { Reveal } from "./reveal";

export function SiteServices() {
  return (
    <section id="services" className="section-y border-b border-graphite">
      <div className="site-container">
        <Reveal className="mb-10 md:mb-16">
          <p className="meta-label mb-3">Услуги</p>
          <h2 className="section-title">Инвестируй в результат</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke md:text-base">
            От идеи и прототипа до продакшена — с акцентом на скорость, дизайн
            и удобство.
          </p>
        </Reveal>

        <ul className="border-t border-graphite">
          {services.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i}>
              <li className="group border-b border-graphite py-8 md:py-10">
                <div className="grid gap-4 md:grid-cols-[88px_1fr] md:items-start md:gap-10">
                  <span className="font-mono text-sm text-steel transition-colors duration-300 group-hover:text-steel-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl tracking-tight text-chalk md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-smoke md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
