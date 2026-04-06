
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/casa-vacanze/HeroSection";
import AppartamentoSection from "@/components/casa-vacanze/AppartamentoSection";
import ChiSiamoSection from "@/components/casa-vacanze/ChiSiamoSection";
import DovetroviamoSection from "@/components/casa-vacanze/DovetroviamoSection";
import ContattiSection from "@/components/casa-vacanze/ContattiSection";
import PublicAvailabilityCalendar from "@/components/casa-vacanze/PublicAvailabilityCalendar";
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
        <main>
          <HeroSection />
          <AppartamentoSection />
          <section id="disponibilita" className="py-16 sm:py-24 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <PublicAvailabilityCalendar />
            </div>
          </section>
          <ChiSiamoSection />
          <DovetroviamoSection />
          <ContattiSection />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
};

export default CasaVacanze;
