"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "../icons/github";

function siteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-2">
      {project.sites.map((site) => (
        <a
          key={site}
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-[#0f172a]"
        >
          {siteLabel(site)}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      ))}
      {project.appStore && (
        <a
          href={project.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-[#0f172a]"
        >
          App Store
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      )}
      {project.repo && !project.repoPrivate && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs text-muted"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          GitHub
        </a>
      )}
      {project.repoPrivate && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs text-muted/70">
          <GitHubIcon className="h-3.5 w-3.5 opacity-50" />
          Репозиторий закрыт
        </span>
      )}
    </div>
  );
}

function StoryChapter({
  project,
  index,
  total,
  onVisible,
}: {
  project: Project;
  index: number;
  total: number;
  onVisible: (index: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(index);
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onVisible]);

  return (
    <article
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-center px-5 py-24"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-1/4 h-[50%] bg-gradient-to-b opacity-50 blur-3xl",
          project.gradient
        )}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-sm tracking-widest text-accent">
            {String(index + 1).padStart(2, "0")}
            <span className="text-white/25"> / {String(total).padStart(2, "0")}</span>
          </p>
        </div>

        <h3 className="mt-4 text-[2.4rem] font-bold leading-[1.05] tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.category}</p>

        {project.description && (
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted/90">
            {project.description}
          </p>
        )}

        {project.stack?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <ProjectActions project={project} />
      </motion.div>

      {index < total - 1 && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      )}
    </article>
  );
}

export function ProjectsMobileStory({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  if (!projects.length) {
    return (
      <div className="px-5 py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Проекты</h2>
        <div className="h-64 animate-pulse rounded-3xl border border-white/8 bg-white/3" />
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative">
      <div className="px-5 pb-2 pt-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Проекты</h2>
        <p className="mt-2 text-sm text-muted">Листай — один проект на экран</p>
      </div>

      {/* Sticky chapter index */}
      <div className="sticky top-[4.5rem] z-20 px-5">
        <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5">
          <p className="truncate text-sm font-medium">
            <span className="font-mono text-accent">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-white/20">·</span>
            {projects[active]?.title}
          </p>
          <div className="flex shrink-0 gap-1.5">
            {projects.map((p, i) => (
              <span
                key={p.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-accent" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="mt-2 h-px origin-left bg-accent/80"
          style={{ scaleX: progress }}
        />
      </div>

      {projects.map((project, i) => (
        <StoryChapter
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          onVisible={setActive}
        />
      ))}
    </div>
  );
}
