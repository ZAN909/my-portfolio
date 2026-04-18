'use client';

import { useEffect, useRef } from 'react';

const FONT_SIZE = 11;
const LINE_HEIGHT = 19;
const GAP = 10;
const HIGHLIGHT_CHANCE = 0.16;
const HIGHLIGHT_COLORS = ['#0033FF', '#FF2200', '#00FFAA', '#00CFFF', '#FFD700'];

const WORD_POOL = [
  'VHS', 'AUDIO', 'VISUAL', 'PERFORMANCE', 'GENERATIVE', 'INTERACTIVE',
  'INSTALLATION', 'AUDIOVISUAL', 'LIVE', 'SYNTHESIZER', 'SEQUENCER',
  'PROJECTION', 'MAPPING', 'SIGNAL', 'FREQUENCY', 'NOISE', 'PATTERN',
  'SYSTEM', 'FIELD', 'SPACE', 'TIME', 'BODY', 'SCREEN', 'LIGHT',
  'WAVE', 'PULSE', 'LOOP', 'MODULAR', 'ANALOG', 'DIGITAL', 'CODE',
  'IMAGE', 'ARTIST', '추호승', '소리', '빛', '공간', '신체',
  '경험', '생성', '반복', '신호', '파동', 'HO-SEUNG', 'CHOO',
  'ABLETON', 'MAX/MSP', 'TOUCHDESIGNER', 'RESOLUME', 'AV', 'SEOUL',
  '37.5665°N', '126.9780°E', 'SYS://ACTIVE', 'KR-0091',
  '░░░░', '▓▓▓', '#####', '>>>', '___', '[VHS]', '///ERROR///',
  '경고', '시스템', 'OFF-WORLD', 'UNIT:01', '0x0033FF',
];

type WordItem = {
  text: string;
  highlight: string | null;
  x: number;
  width: number;
};

type Row = {
  y: number;
  direction: 1 | -1;
  baseSpeed: number;
  speedMult: number;
  nextSpeedChange: number;
  offset: number;
  items: WordItem[];
  unitWidth: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRow(
  ctx: CanvasRenderingContext2D,
  index: number,
  y: number,
  screenWidth: number
): Row {
  ctx.font = `${FONT_SIZE}px "Space Mono", monospace`;

  const words = shuffle(WORD_POOL);
  let totalW = 0;
  const unitItems: WordItem[] = [];
  let i = 0;

  while (totalW < screenWidth * 1.5) {
    const word = words[i % words.length];
    const w = ctx.measureText(word).width;
    unitItems.push({
      text: word,
      highlight: Math.random() < HIGHLIGHT_CHANCE
        ? HIGHLIGHT_COLORS[Math.floor(Math.random() * HIGHLIGHT_COLORS.length)]
        : null,
      x: totalW,
      width: w,
    });
    totalW += w + GAP;
    i++;
  }

  const unitWidth = totalW;
  const items: WordItem[] = [];
  for (let rep = 0; rep < 3; rep++) {
    for (const item of unitItems) {
      items.push({ ...item, x: item.x + rep * unitWidth });
    }
  }

  const direction = (index % 2 === 0 ? 1 : -1) as 1 | -1;
  const baseSpeed = 0.3 + Math.random() * 1.0;

  return {
    y,
    direction,
    baseSpeed,
    speedMult: 1.0,
    nextSpeedChange: Math.floor(60 + Math.random() * 120),
    offset: Math.random() * unitWidth,
    items,
    unitWidth,
  };
}

export default function ParticleCanvas() {
  const GLITCH_INTERVAL = 15; // seconds — must match HeroSection interval

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rowsRef = useRef<Row[]>([]);
  const rafRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const glitchTimeRef = useRef<number>(GLITCH_INTERVAL); // start at max so first cycle is full
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = () => {
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const numRows = Math.ceil(h / LINE_HEIGHT) + 1;
      rowsRef.current = Array.from({ length: numRows }, (_, i) =>
        buildRow(ctx, i, i * LINE_HEIGHT + FONT_SIZE, w)
      );
    };

    requestAnimationFrame(init);
    window.addEventListener('resize', init);

    const onGlitch = () => { glitchTimeRef.current = 0; };
    window.addEventListener('glitch-trigger', onGlitch);

    const tick = (timestamp: number) => {
      const dt = lastFrameTimeRef.current
        ? (timestamp - lastFrameTimeRef.current) / 1000
        : 0;
      lastFrameTimeRef.current = timestamp;

      glitchTimeRef.current = Math.min(glitchTimeRef.current + dt, GLITCH_INTERVAL);
      const t = glitchTimeRef.current / GLITCH_INTERVAL;
      // 0.5x(slow) → 1.0x(full) with 4th-power exponential curve
      const cycleSpeedMult = 0.5 + 0.5 * Math.pow(t, 4);

      frameRef.current++;
      const frame = frameRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "Space Mono", monospace`;

      for (const row of rowsRef.current) {
        // Random speed variation
        if (frame >= row.nextSpeedChange) {
          row.speedMult = 0.2 + Math.random() * 2.5;
          row.nextSpeedChange = frame + 60 + Math.floor(Math.random() * 200);
        }
        // Gradually ease speedMult back toward 1
        row.speedMult += (1.0 - row.speedMult) * 0.01;

        row.offset += row.baseSpeed * row.speedMult * cycleSpeedMult * row.direction;
        if (row.offset >= row.unitWidth) row.offset -= row.unitWidth;
        if (row.offset < 0) row.offset += row.unitWidth;

        const startX = -row.offset;

        for (const item of row.items) {
          const x = startX + item.x;
          if (x + item.width < 0 || x > canvas.width) continue;

          if (item.highlight) {
            const pad = 2;
            ctx.fillStyle = item.highlight;
            ctx.fillRect(x - pad, row.y - FONT_SIZE, item.width + pad * 2, FONT_SIZE + 4);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#000000';
          } else {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = '#ffffff';
          }

          ctx.fillText(item.text, x, row.y);
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('glitch-trigger', onGlitch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, filter: 'blur(1px)' }}
    />
  );
}
