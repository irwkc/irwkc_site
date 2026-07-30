"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Dot = { cx: number; cy: number };

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 33, g: 33, b: 33 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

export function DotGrid({
  dotSize = 2,
  gap = 28,
  baseColor = "#212121",
  activeColor = "#c1c1c1",
  proximity = 120,
  className = "",
}: {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const reduced = useReducedMotion();

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const build = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const cols = Math.ceil(width / cell) + 1;
    const rows = Math.ceil(height / cell) + 1;
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: x * cell + dotSize, cy: y * cell + dotSize });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    build();
    const ro = new ResizeObserver(build);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [build]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let raf = 0;
    const proxSq = proximity * proximity;
    const r = dotSize / 2;
    const start = performance.now();

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      let px = pointer.current.x;
      let py = pointer.current.y;

      // Phone / idle: drifting spotlight so the grid feels alive without hover
      if (!pointer.current.active && !reduced) {
        const t = (now - start) * 0.00035;
        px = width * (0.5 + Math.sin(t) * 0.35);
        py = height * (0.45 + Math.cos(t * 0.8) * 0.28);
      }

      for (const dot of dotsRef.current) {
        let fill = baseColor;
        if (!reduced) {
          const dx = dot.cx - px;
          const dy = dot.cy - py;
          const dsq = dx * dx + dy * dy;
          if (dsq <= proxSq) {
            const k = 1 - Math.sqrt(dsq) / proximity;
            const rr = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * k);
            const gg = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * k);
            const bb = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * k);
            fill = `rgb(${rr},${gg},${bb})`;
          }
        }
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.arc(dot.cx, dot.cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const setFromEvent = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = clientX - rect.left;
      pointer.current.y = clientY - rect.top;
      pointer.current.active = true;
    };

    const onPointerMove = (e: PointerEvent) => {
      setFromEvent(e.clientX, e.clientY);
    };
    const onPointerDown = (e: PointerEvent) => {
      setFromEvent(e.clientX, e.clientY);
    };
    const onPointerUp = () => {
      pointer.current.active = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [activeRgb, baseColor, baseRgb, dotSize, proximity, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
