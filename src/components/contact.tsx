"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { GitHubIcon } from "./icons/github";
import { TelegramIcon } from "./icons/telegram";
import { siteConfig, telegramLink } from "@/data/site";

export function Contact() {
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
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            Давайте работать вместе
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
            Есть идея проекта? Напишите в Telegram — отвечу быстрее всего.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-[#0f172a] transition-transform hover:scale-105"
            >
              <TelegramIcon className="h-4 w-4" />
              {siteConfig.telegramHandle}
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/5"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 sm:mt-14"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Написать в Telegram</h3>
            <p className="mt-1 text-sm text-muted">
              Заполните поля — откроется чат с готовым сообщением.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass space-y-5 rounded-2xl p-5 sm:rounded-3xl sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Имя
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Ваше имя"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent/50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Расскажите о проекте, сроках и бюджете..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/50 focus:border-accent/50"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cream py-3.5 text-sm font-semibold text-[#0f172a] transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Открыть Telegram
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
