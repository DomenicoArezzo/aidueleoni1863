
import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Euro, MapPin, Navigation, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import ActionButton from "./ui/ActionButton";
import { Heading, BodyText, SectionHeader } from "./ui/Typography";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.5!2d14.7351!3d36.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU1JzQxLjIiTiAxNMKwNDQnMDYuNCJF!5e0!3m2!1sit!2sit!4v1700000000000";
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=36.9281,14.7351&travelmode=driving";

const ContattiSection = () => {
  const lang = useLang();
  const c = translations.contatti;

  const [formData, setFormData] = useState({
    nome: "", email: "", telefono: "", checkin: "", checkout: "", ospiti: "2", messaggio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.checkin || !formData.checkout) {
      toast.error(t(c.errore, lang));
      return;
    }
    toast.success(t(c.successo, lang));
    setFormData({ nome: "", email: "", telefono: "", checkin: "", checkout: "", ospiti: "2", messaggio: "" });
  };

  const inputClasses = "w-full px-4 py-3 border border-input rounded-[10px] bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors";

  return (
    <SectionBlock id="contatti" bg="muted">
      <SectionHeader title={t(c.title, lang)} subtitle={t(c.subtitle, lang)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContentCard variant="elevated" padding="lg">
          <Heading as="h3" className="mb-6">{t(c.richiedi, lang)}</Heading>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t(c.nome, lang)} *</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={inputClasses} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t(c.email, lang)} *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t(c.telefono, lang)}</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t(c.checkin, lang)} *</label>
                <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} className={inputClasses} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t(c.checkout, lang)} *</label>
                <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t(c.numOspiti, lang)}</label>
              <select name="ospiti" value={formData.ospiti} onChange={handleChange} className={inputClasses}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={String(n)}>{n} {n === 1 ? t(c.ospite, lang) : t(c.ospiti, lang)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t(c.messaggio, lang)}</label>
              <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} rows={4} className={inputClasses} placeholder={t(c.messaggioPlaceholder, lang)} />
            </div>
            <ActionButton type="submit" variant="primary" size="lg" fullWidth>
              {t(c.invia, lang)}
            </ActionButton>
          </form>
        </ContentCard>

        <div className="space-y-6">
          <ContentCard variant="elevated" padding="lg">
            <Heading as="h3" className="mb-6">{t(c.contattiDiretti, lang)}</Heading>
            <div className="space-y-5">
              {[
                { icon: Phone, label: t(c.telefono, lang), value: "+39 XXX XXX XXXX" },
                { icon: Mail, label: t(c.email, lang), value: "info@aidueleonisicilia.com" },
                { icon: MessageCircle, label: "WhatsApp", value: "24/7" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">{label}</span>
                    <BodyText muted>{value}</BodyText>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard variant="elevated" padding="sm" className="overflow-hidden">
            <div className="p-5 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-primary" />
                <Heading as="h4">{t(c.comeRaggiungerci, lang)}</Heading>
              </div>
              <BodyText size="caption" muted>Via delle Medaglie d'Oro, Ragusa (RG)</BodyText>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe src={GOOGLE_MAPS_EMBED_URL} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t(c.mapTitle, lang)} />
            </div>
            <div className="p-5 flex flex-col sm:flex-row gap-3">
              <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                <ActionButton variant="primary" size="md" fullWidth className="gap-2">
                  <Navigation className="w-4 h-4" />
                  {t(c.ottieniIndicazioni, lang)}
                </ActionButton>
              </a>
              <a href="https://www.google.com/maps/place/36.9281,14.7351" target="_blank" rel="noopener noreferrer" className="flex-1">
                <ActionButton variant="secondary" size="md" fullWidth className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t(c.apriMaps, lang)}
                </ActionButton>
              </a>
            </div>
          </ContentCard>

          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[10px] p-8 text-primary-foreground">
            <Heading as="h3" className="mb-6 flex items-center gap-3 text-primary-foreground">
              <Euro className="w-6 h-6" />
              {t(c.tariffe, lang)}
            </Heading>
            <div className="space-y-4">
              {[[t(c.bassa, lang), "€80"], [t(c.media, lang), "€100"], [t(c.alta, lang), "€120"]].map(([label, price], i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-primary-foreground/20">
                  <span>{label}</span>
                  <span className="font-bold">{price}/{lang === "en" ? "night" : lang === "es" ? "noche" : lang === "de" ? "Nacht" : "notte"}</span>
                </div>
              ))}
              <BodyText size="caption" className="mt-4 text-primary-foreground/80">{t(c.tariffeNote, lang)}</BodyText>
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default ContattiSection;
