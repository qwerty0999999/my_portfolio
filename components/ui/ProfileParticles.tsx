"use client";

import { useEffect, useRef } from "react";

export default function ProfileParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth * devicePixelRatio);
    let h = (canvas.height = canvas.clientHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const spawn = (n = isCoarse ? 8 : 30) => {
      const particles = particlesRef.current;
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - 0.5) * (isCoarse ? 0.15 : 0.35),
          vy: (Math.random() - 0.5) * (isCoarse ? 0.15 : 0.35),
          life: 40 + Math.random() * 80,
          size: 0.8 + Math.random() * (isCoarse ? 2 : 3),
          hue: 180 + Math.random() * 140,
          alpha: (isCoarse ? 0.35 : 0.6) + Math.random() * (isCoarse ? 0.45 : 0.6),
        });
      }
    };

    spawn(isCoarse ? 18 : 40);

    const onResize = () => {
      w = (canvas.width = canvas.clientWidth * devicePixelRatio);
      h = (canvas.height = canvas.clientHeight * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
        p.life -= 1;
        p.alpha *= 0.995;

        // draw small sparkling square with soft glow
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        const color = `hsl(${p.hue}, 80%, 65%)`;
        g.addColorStop(0, `rgba(255,255,255,${Math.min(1, p.alpha)})`);
        g.addColorStop(0.15, `rgba(255,255,255,${Math.min(0.8, p.alpha * 0.9)})`);
        g.addColorStop(0.35, `rgba(200,220,255,${p.alpha * 0.5})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);

        // tiny bright core
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, p.alpha)})`;
        ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.2, 1.2);

        if (p.life <= 0 || p.alpha < 0.02) {
          particles.splice(i, 1);
        }
      }

        // keep a gentle steady count
      if (particles.length < (isCoarse ? 30 : 60)) spawn(isCoarse ? 4 : 6);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.9,
      }}
    />
  );
}
