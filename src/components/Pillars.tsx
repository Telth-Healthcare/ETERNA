const pillars = [
  {
    icon: 'I',
    title: 'Master Health Examination System',
    desc: 'The most thorough diagnostic examination available. Our Master Health system performs a complete organ-by-organ assessment, establishing your definitive health baseline — revealing current status, normal parameters, and the precise path to optimal function.',
    features: ['Full-body organ function mapping', 'Baseline health establishment', 'Deviation-from-normal analysis', 'Recovery pathway identification'],
  },
  {
    icon: 'II',
    title: 'Micro Lab',
    desc: 'Our advanced Micro Lab analyzes over 250 biomarkers with laboratory-grade precision, creating the most comprehensive molecular picture of your health. Every data point feeds the P3DSC algorithm.',
    features: ['250+ biomarker comprehensive panel', 'Hormonal & metabolic profiling', 'Inflammatory marker analysis', 'Genetic profiling integration'],
  },
  {
    icon: 'III',
    title: 'Hybrid DEXA Longevity Hub',
    desc: 'Our Hybrid DEXA system goes beyond bone density — providing precision body composition analysis, visceral fat quantification, and organ-level imaging that create the physical dimension of your longevity profile.',
    features: ['Precision body composition analysis', 'Visceral fat quantification', 'Bone density & mineral assessment', 'Biological age determination'],
  },
]

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="py-30 px-15"
      style={{ background: 'linear-gradient(180deg, var(--deep) 0%, var(--deep-blue) 100%)' }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 mt-3">
        <div className="text-xs font-semibold uppercase mb-2" style={{ letterSpacing: 5, color: '#e7c04b' }}>
          The Three Verticals
        </div>
        <h2 className="font-light leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,56px)' }}>
          Telth AI Health Hub Architecture
        </h2>
        <p className="text-base leading-relaxed font-light" style={{ color: 'var(--body-text)' }}>
          Three integrated verticals working in concert to establish your health baseline, map your
          recovery, and optimize every system in your body.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="fade-in relative overflow-hidden p-13 transition-all duration-500 group p-3"
            style={{
              background: 'rgba(27,40,56,0.4)',
              border: '1px solid rgba(201,169,110,0.1)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(201,169,110,0.3)'
              el.style.transform = 'translateY(-4px)'
              el.style.background = 'rgba(27,40,56,0.6)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(201,169,110,0.1)'
              el.style.transform = ''
              el.style.background = 'rgba(27,40,56,0.4)'
            }}
          >
            {/* Gold top line — fades in on hover via CSS group */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
            />

            {/* Roman numeral icon */}
            <div
              className="w-14 h-14 mb-7 flex items-center justify-center text-xl font-light "
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                border: '1px solid rgba(201,169,110,0.3)',
                color: '#e7c04b',
              }}
            >
              {p.icon}
            </div>

            <h3
              className="font-normal mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#e7c04b' }}
            >
              {p.title}
            </h3>
            <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--body-text)' }}>
              {p.desc}
            </p>

            {/* Feature list */}
            <ul
              className="mt-7 pt-6"
              style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }}
            >
              {p.features.map((f, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2.5 py-2 text-xs font-light"
                  style={{ color: 'var(--body-text)' }}
                >
                  <span style={{ color: 'var(--gold)', fontSize: 6 }}>◆</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
