import { useScrollReveal } from "../hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const programmes = [
  {
    tier: "Entry Programme", name: "Essential", price: "£120", priceSub: "/month (base)", badge: null,
    desc: "The entry plan for structured longevity with monthly expert guidance and scheduled phase reviews. Plus diagnostics and clinically indicated add-ons.",
    features: ["Baseline assessment and core biomarkers","P3DSC plan and longevity goal sheet","Monthly longevity expert check-in","Quarterly phase gate review and optimisation","Safety screening and escalation pathway"],
    note: "+ diagnostics and clinically indicated add-ons", cta: "Start Essential", featured: false,
  },
  {
    tier: "Expanded Programme", name: "Advanced", price: "Contact Us", priceSub: "", badge: "Most Requested",
    desc: "Expanded diagnostics and tighter monitoring loops for organ optimisation and performance outcomes. More frequent access, deeper data.",
    features: ["Deeper biomarker panels and add-on diagnostics (as indicated)","More frequent monitoring and optimisation cycles","Priority clinician review","Targeted organ-system optimisation tracks","Enhanced P3DSC modelling cadence"],
    note: null, cta: "Enquire Now", featured: true,
  },
  {
    tier: "Concierge Programme", name: "Elite", price: "By Application", priceSub: "", badge: null,
    desc: "A high-touch Harley Street concierge model for executives and high-demand clients. Complete continuity, wherever you are.",
    features: ["Concierge coordination and high-touch coaching","Advanced pathways and specialist routing (as indicated)","Executive reporting and continuity planning","Travel-ready plan and rapid adjustments","Supervised clinical delivery at Eterna Care Hubs, flagship centres, and at home on call"],
    note: null, cta: "Apply for Elite", featured: false,
  },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function ProgrammeCard({ prog, index }: { prog: typeof programmes[0]; index: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${index * 150}ms`,
      }}
    >
      {/* Outer glow for featured */}
      {prog.featured && (
        <div
          className="absolute -inset-px pointer-events-none"
          style={{
            boxShadow: hovered
              ? "0 0 40px rgba(201,168,76,0.18), 0 0 80px rgba(201,168,76,0.08)"
              : "0 0 20px rgba(201,168,76,0.08)",
            transition: "box-shadow 0.5s ease",
          }}
        />
      )}

      {/* Card */}
      <div
        className="relative flex flex-col flex-1 border overflow-hidden"
        style={{
          borderColor: prog.featured
            ? hovered ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.5)"
            : hovered ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.15)",
          background: prog.featured
            ? hovered ? "rgba(201,168,76,0.07)" : "rgba(201,168,76,0.04)"
            : hovered ? "rgba(201,168,76,0.03)" : "#13131a",
          transition: "border-color 0.4s ease, background 0.4s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transitionProperty: "border-color, background, transform, box-shadow",
          transitionDuration: "0.4s",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(201,168,76,0.08)"
            : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: "-120%",
              width: "60%", height: "100%",
              background: "linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.04) 50%, transparent 70%)",
              animation: hovered ? "shimmerSwipe 1s ease forwards" : "none",
            }}
          />
        </div>

        {/* Top gold bar — featured only */}
        {prog.featured && (
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Hover: top line sweep for non-featured */}
        {!prog.featured && (
          <div
            className="absolute top-0 left-0 h-px"
            style={{
              background: "linear-gradient(to right, #c9a84c, rgba(201,168,76,0.2))",
              width: hovered ? "100%" : "0%",
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        )}

        {/* Badge */}
        {prog.badge && (
          <div
            className="absolute -top-px right-8 text-[#0a0a0a] text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-semibold"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #e2c97e, #c9a84c)"
                : "#c9a84c",
              transition: "background 0.4s ease",
            }}
          >
            {prog.badge}
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col flex-1">
          {/* Tier label */}
          <div
            className="text-[9px] tracking-[0.3em] uppercase mb-1"
            style={{
              color: hovered ? "#e2c97e" : "#c9a84c",
              transition: "color 0.3s ease",
            }}
          >
            {prog.tier}
          </div>

          {/* Name */}
          <h3
            className="mb-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 300,
              color: hovered ? "#ffffff" : "#f0ead8",
              transition: "color 0.3s ease",
            }}
          >
            {prog.name}
          </h3>

          {/* Price */}
          <div className="mb-5 flex items-baseline gap-1">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: hovered ? "#f5e49a" : "#e2c97e",
                transition: "color 0.3s ease, text-shadow 0.3s ease",
                textShadow: hovered ? "0 0 20px rgba(201,168,76,0.4)" : "none",
              }}
            >
              {prog.price}
            </span>
            {prog.priceSub && (
              <span className="text-[#f0ead8]/35 text-sm">{prog.priceSub}</span>
            )}
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)",
              width: hovered ? "100%" : "40%",
              transition: "width 0.5s ease",
            }}
          />

          {/* Desc */}
          <p
            className="text-[11px] leading-relaxed mb-6"
            style={{
              color: hovered ? "rgba(240,234,216,0.6)" : "rgba(240,234,216,0.4)",
              transition: "color 0.3s ease",
            }}
          >
            {prog.desc}
          </p>

          {/* Features */}
          <ul className="flex flex-col gap-2.5 flex-1">
            {prog.features.map((f, i) => (
              <li
                key={i}
                className="text-[11px] pl-5 relative leading-snug"
                style={{
                  color: hovered ? "rgba(240,234,216,0.7)" : "rgba(240,234,216,0.5)",
                  transition: `color 0.3s ease ${i * 30}ms`,
                }}
              >
                <span
                  className="absolute left-0 top-0 text-[10px]"
                  style={{
                    color: hovered ? "#e2c97e" : "#c9a84c",
                    transition: `color 0.3s ease ${i * 30}ms`,
                  }}
                >
                  →
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Note */}
          {prog.note && (
            <div className="text-[#f0ead8]/25 text-[9px] tracking-[0.1em] mt-4 text-center">
              {prog.note}
            </div>
          )}

          {/* CTA Button */}
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="relative mt-6 w-full py-3 text-[10px] tracking-[0.2em] uppercase overflow-hidden"
            style={{
              border: prog.featured
                ? "1px solid #c9a84c"
                : "1px solid rgba(201,168,76,0.25)",
              background: prog.featured
                ? btnHovered ? "#e2c97e" : "#c9a84c"
                : btnHovered ? "#c9a84c" : "transparent",
              color: prog.featured
                ? "#0a0a0a"
                : btnHovered ? "#0a0a0a" : "#f0ead8",
              fontWeight: prog.featured ? 600 : 400,
              borderColor: btnHovered ? "#c9a84c" : undefined,
              transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
              transform: btnHovered ? "scale(1.01)" : "scale(1)",
              boxShadow: btnHovered && prog.featured
                ? "0 4px 20px rgba(201,168,76,0.3)"
                : btnHovered
                ? "0 4px 16px rgba(201,168,76,0.15)"
                : "none",
            }}
          >
            {/* Button shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                left: btnHovered ? "120%" : "-120%",
                transition: "left 0.5s ease",
              }}
            />
            <span className="relative">{prog.cta}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProgrammesSection() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes shimmerSwipe {
          from { left: -120%; }
          to   { left: 150%; }
        }
        @keyframes headReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="programmes" className="relative bg-[#0a0a0a] px-4 md:px-8 lg:px-16 py-16 md:py-28 overflow-hidden">

        {/* Subtle bg dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Header */}
        <div ref={headerRef}>
          <div
            className="flex items-center gap-3 mb-4"
            style={{
              opacity: headerVisible ? 1 : 0,
              animation: headerVisible ? "headReveal 0.6s ease forwards" : "none",
            }}
          >
            <div className="w-6 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">Programmes</span>
          </div>

          <h2
            className="text-[#f0ead8] leading-[1.12] mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,3.2vw,3.2rem)",
              opacity: headerVisible ? 1 : 0,
              animation: headerVisible ? "headReveal 0.7s ease 0.1s both" : "none",
            }}
          >
            Choose your entry point.<br />
            <em className="text-[#e2c97e]">Personalise</em> from there.
          </h2>

          <p
            className="text-[#f0ead8]/40 text-sm leading-relaxed mb-12 max-w-xl"
            style={{
              opacity: headerVisible ? 1 : 0,
              animation: headerVisible ? "headReveal 0.7s ease 0.2s both" : "none",
            }}
          >
            Choose a baseline pathway; then personalise cadence and depth. Because premium longevity should be aspirational in experience — but practical in access.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programmes.map((p, i) => (
            <ProgrammeCard key={p.name} prog={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}