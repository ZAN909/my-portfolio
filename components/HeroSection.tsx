'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const CYCLE_NAMES = ['추호승', 'HO SEUNG CHOO', 'VHS'];
const GLITCH_CHARS = '#@%!▓░[]{}<>/\\|*~^&$Ξ≠≡';

function scramble(text: string, intensity: number): string {
  return text.split('').map(c => {
    if (c === ' ') return c;
    return Math.random() < intensity
      ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      : c;
  }).join('');
}

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

export default function HeroSection() {
  const blackoutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sysErrorRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);

  const nameIdxRef = useRef(0);
  const [displayName, setDisplayName] = useState(CYCLE_NAMES[0]);
  const [currentName, setCurrentName] = useState(CYCLE_NAMES[0]);

  useEffect(() => {
    const trigger = () => {
      const overlay = blackoutRef.current;
      const content = contentRef.current;
      const sysErr = sysErrorRef.current;
      const welcome = welcomeRef.current;
      if (!overlay || !content || !sysErr || !welcome) return;

      overlay.classList.remove('blackout-active');
      content.classList.remove('content-glitching');
      sysErr.classList.remove('sys-error-active');
      welcome.classList.remove('welcome-active');
      void overlay.offsetWidth;

      overlay.classList.add('blackout-active');
      content.classList.add('content-glitching');
      sysErr.classList.add('sys-error-active');
      welcome.classList.add('welcome-active');
      window.dispatchEvent(new CustomEvent('glitch-trigger'));
    };

    const id = setInterval(trigger, 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const cycleId = setInterval(() => {
      const nextIdx = (nameIdxRef.current + 1) % CYCLE_NAMES.length;
      const fromName = CYCLE_NAMES[nameIdxRef.current];
      const nextName = CYCLE_NAMES[nextIdx];

      let frame = 0;
      const totalFrames = 14;
      const glitchId = setInterval(() => {
        const intensity = Math.max(0, 0.9 - (frame / totalFrames) * 0.9);
        if (intensity > 0) {
          setDisplayName(scramble(fromName, intensity));
        } else {
          setDisplayName(nextName);
          setCurrentName(nextName);
          nameIdxRef.current = nextIdx;
          clearInterval(glitchId);
        }
        frame++;
        if (frame > totalFrames) clearInterval(glitchId);
      }, 45);
    }, 5000);

    return () => clearInterval(cycleId);
  }, []);

  return (
    <section className="relative flex flex-col min-h-screen bg-[#0a0a0a] overflow-hidden">
      <ParticleCanvas />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1, background: 'rgba(10,10,10,0.58)' }} />
      {/* Blackout overlay */}
      <div
        ref={blackoutRef}
        className="absolute inset-0 bg-[#0a0a0a] pointer-events-none"
        style={{ zIndex: 15, opacity: 0 }}
      />
      {/* System error flash */}
      <div
        ref={sysErrorRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 16, opacity: 0 }}
      >
        <div className="text-[#FF2200] text-xs uppercase tracking-[0.4em] mb-2" style={{ fontFamily: 'var(--font-space-mono)' }}>
          ██ CRITICAL SYSTEM ERROR ██
        </div>
        <div className="text-[#FF2200] text-[clamp(2rem,6vw,4rem)]" style={{ fontFamily: 'var(--font-vt323)' }}>
          SYS://FAILURE
        </div>
        <div className="text-[#FF2200] text-xs uppercase tracking-[0.3em] mt-2 opacity-70">
          ERR_CODE: 0x0033FF — SIGNAL LOST
        </div>
      </div>

      {/* Welcome ASCII */}
      <div
        ref={welcomeRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 16, opacity: 0 }}
      >
        <div className="text-[#00FFAA] text-xs tracking-widest mb-4" style={{ fontFamily: 'var(--font-space-mono)' }}>
          ╔══════════════════════════════════╗
        </div>
        <div className="text-[#00FFAA] text-xs tracking-widest" style={{ fontFamily: 'var(--font-space-mono)' }}>
          ║{'  '}SYS://RESTORED — ONLINE{'  '}║
        </div>
        <div className="text-[#00FFAA] text-[clamp(3rem,8vw,6rem)] tracking-[0.3em] my-3" style={{ fontFamily: 'var(--font-vt323)' }}>
          W E L C O M E
        </div>
        <div className="text-[#00FFAA] text-xs tracking-widest mb-1 opacity-80" style={{ fontFamily: 'var(--font-space-mono)' }}>
          ║{'  '}USER: VISITOR_01 {'  '}CLEARANCE: GRANTED{'  '}║
        </div>
        <div className="text-[#00FFAA] text-xs tracking-widest mt-4" style={{ fontFamily: 'var(--font-space-mono)' }}>
          ╚══════════════════════════════════╝
        </div>
      </div>

      {/* Top status bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-[#0033FF] text-xs text-[#0033FF] uppercase tracking-widest">
        <span>SYS://PORTFOLIO.V1</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFAA] animate-blink inline-block" />
          ONLINE
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16">
        {/* Label */}
        <div className="text-xs text-[#0033FF] uppercase tracking-[0.3em] mb-6">
          [ AUDIOVISUAL ARTIST ]
        </div>

        {/* Name with glitch */}
        <div className="relative mb-8">
          <h1
            className="glitch-wrapper text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight uppercase"
            style={{ fontFamily: "var(--font-vt323)" }}
            data-text={currentName}
          >
            {displayName}
          </h1>
        </div>

        {/* Description */}
        <p className="text-sm text-[#7fa8b8] max-w-md leading-relaxed mb-12 tracking-wide">
          사운드와 비주얼이 교차하는 경험을 만듭니다.<br />
          AUDIO × VISUAL × PERFORMANCE
        </p>

        {/* CTA */}
        <div className="flex gap-4 flex-wrap">
          <a
            href="#contact"
            className="px-8 py-3 bg-[#0033FF] text-white text-xs uppercase tracking-widest hover:bg-white hover:text-[#0033FF] transition-colors duration-75"
          >
            CONTACT
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 cyber-border text-xs uppercase tracking-widest transition-colors duration-75"
          >
            RESUME
          </a>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-[#1a1a1a] text-xs text-[#333] uppercase tracking-widest">
        <span>KR / SEOUL</span>
        <span>추호승</span>
        <span className="hidden sm:block">AUDIO · VISUAL · PERFORMANCE</span>
      </div>
    </section>
  );
}
