"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig, telegramLink } from "@/data/site";
import { GitHubIcon } from "../icons/github";
import { Reveal } from "./reveal";

export function SiteContact() {
  return (
    <section id="contact" className="section-y border-b border-graphite">
      <div className="site-container">
        <Reveal>
          <p className="meta-label mb-3">Контакты</p>
          <h2 className="section-title max-w-lg">Давайте работать вместе</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-smoke">
            Есть идея проекта? Напишите в Telegram — отвечу быстрее всего.
          </p>

          <a
            href={telegramLink(
              "Привет! Пишу с портфолио — хочу обсудить проект."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill mt-10"
          >
            Написать
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-graphite pt-8 font-mono text-sm">
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke transition-colors duration-300 hover:text-steel-bright"
            >
              {siteConfig.telegramHandle}
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-smoke transition-colors duration-300 hover:text-steel-bright"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-smoke transition-colors duration-300 hover:text-steel-bright"
            >
              {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
