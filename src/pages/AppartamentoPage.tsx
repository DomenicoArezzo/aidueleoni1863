
import React from "react";
import Navbar from "@/components/Navbar";
import AppartamentoSection from "@/components/casa-vacanze/AppartamentoSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";
import PageHead from "@/components/PageHead";
import { pageMeta } from "@/lib/page-meta";

const AppartamentoPage = ({ lang = "it" }: { lang?: Lang }) => {
  const m = pageMeta.appartamento[lang];
  return (
  <LangProvider lang={lang}>
    <PageHead title={m.title} description={m.description} />
    <div className="min-h-screen bg-white">
      <Navbar />
      <SidebarNav />
      <main className="pt-20">
        <AppartamentoSection />
      </main>
      <Footer />
    </div>
  </LangProvider>
  );
};

export default AppartamentoPage;
