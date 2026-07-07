
import React, { useEffect, useRef } from "react";
import { MapPin, Users, Bed, Phone } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const HeroSection = () => {
  const lang = useLang();
  const h = translations.hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle zoom on video
    const video = videoRef.current;
    if (video) {
      video.style.transition = "transform 20s ease-out";
      const timeout = setTimeout(() => {
        video.style.transform = "scale(1.08)";
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    // Fade-in animation for content
    const el = contentRef.current;
    if (!el) return;
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement;
      htmlChild.style.opacity = "0";
      htmlChild.style.transform = "translateY(24px)";
      htmlChild.style.transition = `opacity 0.8s ease ${i * 0.15 + 0.3}s, transform 0.8s ease ${i * 0.15 + 0.3}s`;
      setTimeout(() => {
        htmlChild.style.opacity = "1";
        htmlChild.style.transform = "translateY(0)";
      }, 50);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Video background with slow zoom */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src="/castiglione.mp4"
        aria-label={t(h.videoAlt, lang)}
      />

      {/* Multi-layer gradient overlay for maximum readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Tagline */}
        <p
          data-animate
          className="uppercase tracking-[0.4em] text-white/60 text-[10px] sm:text-xs mb-5 sm:mb-6 font-light"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          {t(h.tagline, lang)}
        </p>

        {/* Main title — luxury serif, very prominent */}
        <h1
          data-animate
          className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-normal text-white mb-4 sm:mb-5 leading-[0.95] tracking-[-0.02em]"
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            textShadow: "0 2px 30px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Ai due leoni 1863
          <span className="sr-only"> — Casa vacanze a Comiso, Ragusa, Sicilia</span>
        </h1>

        {/* Subtitle — softer, with hierarchy */}
        <p
          data-animate
          className="text-base sm:text-lg lg:text-xl text-white/70 font-light mb-8 sm:mb-10 max-w-xl leading-[1.7] tracking-wide"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          {t(h.subtitle, lang)}
          <br className="hidden sm:inline" />
          <span className="text-white/50">{t(h.subtitleAccent, lang)}</span>
        </p>

        {/* Feature pills */}
        <div data-animate className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {[
            { icon: Bed, label: t(h.camere, lang) },
            { icon: Users, label: t(h.ospiti, lang) },
            { icon: MapPin, label: t(h.location, lang) },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-lg border border-white/[0.12] text-white/90 text-xs sm:text-sm px-4 py-2 rounded-full transition-colors hover:bg-white/[0.14]"
            >
              <Icon className="w-3.5 h-3.5 opacity-70" /> {label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div data-animate className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={lang === "it" ? "/appartamento" : `/${lang}/${lang === "en" ? "apartment" : lang === "es" ? "apartamento" : "wohnung"}`}
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base hover:brightness-110 transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.4)]"
          >
            {t(h.scopri, lang)}
          </a>
          <a
            href={lang === "it" ? "/contatti" : `/${lang}/${lang === "en" ? "contact" : lang === "es" ? "contacto" : "kontakt"}`}
            className="inline-flex items-center justify-center border border-white/40 text-white font-medium py-3.5 sm:py-4 px-8 sm:px-10 rounded-full text-sm sm:text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            {t(h.prenotaCta, lang)}
          </a>
          <a
            href="tel:+393280534920"
            className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white font-medium py-3.5 sm:py-4 px-6 rounded-full text-sm transition-all duration-300 sm:ml-1"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+39 328 053 4920</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
