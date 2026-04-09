
import React from "react";
import { Heart, Award, Users, Clock } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import { Heading, BodyText, SectionHeader } from "./ui/Typography";

const ChiSiamoSection = () => {
  const lang = useLang();
  const c = translations.chiSiamo;

  const values = [
    { icon: Heart, title: t(c.passione, lang), desc: t(c.passioneDesc, lang) },
    { icon: Award, title: t(c.qualita, lang), desc: t(c.qualitaDesc, lang) },
    { icon: Users, title: t(c.famiglia, lang), desc: t(c.famigliaDesc, lang) },
    { icon: Clock, title: t(c.disponibilita, lang), desc: t(c.disponibilitaDesc, lang) },
  ];

  return (
    <SectionBlock id="chi-siamo" bg="muted">
      <SectionHeader title={t(c.title, lang)} subtitle={t(c.subtitle, lang)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <Heading as="h3" className="mb-6">{t(c.storiaTitle, lang)}</Heading>
          <div className="space-y-4">
            <BodyText maxWidth dangerouslySetInnerHTML={{ __html: t(c.storia1, lang) }} />
            <BodyText maxWidth>{t(c.storia2, lang)}</BodyText>
            <BodyText maxWidth>{t(c.storia3, lang)}</BodyText>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {values.map((v, i) => (
            <ContentCard key={i} variant="elevated" className="text-center">
              <v.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <Heading as="h5" className="mb-2">{v.title}</Heading>
              <BodyText size="caption" muted>{v.desc}</BodyText>
            </ContentCard>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-[10px] p-8 sm:p-12 text-primary-foreground text-center">
        <Heading as="h3" className="mb-4 text-primary-foreground">{t(c.missione, lang)}</Heading>
        <BodyText size="lead" maxWidth className="mx-auto text-primary-foreground/90">
          {t(c.missioneDesc, lang)}
        </BodyText>
      </div>
    </SectionBlock>
  );
};

export default ChiSiamoSection;
