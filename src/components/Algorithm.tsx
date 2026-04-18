const steps = [
  {
    marker: 'P',
    title: 'Predictive Analysis',
    desc: 'The algorithm analyzes your 250+ biomarkers, genetic profile, and organ data to predict health trajectories and identify pre-symptomatic conditions before they manifest — giving you the power of early intervention.',
  },
  {
    marker: 'P',
    title: 'Preventive Protocol',
    desc: 'Based on predictive insights, the algorithm generates organ-specific prevention strategies — targeted nutritional protocols, lifestyle modifications, and medical interventions designed to prevent deterioration before it begins.',
  },
  {
    marker: 'P',
    title: 'Personalized Pathways',
    desc: 'No two bodies are alike. The P3DSC creates a completely individualized health map — factoring in your genetics, current baseline, lifestyle context, and recovery goals to design interventions unique to your biology.',
  },
  {
    marker: 'D',
    title: 'Diagnostic Precision',
    desc: 'Continuous diagnostic refinement ensures every intervention is data-backed. The algorithm correlates findings across all 28+ organs and 250+ biomarkers to identify root causes, not just symptoms.',
  },
  {
    marker: 'SC',
    title: 'Systematic Care Delivery',
    desc: 'The final layer coordinates your complete care journey — orchestrating medical treatments, nutritional plans, lifestyle adjustments, and aesthetic recovery programs through our connected longevity center network.',
  },
]

export default function Algorithm() {
  return (
    <section id="algorithm" className="py-30 px-15" style={{ background: 'var(--deep)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-xs font-semibold uppercase mb-5" style={{ letterSpacing: 5, color:" #e2c97e" }}>
            The Engine of Longevity
          </div>
          <h2 className="font-light leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px,4vw,56px)' ,color:" #cba430" }}>
            The P3DSC Algorithm
          </h2>
          <p className="text-xs leading-relaxed font-light mx-auto" style={{ color: 'var(--body-text)', maxWidth: 640 }}>
            Our proprietary Predictive, Preventive, Personalized, Diagnostic, and Systematic Care
            algorithm transforms raw health data into an actionable, organ-by-organ optimization blueprint.
          </p>
        </div>

        {/* Timeline steps */}
        <div className="flex flex-col -pt-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="fade-in grid gap-3 py-3 relative"
              style={{ gridTemplateColumns: '80px 1fr' }}
            >
              {/* Vertical connector line (except last) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute"
                  style={{
                    left: 39, top: 0, bottom: 0, width: 1,
                    background: 'linear-gradient(180deg, var(--gold), rgba(201,169,110,0.2))',
                  }}
                />
              )}

              {/* Letter marker box */}
              <div
                className="w-20 h-20 flex items-center justify-center text-2xl font-light relative z-10"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  border: '1px solid var(--gold)',
                  color: 'var(--gold)',
                  background: 'var(--deep)',
                }}
              >
                {s.marker}
              </div>

              {/* Content */}
              <div className="pt-4">
                <h3
                  className="font-normal mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28,color:" #eccc6e" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--body-text)', maxWidth: 700 ,fontFamily: 'Cormorant Garamond, serif'}}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
