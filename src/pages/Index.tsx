import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyEterna from "../components/WhyEterna";
import ModelSection from "../components/ModelSection";
import StatsSection from "../components/StatsSection";
import BiomarkerSection from "../components/BiomarkerSection";
import ProgrammesSection from "../components/ProgrammesSection";
import HubSection from "../components/HubSection";
import { GovernanceSection, PromiseSection, ContactSection, Footer } from "../components/GovernanceSection";
import { PartnersSection } from "@/components/PartnersSection";
import Pillars from "@/components/Pillars";
import Biomarkers from "@/components/Biomarkers";
import Recovery from "@/components/Recovery";
import Algorithm from "@/components/Algorithm";

const Index = () => {
  return (
    <div className="bg-[#0e0e14] text-[#f0ead8] min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyEterna />
      <Pillars/>
      <ModelSection />
      <Algorithm/>
      <StatsSection />
      <BiomarkerSection />
      <Biomarkers/>
      <Recovery/>
      <ProgrammesSection />
      <HubSection />
      <GovernanceSection />
      <PromiseSection />
       <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
