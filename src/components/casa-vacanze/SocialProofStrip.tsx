
import React from "react";
import { Star, Users, Award } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import { BodyText } from "./ui/Typography";

const metrics = [
  {
    icon: Star,
    value: "4.9",
    label: { it: "Valutazione media", en: "Average rating", es: "Valoración media", de: "Durchschnittsbewertung" },
  },
  {
    icon: Users,
    value: "500+",
    label: { it: "Ospiti soddisfatti", en: "Happy guests", es: "Huéspedes satisfechos", de: "Zufriedene Gäste" },
  },
  {
    icon: Award,
    value: "5",
    label: { it: "Anni di esperienza", en: "Years of experience", es: "Años de experiencia", de: "Jahre Erfahrung" },
  },
];

const SocialProofStrip = () => {
  const lang = useLang();

  return (
    <SectionBlock id="social-proof" bg="white">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <m.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground leading-none">{m.value}</p>
              <BodyText size="caption" muted>{t(m.label, lang)}</BodyText>
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
};

export default SocialProofStrip;
