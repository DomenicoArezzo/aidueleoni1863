
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/casa-vacanze/HeroSection";
import ValueProposition from "@/components/casa-vacanze/ValueProposition";
import SocialProofStrip from "@/components/casa-vacanze/SocialProofStrip";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";
import PageHead from "@/components/PageHead";

interface CasaVacanzeProps {
  lang?: Lang;
}

const HEAD: Record<Lang, { title: string; description: string }> = {
  it: {
    title: "Ai due leoni – Casa vacanze di lusso a Comiso, Ragusa",
    description:
      "Casa vacanze di lusso a Comiso (Ragusa), Sicilia. 3 camere, 2 bagni, fino a 6 ospiti. Richiedi un preventivo per il tuo soggiorno.",
  },
  en: {
    title: "Ai due leoni – Luxury holiday home in Comiso, Sicily",
    description:
      "Luxury holiday home in Comiso (Ragusa), Sicily. 3 bedrooms, 2 bathrooms, up to 6 guests. Request a custom quote for your stay.",
  },
  es: {
    title: "Ai due leoni – Casa vacacional de lujo en Comiso, Sicilia",
    description:
      "Casa vacacional de lujo en Comiso (Ragusa), Sicilia. 3 habitaciones, 2 baños, hasta 6 huéspedes. Solicita un presupuesto personalizado.",
  },
  de: {
    title: "Ai due leoni – Luxus-Ferienhaus in Comiso, Sizilien",
    description:
      "Luxus-Ferienhaus in Comiso (Ragusa), Sizilien. 3 Schlafzimmer, 2 Bäder, bis zu 6 Gäste. Angebot auf Anfrage.",
  },
};

const CasaVacanze = ({ lang = "it" }: CasaVacanzeProps) => {
  const meta = HEAD[lang];
  return (
    <LangProvider lang={lang}>
      <PageHead title={meta.title} description={meta.description} />
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
