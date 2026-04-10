
import React from "react";
import Navbar from "@/components/Navbar";
import DovetroviamoSection from "@/components/casa-vacanze/DovetroviamoSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";

const DoveSiamoPage = ({ lang = "it" }: { lang?: Lang }) => (
  <LangProvider lang={lang}>
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

export default DoveSiamoPage;
