export default function AboutSection() {
  return (
    <section id="about" className="section-blue">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 py-24">
        {/* Section label */}
        <div className="text-xs uppercase tracking-[0.3em] mb-12 opacity-60">
          [ 01 / ABOUT ]
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ID Card */}
          <div className="border border-white/30 p-6 text-sm">
            <div className="flex justify-between items-start mb-4 text-xs opacity-60 uppercase tracking-widest">
              <span>ID / KR</span>
              <span>ARTIST PROFILE</span>
            </div>
            <div className="border-b border-white/20 pb-4 mb-4">
              <div className="text-xs opacity-50 mb-1">NAME</div>
              <div className="text-3xl tracking-wider" style={{ fontFamily: "var(--font-vt323)" }}>추호승</div>
              <div className="text-xs opacity-50 mt-1">HO-SEUNG CHOO</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="opacity-50 mb-1">FIELD</div>
                <div>AUDIOVISUAL</div>
              </div>
              <div>
                <div className="opacity-50 mb-1">BASE</div>
                <div>SEOUL, KR</div>
              </div>
              <div>
                <div className="opacity-50 mb-1">MEDIUM</div>
                <div>AUDIO + VISUAL</div>
              </div>
              <div>
                <div className="opacity-50 mb-1">STATUS</div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA] inline-block animate-blink" />
                  ACTIVE
                </div>
              </div>
              <div className="col-span-2">
                <div className="opacity-50 mb-1">LECTURE</div>
                <div>강서대 · 정화예대 · 상상마당 아카데미</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-40 uppercase tracking-widest text-center">
              AUDIOVISUAL ARTIST / 오디오비주얼 아티스트
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-5xl sm:text-6xl leading-tight mb-8 uppercase" style={{ fontFamily: "var(--font-vt323)" }}>
              AUDIO &<br />VISUAL<br />ARTIST
            </h2>
            <p className="text-sm leading-loose opacity-80 mb-6">
              하드웨어 신시사이저, 드럼 머신, 시퀀서와 실시간 생성 비주얼을 결합하는
              오디오비주얼 아티스트. 아날로그 장비의 따뜻한 음색과 디지털 생성 이미지가
              교차하는 몰입적 경험을 만든다. 자연의 비규칙성을 소리와 빛으로 번역한다.
            </p>
            <p className="text-xs uppercase tracking-widest opacity-60">
              INTEREST: AUDIOVISUAL PERFORMANCE · INTERACTIVE INSTALLATION · GENERATIVE ART
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
