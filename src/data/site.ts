export const siteConfig = {
  name: "irwkc",
  title: "Full-Stack Developer",
  email: "irwkc@icloud.com",
  github: "https://github.com/irwkc/",
  telegram: "https://t.me/irwkc",
  telegramHandle: "@irwkc",
  tagline:
    "Создаю современные высокопроизводительные веб-приложения. Каждое имеет свой уникальный дизайн и индивидуальные механики взаимодействия с пользователем, чтобы ваш сайт точно запомнился.",
};

/** Deep-link that opens a chat with a prefilled message. */
export function telegramLink(text?: string) {
  if (!text?.trim()) return siteConfig.telegram;
  return `${siteConfig.telegram}?text=${encodeURIComponent(text.trim())}`;
}

export const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Стек", href: "#tech-stack" },
  { label: "Контакты", href: "#contact" },
];

export const services = [
  {
    title: "Веб-приложения",
    text: "Интерфейсы на React и Next.js с чистой архитектурой, быстрой загрузкой и продуманным UX.",
  },
  {
    title: "Лендинги и бренд-сайты",
    text: "Сайты с уникальной визуальной системой и механиками, которые запоминаются.",
  },
  {
    title: "Full-stack и API",
    text: "Node.js, базы данных и админки — от прототипа до стабильного продакшена.",
  },
  {
    title: "iOS и мобильное",
    text: "Нативные клиенты и связка веб ↔ приложение, когда продукту нужен выход за пределы браузера.",
  },
];

export const techStack = [
  { name: "TypeScript", short: "TS" },
  { name: "React", short: "R" },
  { name: "Next.js", short: "N" },
  { name: "Node.js", short: "Nd" },
  { name: "Express", short: "Ex" },
  { name: "Python", short: "Py" },
  { name: "PostgreSQL", short: "PG" },
  { name: "Prisma", short: "Pr" },
  { name: "Tailwind", short: "Tw" },
  { name: "Swift", short: "Sw" },
  { name: "Kotlin", short: "Kt" },
  { name: "Docker", short: "Dk" },
];
