"use client";

import { Send } from "lucide-react";
import { TelegramIcon } from "../icons/telegram";
import { siteConfig, telegramLink } from "@/data/site";

export function MobileContact() {
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
    <section id="contact" className="px-5 py-14">
      <h2 className="text-3xl font-bold tracking-tight">
        Давайте работать вместе
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Есть идея проекта? Напишите в Telegram — отвечу быстрее всего.
      </p>

      <a
        href={siteConfig.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-cream px-5 py-3.5 text-sm font-semibold text-[#0f172a]"
      >
        <TelegramIcon className="h-4 w-4" />
        {siteConfig.telegramHandle}
      </a>

      <form onSubmit={handleSubmit} className="glass mt-8 space-y-4 rounded-2xl p-5">
        <div>
          <label htmlFor="m-name" className="mb-2 block text-sm font-medium">
            Имя
          </label>
          <input
            id="m-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Ваше имя"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/50"
          />
        </div>
        <div>
          <label htmlFor="m-message" className="mb-2 block text-sm font-medium">
            Сообщение
          </label>
          <textarea
            id="m-message"
            name="message"
            required
            rows={4}
            placeholder="О проекте, сроках и бюджете..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent/50"
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cream py-3.5 text-sm font-semibold text-[#0f172a]"
        >
          Открыть Telegram
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
