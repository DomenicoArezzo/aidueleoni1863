export type Lang = "it" | "en" | "es";

export const translations = {
  // Navbar
  nav: {
    home: { it: "Home", en: "Home", es: "Inicio" },
    laStruttura: { it: "La Struttura", en: "The Property", es: "La Propiedad" },
    appartamento: { it: "L'Appartamento", en: "The Apartment", es: "El Apartamento" },
    appartamentoDesc: { it: "Camere, servizi e comfort", en: "Rooms, services & comfort", es: "Habitaciones, servicios y comodidades" },
    chiSiamo: { it: "Chi Siamo", en: "About Us", es: "Quiénes Somos" },
    chiSiamoDesc: { it: "La nostra storia", en: "Our story", es: "Nuestra historia" },
    doveSiamo: { it: "Dove Siamo", en: "Location", es: "Ubicación" },
    contatti: { it: "Contatti", en: "Contact", es: "Contacto" },
    prenota: { it: "Prenota", en: "Book Now", es: "Reservar" },
    prenotaSoggiorno: { it: "Prenota il tuo soggiorno", en: "Book your stay", es: "Reserva tu estancia" },
  },

  // Hero
  hero: {
    tagline: { it: "Esperienza esclusiva in Sicilia", en: "Exclusive experience in Sicily", es: "Experiencia exclusiva en Sicilia" },
    subtitle: { it: "Il tuo rifugio nel cuore di Ragusa.", en: "Your retreat in the heart of Ragusa.", es: "Tu refugio en el corazón de Ragusa." },
    subtitleAccent: { it: "Eleganza, comfort e autenticità siciliana.", en: "Elegance, comfort and Sicilian authenticity.", es: "Elegancia, confort y autenticidad siciliana." },
    camere: { it: "3 Camere", en: "3 Bedrooms", es: "3 Habitaciones" },
    ospiti: { it: "Fino a 6 ospiti", en: "Up to 6 guests", es: "Hasta 6 huéspedes" },
    location: { it: "Ragusa, Sicilia", en: "Ragusa, Sicily", es: "Ragusa, Sicilia" },
    scopri: { it: "Scopri la struttura", en: "Discover the property", es: "Descubre la propiedad" },
    prenotaCta: { it: "Prenota il tuo soggiorno", en: "Book your stay", es: "Reserva tu estancia" },
    videoAlt: { it: "Video panoramico della zona di Ragusa e della Sicilia orientale", en: "Panoramic video of the Ragusa area and eastern Sicily", es: "Video panorámico de la zona de Ragusa y el este de Sicilia" },
  },

  // Appartamento
  appartamento: {
    title: { it: "Il Nostro Appartamento", en: "Our Apartment", es: "Nuestro Apartamento" },
    description: {
      it: "Appartamento completamente ristrutturato con tutti i comfort moderni. Perfetto per famiglie e gruppi fino a 6 persone che desiderano esplorare le bellezze della Sicilia orientale.",
      en: "Fully renovated apartment with all modern comforts. Perfect for families and groups of up to 6 people who want to explore the beauties of eastern Sicily.",
      es: "Apartamento completamente renovado con todas las comodidades modernas. Perfecto para familias y grupos de hasta 6 personas que desean explorar las bellezas del este de Sicilia.",
    },
    features: {
      camere: { it: "3 Camere da Letto", en: "3 Bedrooms", es: "3 Habitaciones" },
      camereDesc: { it: "Matrimoniali con possibilità di letti singoli", en: "Double beds with single bed option", es: "Camas dobles con opción de camas individuales" },
      bagni: { it: "2 Bagni", en: "2 Bathrooms", es: "2 Baños" },
      bagniDesc: { it: "Moderni e completamente attrezzati", en: "Modern and fully equipped", es: "Modernos y completamente equipados" },
      cucina: { it: "Cucina Completa", en: "Full Kitchen", es: "Cocina Completa" },
      cucinaDesc: { it: "Attrezzata con tutti gli elettrodomestici", en: "Equipped with all appliances", es: "Equipada con todos los electrodomésticos" },
      wifi: { it: "WiFi Gratuito", en: "Free WiFi", es: "WiFi Gratis" },
      wifiDesc: { it: "Connessione internet ad alta velocità", en: "High-speed internet connection", es: "Conexión a internet de alta velocidad" },
      aria: { it: "Aria Condizionata", en: "Air Conditioning", es: "Aire Acondicionado" },
      ariaDesc: { it: "In tutte le stanze", en: "In all rooms", es: "En todas las habitaciones" },
      tv: { it: "TV Smart", en: "Smart TV", es: "Smart TV" },
      tvDesc: { it: "Con canali satellitari", en: "With satellite channels", es: "Con canales satelitales" },
      colazione: { it: "Colazione", en: "Breakfast", es: "Desayuno" },
      colazioneDesc: { it: "Set per colazione incluso", en: "Breakfast set included", es: "Set de desayuno incluido" },
      parcheggio: { it: "Parcheggio", en: "Parking", es: "Estacionamiento" },
      parcheggioDesc: { it: "Posto auto disponibile", en: "Parking space available", es: "Plaza de aparcamiento disponible" },
    },
    ristrutturato: { it: "Recentemente Ristrutturato", en: "Recently Renovated", es: "Recientemente Renovado" },
    bullets: {
      cucina: {
        it: "<strong>Cucina moderna</strong> completamente attrezzata con frigorifero, forno, piano cottura e lavastoviglie",
        en: "<strong>Modern kitchen</strong> fully equipped with fridge, oven, stove and dishwasher",
        es: "<strong>Cocina moderna</strong> completamente equipada con nevera, horno, vitrocerámica y lavavajillas",
      },
      camere: {
        it: "<strong>Camere spaziose</strong> con armadi a muro e possibilità di configurare letti matrimoniali o singoli",
        en: "<strong>Spacious bedrooms</strong> with built-in wardrobes and configurable double or single beds",
        es: "<strong>Habitaciones amplias</strong> con armarios empotrados y camas configurables dobles o individuales",
      },
      bagni: {
        it: "<strong>Bagni moderni</strong> con doccia, asciugacapelli e set di cortesia",
        en: "<strong>Modern bathrooms</strong> with shower, hairdryer and courtesy set",
        es: "<strong>Baños modernos</strong> con ducha, secador de pelo y set de cortesía",
      },
      soggiorno: {
        it: "<strong>Soggiorno accogliente</strong> con divano letto e TV smart per il relax serale",
        en: "<strong>Cozy living room</strong> with sofa bed and smart TV for evening relaxation",
        es: "<strong>Sala de estar acogedora</strong> con sofá cama y smart TV para relajarse por la noche",
      },
    },
    dettagli: { it: "Dettagli Appartamento", en: "Apartment Details", es: "Detalles del Apartamento" },
    superficie: { it: "Superficie", en: "Area", es: "Superficie" },
    piano: { it: "Piano", en: "Floor", es: "Piso" },
    pianoVal: { it: "2° Piano", en: "2nd Floor", es: "2° Piso" },
    balcone: { it: "Balcone", en: "Balcony", es: "Balcón" },
    si: { it: "Sì", en: "Yes", es: "Sí" },
  },

  // Chi Siamo
  chiSiamo: {
    title: { it: "Chi Siamo", en: "About Us", es: "Quiénes Somos" },
    subtitle: {
      it: "La nostra passione per l'ospitalità siciliana ci guida nel creare esperienze indimenticabili per i nostri ospiti",
      en: "Our passion for Sicilian hospitality drives us to create unforgettable experiences for our guests",
      es: "Nuestra pasión por la hospitalidad siciliana nos impulsa a crear experiencias inolvidables para nuestros huéspedes",
    },
    storiaTitle: { it: "La Nostra Storia", en: "Our Story", es: "Nuestra Historia" },
    storia1: {
      it: '<strong>"Ai due leoni"</strong> nasce dalla nostra passione per la Sicilia e il desiderio di condividere la bellezza di questa terra meravigliosa con viaggiatori da tutto il mondo.',
      en: '<strong>"Ai due leoni"</strong> was born from our passion for Sicily and the desire to share the beauty of this wonderful land with travelers from around the world.',
      es: '<strong>"Ai due leoni"</strong> nació de nuestra pasión por Sicilia y el deseo de compartir la belleza de esta maravillosa tierra con viajeros de todo el mundo.',
    },
    storia2: {
      it: "Siamo una famiglia siciliana che da generazioni vive a Ragusa e conosce ogni angolo di questa splendida provincia. Abbiamo deciso di aprire la nostra casa vacanze per offrire un'esperienza autentica e confortevole.",
      en: "We are a Sicilian family that has lived in Ragusa for generations and knows every corner of this beautiful province. We decided to open our vacation home to offer an authentic and comfortable experience.",
      es: "Somos una familia siciliana que ha vivido en Ragusa durante generaciones y conoce cada rincón de esta hermosa provincia. Decidimos abrir nuestra casa de vacaciones para ofrecer una experiencia auténtica y confortable.",
    },
    storia3: {
      it: 'Il nome "Ai due leoni" deriva da un antico simbolo della nostra famiglia, che rappresenta forza, orgoglio e accoglienza - valori che cerchiamo di trasmettere a ogni ospite.',
      en: 'The name "Ai due leoni" comes from an ancient family symbol representing strength, pride and hospitality - values we strive to convey to every guest.',
      es: 'El nombre "Ai due leoni" proviene de un antiguo símbolo familiar que representa fuerza, orgullo y hospitalidad - valores que nos esforzamos por transmitir a cada huésped.',
    },
    passione: { it: "Passione", en: "Passion", es: "Pasión" },
    passioneDesc: { it: "Per l'ospitalità e la Sicilia", en: "For hospitality and Sicily", es: "Por la hospitalidad y Sicilia" },
    qualita: { it: "Qualità", en: "Quality", es: "Calidad" },
    qualitaDesc: { it: "Standard elevati di comfort", en: "High comfort standards", es: "Altos estándares de confort" },
    famiglia: { it: "Famiglia", en: "Family", es: "Familia" },
    famigliaDesc: { it: "Gestione familiare attenta", en: "Careful family management", es: "Gestión familiar cuidadosa" },
    disponibilita: { it: "Disponibilità", en: "Availability", es: "Disponibilidad" },
    disponibilitaDesc: { it: "Assistenza 24/7", en: "24/7 assistance", es: "Asistencia 24/7" },
    missione: { it: "La Nostra Missione", en: "Our Mission", es: "Nuestra Misión" },
    missioneDesc: {
      it: "Vogliamo che ogni ospite si senta come a casa propria, scoprendo non solo un appartamento confortevole, ma anche l'autenticità, il calore e la bellezza della Sicilia attraverso i nostri consigli e la nostra accoglienza.",
      en: "We want every guest to feel at home, discovering not only a comfortable apartment, but also the authenticity, warmth and beauty of Sicily through our advice and hospitality.",
      es: "Queremos que cada huésped se sienta como en casa, descubriendo no solo un apartamento confortable, sino también la autenticidad, la calidez y la belleza de Sicilia a través de nuestros consejos y nuestra hospitalidad.",
    },
  },

  // Dove ci troviamo
  dove: {
    title: { it: "Dove Ci Troviamo", en: "Our Location", es: "Nuestra Ubicación" },
    subtitle: {
      it: "Posizione strategica nel cuore di Ragusa, vicino a tutti i servizi e alle principali attrazioni della Sicilia sud-orientale",
      en: "Strategic location in the heart of Ragusa, close to all services and the main attractions of south-eastern Sicily",
      es: "Ubicación estratégica en el corazón de Ragusa, cerca de todos los servicios y las principales atracciones del sureste de Sicilia",
    },
    posizione: { it: "La Nostra Posizione", en: "Our Position", es: "Nuestra Posición" },
    indirizzo: { it: "Indirizzo", en: "Address", es: "Dirección" },
    vicinoA: { it: "Vicino a", en: "Near", es: "Cerca de" },
    vicinoAVal: { it: "Centro Commerciale Ipercoop (2 min a piedi)", en: "Ipercoop Shopping Centre (2 min walk)", es: "Centro Comercial Ipercoop (2 min a pie)" },
    zona: { it: "Zona", en: "Area", es: "Zona" },
    zonaVal: { it: "Residenziale tranquilla con tutti i servizi", en: "Quiet residential area with all amenities", es: "Zona residencial tranquila con todos los servicios" },
    parcheggio: { it: "Parcheggio", en: "Parking", es: "Aparcamiento" },
    gratuito: { it: "Gratuito", en: "Free", es: "Gratis" },
    shopping: { it: "Shopping", en: "Shopping", es: "Compras" },
    ristoranti: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes" },
    nelleVicinanze: { it: "Nelle vicinanze", en: "Nearby", es: "Cerca" },
    attrazioni: { it: "Attrazioni Principali", en: "Main Attractions", es: "Atracciones Principales" },
    distanza: { it: "Distanza", en: "Distance", es: "Distancia" },
    comeRaggiungerci: { it: "Come Raggiungerci", en: "How to Reach Us", es: "Cómo Llegar" },
    aeroporto: { it: "Aeroporto di Catania", en: "Catania Airport", es: "Aeropuerto de Catania" },
    aeroportoVal: { it: "1 ora e 30 minuti in auto", en: "1 hour 30 minutes by car", es: "1 hora y 30 minutos en coche" },
    stazione: { it: "Stazione di Ragusa", en: "Ragusa Station", es: "Estación de Ragusa" },
    stazioneVal: { it: "10 minuti in auto o taxi", en: "10 minutes by car or taxi", es: "10 minutos en coche o taxi" },
    autostrada: { it: "Autostrada A18", en: "A18 Motorway", es: "Autopista A18" },
    autostradaVal: { it: "Uscita Ragusa, poi 5 minuti", en: "Ragusa exit, then 5 minutes", es: "Salida Ragusa, luego 5 minutos" },
    coordinate: { it: "Coordinate GPS", en: "GPS Coordinates", es: "Coordenadas GPS" },
    coordinateHint: { it: "Inserisci queste coordinate nel tuo navigatore", en: "Enter these coordinates in your navigator", es: "Introduce estas coordenadas en tu navegador" },
  },

  // Contatti
  contatti: {
    title: { it: "Prenota il Tuo Soggiorno", en: "Book Your Stay", es: "Reserva Tu Estancia" },
    subtitle: {
      it: "Contattaci per prenotare o per qualsiasi informazione. Saremo felici di aiutarti a pianificare la tua vacanza in Sicilia!",
      en: "Contact us to book or for any information. We'll be happy to help you plan your vacation in Sicily!",
      es: "Contáctanos para reservar o para cualquier información. ¡Estaremos encantados de ayudarte a planificar tus vacaciones en Sicilia!",
    },
    richiedi: { it: "Richiedi Disponibilità", en: "Check Availability", es: "Consultar Disponibilidad" },
    nome: { it: "Nome e Cognome", en: "Full Name", es: "Nombre Completo" },
    email: { it: "Email", en: "Email", es: "Email" },
    telefono: { it: "Telefono", en: "Phone", es: "Teléfono" },
    checkin: { it: "Check-in", en: "Check-in", es: "Check-in" },
    checkout: { it: "Check-out", en: "Check-out", es: "Check-out" },
    numOspiti: { it: "Numero di Ospiti", en: "Number of Guests", es: "Número de Huéspedes" },
    ospite: { it: "Ospite", en: "Guest", es: "Huésped" },
    ospiti: { it: "Ospiti", en: "Guests", es: "Huéspedes" },
    messaggio: { it: "Messaggio", en: "Message", es: "Mensaje" },
    messaggioPlaceholder: { it: "Raccontaci qualcosa di più sul tuo soggiorno...", en: "Tell us more about your stay...", es: "Cuéntanos más sobre tu estancia..." },
    invia: { it: "Invia Richiesta di Prenotazione", en: "Send Booking Request", es: "Enviar Solicitud de Reserva" },
    contattiDiretti: { it: "Contatti Diretti", en: "Direct Contact", es: "Contacto Directo" },
    comeRaggiungerci: { it: "Come Raggiungerci", en: "How to Reach Us", es: "Cómo Llegar" },
    ottieniIndicazioni: { it: "Ottieni Indicazioni", en: "Get Directions", es: "Obtener Indicaciones" },
    apriMaps: { it: "Apri in Google Maps", en: "Open in Google Maps", es: "Abrir en Google Maps" },
    tariffe: { it: "Tariffe", en: "Rates", es: "Tarifas" },
    bassa: { it: "Bassa stagione", en: "Low season", es: "Temporada baja" },
    media: { it: "Media stagione", en: "Mid season", es: "Temporada media" },
    alta: { it: "Alta stagione", en: "High season", es: "Temporada alta" },
    tariffeNote: {
      it: "* Le tariffe possono variare in base al periodo e alla durata del soggiorno. Contattaci per un preventivo personalizzato.",
      en: "* Rates may vary depending on the period and length of stay. Contact us for a personalized quote.",
      es: "* Las tarifas pueden variar según el período y la duración de la estancia. Contáctanos para un presupuesto personalizado.",
    },
    errore: { it: "Compila tutti i campi obbligatori", en: "Please fill in all required fields", es: "Por favor, rellena todos los campos obligatorios" },
    successo: { it: "Richiesta inviata con successo! Ti contatteremo presto.", en: "Request sent successfully! We'll contact you soon.", es: "¡Solicitud enviada con éxito! Te contactaremos pronto." },
    mapTitle: { it: "Posizione Casa Vacanze Ai due leoni - Ragusa, Sicilia", en: "Location Ai due leoni Vacation Home - Ragusa, Sicily", es: "Ubicación Casa Vacaciones Ai due leoni - Ragusa, Sicilia" },
  },

  // Footer
  footer: {
    description: {
      it: "Casa vacanze di lusso nel cuore di Ragusa, Sicilia. Eleganza, comfort e autenticità siciliana.",
      en: "Luxury vacation home in the heart of Ragusa, Sicily. Elegance, comfort and Sicilian authenticity.",
      es: "Casa de vacaciones de lujo en el corazón de Ragusa, Sicilia. Elegancia, confort y autenticidad siciliana.",
    },
    navigazione: { it: "Navigazione", en: "Navigation", es: "Navegación" },
    copyright: {
      it: "Ai due leoni — Casa Vacanze a Ragusa, Sicilia. Tutti i diritti riservati.",
      en: "Ai due leoni — Vacation Home in Ragusa, Sicily. All rights reserved.",
      es: "Ai due leoni — Casa de Vacaciones en Ragusa, Sicilia. Todos los derechos reservados.",
    },
  },
} as const;

// Helper
export function t(obj: Record<Lang, string>, lang: Lang): string {
  return obj[lang] || obj.it;
}
