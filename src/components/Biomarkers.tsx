const bioNums = [
  { num: '250+', label: 'Biomarkers' },
  { num: '28+',  label: 'Organs Assessed' },
  { num: '1',    label: 'Genetic Profile' },
  { num: '∞',   label: 'Personalization' },
]

const organs = [
  'Heart & Cardiovascular', 'Brain & Neurology', 'Liver & Hepatic',
  'Kidney & Renal', 'Lungs & Respiratory', 'Thyroid & Endocrine',
  'Pancreas & Metabolic', 'Gastrointestinal Tract', 'Musculoskeletal System',
  'Immune System', 'Reproductive System', 'Skin & Integumentary',
  'Eyes & Ophthalmic', 'Ears & Auditory', 'Adrenal Glands',
  'Lymphatic System', 'Spleen & Blood', 'Prostate / Uterine',
  'Bone Marrow', 'Oral & Dental',
]

export default function Biomarkers() {
  return (
    <section
      id="biomarkers"
      className="py-30 px-15"
      style={{
        background: 'var(--deep-blue)',
        borderTop: '1px solid rgba(201,169,110,0.08)',
        borderBottom: '1px solid rgba(201,169,110,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

        {/* Left — text + stat cards */}
        <div>
          <div className="text-xs font-semibold uppercase mb-5 mt-3" style={{ letterSpacing: 5, color: '#e7c04b' }}>
            Diagnostic Depth
          </div>
          <h2 className="font-light leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,56px)' }}>
            250+ Biomarkers.<br />28+ Organs. One You.
          </h2>
          <p className="text-xs leading-relaxed font-light" style={{ color: 'var(--body-text)', maxWidth: 560 }}>
            Eterna's diagnostic system maps your entire biology — from cellular markers to organ
            function. Every data point contributes to the most complete health portrait ever created.
          </p>

          {/* 2×2 stat cards */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {bioNums.map((b, i) => (
              <div
                key={i}
                className="fade-in p-8 transition-all duration-300"
                style={{
                  background: 'rgba(10,14,23,0.6)',
                  border: '1px solid rgba(201,169,110,0.1)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.25)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.1)')}
              >
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>
                  {b.num}
                </div>
                <div className="mt-2 text-xs uppercase font-medium" style={{ letterSpacing: 2, color: 'var(--body-text)' }}>
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — organ list */}
        <div>
          <div className="text-xs font-semibold uppercase mb-3 pt-3" style={{ letterSpacing: 5, color: '#e7c04b' }}>
            Organ Assessment Scope
          </div>
          <p className="text-xs leading-relaxed font-light mb-10" style={{ color: 'var(--body-text)' }}>
            Every major organ system is individually evaluated, baselined, and mapped for optimization.
          </p>
          <div className="grid grid-cols-2 gap-0">
            {organs.map((o, i) => (
              <div
                key={i}
                className="fade-in px-5 py-3 text-xs font-normal transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(10,14,23,0.4)',
                  borderLeft: '2px solid rgba(201,169,110,0.3)',
                  color: 'var(--body-text)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderLeftColor = 'var(--gold)'
                  el.style.color = 'var(--white)'
                  el.style.background = 'rgba(201,169,110,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderLeftColor = 'rgba(201,169,110,0.3)'
                  el.style.color = 'var(--body-text)'
                  el.style.background = 'rgba(10,14,23,0.4)'
                }}
              >
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
