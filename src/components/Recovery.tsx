const cards = [
  {
    num: '01',
    title: 'Medical Intervention',
    desc: 'Precision medical protocols guided by your P3DSC health map. From advanced hormone optimization and IV therapy to regenerative medicine and targeted pharmaceutical interventions — each treatment addresses specific organ-level deficiencies identified in your baseline assessment.',
  },
  {
    num: '02',
    title: 'Nutritional Science',
    desc: 'Personalized nutrition plans designed around your biomarker profile, genetic predispositions, and metabolic type. Our food-based intervention protocols use precision supplementation, gut microbiome optimization, and organ-supportive dietary frameworks.',
  },
  {
    num: '03',
    title: 'Lifestyle Optimization',
    desc: 'Comprehensive lifestyle reprogramming covering sleep architecture, stress physiology, movement science, and environmental optimization. Each recommendation is calibrated to your biological data to accelerate organ recovery and maintain sustainable vitality.',
  },
  {
    num: '04',
    title: 'Aesthetic & Body Care',
    desc: 'Once medical longevity foundations are established, our cosmetic and aesthetic programs restore your natural physical appearance. Medical aesthetics, body care, and regenerative skin treatments complete the transformation.',
  },
]

export default function Recovery() {
  return (
    <section
      id="recovery"
      className="py-30 px-15"
      style={{ background: 'linear-gradient(180deg, var(--deep-blue) 0%, var(--deep) 100%)' }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 mt-3">
        <div className="text-xs font-semibold uppercase mb-5" style={{ letterSpacing: 5, color: '#e7c04b' }}>
          Integrated Recovery
        </div>
        <h2 className="font-light leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,56px)' }}>
          The Four Pillars of Recovery
        </h2>
        <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--body-text)' }}>
          Eterna's recovery protocol operates through four interconnected intervention channels, each
          guided by the P3DSC algorithm to ensure organ-level optimization and biological age reversal.
        </p>
      </div>

      {/* 2×2 grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((c, i) => (
          <div
            key={i}
            className="fade-in relative p-12 transition-all duration-400"
            style={{
              background: 'rgba(27,40,56,0.3)',
              border: '1px solid rgba(201,169,110,0.1)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(201,169,110,0.25)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(201,169,110,0.1)'
              el.style.transform = ''
            }}
          >
            {/* Ghost watermark number */}
            <div
              className="absolute top-5 right-8 leading-none pointer-events-none select-none"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 54, fontWeight: 300, color: 'rgba(201,169,110,0.1)' }}
            >
              {c.num}
            </div>

            <h3
              className="font-normal mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#e7c04b' }}
            >
              {c.title}
            </h3>
            <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--body-text)' }}>
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
