export const siteConfig = {
  name: "irwkc",
  title: "Full-Stack Developer",
  email: "irwkc@icloud.com",
  github: "https://github.com/irwkc/",
  telegram: "https://t.me/irwkc",
  telegramHandle: "@irwkc",
  yearsExperience: 5,
  tagline:
    "Создаю современные высокопроизводительные веб-приложения. Каждое имеет свой уникальный дизайн и индивидуальные механики взаимодействия с пользователем, чтобы ваш сайт точно запомнился.",
};

/** Deep-link that opens a chat with a prefilled message. */
export function telegramLink(text?: string) {
  if (!text?.trim()) return siteConfig.telegram;
  return `${siteConfig.telegram}?text=${encodeURIComponent(text.trim())}`;
}

export const navLinks = [
  { label: "Проекты", href: "#projects" },
  { label: "Стек", href: "#tech-stack" },
  { label: "Контакты", href: "#contact" },
];

export const techStack = [
  {
    name: "TypeScript",
    color: "#3178C6",
    short: "TS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    color: "#61DAFB",
    short: "⚛",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    color: "#ffffff",
    short: "N",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    color: "#339933",
    short: "Nd",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    color: "#ffffff",
    short: "Ex",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Python",
    color: "#3776AB",
    short: "Py",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "PostgreSQL",
    color: "#4169E1",
    short: "PG",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Prisma",
    color: "#2D3748",
    short: "Pr",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "Tailwind",
    color: "#06B6D4",
    short: "Tw",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Swift",
    color: "#F05138",
    short: "Sw",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Kotlin",
    color: "#7F52FF",
    short: "Kt",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Docker",
    color: "#2496ED",
    short: "Dk",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];
