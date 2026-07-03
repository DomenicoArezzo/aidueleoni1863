
import React from "react";
import Navbar from "@/components/Navbar";
import DovetroviamoSection from "@/components/casa-vacanze/DovetroviamoSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";
import PageHead from "@/components/PageHead";
import { pageMeta } from "@/lib/page-meta";

const DoveSiamoPage = ({ lang = "it" }: { lang?: Lang }) => {
  const m = pageMeta.doveSiamo[lang];
  return (
  <LangProvider lang={lang}>
    <PageHead title={m.title} description={m.description} />
    <div className="min-h-screen bg-white">
      <Navbar />
      <SidebarNav />
      <main className="pt-20">
        <DovetroviamoSection />
      </main>
      <Footer />
    </div>
  </LangProvider>
  );
};

export default DoveSiamoPage;
