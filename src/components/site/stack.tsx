import { techStack } from "@/data/site";

export function SiteStack() {
  return (
    <section id="tech-stack" className="section-y border-b border-graphite">
      <div className="site-container">
        <div className="mb-10 md:mb-16">
          <p className="meta-label mb-3">Инструменты</p>
          <h2 className="section-title">Стек</h2>
        </div>

        <ul className="grid grid-cols-2 gap-px bg-graphite sm:grid-cols-3 md:grid-cols-4">
          {techStack.map((tech, i) => (
            <li
              key={tech.name}
              className="flex min-h-[120px] flex-col justify-between bg-obsidian p-5 md:min-h-[140px] md:p-6"
            >
              <span className="font-mono text-xs text-gold">{tech.short}</span>
              <span className="text-sm text-chalk md:text-base">{tech.name}</span>
              <span className="font-mono text-[10px] text-iron">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
