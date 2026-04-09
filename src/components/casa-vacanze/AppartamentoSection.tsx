
import React from "react";
import { Bed, Bath, ChefHat, Wifi, Car, AirVent, Tv, Coffee } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import { Heading, BodyText, SectionHeader } from "./ui/Typography";

const AppartamentoSection = () => {
  const lang = useLang();
  const a = translations.appartamento;
  const f = a.features;

  const caratteristiche = [
    { icon: Bed, title: t(f.camere, lang), desc: t(f.camereDesc, lang) },
    { icon: Bath, title: t(f.bagni, lang), desc: t(f.bagniDesc, lang) },
    { icon: ChefHat, title: t(f.cucina, lang), desc: t(f.cucinaDesc, lang) },
    { icon: Wifi, title: t(f.wifi, lang), desc: t(f.wifiDesc, lang) },
    { icon: AirVent, title: t(f.aria, lang), desc: t(f.ariaDesc, lang) },
    { icon: Tv, title: t(f.tv, lang), desc: t(f.tvDesc, lang) },
    { icon: Coffee, title: t(f.colazione, lang), desc: t(f.colazioneDesc, lang) },
    { icon: Car, title: t(f.parcheggio, lang), desc: t(f.parcheggioDesc, lang) },
  ];

  const bullets = [a.bullets.cucina, a.bullets.camere, a.bullets.bagni, a.bullets.soggiorno];

  return (
    <SectionBlock id="appartamento" bg="white">
      <SectionHeader title={t(a.title, lang)} subtitle={t(a.description, lang)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {caratteristiche.map((item, index) => (
          <ContentCard key={index} variant="default" className="text-center hover:shadow-elegant transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-8 h-8 text-primary" />
            </div>
            <Heading as="h4" className="mb-2">{item.title}</Heading>
            <BodyText size="caption" muted maxWidth className="mx-auto">{item.desc}</BodyText>
          </ContentCard>
        ))}
      </div>

      <ContentCard variant="gradient" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Heading as="h3" className="mb-6">{t(a.ristrutturato, lang)}</Heading>
            <div className="space-y-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <BodyText maxWidth dangerouslySetInnerHTML={{ __html: t(bullet, lang) }} />
                </div>
              ))}
            </div>
          </div>

          <ContentCard variant="elevated" padding="lg">
            <Heading as="h4" className="mb-4">{t(a.dettagli, lang)}</Heading>
            <div className="space-y-3">
              {[
                [t(a.superficie, lang), "85 m²"],
                [t(a.piano, lang), t(a.pianoVal, lang)],
                [t(a.balcone, lang), t(a.si, lang)],
                ["Check-in", "15:00"],
                ["Check-out", "11:00"],
              ].map(([label, value], i) => (
                <div key={i} className={`flex justify-between py-2 ${i < 3 ? "border-b border-border" : ""}`}>
                  <BodyText muted>{label}</BodyText>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </ContentCard>
    </SectionBlock>
  );
};

export default AppartamentoSection;
