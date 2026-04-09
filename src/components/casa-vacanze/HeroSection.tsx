
import React from "react";
import { MapPin, Users, Bed } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const HeroSection = () => {
  const lang = useLang();
  const h = translations.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-end pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/castiglione.mp4"
        aria-label={t(h.videoAlt, lang)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p className="uppercase tracking-[0.35em] text-white/70 text-xs sm:text-sm mb-4 font-light">
          {t(h.tagline, lang)}
        </p>

        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-light text-white mb-3 leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Ai due leoni
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light mb-10 max-w-2xl leading-relaxed">
          {t(h.subtitle, lang)}
          <br className="hidden sm:inline" />
          <span className="text-white/60">{t(h.subtitleAccent, lang)}</span>
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <Bed className="w-4 h-4" /> {t(h.camere, lang)}
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <Users className="w-4 h-4" /> {t(h.ospiti, lang)}
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4" /> {t(h.location, lang)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#appartamento"
            className="inline-flex items-center justify-center bg-white text-gray-900 font-medium py-3.5 px-8 rounded-full text-base hover:bg-white/90 transition-colors duration-300 shadow-lg"
          >
            {t(h.scopri, lang)}
          </a>
          <a
            href="#contatti"
            className="inline-flex items-center justify-center border border-white/50 text-white font-medium py-3.5 px-8 rounded-full text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            {t(h.prenotaCta, lang)}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
