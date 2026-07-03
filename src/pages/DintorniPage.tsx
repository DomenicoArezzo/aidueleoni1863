import React from "react";
import Navbar from "@/components/Navbar";
import DintorniSection from "@/components/casa-vacanze/DintorniSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";
import PageHead from "@/components/PageHead";
import { pageMeta } from "@/lib/page-meta";

const DintorniPage = ({ lang = "it" }: { lang?: Lang }) => {
  const m = pageMeta.dintorni[lang];
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cosa visitare nei dintorni di Ai due leoni",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Marina di Ragusa" },
      { "@type": "ListItem", position: 2, name: "Castello di Donnafugata" },
      { "@type": "ListItem", position: 3, name: "Scicli" },
      { "@type": "ListItem", position: 4, name: "Ragusa Ibla" },
      { "@type": "ListItem", position: 5, name: "Comiso" },
    ],
  };
  return (
  <LangProvider lang={lang}>
    <PageHead title={m.title} description={m.description} jsonLd={itemListLd} />
    <div className="min-h-screen bg-white">
      <Navbar />
      <SidebarNav />
      <main className="pt-20">
        <DintorniSection />
      </main>
      <Footer />
    </div>
  </LangProvider>
  );
};

export default DintorniPage;