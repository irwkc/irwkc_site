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

export const projects = [
  {
    id: "01",
    title: "Bruit Noir",
    category: "Веб-приложение",
    description:
      "Фулстек-платформа с современным интерфейсом и продуманной серверной архитектурой.",
    stack: ["TypeScript", "React", "Node.js"],
    href: "https://github.com/irwkc/Bruit_Noir",
    gradient: "from-violet-600/20 to-fuchsia-600/10",
  },
  {
    id: "02",
    title: "Nova Dashboard",
    category: "SaaS-платформа",
    description:
      "Аналитический дашборд с realtime-визуализацией и кастомными отчётами.",
    stack: ["Next.js", "PostgreSQL", "Tailwind"],
    href: "#",
    gradient: "from-cyan-600/20 to-blue-600/10",
  },
  {
    id: "03",
    title: "DevHub API",
    category: "Backend-сервис",
    description:
      "REST API с авторизацией, rate limiting и подробной документацией.",
    stack: ["Node.js", "MongoDB", "Docker"],
    href: "#",
    gradient: "from-emerald-600/20 to-teal-600/10",
  },
  {
    id: "04",
    title: "Pixel Craft",
    category: "Дизайн-инструмент",
    description:
      "Браузерный редактор изображений со слоями, фильтрами и экспортом.",
    stack: ["React", "Canvas API", "TypeScript"],
    href: "#",
    gradient: "from-orange-600/20 to-amber-600/10",
  },
  {
    id: "05",
    title: "ChatFlow",
    category: "Realtime-приложение",
    description:
      "Анонимный чат с комнатами, модерацией и обменом сообщениями по WebSocket.",
    stack: ["Next.js", "Socket.io", "Redis"],
    href: "#",
    gradient: "from-rose-600/20 to-pink-600/10",
  },
  {
    id: "06",
    title: "Cloud Deploy",
    category: "DevOps-инструмент",
    description:
      "Пайплайн деплоя контейнерных приложений в один клик.",
    stack: ["Docker", "AWS", "GitHub Actions"],
    href: "#",
    gradient: "from-indigo-600/20 to-purple-600/10",
  },
];
