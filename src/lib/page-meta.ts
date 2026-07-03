import type { Lang } from "@/lib/translations";

type Meta = { title: string; description: string };
type PageKey = "appartamento" | "chiSiamo" | "doveSiamo" | "contatti" | "disponibilita" | "dintorni";

export const pageMeta: Record<PageKey, Record<Lang, Meta>> = {
  appartamento: {
    it: {
      title: "L'appartamento – Ai due leoni, casa vacanze Comiso",
      description:
        "Scopri l'appartamento Ai due leoni a Comiso: 3 camere, 2 bagni, cucina completa, Wi-Fi e aria condizionata per fino a 6 ospiti.",
    },
    en: { title: "The Apartment – Ai due leoni holiday home", description: "Discover the Ai due leoni apartment in Comiso: 3 bedrooms, 2 bathrooms, full kitchen, Wi-Fi and A/C for up to 6 guests." },
    es: { title: "El apartamento – Ai due leoni, casa vacacional Comiso", description: "Descubre el apartamento Ai due leoni en Comiso: 3 habitaciones, 2 baños, cocina completa, Wi-Fi y aire acondicionado para 6 huéspedes." },
    de: { title: "Die Wohnung – Ai due leoni Ferienhaus in Comiso", description: "Die Wohnung Ai due leoni in Comiso: 3 Schlafzimmer, 2 Bäder, voll ausgestattete Küche, Wi-Fi und Klimaanlage für bis zu 6 Gäste." },
  },
  chiSiamo: {
    it: { title: "Chi siamo – La storia di Ai due leoni 1863", description: "La storia della famiglia dietro Ai due leoni 1863: una casa vacanze di famiglia nel cuore della campagna ragusana." },
    en: { title: "About us – The story of Ai due leoni 1863", description: "The family story behind Ai due leoni 1863: a family holiday home in the heart of the Ragusan countryside." },
    es: { title: "Quiénes somos – La historia de Ai due leoni 1863", description: "La historia familiar detrás de Ai due leoni 1863: una casa vacacional en el corazón del campo ragusano." },
    de: { title: "Über uns – Die Geschichte von Ai due leoni 1863", description: "Die Familiengeschichte hinter Ai due leoni 1863: ein Ferienhaus im Herzen des ragusanischen Landes." },
  },
  doveSiamo: {
    it: { title: "Dove siamo – Ai due leoni a Comiso, Ragusa", description: "Ai due leoni si trova in Contrada Castiglione, Comiso (RG). Vicino aeroporto di Comiso, spiagge iblee e Val di Noto." },
    en: { title: "Where we are – Ai due leoni in Comiso, Ragusa", description: "Ai due leoni is in Contrada Castiglione, Comiso (RG). Close to Comiso airport, Iblean beaches and the Val di Noto." },
    es: { title: "Dónde estamos – Ai due leoni en Comiso, Ragusa", description: "Ai due leoni está en Contrada Castiglione, Comiso (RG). Cerca del aeropuerto de Comiso, playas ibleas y Val di Noto." },
    de: { title: "Standort – Ai due leoni in Comiso, Ragusa", description: "Ai due leoni liegt in Contrada Castiglione, Comiso (RG). Nahe Flughafen Comiso, iblëischen Stränden und Val di Noto." },
  },
  contatti: {
    it: { title: "Contatti – Ai due leoni, casa vacanze Comiso", description: "Contatta Ai due leoni per informazioni, disponibilità e un preventivo personalizzato per il tuo soggiorno in Sicilia." },
    en: { title: "Contact – Ai due leoni holiday home", description: "Contact Ai due leoni for information, availability and a custom quote for your stay in Sicily." },
    es: { title: "Contacto – Ai due leoni casa vacacional", description: "Contacta con Ai due leoni para información, disponibilidad y un presupuesto personalizado para tu estancia en Sicilia." },
    de: { title: "Kontakt – Ai due leoni Ferienhaus", description: "Kontaktieren Sie Ai due leoni für Informationen, Verfügbarkeit und ein individuelles Angebot für Ihren Aufenthalt in Sizilien." },
  },
  disponibilita: {
    it: { title: "Disponibilità – Calendario Ai due leoni Comiso", description: "Consulta il calendario di disponibilità di Ai due leoni a Comiso e richiedi un preventivo per il tuo soggiorno." },
    en: { title: "Availability – Ai due leoni booking calendar", description: "Check the availability calendar of Ai due leoni in Comiso and request a quote for your stay." },
    es: { title: "Disponibilidad – Calendario Ai due leoni Comiso", description: "Consulta el calendario de disponibilidad de Ai due leoni en Comiso y solicita un presupuesto para tu estancia." },
    de: { title: "Verfügbarkeit – Ai due leoni Belegungskalender", description: "Prüfen Sie die Verfügbarkeit von Ai due leoni in Comiso und fordern Sie ein Angebot für Ihren Aufenthalt an." },
  },
  dintorni: {
    it: { title: "Cosa visitare nei dintorni – Ai due leoni Comiso", description: "Guida ai dintorni: Marina di Ragusa, Castello di Donnafugata, Scicli, Ragusa Ibla e Comiso, a pochi minuti da Ai due leoni." },
    en: { title: "What to see nearby – Ai due leoni Comiso", description: "Guide to the area: Marina di Ragusa, Donnafugata Castle, Scicli, Ragusa Ibla and Comiso, minutes from Ai due leoni." },
    es: { title: "Qué visitar en los alrededores – Ai due leoni", description: "Guía de los alrededores: Marina di Ragusa, Castillo de Donnafugata, Scicli, Ragusa Ibla y Comiso, a minutos de Ai due leoni." },
    de: { title: "Was in der Umgebung besuchen – Ai due leoni", description: "Umgebungsführer: Marina di Ragusa, Schloss Donnafugata, Scicli, Ragusa Ibla und Comiso, wenige Minuten von Ai due leoni entfernt." },
  },
};