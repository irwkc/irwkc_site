"use client";

import { useEffect, useState } from "react";
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

export function MobileProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = (await res.json()) as Project[];
      if (!cancelled) {
        setProjects(data);
        setActive(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const current = projects[active];

  return (
    <section id="projects" className="px-5 py-14">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Проекты</h2>

      {!current ? (
        <div className="h-56 animate-pulse rounded-2xl border border-white/8 bg-white/3" />
      ) : (
        <>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-sm transition-colors",
                  active === i
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 text-muted"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          <article className="glass relative overflow-hidden rounded-2xl p-5">
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-60",
                current.gradient
              )}
            />
            <div className="relative">
              <p className="font-mono text-xs text-accent">
                {String(active + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-bold">{current.title}</h3>
              <p className="mt-1 text-sm text-muted">{current.category}</p>
              {current.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted/90">
                  {current.description}
                </p>
              )}
              {current.stack?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {current.sites.map((site) => (
                  <a
                    key={site}
                    href={site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2.5 text-xs font-semibold text-[#0f172a]"
                  >
                    {siteLabel(site)}
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                ))}
                {current.appStore && (
                  <a
                    href={current.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2.5 text-xs font-semibold text-[#0f172a]"
                  >
                    App Store
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                )}
                {current.repo && !current.repoPrivate && (
                  <a
                    href={current.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs text-muted"
                  >
                    <GitHubIcon className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
                {current.repoPrivate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs text-muted/70">
                    <GitHubIcon className="h-3.5 w-3.5 opacity-50" />
                    Закрыт
                  </span>
                )}
              </div>
            </div>
          </article>
        </>
      )}
    </section>
  );
}
