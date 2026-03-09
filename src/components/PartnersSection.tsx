import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState } from "react";

export function PartnersSection() {
  const { ref, visible } = useScrollReveal(0.1);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  // Partner data - replace placeholder SVG with actual file when available
  const partners = [
    {
      id: 1,
      name: "Harley Street Specialist Hospital",
      location: "London",
      image: "https://harleystreetlongevityclub.com/wp-content/uploads/2025/01/image-2.png",
      alt: "Harley Street Specialist Hospital London",
      type: "Healthcare Partner"
    },
    {
      id: 2,
      name: "Strategic Partner",
      location: "Global Network",
      image: "/path-to-your-svg/Frame-14.svg", // Replace with actual SVG path
      // Fallback in case SVG doesn't load
      fallbackContent: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#c9a84c]/10 to-transparent">
          <div className="text-center">
            <div className="text-[#c9a84c] text-sm mb-2">STRATEGIC</div>
            <div className="text-[#f0ead8] text-xl font-light tracking-wider">PARTNER</div>
            <div className="w-12 h-px bg-[#c9a84c]/30 mx-auto mt-2" />
          </div>
        </div>
      ),
      alt: "Strategic Partner Logo",
      type: "Strategic Alliance"
    }
  ];

  return (
    <section id="partners" className="relative bg-gradient-to-b from-[#0e0e14] to-[#0a0a0a] px-4 md:px-8 lg:px-16 py-20 md:py-28 overflow-hidden">
      
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/03 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#c9a84c]/02 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with animation */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-4 group">
            <div className="w-6 h-px bg-[#c9a84c] transform transition-all duration-500 group-hover:w-12" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.38em] uppercase">
              Our Partners
            </span>
            <div className="w-6 h-px bg-[#c9a84c] transform transition-all duration-500 group-hover:w-12" />
          </div>

          <h2 className="text-[#f0ead8] leading-[1.12] mb-4" 
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,3.5vw,3.2rem)" }}>
            Trusted by leading<br />
            <em className="text-[#e2c97e] relative inline-block">
              healthcare institutions
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
            </em>
          </h2>

          <p className="text-[#f0ead8]/40 text-sm max-w-2xl mx-auto leading-relaxed">
            Eterna operates in partnership with world-class medical institutions, ensuring our 
            longevity programmes are delivered with the highest standards of clinical excellence.
          </p>
        </div>

        {/* Partners grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`group transform transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredPartner(partner.id)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <div className="relative h-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-[#c9a84c]/10 blur-3xl transition-opacity duration-700 
                  ${hoveredPartner === partner.id ? 'opacity-100' : 'opacity-0'}`} />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-[#c9a84c]/05 to-[#c9a84c]/02 
                              border border-[#c9a84c]/10 p-8 h-full flex flex-col
                              transform transition-all duration-500 
                              group-hover:border-[#c9a84c]/30 group-hover:-translate-y-2">

                  {/* Partner type badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[8px] tracking-[0.2em] text-[#c9a84c]/40 
                                   border border-[#c9a84c]/20 px-3 py-1">
                      {partner.type}
                    </span>
                  </div>

                  {/* Image container */}
                  <div className="mb-6 h-48 md:h-56 relative overflow-hidden bg-[#0a0a0a] 
                                border border-[#c9a84c]/10 group-hover:border-[#c9a84c]/30 
                                transition-all duration-500">
                    
                    {/* Image with fallback */}
                    {partner.image ? (
                      <img
                        src={partner.image}
                        alt={partner.alt}
                        className="w-full h-full object-contain p-6 transform transition-transform 
                                 duration-700 group-hover:scale-105"
                        onError={(e) => {
                          // If image fails to load, show fallback
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                          // Show fallback content
                          const parent = target.parentElement;
                          if (parent && partner.fallbackContent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0';
                            // This is a simplified fallback - in real implementation,
                            // you'd want to handle this more elegantly with React state
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-[#c9a84c] text-sm mb-2 opacity-60">STRATEGIC</div>
                          <div className="text-[#f0ead8] text-2xl font-light tracking-wider">PARTNER</div>
                          <div className="w-16 h-px bg-[#c9a84c]/30 mx-auto mt-3" />
                        </div>
                      </div>
                    )}

                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/20 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-[#f0ead8] mb-2" 
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}>
                      {partner.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase">
                        {partner.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c]/30" />
                      <span className="text-[#c9a84c]/40 text-[8px] tracking-[0.2em]">
                        EST. 2024
                      </span>
                    </div>

                    {/* Decorative line */}
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent 
                                  mx-auto transform scale-x-0 group-hover:scale-x-100 
                                  transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-[#f0ead8]/30 text-[10px] tracking-[0.2em] uppercase">
            Join our network of distinguished partners
          </p>
          <button className="mt-4 group relative inline-flex items-center gap-2 
                           border border-[#c9a84c]/25 text-[#f0ead8] px-8 py-3 
                           text-[10px] tracking-[0.22em] uppercase 
                           hover:border-[#c9a84c] hover:text-[#c9a84c] 
                           transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Become a Partner</span>
            <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 bg-[#c9a84c]/10 transform -translate-x-full 
                           group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}