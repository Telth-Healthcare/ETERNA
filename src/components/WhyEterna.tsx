import { useScrollReveal } from "../hooks/useScrollReveal";

const questions = [
  { q: "What is this person vulnerable to?", a: "Susceptibility & risk biomarker mapping before disease appears", highlight: false },
  { q: "What is happening beneath the surface?", a: "250+ biomarker assessment. Organ-age baseline. Whole body data pool.", highlight: false },
  { q: "Which intervention is most suitable?", a: "P3DSC modelling with Quantum-AI — clinician accountable for every decision", highlight: false },
  { q: "Is the plan working biologically?", a: "Proof through re-measurement at every phase gate", highlight: true },
];

function AppMockup() {
  return (
    <div className="bg-[#13131a] border border-[#c9a84c]/18 rounded-2xl p-5 max-w-[270px] mx-auto shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#c9a84c] text-[9px] tracking-[0.22em] uppercase">Eterna Dashboard</span>
        <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
      </div>
      <div className="bg-[#c9a84c]/06 border border-[#c9a84c]/18 rounded-lg p-3 mb-2">
        <div className="text-[#f0ead8]/40 text-[9px] tracking-[0.18em] uppercase mb-1">Biological Age</div>
        <div className="text-[#e2c97e] leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}>
          43 <span className="text-base text-[#f0ead8]/40">yrs</span>
        </div>
        <div className="text-[#f0ead8]/40 text-[9px] mb-2">↓ 11 years from baseline</div>
        <div className="h-1 bg-[#c9a84c]/15 rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {[
          { label: "Phase", val: "Gate 2", sub: "Day 91", valColor: "text-[#e2c97e]" },
          { label: "Safety", val: "Clear", sub: "All markers", valColor: "text-green-400" },
        ].map(({ label, val, sub, valColor }) => (
          <div key={label} className="bg-[#c9a84c]/06 border border-[#c9a84c]/18 rounded-lg p-3">
            <div className="text-[#f0ead8]/40 text-[9px] tracking-[0.15em] uppercase mb-1">{label}</div>
            <div className={`${valColor} leading-none`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300 }}>{val}</div>
            <div className="text-[#f0ead8]/35 text-[9px] mt-1">{sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#c9a84c]/06 border border-[#c9a84c]/18 rounded-lg p-3">
        <div className="text-[#f0ead8]/40 text-[9px] tracking-[0.18em] uppercase mb-1">P3DSC Score</div>
        <div className="text-[#e2c97e] leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300 }}>
          87 <span className="text-sm text-[#f0ead8]/40">/100</span>
        </div>
        <div className="text-[#f0ead8]/35 text-[9px] mb-2">Precision response on track</div>
        <div className="h-1 bg-[#c9a84c]/15 rounded-full overflow-hidden">
          <div className="h-full w-[87%] bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function WhyEterna() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="why" className="bg-[#0a0a0a] px-4 md:px-8 lg:px-16 py-16 md:py-28">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-[#c9a84c]" />
        <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">The Eterna Philosophy
</span>
      </div>
      <h2 className="text-[#f0ead8] leading-[1.12] mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,3.2vw,3.2rem)" }}>
        Most programmes stop at a <em className="text-[#e2c97e]">report</em>
      </h2>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <p className="text-[#f0ead8]/45 text-sm leading-relaxed mb-8 max-w-lg">
           Eterna by Harley Health is the world's most comprehensive holistic longevity program, powered by Telth AI Health Hubs and the revolutionary DEXA Longevity Hub. We go far beyond standard health checks.

Our integrated approach establishes your individual baseline, creates a need-based genetic profile, and deploys the proprietary P3DSC algorithm to map a personalized recovery plan — combining medical intervention, nutritional science, lifestyle optimization, and cosmetic restoration to deliver true biological age reversal and physical vitality.
          </p>
          <div className="flex flex-col gap-5">
            {questions.map(({ q, a, highlight }, i) => (
              <div
                key={i}
                className={`border-l pl-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${highlight ? "border-[#c9a84c]" : "border-[#c9a84c]/18"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`mb-1 leading-snug ${highlight ? "text-[#f0ead8]" : "text-[#f0ead8]/50"}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.05rem" }}>{q}</div>
                <div className={`text-[11px] tracking-[0.06em] ${highlight ? "text-[#e2c97e]" : "text-[#f0ead8]/70"}`}>{a}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <AppMockup />
        </div>
      </div>
    </section>
  );
}
