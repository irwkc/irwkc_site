"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { techStack } from "@/data/site";
import type { Project } from "@/lib/projects";

type Line =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string; color?: string }
  | { kind: "blank" };

const PROMPT = "irwkc@portfolio ~ %";

function staticCommands(): Record<string, Line[]> {
  return {
    stack: [
      { kind: "output", text: "loaded stack — 12 packages", color: "#86868b" },
      ...techStack.map((t) => ({
        kind: "output" as const,
        text: `  ▸ ${t.name}`,
        color: t.color === "#ffffff" ? "#f5f5f7" : t.color,
      })),
    ],
    "cat next": [
      {
        kind: "output",
        text: "Next.js — App Router, SSR/SSG, сайты и продукты под ключ.",
      },
      {
        kind: "output",
        text: "used in: NewFormat, Bruit Noir, codeforge, sketch-verde…",
        color: "#86868b",
      },
    ],
    "cat swift": [
      {
        kind: "output",
        text: "Swift — iOS-клиенты: notific, Bruit Noir, NewFormat.",
      },
    ],
    "cat prisma": [
      {
        kind: "output",
        text: "Prisma + PostgreSQL — схема, миграции, type-safe ORM.",
      },
    ],
    whoami: [{ kind: "output", text: "irwkc — full-stack developer" }],
    help: [
      {
        kind: "output",
        text: "commands: stack · ls projects · cat next · cat swift · cat prisma · clear · help",
        color: "#86868b",
      },
    ],
  };
}

const BOOT: string[] = ["whoami", "stack", "help"];

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function TechTerminal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [autoTyping, setAutoTyping] = useState("");
  const [input, setInput] = useState("");
  const [interactive, setInteractive] = useState(false);
  const [booted, setBooted] = useState(false);
  const busyRef = useRef(false);

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    });
  };

  const printOutput = useCallback(async (cmd: string) => {
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    let out = staticCommands()[cmd];

    if (cmd === "ls projects") {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const projects = (await res.json()) as Project[];
        out = [
          { kind: "output", text: "projects/", color: "#0a84ff" },
          ...projects.map((p, i) => ({
            kind: "output" as const,
            text: `  ${String(i + 1).padStart(2, "0")}  ${p.title}`,
            color: "#f5f5f7",
          })),
        ];
      } catch {
        out = [
          {
            kind: "output",
            text: "failed to read projects",
            color: "#ff453a",
          },
        ];
      }
    }

    out ??= [
      {
        kind: "output" as const,
        text: `zsh: command not found: ${cmd}`,
        color: "#ff453a",
      },
    ];

    for (const line of out) {
      await sleep(40);
      setLines((prev) => [...prev, line]);
      scrollBottom();
    }
    setLines((prev) => [...prev, { kind: "blank" }]);
    scrollBottom();
  }, []);

  const autoRun = useCallback(
    async (cmd: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setAutoTyping("");

      for (let i = 0; i < cmd.length; i++) {
        setAutoTyping(cmd.slice(0, i + 1));
        await sleep(38 + Math.random() * 28);
        scrollBottom();
      }
      await sleep(180);
      setAutoTyping("");
      setLines((prev) => [...prev, { kind: "input", text: cmd }]);
      await printOutput(cmd);
      busyRef.current = false;
    },
    [printOutput]
  );

  const submitUser = useCallback(async () => {
    if (busyRef.current || !interactive) return;
    const cmd = input.trim();
    if (!cmd) return;

    busyRef.current = true;
    setInput("");
    setLines((prev) => [...prev, { kind: "input", text: cmd }]);
    await printOutput(cmd);
    busyRef.current = false;
    scrollBottom();
    inputRef.current?.focus();
  }, [input, interactive, printOutput]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || booted) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBooted(true);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [booted]);

  useEffect(() => {
    if (!booted) return;
    let cancelled = false;

    (async () => {
      await sleep(400);
      for (const cmd of BOOT) {
        if (cancelled) return;
        await autoRun(cmd);
        await sleep(350);
      }
      if (!cancelled) {
        setInteractive(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [booted, autoRun]);

  const focusInput = () => {
    if (interactive) inputRef.current?.focus();
  };

  const currentLine = interactive ? input : autoTyping;

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-3xl">
      <div
        className="overflow-hidden rounded-xl border border-white/10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.85)] sm:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]"
        onClick={focusInput}
      >
        <div className="relative flex h-10 items-center bg-[#2b2b2b] px-3 sm:h-11 sm:px-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
          </div>
          <p className="pointer-events-none absolute inset-x-0 text-center font-mono text-[10px] text-white/55 sm:text-[11px]">
            <span className="sm:hidden">irwkc — zsh</span>
            <span className="hidden sm:inline">irwkc — zsh — 80×24</span>
          </p>
        </div>

        <div
          ref={bodyRef}
          className="relative h-[min(52vh,360px)] overflow-x-auto overflow-y-auto bg-[#1e1e1e] px-3 py-3 font-mono text-[12px] leading-relaxed text-[#f5f5f7] sm:h-[min(58vh,420px)] sm:px-4 sm:py-4 sm:text-[13px] md:h-[440px] md:px-5 md:text-[14px]"
        >
          {lines.map((line, i) => {
            if (line.kind === "blank") {
              return <div key={i} className="h-3" />;
            }
            if (line.kind === "input") {
              return (
                <div key={i} className="break-all whitespace-pre-wrap">
                  <span className="text-[#28c840]">{PROMPT}</span>{" "}
                  <span>{line.text}</span>
                </div>
              );
            }
            return (
              <div
                key={i}
                className="break-all whitespace-pre-wrap"
                style={{ color: line.color ?? "#f5f5f7" }}
              >
                {line.text}
              </div>
            );
          })}

          <div className="flex min-w-0 flex-wrap break-all whitespace-pre-wrap">
            <span className="text-[#28c840]">{PROMPT}</span>
            <span className="ml-1">{currentLine}</span>
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[2px] bg-[#f5f5f7] animate-pulse" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={!interactive}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Команда терминала"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void submitUser();
              }
            }}
            className="pointer-events-none absolute opacity-0"
            tabIndex={interactive ? 0 : -1}
          />
        </div>
      </div>
    </div>
  );
}
