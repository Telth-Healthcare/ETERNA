import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01", title: "WHOLE BODY+ Diagnostic Workup",
    desc: "We begin with a comprehensive diagnostic profile designed to be clinically actionable. A full lifestyle study is included alongside biological investigation.",
    bullets: ["Clinical history and lifestyle profiling","Core labs and biomarker panels","Genetic testing (consent-based; where clinically appropriate)","Body composition: Hybrid DEXA, fMRI and MRI where available","Cardiometabolic and inflammatory risk screening","Optional wearables / IoMT for continuous trend capture"],
    tags: ["Epigenetic Age","Biomarker Panels","3D Body Scan","VO₂ Max","Cognitive Function","P3DSC Investigator","Micro Lab","Hybrid DEXA"],
  },
  {
    num: "02", title: "Baseline Creation",
    desc: "Your diagnostic data is converted into a clear baseline that anchors the entire programme — the true starting point for your longevity journey.",
    bullets: ["Biological age baseline","Organ-age baseline (system-wise)","Risk and susceptibility map"],
    tags: ["Biological Age","Organ-Age Map","Susceptibility Summary","Risk Stratification"],
  },
  {
    num: "03", title: "Longevity Treatment Goals",
    desc: "Together with your clinician, we set a defined target and timeline — personalised, measurable, and clinically anchored.",
    bullets: ["Biological age improvement targets","Organ-system optimisation targets","Physical function and performance goals","Risk reduction objectives — cardiometabolic, inflammatory, cognitive"],
    tags: ["90-Day Targets","365-Day Targets","Organ Optimisation","Performance Goals","CARE PAY Plan"],
  },
  {
    num: "04", title: "P3DSC Modelling with Quantum-AI Support",
    desc: "P3DSC — Precise, Predictive, Preventive, Data-Driven Smart Care — structures your data into priorities, sequences, and monitoring rules.",
    bullets: ["Intervention sequencing and priority ranking","Monitoring cadence and escalation rules","Response scoring and optimisation loops","Safety gating and contraindication checks"],
    tags: ["Quantum-AI Engine","P3DSC Framework","Pattern Detection","Safety Gates","Clinician Oversight"],
  },
  {
    num: "05", title: "Phased Longevity Programme",
    desc: "A structured plan, delivered with discretion and precision — typically spanning 90 to 365 days across defined phase gates.",
    bullets: ["Metabolic optimisation: nutrition, insulin sensitivity, lipid health","Performance and resilience: strength, VO₂, mobility, recovery","Sleep and stress systems: circadian optimisation and resilience","Ongoing monitoring and re-testing at phase gates"],
    tags: ["Eterna Care Hubs","Flagship Centres","At-Home On Call","Concierge Service"],
  },
  {
    num: "06", title: "Proof Through Re-measurement",
    desc: "We re-measure, compare against baseline, and adjust based on response and safety biomarkers. Longevity is not static — it requires measured adjustment over time.",
    bullets: ["Biological age trend","Organ-age trend","Biomarker response trend","Functional and performance outcomes"],
    tags: ["Trend Lines","Response Markers","Phase Comparison","Programme Optimisation"],
  },
];

export default function ModelSection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(0.999, scrolled / totalScroll));
      const step = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(step);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const step = steps[activeStep];

  return (
    <>


      <div
        ref={containerRef}
        className="eterna-wrap"
        style={{ height: `${steps.length * 100}vh` }}
      >
        {/* Header */}
        <div className="eterna-header">
          <div className="eterna-eyebrow">
            <span className="eterna-eyebrow-line" />
            The Eterna Model
            <span className="eterna-eyebrow-line" />
          </div>
          <h2 className="eterna-headline">
            Baseline → Modelling → Goal →<br />
            Phased Plan → <em style={{ color: "#e2c97e" }}>Proof</em>
          </h2>
          <p className="eterna-sub">
            At Eterna, longevity is not treated as a trend. It is approached as a measurable, medically guided, and continuously optimized journey.
          </p>
        </div>

        {/* Sticky panel */}
        <div className="eterna-sticky">

          {/* ── Horizontal timeline ── */}
          <div className="timeline-track">
            {steps.map((s, i) => {
              const isLast = i === steps.length - 1;
              const isDone = i < activeStep;
              const isActive = i === activeStep;
              return (
                <div key={s.num} className="timeline-node " style={{ flex: isLast ? "0 0 auto" : 1 }}>
                  <div className={`timeline-dot  ${isActive ? "active" : isDone ? "done" : "upcoming"}`}>
                    {s.num}
                  </div>
                  <div className={`timeline-label ${isActive ? "active" : ""}`}>
                    {s.title.split(" ").slice(0, 2).join(" ")}
                  </div>
                  {!isLast && (
                    <div className="timeline-connector" style={{ width: "100%" }}>
                      <div
                        className="timeline-connector-fill"
                        style={{ width: isDone ? "100%" : isActive ? "50%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Content card ── */}
          <div key={activeStep} className="content-card card-animate">
            <div className="card-num">{step.num}</div>
            <h3 className="card-title">{step.title}</h3>
            <div className="card-divider" />
            <p className="card-desc">{step.desc}</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "22px" }}>
              {step.bullets.map((b, i) => (
                <li key={i} className="bullet-item">{b}</li>
              ))}
            </ul>
            <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "16px" }}>
              <div className="tags-label">Assessment Tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {step.tags.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step counter */}

          {/* Scroll hint — only step 1 */}
          {activeStep === 0 && (
            <div className="scroll-hint">
              <span className="scroll-hint-text">Scroll</span>
              <div className="scroll-hint-line" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}