
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/casa-vacanze/HeroSection";
import ValueProposition from "@/components/casa-vacanze/ValueProposition";
import SocialProofStrip from "@/components/casa-vacanze/SocialProofStrip";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";

interface CasaVacanzeProps {
  lang?: Lang;
}

const CasaVacanze = ({ lang = "it" }: CasaVacanzeProps) => {
  return (
    <LangProvider lang={lang}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <SidebarNav />
        <main className="flex flex-col">
          <HeroSection />
          <ValueProposition />
          <SocialProofStrip />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
};

export default CasaVacanze;
