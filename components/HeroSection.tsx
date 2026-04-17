export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="animate-float2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="animate-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-fade-up mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-purple-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for work
        </div>

        <h1
          className="animate-fade-up text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4 gradient-text"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          추호승
        </h1>

        <p
          className="animate-fade-up text-xl sm:text-2xl text-slate-300 mb-3 font-light"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Audiovisual Artist
        </p>

        <p
          className="animate-fade-up text-base text-slate-400 mb-10 max-w-md leading-relaxed"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          사운드와 비주얼이 만나는 순간을 만들어냅니다.
        </p>

        <div
          className="animate-fade-up flex gap-4"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <a
            href="#contact"
            className="px-7 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-xl font-medium glass text-slate-200 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
