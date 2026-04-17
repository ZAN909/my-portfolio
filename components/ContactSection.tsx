const LINKS = [
  {
    label: "EMAIL",
    value: "hoseung89@naver.com",
    href: "mailto:hoseung89@naver.com",
  },
  {
    label: "GITHUB",
    value: "github.com/ZAN909",
    href: "https://github.com/ZAN909",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-blue py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Section label */}
        <div className="text-xs uppercase tracking-[0.3em] mb-12 opacity-60">
          [ 04 / CONTACT ]
        </div>

        <h2 className="text-6xl sm:text-8xl uppercase leading-tight mb-16" style={{ fontFamily: "var(--font-vt323)" }}>
          LET&apos;S<br />WORK<br />TOGETHER.
        </h2>

        <div className="flex flex-col gap-px bg-white/20">
          {LINKS.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="bg-[#0033FF] hover:bg-white hover:text-[#0033FF] transition-colors duration-75 px-6 py-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs opacity-50 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-bold tracking-wide">{value}</span>
              </div>
              <span className="text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 flex justify-between text-xs opacity-40 uppercase tracking-widest">
          <span>© 2025 추호승</span>
          <span>AUDIOVISUAL ARTIST</span>
        </div>
      </div>
    </section>
  );
}
