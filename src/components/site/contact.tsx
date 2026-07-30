"use client";

import { Send } from "lucide-react";
import { siteConfig, telegramLink } from "@/data/site";
import { GitHubIcon } from "../icons/github";
import { TelegramIcon } from "../icons/telegram";

export function SiteContact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    const parts = ["Привет! Пишу с портфолио."];
    if (name.trim()) parts.push(`Меня зовут ${name.trim()}.`);
    parts.push("", message.trim());

    window.open(telegramLink(parts.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-y border-b border-graphite">
      <div className="site-container grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div>
          <p className="meta-label mb-3">Контакты</p>
          <h2 className="section-title mb-6">Давайте работать вместе</h2>
          <p className="max-w-md text-base leading-relaxed text-smoke">
            Есть идея проекта? Напишите в Telegram — отвечу быстрее всего.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-chalk transition-opacity hover:opacity-70"
            >
              <TelegramIcon className="h-4 w-4 text-gold" />
              <span className="font-mono text-sm">{siteConfig.telegramHandle}</span>
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-chalk transition-opacity hover:opacity-70"
            >
              <GitHubIcon className="h-4 w-4 text-gold" />
              <span className="font-mono text-sm">GitHub</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-chalk transition-opacity hover:opacity-70"
            >
              <span className="font-mono text-sm text-gold">@</span>
              <span className="font-mono text-sm">{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 border border-graphite bg-carbon p-6 md:p-8"
        >
          <div>
            <h3 className="text-lg tracking-tight text-chalk">
              Написать в Telegram
            </h3>
            <p className="mt-1 text-sm text-smoke">
              Заполните поля — откроется чат с готовым сообщением.
            </p>
          </div>

          <div>
            <label htmlFor="name" className="meta-label mb-2 block">
              Имя
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Ваше имя"
              className="w-full rounded border border-graphite bg-obsidian px-4 py-3 text-base text-chalk outline-none placeholder:text-iron focus:border-ash"
            />
          </div>

          <div>
            <label htmlFor="message" className="meta-label mb-2 block">
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Расскажите о проекте, сроках и бюджете..."
              className="w-full resize-none rounded border border-graphite bg-obsidian px-4 py-3 text-base text-chalk outline-none placeholder:text-iron focus:border-ash"
            />
          </div>

          <button type="submit" className="btn-pill w-full">
            Открыть Telegram
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
