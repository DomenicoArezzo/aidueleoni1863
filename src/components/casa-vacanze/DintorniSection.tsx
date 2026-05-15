import React from "react";
import { MapPin, Clock } from "lucide-react";
import SectionBlock from "./ui/SectionBlock";
import ContentCard from "./ui/ContentCard";
import { Heading, BodyText, SectionHeader } from "./ui/Typography";

interface Luogo {
  titolo: string;
  intro: string;
  storia: string;
  vedere: string[];
  distanza: string;
}

const luoghi: Luogo[] = [
  {
    titolo: "Marina di Ragusa: mare, movida e relax nel cuore della Sicilia",
    intro:
      "Sabbia dorata, acque turchesi e quel profumo di salsedine che racconta la Sicilia più autentica. Marina di Ragusa è il luogo dove il tempo rallenta e ogni tramonto diventa un piccolo spettacolo.",
    storia:
      "Nata come piccolo borgo di pescatori nell'Ottocento, Marina di Ragusa è oggi una delle località balneari più amate del Sud-Est siciliano. Bandiera Blu da diversi anni, conserva l'eleganza discreta dei villini liberty affacciati sul lungomare e una vita notturna vivace ma mai chiassosa, perfetta per chi cerca vacanze in Sicilia all'insegna di mare e buon vivere.",
    vedere: [
      "Le spiagge di Marina di Ragusa, premiate con la Bandiera Blu",
      "Il caratteristico porto turistico, ideale per un aperitivo al tramonto",
      "Piazza Duca degli Abruzzi e il salotto pedonale del centro",
      "I locali tipici per gustare pesce fresco e granita siciliana",
      "La passeggiata sul lungomare Andrea Doria, perfetta al calar del sole",
    ],
    distanza: "A circa 25 minuti da Ai Due Leoni 1863",
  },
  {
    titolo: "Castello di Donnafugata: storia, mistero e barocco siciliano",
    intro:
      "Una dimora nobiliare sospesa tra realtà e leggenda, dove ogni stanza racconta secoli di storia siciliana e dove il labirinto in pietra invita a perdersi con piacere.",
    storia:
      "Il Castello di Donnafugata, le cui origini risalgono al XIV secolo, deve il suo aspetto attuale ai lavori voluti dal barone Corrado Arezzo De Spuches nell'Ottocento. Tra le sue mura si fondono stile gotico-veneziano e neoclassico, in un esempio raffinato di architettura aristocratica della Contea di Modica. È uno dei luoghi simbolo della provincia di Ragusa e set cinematografico di numerose produzioni, tra cui la celebre serie del Commissario Montalbano.",
    vedere: [
      "Le 122 stanze del castello, di cui oltre 20 visitabili",
      "Il Salone degli Specchi e la Pinacoteca",
      "Il parco di otto ettari con piante esotiche",
      "Il famoso labirinto in pietra calcarea",
      "Il Museo del Costume all'interno del borgo",
    ],
    distanza: "A circa 20 minuti da Ai Due Leoni 1863",
  },
  {
    titolo: "Scicli: la perla barocca patrimonio UNESCO",
    intro:
      "Scicli è una scenografia a cielo aperto, scolpita nella pietra dorata della Val di Noto. Camminare tra le sue chiese e i suoi palazzi significa entrare nel cuore più poetico della Sicilia barocca.",
    storia:
      "Riconosciuta dall'UNESCO come Patrimonio dell'Umanità nel 2002 insieme alle altre città tardo-barocche del Val di Noto, Scicli rinacque dopo il devastante terremoto del 1693 con un volto nuovo, fatto di chiese, palazzi e mascheroni che ancora oggi affascinano i visitatori. Il suo centro storico è uno dei più armoniosi della Sicilia sud-orientale e ha conquistato il pubblico internazionale grazie alla fiction del Commissario Montalbano.",
    vedere: [
      "Via Mormino Penna, salotto barocco della città",
      "La Chiesa di San Bartolomeo nella suggestiva Cava di San Bartolomeo",
      "Palazzo Beneventano, capolavoro del barocco siciliano",
      "Il Palazzo Comunale, noto come 'commissariato di Vigata'",
      "I quartieri rupestri di Chiafura, scavati nella roccia",
    ],
    distanza: "A circa 30 minuti da Ai Due Leoni 1863",
  },
  {
    titolo: "Ragusa Ibla: il gioiello barocco della Val di Noto",
    intro:
      "Un dedalo di vicoli, scalinate e palazzi di pietra calda, sospeso tra cielo e valle. Visitare Ragusa Ibla significa innamorarsi della Sicilia con un solo sguardo dall'alto.",
    storia:
      "Cuore antico della città, Ragusa Ibla rinacque dopo il terremoto del 1693 grazie al genio degli architetti del tardo barocco. Dichiarata Patrimonio UNESCO nel 2002, custodisce oltre cinquanta chiese e numerosi palazzi nobiliari, in un equilibrio raro tra arte, fede e paesaggio. Visitare Ragusa Ibla è un'esperienza imperdibile per chi cerca cosa vedere a Ragusa e desidera vivere il vero volto della Val di Noto.",
    vedere: [
      "Il maestoso Duomo di San Giorgio, capolavoro di Rosario Gagliardi",
      "Il Giardino Ibleo con i suoi viali panoramici",
      "La Chiesa di San Giuseppe e il Portale di San Giorgio",
      "I belvederi su Santa Maria delle Scale per il tramonto",
      "I ristoranti stellati e le trattorie di cucina iblea",
    ],
    distanza: "A circa 15 minuti da Ai Due Leoni 1863",
  },
  {
    titolo: "Comiso: arte, storia e porta della Sicilia sud-orientale",
    intro:
      "Città di Gesualdo Bufalino e di nobili palazzi, Comiso accoglie il viaggiatore con la luce calda della pietra bianca e il ritmo gentile dei suoi vicoli barocchi.",
    storia:
      "Comiso vanta origini antichissime, da insediamento siculo a colonia greca, fino al ruolo di centro nobiliare sotto i Naselli d'Aragona. La città conserva un patrimonio architettonico raffinato, con chiese, palazzi e fontane di grande valore. Oggi Comiso è anche una porta strategica per il turismo in Sicilia, grazie all'aeroporto di Comiso che la collega rapidamente con tutta Europa.",
    vedere: [
      "Il Castello dei Naselli d'Aragona con la fontana di Diana",
      "La Chiesa Madre di Santa Maria delle Stelle",
      "La Fondazione Bufalino, dedicata al celebre scrittore",
      "Le terme romane di epoca imperiale",
      "Il Mercato Ittico Liberty in Piazza delle Erbe",
    ],
    distanza: "A pochi minuti da Ai Due Leoni 1863",
  },
];

const DintorniSection = () => {
  return (
    <SectionBlock id="dintorni" bg="white">
      <SectionHeader
        title="Cosa visitare nei dintorni"
        subtitle="Dalla campagna ragusana al mare cristallino, un viaggio nel cuore della Sicilia barocca: borghi UNESCO, castelli, spiagge e tradizioni autentiche a pochi minuti da Ai Due Leoni 1863."
      />

      <div className="space-y-10">
        {luoghi.map((luogo, i) => (
          <ContentCard
            key={i}
            variant={i % 2 === 0 ? "default" : "gradient"}
            padding="lg"
            className="transition-shadow duration-300 hover:shadow-elegant"
          >
            <article>
              <Heading as="h2" className="mb-4">
                {luogo.titolo}
              </Heading>

              <BodyText size="lead" muted className="mb-6 italic">
                {luogo.intro}
              </BodyText>

              <BodyText className="mb-6" maxWidth>
                {luogo.storia}
              </BodyText>

              <div className="mb-6">
                <Heading as="h3" className="mb-3">
                  Cosa vedere e fare
                </Heading>
                <ul className="space-y-2">
                  {luogo.vedere.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <BodyText className="m-0">{item}</BodyText>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  {luogo.distanza}
                </span>
                <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4" />
                  Provincia di Ragusa, Sicilia
                </span>
              </div>
            </article>
          </ContentCard>
        ))}
      </div>

      <ContentCard variant="gradient" padding="lg" className="mt-12 text-center">
        <Heading as="h3" className="mb-3">
          Vuoi vivere la vera esperienza siciliana?
        </Heading>
        <BodyText muted maxWidth className="mx-auto mb-6">
          Ai Due Leoni 1863 è il punto di partenza ideale per scoprire le meraviglie della Val di Noto, le spiagge della costa iblea e i tesori del barocco siciliano.
        </BodyText>
        <a
          href="/contatti"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-colors"
        >
          Richiedi un preventivo
        </a>
      </ContentCard>
    </SectionBlock>
  );
};

export default DintorniSection;