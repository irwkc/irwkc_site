"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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

function ProjectDetail({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="glass relative min-h-0 overflow-hidden rounded-2xl p-5 sm:min-h-[320px] sm:rounded-3xl sm:p-7 md:min-h-[360px] md:p-9">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          project.gradient
        )}
      />
      <div className="pointer-events-none absolute -right-8 top-0 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative">
        <span className="font-mono text-sm text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-muted sm:text-base">{project.category}</p>
        {project.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted/90 sm:mt-5 sm:text-base">
            {project.description}
          </p>
        )}

        {project.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6">
          {project.sites.map((site) => (
            <a
              key={site}
              href={site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-xs font-semibold text-[#0f172a] transition-transform hover:scale-[1.02] sm:px-5 sm:text-sm"
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
              className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-xs font-semibold text-[#0f172a] transition-transform hover:scale-[1.02] sm:px-5 sm:text-sm"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs text-muted transition-colors hover:border-white/30 hover:text-foreground"
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
      </div>
    </div>
  );
}

export function DesktopProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = (await res.json()) as Project[];
      if (!cancelled) {
        setProjects(data);
        setActive(0);
        activeRef.current = 0;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Magnetic pin for the right card (works even if CSS sticky is broken)
  useLayoutEffect(() => {
    if (!projects.length) return;

    const TOP = 112;

    const sync = () => {
      const wrap = pinWrapRef.current;
      const panel = panelRef.current;
      if (!wrap || !panel) return;

      if (window.innerWidth < 1024) {
        panel.style.position = "";
        panel.style.top = "";
        panel.style.left = "";
        panel.style.width = "";
        panel.style.bottom = "";
        wrap.style.minHeight = "";
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const panelH = panel.offsetHeight;
      const wrapW = wrap.offsetWidth;
      const wrapLeft = wrapRect.left;

      const start = wrapRect.top;
      const end = wrapRect.bottom - panelH;

      if (start > TOP) {
        panel.style.position = "relative";
        panel.style.top = "0";
        panel.style.left = "0";
        panel.style.width = "100%";
        panel.style.bottom = "auto";
      } else if (end <= TOP) {
        panel.style.position = "absolute";
        panel.style.top = "auto";
        panel.style.bottom = "0";
        panel.style.left = "0";
        panel.style.width = "100%";
      } else {
        panel.style.position = "fixed";
        panel.style.top = `${TOP}px`;
        panel.style.left = `${wrapLeft}px`;
        panel.style.width = `${wrapW}px`;
        panel.style.bottom = "auto";
      }
    };

    const onScrollSpy = () => {
      if (window.innerWidth < 1024) return;
      const probe = window.innerHeight * 0.38;
      let best = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - probe);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      if (activeRef.current !== best) {
        activeRef.current = best;
        setActive(best);
      }
    };

    const frame = () => {
      sync();
      onScrollSpy();
    };

    frame();
    window.addEventListener("scroll", frame, { passive: true });
    window.addEventListener("resize", frame);

    return () => {
      window.removeEventListener("scroll", frame);
      window.removeEventListener("resize", frame);
    };
  }, [projects]);

  const selectProject = (i: number) => {
    activeRef.current = i;
    setActive(i);
    if (window.innerWidth >= 1024) {
      itemRefs.current[i]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const current = projects[active];

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-3xl font-bold tracking-tight sm:mb-10 sm:text-4xl md:mb-14 md:text-6xl"
        >
          Проекты
        </motion.h2>

        {!current ? (
          <div className="h-64 animate-pulse rounded-3xl border border-white/8 bg-white/3" />
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-3 lg:gap-0">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="lg:flex lg:min-h-[65vh] lg:items-center"
                >
                  <div className="w-full">
                    <button
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => selectProject(i)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all duration-300 sm:px-6 sm:py-6",
                        active === i
                          ? "border-white/30 bg-white/[0.07] shadow-[0_0_48px_-16px_rgba(129,140,248,0.55)]"
                          : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <div className="min-w-0 pr-3">
                        <p className="font-mono text-xs text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 truncate text-base font-semibold sm:text-lg md:text-xl">
                          {project.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {project.category}
                        </p>
                      </div>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-300",
                          active === i ? "rotate-45 text-accent" : "opacity-35"
                        )}
                      />
                    </button>

                    {active === i && (
                      <div className="mt-3 lg:hidden">
                        <ProjectDetail project={project} index={i} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={pinWrapRef}
              className="relative hidden h-full min-h-full lg:block"
            >
              <div
                ref={panelRef}
                className="w-full will-change-[position,top,left,width]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectDetail project={current} index={active} />
                  </motion.div>
                </AnimatePresence>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {projects.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Проект ${i + 1}`}
                      onClick={() => selectProject(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        active === i
                          ? "w-8 bg-accent"
                          : "w-1.5 bg-white/20 hover:bg-white/35"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
