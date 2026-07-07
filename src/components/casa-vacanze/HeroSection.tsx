
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
      className="relative min-h-screen flex items-center px-5 sm:px-8 lg:px-12 overflow-hidden"
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
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

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
  className="
    text-6xl
    sm:text-7xl
    lg:text-[8rem]
    xl:text-[9rem]
    font-normal
    text-white
    leading-[0.9]
    tracking-[-0.04em]
    mb-6
  "
  style={{
    fontFamily: "'Playfair Display', serif",
    textShadow:
      "0 4px 35px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.35)",
  }}
>
  Ai due leoni

  <span
    className="
      block
      text-3xl
      sm:text-4xl
      lg:text-5xl
      mt-2
      tracking-[0.35em]
      text-white/85
      uppercase
      font-light
    "
  >
    1863
  </span>

  <span className="sr-only">
    Casa vacanze a Comiso, Ragusa, Sicilia
  </span>
</h1>


        {/* Subtitle — softer, with hierarchy */}
       <h1
  data-animate
  className="
    text-6xl
    sm:text-7xl
    lg:text-[8rem]
    xl:text-[9rem]
    font-normal
    text-white
    leading-[0.9]
    tracking-[-0.04em]
    mb-6
  "
  style={{
    fontFamily: "'Playfair Display', serif",
    textShadow:
      "0 4px 35px rgba(0,0,0,.45), 0 2px 10px rgba(0,0,0,.35)",
  }}
>
  Ai due leoni

  <span
    className="
      block
      text-3xl
      sm:text-4xl
      lg:text-5xl
      mt-2
      tracking-[0.35em]
      text-white/85
      uppercase
      font-light
    "
  >
    1863
  </span>

  <span className="sr-only">
    Casa vacanze a Comiso, Ragusa, Sicilia
  </span>
</h1>
`

        {/* Feature pills */}
        <div data-animate className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {[
            { icon: Bed, label: t(h.camere, lang) },
            { icon: Users, label: t(h.ospiti, lang) },
            { icon: MapPin, label: t(h.location, lang) },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-white px-5 py-3 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 opacity-70" /> {label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div data-animate className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={lang === "it" ? "/appartamento" : `/${lang}/${lang === "en" ? "apartment" : lang === "es" ? "apartamento" : "wohnung"}`}
           className="
inline-flex
items-center
justify-center
bg-primary
text-primary-foreground
font-semibold
py-4
px-10
rounded-full
hover:scale-105
hover:brightness-110
transition-all
duration-300
shadow-[0_10px_30px_hsl(var(--primary)/0.45)]
"

          >
            {t(h.scopri, lang)}
          </a>
          <a
            href={lang === "it" ? "/contatti" : `/${lang}/${lang === "en" ? "contact" : lang === "es" ? "contacto" : "kontakt"}`}
            className="
inline-flex
items-center
justify-center
border
border-white/30
bg-white/5
backdrop-blur-md
text-white
font-medium
py-4
px-10
rounded-full
hover:bg-white/10
transition-all
duration-300
"

          >
            {t(h.prenotaCta, lang)}
          </a>
          <a
            href="tel:+393280534920"
            className="
inline-flex
items-center
gap-2
text-white/75
hover:text-white
transition-all
duration-300
"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+39 328 053 4920</span>
          </a>
        </div>
      </div>
    <div
  className="
  absolute
  bottom-8
  left-1/2
  -translate-x-1/2
  hidden
  lg:flex
  flex-col
  items-center
  text-white/55
  "
>
  <span className="text-xs tracking-[0.3em] uppercase mb-3">
    Scroll
  </span>

  <div className="w-[1px] h-10 bg-white/40 animate-pulse" />
</div>
    </section>
  );
};

export default HeroSection;
