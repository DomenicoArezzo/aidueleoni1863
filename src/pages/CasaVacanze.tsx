
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/casa-vacanze/HeroSection";
import AppartamentoSection from "@/components/casa-vacanze/AppartamentoSection";
import ChiSiamoSection from "@/components/casa-vacanze/ChiSiamoSection";
import DovetroviamoSection from "@/components/casa-vacanze/DovetroviamoSection";
import ContattiSection from "@/components/casa-vacanze/ContattiSection";
import PublicAvailabilityCalendar from "@/components/casa-vacanze/PublicAvailabilityCalendar";
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
        <main className="flex flex-col">
          <HeroSection />
          <div className="flex flex-col">
            <AppartamentoSection />
            <PublicAvailabilityCalendar />
            <ChiSiamoSection />
            <DovetroviamoSection />
            <ContattiSection />
          </div>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
};

export default CasaVacanze;
