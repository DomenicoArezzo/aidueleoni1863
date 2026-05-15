import React from "react";
import Navbar from "@/components/Navbar";
import DintorniSection from "@/components/casa-vacanze/DintorniSection";
import SidebarNav from "@/components/casa-vacanze/SidebarNav";
import Footer from "@/components/Footer";
import { LangProvider } from "@/hooks/use-lang";
import type { Lang } from "@/lib/translations";

const DintorniPage = ({ lang = "it" }: { lang?: Lang }) => (
  <LangProvider lang={lang}>
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

export default DintorniPage;