import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface ActiveRing {
  x: number;
  y: number;
  maxRadius: number;
  startTime: number;
  duration: number;
  lineWidth: number;
}

interface RelaxingDropsBackgroundProps {
  theme?: "light" | "dark";
  className?: string;
}

const ACCENT_RGB = {
  dark: "65, 105, 225",
  light: "37, 99, 235",
} as const;

const MAX_OPACITY = {
  dark: 0.55,
  light: 0.38,
} as const;

function createRng(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const RelaxingDropsBackground: React.FC<RelaxingDropsBackgroundProps> = ({
  theme = "dark",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = ACCENT_RGB[theme];
    const peakOpacity = MAX_OPACITY[theme];
    const rng = createRng(theme === "dark" ? 42 : 137);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let nextDropTime = 0;
    const rings: ActiveRing[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnDrop = (time: number) => {
      const x = rng() * width;
      const y = rng() * height;
      const ringCount = 3 + Math.floor(rng() * 2);
      const baseRadius = 70 + rng() * 100;

      for (let i = 0; i < ringCount; i += 1) {
        rings.push({
          x,
          y,
          maxRadius: baseRadius + i * (36 + rng() * 28),
          startTime: time + i * 160,
          duration: 2600 + rng() * 1400,
          lineWidth: Math.max(0.6, 1.6 - i * 0.3),
        });
      }

      nextDropTime =
        time + (reducedMotion ? 6000 : 2000) + rng() * (reducedMotion ? 4000 : 2500);
    };

    const draw = (time: number) => {
      if (nextDropTime === 0) {
        spawnDrop(time);
      } else if (time >= nextDropTime) {
        spawnDrop(time);
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i];
        const elapsed = time - ring.startTime;
        if (elapsed < 0) continue;

        const progress = Math.min(elapsed / ring.duration, 1);
        if (progress >= 1) {
          rings.splice(i, 1);
          continue;
        }

        const eased = easeOutCubic(progress);
        const radius = ring.maxRadius * eased;
        const opacity = (1 - progress) * peakOpacity;
        const lineWidth = ring.lineWidth * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.shadowColor = `rgba(${rgb}, ${opacity * 0.45})`;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      frameId = requestAnimationFrame(draw);
    };

    const handleMotionChange = () => {
      rings.length = 0;
      nextDropTime = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    motionQuery.addEventListener("change", handleMotionChange);
    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(frameId);
    };
  }, [theme]);

  return createPortal(
    <canvas
      ref={canvasRef}
      className={clsx("layer-drops", className)}
      aria-hidden="true"
    />,
    document.body
  );
};

export default RelaxingDropsBackground;
