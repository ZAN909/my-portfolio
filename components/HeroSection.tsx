export default function HeroSection() {
  return (
    <section className="relative flex flex-col min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Top status bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#0033FF] text-xs text-[#0033FF] uppercase tracking-widest">
        <span>SYS://PORTFOLIO.V1</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFAA] animate-blink inline-block" />
          ONLINE
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16">
        {/* Label */}
        <div className="text-xs text-[#0033FF] uppercase tracking-[0.3em] mb-6">
          [ AUDIOVISUAL ARTIST ]
        </div>

        {/* Name with glitch */}
        <div className="relative mb-8">
          <h1
            className="glitch-wrapper text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight uppercase"
            style={{ fontFamily: "var(--font-vt323)" }}
            data-text="추호승"
          >
            추호승
          </h1>
        </div>

        {/* Description */}
        <p className="text-sm text-[#7fa8b8] max-w-md leading-relaxed mb-12 tracking-wide">
          사운드와 비주얼이 교차하는 경험을 만듭니다.<br />
          SOUND × VISUAL × PERFORMANCE
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
      <div className="flex items-center justify-between px-6 py-3 border-t border-[#1a1a1a] text-xs text-[#333] uppercase tracking-widest">
        <span>KR / SEOUL</span>
        <span>© 2025 추호승</span>
        <span className="hidden sm:block">SOUND · VISUAL · PERFORMANCE</span>
      </div>
    </section>
  );
}
