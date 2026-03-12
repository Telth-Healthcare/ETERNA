import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const safetyControls = [
  "Baseline safety screening and contraindication review",
  "Ongoing safety biomarkers for higher-intensity interventions",
  "Medication and supplement interaction review",
  "Escalation to specialist care when required",
  "Phase-gated safety monitoring throughout the programme",
  "Clinician constant review pathway at every stage",
];

const privacyControls = [
  "Consent-first diagnostics, including genetics",
  "Role-based access and purpose limitation",
  "Secure retention policies and restricted data sharing",
  "HIPAA, GDPR, and CDSCO alignment",
  "Harley Street clinical governance standards",
  "Physician oversight with clear escalation and safety gates",
];

const promiseSteps = ["Baseline", "Modelling", "Goal", "Phased Plan", "Proof"];

const contacts = [
  { label: "For Individuals", title: "Book a Baseline Assessment", desc: "Tell us your goal and preferred location. We will respond with a diagnostic pathway, appointment options, and a proposed phase plan timeline.", cta: "Book Assessment" },
  { label: "For Organisations", title: "Buy a State-of-Art Longevity Hub", desc: "Deploy the Eterna Longevity Hub within your facility. Powered by TELTH OPERATING SYSTEMS with full clinical and technical support.", cta: "Enquire About the Hub" },
  { label: "For Partners", title: "Buy a Franchise", desc: "Bring Eterna to your market. Join a network of precision longevity centres operating under Harley Street clinical governance standards.", cta: "Franchise Enquiry" },
];

// Animation variants for staggered children
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export function GovernanceSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="governance" className="relative bg-[#0a0a0a] px-4 md:px-8 lg:px-16 py-16 md:py-28 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#c9a84c]/03 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#c9a84c]/02 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Header with staggered animation */}
        <div className={`transform transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-4 group">
            <div className="w-6 h-px bg-[#c9a84c] transform transition-all duration-500 group-hover:w-10" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase animate-pulse">
              Clinical Governance, Safety & Privacy
            </span>
          </div>
          
          <h2 className="text-[#f0ead8] leading-[1.12] mb-3" 
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,3.2vw,3.2rem)" }}>
            Longevity requires<br />
            <em className="text-[#e2c97e] relative inline-block">
              medical discipline
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </em>
          </h2>
          
          <p className="text-[#f0ead8]/40 text-sm leading-relaxed mb-12 max-w-2xl transform transition-all duration-1000 delay-200"
             style={{ transform: visible ? 'translateY(0)' : 'translateY(20px)', opacity: visible ? 1 : 0 }}>
            Eterna maintains clinician oversight, informed consent, and phase-gated safety monitoring to minimise risk 
            and ensure interventions remain clinically appropriate at every stage.
          </p>
        </div>

        {/* Grid items with staggered children */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {[
            { title: "Safety Controls", items: safetyControls},
            { title: "Privacy Controls", items: privacyControls },
          ].map(({ title, items }, gi) => (
            <div 
              key={title} 
              className={`transform transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`} 
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-5 group">
                <h3 className="text-[#f0ead8] text-xl relative" 
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400 }}>
                  {title}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a84c] group-hover:w-full transition-all duration-500" />
                </h3>
              </div>
              
              <ul className="flex flex-col gap-3">
                {items.map((item, i) => (
                  <li 
                    key={i} 
                    className="text-[#f0ead8]/45 text-[11px] pl-5 relative leading-relaxed group/item"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: visible ? 1 : 0,
                      transition: `all 0.5s ease ${0.3 + i * 0.1}s`
                    }}
                  >
                    <span className={`absolute left-0 text-[#c9a84c] text-[8px] top-1 transform transition-all duration-300 
                      ${hoveredIndex === i ? 'scale-150 rotate-90' : ''}`}>
                      ◆
                    </span>
                    <span className={`transition-all duration-300 ${hoveredIndex === i ? 'text-[#f0ead8]/80 pl-1' : ''}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromiseSection() {
  const { ref, visible } = useScrollReveal(0.2);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  
  // Auto-rotate promise steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % promiseSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="promise" className="relative bg-[#0e0e14] px-4 md:px-8 lg:px-16 py-20 md:py-32 text-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-pulse"
             style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#c9a84c]/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow with animation */}
        <div className={`flex items-center justify-center gap-3 mb-5 transform transition-all duration-1000 
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-6 h-px bg-[#c9a84c] transform origin-left transition-transform duration-1000 
            ${visible ? 'scale-x-100' : 'scale-x-0'}" />
          <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">The Eterna Promise</span>
          <div className="w-6 h-px bg-[#c9a84c] transform origin-right transition-transform duration-1000 
            ${visible ? 'scale-x-100' : 'scale-x-0'}" />
        </div>

        {/* Main heading with character animation */}
        <h2 className={`text-[#f0ead8] leading-[1.12] mb-8 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`} style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,3.5vw,3.6rem)" }}>
          Measure deeply.<br />
          Personalise intelligently.<br />
          <em className="text-[#e2c97e] relative inline-block group">
            Improve continuously.
            <span className="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </em>
        </h2>

        {/* Promise steps with hover and active states */}
        <div className={`flex items-center justify-center gap-0 flex-wrap mb-8 transition-all duration-1000 delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}>
          {promiseSteps.map((s, i) => (
            <div key={s} className="flex items-center group">
              <span 
                className={`px-2 py-1 transition-all duration-500 cursor-default
                  ${i === activeStep ? 'text-[#e2c97e] scale-110' : 'text-[#e2c97e]/60'}
                  group-hover:text-[#e2c97e] group-hover:scale-105`}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
              >
                {s}
              </span>
              {i < promiseSteps.length - 1 && (
                <span className="text-[#c9a84c]/30 text-xs px-1 transform transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Description paragraphs with staggered animation */}
        <p className={`text-[#f0ead8]/40 text-sm leading-relaxed mb-4 transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Eterna transforms biomarker science into a clinically guided longevity journey — from early risk detection 
          to personalised response, with safety at the centre of every step.
        </p>
        
        <p className={`text-[#f0ead8]/40 text-sm leading-relaxed mb-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`} style={{ transitionDelay: "400ms" }}>
          Eterna is built for individuals and families who want more than routine healthcare. It is for those seeking 
          a proactive, preventive, and precision-guided longevity journey supported by advanced diagnostics, integrative 
          science, and structured care planning.
        </p>

        {/* Signature line with fade-in */}
        <p className={`mb-10 transition-all duration-1000 transform ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`} style={{ transitionDelay: "500ms", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: "#e2c97e" }}>
          Eterna — where better years are built, not left to chance.
        </p>

        {/* Buttons with hover effects */}
        <div className={`flex gap-3 sm:gap-4 justify-center flex-wrap transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`} style={{ transitionDelay: "500ms" }}>
          <button onClick={() => navigate('/contact')} className="group relative bg-[#c9a84c] text-[#0a0a0a] px-6 sm:px-8 py-3.5 text-[10px] tracking-[0.22em] uppercase font-semibold overflow-hidden">
            <span className="relative z-10">Book Baseline Assessment</span>
            <span className="absolute inset-0 bg-[#e2c97e] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>
          
          <button onClick={() => navigate('/contact')} className="group relative border border-[#c9a84c]/30 text-[#f0ead8] px-6 sm:px-8 py-3.5 text-[10px] tracking-[0.22em] uppercase overflow-hidden">
            <span className="relative z-10">Buy a Care Plan</span>
            <span className="absolute inset-0 bg-[#c9a84c]/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button onClick={() => navigate('/contact')} className="group relative border border-[#c9a84c]/30 text-[#f0ead8] px-6 sm:px-8 py-3.5 text-[10px] tracking-[0.22em] uppercase overflow-hidden">
            <span className="relative z-10">Partner / Franchise</span>
            <span className="absolute inset-0 bg-[#c9a84c]/10 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="contact" className="relative bg-gradient-to-b from-[#0e0e14] to-[#0a0a0a] border-t border-[#c9a84c]/15 px-4 md:px-8 lg:px-16 py-14 md:py-20 overflow-hidden">
      
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(500px) rotateX(45deg)",
          transformOrigin: "center",
          animation: "gridMove 20s linear infinite"
        }} />
      </div>

      <div className="relative z-10">
        {/* Header with glow effect */}
        <div className="flex items-center justify-center gap-3 mb-12 group">
          <div className="w-6 h-px bg-[#c9a84c] transform transition-all duration-500 group-hover:w-12" />
          <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase relative">
            Tell Us Your Goal
            <span className="absolute -inset-x-4 -inset-y-2 bg-[#c9a84c]/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </span>
          <div className="w-6 h-px bg-[#c9a84c] transform transition-all duration-500 group-hover:w-12" />
        </div>

        {/* Contact cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((c, i) => (
            <div 
              key={c.label} 
              className={`relative group transform transition-all duration-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`} 
              style={{ transitionDelay: `${i * 150}ms` }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 bg-[#c9a84c]/5 blur-2xl transition-opacity duration-500 
                ${hoveredCard === i ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Card content */}
              <div className="relative bg-gradient-to-b from-[#c9a84c]/05 to-transparent p-6 text-center 
                            border border-[#c9a84c]/10 group-hover:border-[#c9a84c]/30 transition-all duration-500
                            transform group-hover:-translate-y-2">
                
                {/* Label with animated underline */}
                <div className="relative inline-block mb-2">
                  <div className="text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase">{c.label}</div>
                  <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-[#c9a84c] group-hover:w-1/2 
                                 transform -translate-x-1/2 transition-all duration-500" />
                </div>

                {/* Title */}
                <h4 className="text-[#f0ead8] mb-3" 
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400 }}>
                  {c.title}
                </h4>

                {/* Description */}
                <p className="text-[#f0ead8]/40 text-[11px] leading-relaxed mb-5 transform transition-all duration-500
                              group-hover:text-[#f0ead8]/60">
                  {c.desc}
                </p>

                {/* Button with arrow animation */}
                <button className="group/btn relative inline-flex items-center gap-2 border border-[#c9a84c]/25 
                                 text-[#f0ead8] px-5 py-2.5 text-[10px] tracking-[0.18em] uppercase 
                                 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300
                                 overflow-hidden">
                  <span className="relative z-10">{c.cta}</span>
                  <span className="relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                  <span className="absolute inset-0 bg-[#c9a84c]/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(45deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(45deg) translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float infinite;
        }
      `}</style>
    </section>
  );
}

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-t from-[#0a0a0a] to-[#0e0e14] border-t border-[#c9a84c]/10 px-4 md:px-8 lg:px-16 py-8 overflow-hidden">
      
      {/* Animated line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent 
                    animate-pulse" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        
        {/* Logo with hover effect */}
        <div className="group">
          <div className="text-[#c9a84c] tracking-[0.2em] transition-all duration-500 
                        group-hover:tracking-[0.3em] group-hover:text-[#e2c97e]"
               style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300 }}>
            ETERNA
          </div>
          <div className="w-0 h-px bg-[#c9a84c] group-hover:w-full transition-all duration-500" />
        </div>

        {/* Copyright */}
        <div className="text-[#f0ead8]/20 text-[10px] tracking-[0.15em] hover:text-[#f0ead8]/40 transition-colors duration-300">
          © {currentYear} Eterna by Harley Health System
        </div>

        {/* Disclaimer with fade effect */}
        <div className="relative group">
          <div className="text-[#f0ead8]/18 text-[10px] leading-relaxed max-w-sm md:text-right
                        transition-all duration-300 group-hover:text-[#f0ead8]/30">
            This website is informational and does not constitute medical advice. 
            Services are delivered through licensed practitioners. Outcomes vary by individual.
          </div>
          <div className="absolute -inset-2 bg-[#c9a84c]/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </footer>
  );
}