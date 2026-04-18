import { useScrollReveal } from "../hooks/useScrollReveal";

const features = [
  { icon: "∑", title: "Quantum AI-Powered Analytics", desc: "Integrated with Telth's P3DSC Whole Body Investigator for comprehensive pattern detection and response forecasting." },
  { icon: "◎", title: "Master Health Examination System", desc: "Combining Micro Lab, Hybrid DEXA, and advanced imaging to deliver a whole-body view from a single visit." },
  { icon: "⊕", title: "Deep-Tech, Globally Referenced", desc: "Built on innovation inspired by researchers at Johns Hopkins and Harvard. Referenced to FDA, CE, UKCA, and CDSCO standards." },
  { icon: "⟳", title: "Scalable Precision Health", desc: "A high-end yet scalable hub for precision health, preventive diagnostics, and structured wellness transformation." },
];

const specs = [
  { name: "Biomarkers Assessed", value: "250+" },
  { name: "Imaging Technology", value: "Hybrid DEXA + fMRI" },
  { name: "AI Engine", value: "Quantum-AI" },
  { name: "Regulatory Standards", value: "FDA · CE · UKCA · CDSCO" },
  { name: "Biological Age Testing", value: "Epigenetic Methods" },
  { name: "Cognitive Assessment", value: "Included" },
  { name: "Delivery", value: "Hub · Flagship · At-Home" },
];

export default function HubSection() {
  const { ref: leftRef, visible: leftVisible } = useScrollReveal();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal();

  return (
    <section id="hub" className="bg-[#0e0e14] px-4 md:px-8 lg:px-16 py-16 md:py-28">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-[#c9a84c]" />
        <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">The Eterna Longevity Hub</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
        <div ref={leftRef}>
          <h2 className={`text-[#f0ead8] leading-[1.12] mb-4 transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,3.2vw,3.2rem)" }}>
            Powered by <em className="text-[#e2c97e]">Telth</em><br />Operating Systems
          </h2>
          <p className={`text-[#f0ead8]/45 text-sm leading-relaxed mb-10 transition-all duration-700 delay-100 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Eterna Longevity Hub is an advanced preventive and longevity care platform powered by TELTH OPERATING SYSTEMS, designed to move beyond routine check-ups into deep, data-driven health investigation.
          </p>
          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`flex gap-4 items-start transition-all duration-700 ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${200 + i * 100}ms` }}>
                <div className="w-9 h-9 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0 text-[#c9a84c]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>{f.icon}</div>
                <div>
                  <div className="text-[#f0ead8] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 400 }}>{f.title}</div>
                  <p className="text-[#f0ead8]/40 text-[11px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={rightRef} className={`relative bg-[#13131a] border border-[#c9a84c]/15 p-6 md:p-8 transition-all duration-700 delay-200 ${rightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="absolute inset-3 border border-[#c9a84c]/06 pointer-events-none" />
          <div className="text-[#e2c97e] mb-6 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.05rem" }}>P3DSC Whole Body Investigator</div>
          <div className="flex flex-col divide-y divide-[#c9a84c]/10">
            {specs.map((s) => (
              <div key={s.name} className="flex justify-between items-center py-3.5">
                <span className="text-[#f0ead8]/40 text-[11px] tracking-[0.08em]">{s.name}</span>
                <span className="text-[#e2c97e]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontWeight: 400 }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-[#f0ead8]/20 text-[9px] tracking-[0.2em] uppercase">
            Powered by Telth Operating Systems · Harley Health System
          </div>
        </div>
      </div>
    </section>
  );
}
