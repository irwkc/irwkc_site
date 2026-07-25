"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = projects[active];

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-4xl font-bold tracking-tight md:text-6xl"
        >
          Проекты
        </motion.h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-3">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setActive(i)}
                className={cn(
                  "project-item group flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 sm:px-6 sm:py-5",
                  active === i
                    ? "border-white/25 bg-white/5"
                    : "border-white/8 hover:border-white/15 hover:bg-white/3"
                )}
              >
                <div>
                  <p className="font-mono text-xs text-muted">{project.id}</p>
                  <p className="mt-1 text-base font-semibold sm:text-lg">
                    {project.title}
                  </p>
                  <p className="text-sm text-muted">{project.category}</p>
                </div>
                <ArrowUpRight
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform",
                    active === i ? "rotate-45 text-accent" : "opacity-30"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="glass relative min-h-[320px] overflow-hidden rounded-3xl p-8 md:p-10"
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-60",
                    current.gradient
                  )}
                />
                <div className="relative">
                  <span className="font-mono text-sm text-accent">
                    {current.id}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-1 text-muted">{current.category}</p>
                  <p className="mt-5 text-base leading-relaxed text-muted/90">
                    {current.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {current.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {current.href !== "#" && (
                    <a
                      href={current.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/20"
                    >
                      Смотреть проект
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
