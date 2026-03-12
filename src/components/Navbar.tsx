import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// import logo from "../assets/eterna logo.png"
import { useNavigate } from "react-router-dom";

const links = [
  { label: "The Model", href: "#model" },
  { label: "Biomarkers", href: "#biomarkers" },
  { label: "Programmes", href: "#programmes" },
  { label: "The Hub", href: "#hub" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/10"
          : "py-6 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent"
      }`}
    >
      <div className="flex flex-col leading-none">
        <span
          className="text-[#c9a84c] tracking-[0.22em] text-lg"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          ETERNA
        </span>
        <span className="text-[#f0ead8]/40 tracking-[0.28em] text-[9px] uppercase mt-0.5">
          by Harley Health System
        </span>
      </div>

      <div className="hidden md:flex gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[#f0ead8]/40 hover:text-[#c9a84c] text-[10px] tracking-[0.22em] uppercase transition-colors duration-300"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:block border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a] px-5 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-medium">
          Book Assessment
        </button>
        <button
          className="md:hidden text-[#c9a84c]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/10 flex flex-col items-center gap-6 py-8 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#f0ead8]/60 hover:text-[#c9a84c] text-xs tracking-[0.22em] uppercase transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => navigate('/contact')} className="sm:hidden border border-[#c9a84c] text-[#c9a84c] px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium">
            Book Assessment
          </button>
        </div>
      )}
    </nav>
  );
}