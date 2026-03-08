import React, { createContext, useContext } from "react";
import type { Lang } from "@/lib/translations";

const LangContext = createContext<Lang>("it");

export const LangProvider = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => (
  <LangContext.Provider value={lang}>{children}</LangContext.Provider>
);

export const useLang = () => useContext(LangContext);
