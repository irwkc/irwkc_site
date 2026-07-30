"use client";

import { Code2, LayoutTemplate, Server, Smartphone } from "lucide-react";
import { services } from "@/data/site";
import { SpotlightCard } from "../bits/spotlight-card";

const icons = [Code2, LayoutTemplate, Server, Smartphone];

export function SiteServices() {
  return (
    <section id="services" className="section-y border-b border-graphite">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="meta-label mb-3">// Услуги</p>
            <h2 className="section-title">Инвестируй в результат</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-smoke md:text-right">
            От идеи и прототипа до продакшена — с акцентом на скорость,
            дизайн и удобство.
          </p>
        </div>

        <div className="grid gap-px bg-graphite md:grid-cols-2">
          {services.map((item, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <SpotlightCard
                key={item.title}
                className="group bg-obsidian p-7 md:p-12"
              >
                <Icon
                  className="mb-6 h-7 w-7 text-gold md:mb-8 md:h-8 md:w-8"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="meta-label mb-3 text-chalk">{item.title}</h3>
                <p className="max-w-sm text-sm leading-relaxed text-smoke">
                  {item.text}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
