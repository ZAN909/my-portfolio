'use client';

import { useEffect, useRef } from 'react';

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 6;
const SPRING = 0.1;
const DAMPING = 0.88;
const RGB_CHANNELS = [
  { color: '#FF2200', dx: -2, dy: -1 },
  { color: '#0033FF', dx:  0, dy:  0 },
  { color: '#00CFFF', dx:  2, dy:  1 },
];

const CHARS = [
  '#', '>', '_', '/', '|', '[', ']', '*', '░', '▓',
  'VHS', 'AUDIO', 'VISUAL', '추호승', 'AV',
];

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  opacity: number;
};

function initParticles(width: number, height: number): Particle[] {
  if (width === 0 || height === 0) return [];
  const cols = Math.floor(width / 55);
  const rows = Math.floor(height / 38);
  return Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col + 0.5) * (width / cols) + (Math.random() - 0.5) * 16;
    const y = (row + 0.5) * (height / rows) + (Math.random() - 0.5) * 12;
    return {
      x, y, homeX: x, homeY: y,
      vx: 0, vy: 0,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      size: 10 + Math.floor(Math.random() * 5),
      opacity: 0.35 + Math.random() * 0.3,
    };
  });
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particlesRef.current = initParticles(w, h);
    };

    // 레이아웃이 완전히 잡힌 뒤 초기화
    requestAnimationFrame(resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = null;
      }
    };
    const onMouseLeave = () => { mouseRef.current = null; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.homeX - p.x) * SPRING;
        p.vy += (p.homeY - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        ctx.font = `${p.size}px "Space Mono", monospace`;
        for (const ch of RGB_CHANNELS) {
          ctx.fillStyle = ch.color;
          ctx.globalAlpha = p.opacity * 0.7;
          ctx.fillText(p.char, p.x + ch.dx, p.y + ch.dy);
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
