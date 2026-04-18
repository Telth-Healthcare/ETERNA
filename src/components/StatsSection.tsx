import { useCountUp } from "../hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 250, suffix: "+", label: "Biomarkers\nAssessed" },
  { target: 7, suffix: "", label: "Biomarker Framework\nLayers" },
  { target: 6, suffix: "", label: "Steps from Baseline\nto Proof" },
  { target: 365, suffix: "", label: "Day Maximum\nProgramme" },
  { target: 3, suffix: "", label: "Programme Tiers with\nPhased Care Plans" },
];

function StatItem({
  target, suffix, label, index,
}: {
  target: number; suffix: string; label: string; index: number;
}) {
  const { count, ref: countRef } = useCountUp(target, 1600, true);
  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={(node) => {
        (itemRef as any).current = node;
        (countRef as any).current = node;
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden text-center cursor-default
        py-10 px-4 md:px-6
        border-b sm:border-b-0 sm:border-r border-[#c9a84c]/15
        last:border-r-0 last:border-b-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
      }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 h-px w-full"
        style={{
          background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          transformOrigin: "center",
        }}
      />

      {/* Decorative corner marks */}
      <div className="absolute top-2 left-2 w-2 h-2 pointer-events-none"
        style={{ opacity: visible ? 0.4 : 0, transition: `opacity 0.5s ease ${index * 120 + 400}ms` }}>
        <div className="absolute top-0 left-0 w-full h-px bg-[#c9a84c]" />
        <div className="absolute top-0 left-0 h-full w-px bg-[#c9a84c]" />
      </div>
      <div className="absolute top-2 right-2 w-2 h-2 pointer-events-none"
        style={{ opacity: visible ? 0.4 : 0, transition: `opacity 0.5s ease ${index * 120 + 400}ms` }}>
        <div className="absolute top-0 right-0 w-full h-px bg-[#c9a84c]" />
        <div className="absolute top-0 right-0 h-full w-px bg-[#c9a84c]" />
      </div>

      {/* Number */}
      <div
        className="relative leading-none mb-3"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2.6rem,3.6vw,3.8rem)",
          fontWeight: 300,
          color: hovered ? "#f0d98a" : "#e2c97e",
          transition: "color 0.3s ease, text-shadow 0.3s ease",
          textShadow: hovered
            ? "0 0 30px rgba(201,168,76,0.5), 0 0 60px rgba(201,168,76,0.2)"
            : "0 0 20px rgba(201,168,76,0.15)",
        }}
      >
        {count}{suffix}

        {/* Underline sweep */}
        <div
          className="absolute -bottom-1 left-1/2 h-px"
          style={{
            background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
            width: hovered ? "80%" : "0%",
            transform: "translateX(-50%)",
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      {/* Label */}
      <div
        className="relative text-[10px] tracking-[0.18em] uppercase leading-relaxed whitespace-pre-line"
        style={{
          color: hovered ? "rgba(240,234,216,0.65)" : "rgba(240,234,216,0.38)",
          transition: "color 0.3s ease",
          letterSpacing: "0.18em",
        }}
      >
        {label}
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 h-px w-full"
        style={{
          background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.05s",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes titleReveal {
          from { opacity: 0; transform: translateY(20px) skewY(1deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.35; }
        }
        .border-pulse { animation: borderPulse 3s ease infinite; }
      `}</style>

      <section
        ref={sectionRef}
        id="stats"
        className="relative bg-[#0a0a0a] px-4 md:px-8 lg:px-16 py-16 md:py-24 text-center overflow-hidden"
      >
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />

        {/* Radial vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)",
          }}
        />

        {/* Eyebrow */}
        <div
          className="relative flex items-center justify-center gap-3 mb-4"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="w-6 h-px bg-[#c9a84c]"
            style={{
              transformOrigin: "right",
              animation: sectionVisible ? "lineExpand 0.6s ease 0.2s both" : "none",
            }}
          />
          <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">Built on Precision</span>
          <div
            className="w-6 h-px bg-[#c9a84c]"
            style={{
              transformOrigin: "left",
              animation: sectionVisible ? "lineExpand 0.6s ease 0.2s both" : "none",
            }}
          />
        </div>

        {/* Heading */}
        <h2
          className="relative text-[#f0ead8] leading-[1.12] mb-12"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem,2.8vw,2.8rem)",
            animation: sectionVisible ? "titleReveal 0.7s ease 0.15s both" : "none",
          }}
        >
          The numbers behind <em className="text-[#e2c97e]">Eterna</em>
        </h2>

        {/* Grid */}
        <div
          className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-[#c9a84c]/15 border"
          style={{ borderColor: "rgba(201,168,76,0.15)" }}
        >
          {/* Animated border overlay */}
          <div
            className="absolute inset-0 pointer-events-none border border-pulse"
            style={{ borderColor: "rgba(201,168,76,0.2)" }}
          />

          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}