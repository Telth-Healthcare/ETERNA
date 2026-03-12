import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pills = [
  { label: "Biological Age", value: "43", sub: "Chronological: 54", pos: "top-[8%] right-[-56px]", posMobile: "top-[5%] right-[-20px]", delay: "0s" },
  { label: "Inflammation", value: "Optimal", sub: "hs-CRP: 0.4 mg/L", pos: "top-[34%] left-[-68px]", posMobile: "top-[30%] left-[-20px]", delay: "1.2s" },
  { label: "VO₂ Max", value: "48.2", sub: "Top 12% for age", pos: "top-[60%] right-[-52px]", posMobile: "top-[55%] right-[-20px]", delay: "2.4s" },
  { label: "Phase", value: "Gate 2", sub: "Day 91 / 365", pos: "bottom-[8%] left-[-52px]", posMobile: "bottom-[5%] left-[-20px]", delay: "0.8s" },
];

function DataPill({ label, value, sub, pos, delay }: { label: string; value: string; sub: string; pos: string; delay: string; posMobile?: string }) {
  return (
    <div
      className={`absolute ${pos} bg-[#13131a]/90 border border-[#c9a84c]/20 backdrop-blur-sm rounded-lg px-3 py-2 z-10`}
      style={{ animation: `floatPill 4s ease-in-out ${delay} infinite` }}
    >
      <div className="text-[#f0ead8]/40 text-[8px] tracking-[0.15em] uppercase">{label}</div>
      <div className="text-[#e2c97e] text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{value}</div>
      <div className="text-[#f0ead8]/25 text-[7px]">{sub}</div>
    </div>
  );
}

function HumanFigure() {
  return (
    <div className="relative w-72 h-[500px]">
      {/* Body silhouette */}
      <div
        className="w-full h-full border border-[#c9a84c]/20 relative overflow-hidden"
        style={{
          borderRadius: "50% 50% 45% 45% / 40% 40% 60% 60%",
          background: "linear-gradient(160deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.02) 100%)",
        }}
      >
        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
            animation: "scanLine 3s ease-in-out infinite",
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.06) 100%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      {/* Data pills */}
      {pills.map((p) => (
        <DataPill key={p.label} {...p} />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 md:px-8 lg:px-16 pt-28 pb-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Left */}
        <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">Integrated Longevity Approach</span>
          </div>
          <h1
            className="text-[#f0ead8] leading-[1.08] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.4rem,5vw,4.2rem)" }}
          >
            Luxury Longevity,<br />
            <em className="text-[#e2c97e]">Engineered</em><br />
            for Proof
          </h1>
          <p className="text-[#f0ead8]/45 text-sm leading-relaxed mb-2 max-w-lg">
            A premium, data-driven longevity program designed to measure, monitor, and improve how you age.
          </p>
          <p className="text-[#f0ead8]/30 text-xs leading-relaxed mb-8 max-w-lg">
            Luxury in delivery.{" "}
            Precision in care.{" "}Designed with affordability in mind.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <button onClick={() => navigate('/contact')} className="bg-[#c9a84c] text-[#0a0a0a] px-6 sm:px-8 py-3.5 text-[10px] tracking-[0.22em] uppercase font-semibold hover:bg-[#e2c97e] transition-colors duration-300">
              Book Baseline Assessment
            </button>
            {/* <button className="border border-[#c9a84c]/30 text-[#f0ead8] px-6 sm:px-8 py-3.5 text-[10px] tracking-[0.22em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300">
              How It Works
            </button> */}
          </div>
          {/* Accreditation strip */}
          <div className="flex flex-wrap gap-4">
            {["Harley Street Clinical Governance", "FDA · CE · UKCA · CDSCO", "Quantum-AI Powered"].map((t) => (
              <span key={t} className="text-[#f0ead8]/20 text-[9px] tracking-[0.15em] uppercase border border-[#f0ead8]/10 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className={`hidden lg:block transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <HumanFigure />
        </div>
      </div>

      <style>{`
        @keyframes floatPill {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scanLine {
          0%, 100% { top: 8%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 88%; }
        }
      `}</style>
    </section>
  );
}
