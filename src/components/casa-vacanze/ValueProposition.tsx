
import React from "react";
import { Bed, MapPin, Star, Shield } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/translations";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import { Heading, BodyText } from "./ui/Typography";

const valueProps = {
  comfort: {
    title: { it: "Comfort Moderno", en: "Modern Comfort", es: "Confort Moderno", de: "Moderner Komfort" },
    desc: { it: "Appartamento ristrutturato con 3 camere, 2 bagni, cucina completa e aria condizionata.", en: "Renovated apartment with 3 bedrooms, 2 bathrooms, full kitchen and air conditioning.", es: "Apartamento renovado con 3 habitaciones, 2 baños, cocina completa y aire acondicionado.", de: "Renovierte Wohnung mit 3 Schlafzimmern, 2 Bädern, voll ausgestatteter Küche und Klimaanlage." },
  },
  posizione: {
    title: { it: "Posizione Strategica", en: "Strategic Location", es: "Ubicación Estratégica", de: "Strategische Lage" },
    desc: { it: "Nel cuore di Ragusa, a pochi passi dal centro storico barocco patrimonio UNESCO.", en: "In the heart of Ragusa, steps away from the UNESCO baroque old town.", es: "En el corazón de Ragusa, a pocos pasos del centro histórico barroco UNESCO.", de: "Im Herzen von Ragusa, nur wenige Schritte von der UNESCO-Barockaltstadt entfernt." },
  },
  esperienza: {
    title: { it: "Esperienza Autentica", en: "Authentic Experience", es: "Experiencia Auténtica", de: "Authentisches Erlebnis" },
    desc: { it: "Gestione familiare con attenzione personalizzata per ogni ospite.", en: "Family-run with personalized attention for every guest.", es: "Gestión familiar con atención personalizada para cada huésped.", de: "Familiär geführt mit persönlicher Betreuung für jeden Gast." },
  },
  sicurezza: {
    title: { it: "Prenotazione Sicura", en: "Secure Booking", es: "Reserva Segura", de: "Sichere Buchung" },
    desc: { it: "Calendario aggiornato in tempo reale, conferma immediata e pagamento protetto.", en: "Real-time updated calendar, instant confirmation and secure payment.", es: "Calendario actualizado en tiempo real, confirmación inmediata y pago seguro.", de: "Echtzeit-Kalender, sofortige Bestätigung und sichere Zahlung." },
  },
};

const icons = [Bed, MapPin, Star, Shield];

const ValueProposition = () => {
  const lang = useLang();
  const items = Object.values(valueProps);

  return (
    <SectionBlock id="value-proposition" bg="muted">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const Icon = icons[i];
          return (
            <ContentCard key={i} variant="elevated" className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <Heading as="h4" className="mb-2">{t(item.title, lang)}</Heading>
              <BodyText size="caption" muted maxWidth className="mx-auto">
                {t(item.desc, lang)}
              </BodyText>
            </ContentCard>
          );
        })}
      </div>
    </SectionBlock>
  );
};

export default ValueProposition;
