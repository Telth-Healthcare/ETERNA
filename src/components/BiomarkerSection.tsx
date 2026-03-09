import { useEffect, useRef, useState } from "react";

const biomarkers = [
  {
    num: "01",
    title: "Susceptibility / Risk Biomarkers",
    purpose: "Identify vulnerability. Guide prevention.",
    desc: "These markers reveal early vulnerability and biological predisposition before disease is fully established — whether in metabolism, cardiovascular health, inflammation, aging pathways, hormonal balance, bone health, or cognitive resilience.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  },
  {
    num: "02",
    title: "Diagnostic Biomarkers",
    purpose: "Define the baseline. Confirm physiological status.",
    desc: "Used to detect or confirm current physiological states, underlying dysfunction, or baseline abnormalities — reflecting metabolic status, endocrine balance, inflammation, organ function, nutritional deficiency, and body composition.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
  },
  {
    num: "03",
    title: "Prognostic Biomarkers",
    purpose: "Estimate trajectory. Guide follow-up intensity.",
    desc: "These help estimate the likely future course of a condition or health trend — whether a person is likely to remain stable, improve, or progress toward deeper dysfunction if no action is taken.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
  },
  {
    num: "04",
    title: "Monitoring Biomarkers",
    purpose: "Track progress. Guide programme adjustments.",
    desc: "Used repeatedly across the programme to assess progress, stability, deterioration, or response to lifestyle and clinical interventions. This transforms care into an ongoing, measurable health optimisation process.",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
  },
  {
    num: "05",
    title: "Predictive Biomarkers",
    purpose: "Support personalised intervention selection.",
    desc: "These help identify which interventions are more likely to work for a specific individual — supporting a more tailored approach to nutrition, performance optimisation, metabolic support, and recovery protocols.",
    image: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=600&q=80",
  },
  {
    num: "06",
    title: "Response Biomarkers",
    purpose: "Confirm biological response. Optimise the plan.",
    desc: "Used to demonstrate whether an intervention is having the desired biological effect — whether through improved metabolic regulation, reduced inflammatory burden, restored balance, or better physiological performance.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
  },
  {
    num: "07",
    title: "Safety Biomarkers",
    purpose: "Protect the client. Validate clinical appropriateness.",
    desc: "Safety biomarkers ensure every intervention remains clinically appropriate, tolerable, and responsibly managed. In practice, safety sits across the entire framework — it is the governing principle running through every biomarker-led decision at Eterna.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80",
  },
];

export default function BiomarkerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Improved scroll-spy with RAF for smoothness
  useEffect(() => {
    const right = rightRef.current;
    if (!right) return;
    const cards = right.querySelectorAll(".bio-card");

    const obs = new IntersectionObserver(
      (entries) => {
        // Use RAF for smoother updates
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        
        rafRef.current = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrollingRef.current) {
              const idx = Number((entry.target as HTMLElement).dataset.index);
              setActiveIndex(idx);
            }
          });
        });
      },
      { 
        root: right, 
        threshold: 0.5,
        rootMargin: "0px"
      }
    );
    
    cards.forEach((c) => obs.observe(c));
    return () => {
      obs.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Click dots to scroll with smooth behavior
  const scrollToCard = (index: number) => {
    const right = rightRef.current;
    if (!right) return;
    
    const card = right.querySelector(`[data-index="${index}"]`);
    if (!card) return;
    
    isScrollingRef.current = true;
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    right.scrollTo({
      top: (card as HTMLElement).offsetTop - right.clientHeight / 2 + (card as HTMLElement).clientHeight / 2,
      behavior: "smooth"
    });
    
    setActiveIndex(index);
    
    // Reset scrolling flag after animation
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const active = biomarkers[activeIndex];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        .left-text-anim { animation: fadeSlideUp 0.4s ease forwards; }
        .img-anim       { animation: imgReveal 0.5s ease forwards; }

        /* Enhanced scrollbar with hover states */
        .right-scroll {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: y mandatory;
        }
        
        .right-scroll::-webkit-scrollbar {
          width: 3px;
        }
        
        .right-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .right-scroll::-webkit-scrollbar-thumb {
          background: rgba(201,168,76,0.2);
          border-radius: 3px;
          transition: background 0.3s ease, width 0.3s ease;
        }
        
        .right-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(201,168,76,0.5);
          width: 4px;
        }
        
        .right-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(201,168,76,0.7);
        }

        /* Performance optimizations */
        .bio-card {
          will-change: transform, opacity, border-color;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 24px; }
        }
        @keyframes headIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-img-overlay {
          background: linear-gradient(to bottom, transparent 40%, rgba(14,14,20,0.85) 100%);
        }

        /* Dot hover states */
        .progress-dot {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .progress-dot:hover {
          opacity: 0.9;
          transform: scaleY(1.2);
        }
        
        .progress-dot:focus-visible {
          outline: 2px solid rgba(201,168,76,0.5);
          outline-offset: 2px;
        }

        /* Focus styles for accessibility */
        .bio-card:focus-visible {
          outline: 2px solid rgba(201,168,76,0.5);
          outline-offset: 2px;
        }
      `}</style>

      <section
        id="biomarkers"
        ref={containerRef}
        className="relative bg-[#0e0e14] overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Subtle dot bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative flex flex-col lg:flex-row" style={{ minHeight: "100vh" }}>

          {/* ── LEFT — sticky content ── */}
          <div
            className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center
              px-6 md:px-10 lg:px-14 py-16 lg:py-0
              lg:w-[45%] flex-shrink-0"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#c9a84c]" style={{ animation: "lineGrow 0.5s ease forwards" }} />
              <span className="text-[#c9a84c] text-[9px] tracking-[0.38em] uppercase">Biomarker Framework</span>
            </div>

            {/* Heading */}
            <h2
              className="text-[#f0ead8] leading-[1.1] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem,3vw,3rem)",
                animation: "headIn 0.7s ease 0.1s both",
              }}
            >
              From risk to response —<br />
              with <em className="text-[#e2c97e]">safety</em> at the centre
            </h2>

            <p
              className="text-[#f0ead8]/40 text-[13px] leading-[1.8] mb-10 max-w-sm"
              style={{ animation: "headIn 0.7s ease 0.2s both" }}
            >
              At Eterna, biomarkers are organised within a structured clinical framework — helping us understand risk, detect hidden imbalance, guide personalised planning, monitor progress, and ensure safety.
            </p>

            {/* Active step display */}
            <div key={activeIndex} className="left-text-anim">
              {/* Step pill */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10"
                  style={{ width: 36, height: 36, flexShrink: 0 }}
                >
                  <span
                    className="text-[#c9a84c]"
                    style={{ fontSize: "9px", letterSpacing: "0.05em", fontWeight: 600 }}
                  >
                    {active.num}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
                <span className="text-[#f0ead8]/20 text-[9px] tracking-[0.2em]">
                  {active.num} / 07
                </span>
              </div>

              {/* Active title */}
              <h3
                className="text-[#f0ead8] mb-2 leading-snug"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.3rem,2vw,1.6rem)",
                  fontWeight: 400,
                }}
              >
                {active.title}
              </h3>

              {/* Purpose */}
              <div className="text-[#c9a84c] text-[9px] tracking-[0.18em] uppercase mb-3">
                {active.purpose}
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-[#c9a84c]/30 mb-4" />

              {/* Desc */}
              <p className="text-[#f0ead8]/45 text-[12px] leading-[1.85] max-w-sm">
                {active.desc}
              </p>

              {/* Progress dots - clickable with hover states */}
              <div className="flex items-center gap-2 mt-8">
                {biomarkers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className="progress-dot rounded-full focus:outline-none"
                    style={{
                      width: i === activeIndex ? 20 : 5,
                      height: 5,
                      background: i === activeIndex
                        ? "#c9a84c"
                        : i < activeIndex
                        ? "rgba(201,168,76,0.35)"
                        : "rgba(201,168,76,0.12)",
                    }}
                    aria-label={`Go to ${biomarkers[i].title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — scrollable cards with improved smoothness ── */}
          <div
            ref={rightRef}
            className="right-scroll lg:w-[55%] flex-shrink-0
              overflow-y-auto lg:h-screen
              px-4 sm:px-6 lg:px-8 py-12 lg:py-16
              flex flex-col gap-5"
          >
            {biomarkers.map((b, i) => (
              <div
                key={b.num}
                data-index={i}
                className="bio-card relative overflow-hidden flex-shrink-0 group"
                style={{
                  scrollSnapAlign: "center",
                  borderRadius: 0,
                  border: i === activeIndex
                    ? "1px solid rgba(201,168,76,0.45)"
                    : "1px solid rgba(201,168,76,0.1)",
                  transition: "border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  minHeight: "340px",
                  cursor: "pointer",
                }}
                onClick={() => scrollToCard(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    scrollToCard(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${b.title}`}
              >
                {/* Image with optimized transitions */}
                <img
                  key={`img-${i}`}
                  src={b.image}
                  alt={b.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: i === activeIndex ? 0.55 : 0.25,
                    transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: i === activeIndex ? "scale(1.02)" : "scale(1)",
                  }}
                />

                {/* Overlay gradient */}
                <div className="card-img-overlay absolute inset-0" />

                {/* Active top line with smooth animation */}
                <div
                  className="absolute top-0 left-0 h-px transition-all duration-500"
                  style={{
                    background: "linear-gradient(to right, #c9a84c, rgba(201,168,76,0.2))",
                    width: i === activeIndex ? "100%" : "0%",
                    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* Content */}
                <div className="relative p-6 md:p-8 flex flex-col justify-end h-full" style={{ minHeight: "340px" }}>
                  {/* Number */}
                  <div
                    className="absolute top-6 left-6 md:top-8 md:left-8"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "3rem",
                      fontWeight: 300,
                      color: i === activeIndex ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)",
                      lineHeight: 1,
                      transition: "color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {b.num}
                  </div>

                  {/* Bottom content */}
                  <div>
                    <div
                      className="text-[9px] tracking-[0.18em] uppercase mb-2 transition-colors duration-300"
                      style={{ 
                        color: i === activeIndex ? "#e2c97e" : "rgba(201,168,76,0.5)",
                        transition: "color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {b.purpose}
                    </div>
                    <h3
                      className="transition-colors duration-300"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(1.1rem,2vw,1.4rem)",
                        fontWeight: 400,
                        color: i === activeIndex ? "#f0ead8" : "rgba(240,234,216,0.5)",
                        lineHeight: 1.3,
                        transition: "color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {b.title}
                    </h3>

                    {/* Expand on active with smoother animation */}
                    <div
                      style={{
                        maxHeight: i === activeIndex ? "120px" : "0px",
                        opacity: i === activeIndex ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <p className="text-[11px] text-[#f0ead8]/45 leading-relaxed mt-2">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}