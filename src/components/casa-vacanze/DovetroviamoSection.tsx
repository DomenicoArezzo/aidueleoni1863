
import React from "react";
import { MapPin, Car, Plane, Clock, Coffee, ShoppingBag } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import { Heading, BodyText, SectionHeader } from "./ui/Typography";

const DovetroviamoSection = () => {
  const lang = useLang();
  const d = translations.dove;

  const attrazioni = [
    { nome: "Centro Storico di Ragusa Ibla", distanza: "8 km", tempo: "15 min" },
    { nome: "Duomo di San Giorgio", distanza: "8 km", tempo: "15 min" },
    { nome: "Castello di Donnafugata", distanza: "15 km", tempo: "20 min" },
    { nome: "Marina di Ragusa", distanza: "25 km", tempo: "30 min" },
    { nome: "Modica", distanza: "20 km", tempo: "25 min" },
    { nome: "Scicli", distanza: "30 km", tempo: "35 min" },
  ];

  return (
    <SectionBlock id="dove-ci-troviamo" bg="white">
      <SectionHeader title={t(d.title, lang)} subtitle={t(d.subtitle, lang)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <ContentCard variant="gradient" padding="lg" className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-primary" />
              <Heading as="h3">{t(d.posizione, lang)}</Heading>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground block">{t(d.indirizzo, lang)}</span>
                  <BodyText muted>Contrada Castiglione snc, 97013 Comiso (RG)</BodyText>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground block">{t(d.vicinoA, lang)}</span>
                  <BodyText muted>{t(d.vicinoAVal, lang)}</BodyText>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-foreground block">{t(d.zona, lang)}</span>
                  <BodyText muted>{t(d.zonaVal, lang)}</BodyText>
                </div>
              </div>
            </div>
          </ContentCard>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Car, label: t(d.parcheggio, lang), sub: t(d.gratuito, lang) },
              { icon: ShoppingBag, label: t(d.shopping, lang), sub: "Ipercoop 2 min" },
              { icon: Coffee, label: t(d.ristoranti, lang), sub: t(d.nelleVicinanze, lang) },
            ].map(({ icon: Icon, label, sub }, i) => (
              <ContentCard key={i} variant="default" className="text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="font-semibold text-foreground text-sm block">{label}</span>
                <BodyText size="caption" muted>{sub}</BodyText>
              </ContentCard>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <Heading as="h3">{t(d.attrazioni, lang)}</Heading>
          </div>
          <div className="space-y-3">
            {attrazioni.map((att, index) => (
              <ContentCard key={index} variant="default" padding="sm" className="hover:shadow-elegant transition-shadow duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-foreground block">{att.nome}</span>
                    <BodyText size="caption" muted>{t(d.distanza, lang)}: {att.distanza}</BodyText>
                  </div>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{att.tempo}</span>
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </div>

      <ContentCard variant="gradient" padding="lg" className="bg-gradient-to-r from-secondary to-accent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Plane className="w-8 h-8 text-primary" />
              <Heading as="h3">{t(d.comeRaggiungerci, lang)}</Heading>
            </div>
            <div className="space-y-4">
              {[
                [t(d.aeroporto, lang), t(d.aeroportoVal, lang)],
                [t(d.stazione, lang), t(d.stazioneVal, lang)],
                [t(d.autostrada, lang), t(d.autostradaVal, lang)],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">{title}</span>
                    <BodyText muted maxWidth>{desc}</BodyText>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContentCard variant="elevated" padding="md">
            <Heading as="h4" className="mb-4">{t(d.coordinate, lang)}</Heading>
            <div className="bg-muted rounded-lg p-4 font-mono text-center">
              <span className="text-foreground font-semibold">36.9469° N, 14.6044° E</span>
            </div>
            <BodyText size="caption" muted className="mt-3 text-center">{t(d.coordinateHint, lang)}</BodyText>
          </ContentCard>
        </div>
      </ContentCard>
    </SectionBlock>
  );
};

export default DovetroviamoSection;
