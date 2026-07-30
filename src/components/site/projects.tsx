"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "../icons/github";
import { Reveal } from "./reveal";

function siteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.sites.map((site) => (
        <a
          key={site}
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-steel/40 px-3 py-1.5 text-xs uppercase tracking-wide text-steel-bright transition-colors duration-300 hover:border-steel-bright hover:text-chalk"
        >
          {siteLabel(site)}
          <ExternalLink className="h-3 w-3 opacity-70" />
        </a>
      ))}
      {project.appStore && (
        <a
          href={project.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-steel/40 px-3 py-1.5 text-xs uppercase tracking-wide text-steel-bright transition-colors duration-300 hover:border-steel-bright hover:text-chalk"
        >
          App Store
          <ArrowUpRight className="h-3 w-3 opacity-70" />
        </a>
      )}
      {project.repo && !project.repoPrivate && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded border border-graphite px-3 py-1.5 text-xs text-smoke transition-colors duration-300 hover:text-steel-bright"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          GitHub
        </a>
      )}
      {project.repoPrivate && (
        <span className="inline-flex items-center gap-1.5 rounded border border-graphite px-3 py-1.5 text-xs text-iron">
          <GitHubIcon className="h-3.5 w-3.5 opacity-50" />
          Закрыт
        </span>
      )}
    </div>
  );
}

function ProjectDetail({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <div className="relative overflow-hidden border border-graphite bg-carbon/80 p-7">
      <span className="font-mono text-sm text-steel">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-2xl tracking-tight text-chalk">
        {project.title}
      </h3>
      <p className="meta-label mt-2">{project.category}</p>
      {project.description && (
        <p className="mt-5 text-sm leading-relaxed text-smoke">
          {project.description}
        </p>
      )}
      {project.stack?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-graphite px-2.5 py-1 text-xs text-ash"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

function ProjectsMobileStory({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project-chapter]")
    );
    if (!chapters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const idx = chapters.indexOf(best.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.4, 0.6], rootMargin: "-10% 0px -30% 0px" }
    );
    chapters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [projects]);

  return (
    <div>
      <div className="sticky top-[4.5rem] z-20 px-5">
        <div className="flex items-center justify-between gap-3 border border-graphite bg-obsidian/95 px-4 py-2.5">
          <p className="truncate text-sm text-chalk">
            <span className="font-mono text-steel">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-iron">·</span>
            {projects[active]?.title}
          </p>
          <div className="flex shrink-0 gap-1.5">
            {projects.map((p, i) => (
              <span
                key={p.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === active ? "w-5 bg-chalk" : "w-1.5 bg-graphite"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.id}
          data-project-chapter
          className="flex flex-col justify-center px-5 py-20"
        >
          <ProjectDetail project={project} index={i} />
        </article>
      ))}
    </div>
  );
}

export function SiteProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = (await res.json()) as Project[];
      if (!cancelled) setProjects(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="section-y border-b border-graphite">
      <div className="lg:hidden">
        <Reveal className="site-container mb-6">
          <p className="meta-label mb-3">Портфолио</p>
          <h2 className="section-title">Проекты</h2>
        </Reveal>
        {!projects.length ? (
          <div className="site-container">
            <div className="h-40 animate-pulse border border-graphite bg-carbon" />
          </div>
        ) : (
          <ProjectsMobileStory projects={projects} />
        )}
      </div>

      <div className="site-container hidden lg:block">
        <Reveal className="mb-14">
          <p className="meta-label mb-3">Портфолио</p>
          <h2 className="section-title">Проекты</h2>
        </Reveal>

        {!projects.length ? (
          <div className="h-64 animate-pulse border border-graphite bg-carbon" />
        ) : (
          <ul className="border-t border-graphite">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={0.03 * i}>
                <li className="group border-b border-graphite py-10 transition-colors duration-300 hover:bg-white/[0.015]">
                  <div className="grid grid-cols-[88px_1fr_auto] items-start gap-10">
                    <span className="font-mono text-sm text-smoke transition-colors duration-300 group-hover:text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-2xl tracking-tight text-chalk">
                          {project.title}
                        </h3>
                        <span className="meta-label">{project.category}</span>
                      </div>
                      {project.description && (
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-smoke">
                          {project.description}
                        </p>
                      )}
                      {project.stack?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-graphite px-2.5 py-1 text-xs text-ash"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
