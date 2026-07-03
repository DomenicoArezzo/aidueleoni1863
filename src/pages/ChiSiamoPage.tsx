
import React from "react";
import Navbar from "@/components/Navbar";
import ChiSiamoSection from "@/components/casa-vacanze/ChiSiamoSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";
import PageHead from "@/components/PageHead";
import { pageMeta } from "@/lib/page-meta";

const ChiSiamoPage = ({ lang = "it" }: { lang?: Lang }) => {
  const m = pageMeta.chiSiamo[lang];
  return (
  <LangProvider lang={lang}>
    <PageHead title={m.title} description={m.description} />
    <div className="min-h-screen bg-white">
      <Navbar />
      <SidebarNav />
      <main className="pt-20">
        <ChiSiamoSection />
      </main>
      <Footer />
    </div>
  </LangProvider>
  );
};

export default ChiSiamoPage;
