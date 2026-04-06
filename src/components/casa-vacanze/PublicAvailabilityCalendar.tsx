import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/translations";
import { CalendarDays, ChevronRight, Phone, Mail } from "lucide-react";
import { it, enUS, es, de } from "date-fns/locale";
import { format, differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";

interface UnavailableRange {
  date_start: string;
  date_end: string;
  block_type: string;
  source: string;
}

const localeMap = { it, en: enUS, es, de };

const tr = {
  title: { it: "Verifica Disponibilità", en: "Check Availability", es: "Comprobar Disponibilidad", de: "Verfügbarkeit prüfen" },
  subtitle: { it: "Seleziona le date del tuo soggiorno per verificare la disponibilità in tempo reale", en: "Select your stay dates to check real-time availability", es: "Selecciona las fechas de tu estancia para comprobar la disponibilidad en tiempo real", de: "Wählen Sie Ihre Aufenthaltsdaten, um die Verfügbarkeit in Echtzeit zu prüfen" },
  checkin: { it: "Check-in", en: "Check-in", es: "Check-in", de: "Check-in" },
  checkout: { it: "Check-out", en: "Check-out", es: "Check-out", de: "Check-out" },
  selectDate: { it: "Seleziona data", en: "Select date", es: "Selecciona fecha", de: "Datum wählen" },
  nights: { it: "notti", en: "nights", es: "noches", de: "Nächte" },
  night: { it: "notte", en: "night", es: "noche", de: "Nacht" },
  available: { it: "Disponibile! Prenota subito", en: "Available! Book now", es: "¡Disponible! Reserva ahora", de: "Verfügbar! Jetzt buchen" },
  notAvailable: { it: "Date non disponibili", en: "Dates not available", es: "Fechas no disponibles", de: "Daten nicht verfügbar" },
  requestBooking: { it: "Richiedi Prenotazione", en: "Request Booking", es: "Solicitar Reserva", de: "Buchung anfragen" },
  callUs: { it: "Chiamaci", en: "Call us", es: "Llámanos", de: "Rufen Sie uns an" },
  legend: { it: "Legenda", en: "Legend", es: "Leyenda", de: "Legende" },
  booked: { it: "Non disponibile", en: "Unavailable", es: "No disponible", de: "Nicht verfügbar" },
  free: { it: "Disponibile", en: "Available", es: "Disponible", de: "Verfügbar" },
  today: { it: "Oggi", en: "Today", es: "Hoy", de: "Heute" },
};

const PublicAvailabilityCalendar = () => {
  const lang = useLang();
  const [unavailable, setUnavailable] = useState<UnavailableRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-availability", {
        body: null,
        method: "GET",
      });

      if (error) {
        const { data: prop } = await supabase.from("properties").select("id").eq("slug", "ai-due-leoni").single();
        if (prop) {
          const { data: dates } = await supabase.rpc("get_unavailable_dates", { _property_id: prop.id });
          if (dates) setUnavailable(dates);
        }
      } else if (data?.unavailable_dates) {
        setUnavailable(data.unavailable_dates);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  const bookedDateSet = useMemo(() => {
    const set = new Set<string>();
    unavailable.forEach((u) => {
      const start = new Date(u.date_start);
      const end = new Date(u.date_end);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        set.add(d.toISOString().split("T")[0]);
      }
    });
    return set;
  }, [unavailable]);

  const disabledDates = useMemo(() => {
    const dates: Date[] = [];
    bookedDateSet.forEach((dateStr) => dates.push(new Date(dateStr + "T00:00:00")));
    return dates;
  }, [bookedDateSet]);

  const nightsCount = useMemo(() => {
    if (!selectedRange?.from || !selectedRange?.to) return 0;
    return differenceInDays(selectedRange.to, selectedRange.from);
  }, [selectedRange]);

  const isRangeAvailable = useMemo(() => {
    if (!selectedRange?.from || !selectedRange?.to) return null;
    const from = selectedRange.from;
    const to = selectedRange.to;
    for (let d = new Date(from); d < to; d.setDate(d.getDate() + 1)) {
      if (bookedDateSet.has(d.toISOString().split("T")[0])) return false;
    }
    return true;
  }, [selectedRange, bookedDateSet]);

  const scrollToContatti = useCallback(() => {
    document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const formatDate = (date: Date) => {
    return format(date, "d MMM yyyy", { locale: localeMap[lang] });
  };

  // Custom day styling via modifiers
  const bookedModifier = useMemo(() => {
    return Array.from(bookedDateSet).map((d) => new Date(d + "T00:00:00"));
  }, [bookedDateSet]);

  return (
    <section id="disponibilita" className="py-16 sm:py-20 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            <CalendarDays className="w-4 h-4" />
            {t(tr.title, lang)}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-display">
            {t(tr.title, lang)}
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {t(tr.subtitle, lang)}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            {/* Calendar card */}
            <div className="bg-background rounded-2xl shadow-sm border p-4 sm:p-6">
              <Calendar
                mode="range"
                selected={selectedRange}
                onSelect={setSelectedRange}
                numberOfMonths={2}
                disabled={[...disabledDates, { before: new Date() }]}
                locale={localeMap[lang]}
                className="rounded-xl pointer-events-auto w-full"
                fromMonth={new Date()}
                modifiers={{ booked: bookedModifier }}
                modifiersClassNames={{ booked: "!bg-destructive/15 !text-destructive line-through" }}
              />

              {/* Legend */}
              <div className="mt-4 pt-4 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-primary bg-primary/20" />
                  {t(tr.today, lang)}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  {t(tr.free, lang)}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive/30 border-2 border-destructive/60" />
                  {t(tr.booked, lang)}
                </span>
              </div>
            </div>

            {/* Selection summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Check-in / Check-out */}
              <div className="bg-background rounded-2xl shadow-sm border p-5 flex items-center gap-4">
                <div className="flex-1 text-center">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {t(tr.checkin, lang)}
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    {selectedRange?.from ? formatDate(selectedRange.from) : "—"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 text-center">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    {t(tr.checkout, lang)}
                  </p>
                  <p className="font-semibold text-foreground text-sm">
                    {selectedRange?.to ? formatDate(selectedRange.to) : "—"}
                  </p>
                </div>
              </div>

              {/* Nights + availability */}
              <div className="bg-background rounded-2xl shadow-sm border p-5 flex items-center justify-center">
                {nightsCount > 0 ? (
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">{nightsCount}</span>
                    <span className="text-muted-foreground ml-1.5 text-sm">
                      {nightsCount === 1 ? t(tr.night, lang) : t(tr.nights, lang)}
                    </span>
                    {isRangeAvailable !== null && (
                      <p className={`text-xs mt-1 font-medium ${isRangeAvailable ? "text-green-600" : "text-destructive"}`}>
                        {isRangeAvailable ? "✓ " + t(tr.available, lang) : "✗ " + t(tr.notAvailable, lang)}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t(tr.selectDate, lang)}</p>
                )}
              </div>

              {/* CTA / Contact */}
              <div className="bg-background rounded-2xl shadow-sm border p-5 flex flex-col items-center justify-center gap-3">
                {isRangeAvailable ? (
                  <button
                    onClick={scrollToContatti}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {t(tr.requestBooking, lang)}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <a href="tel:+393331234567" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>+39 333 123 4567</span>
                    </a>
                    <a href="mailto:info@aidueleoni.com" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>info@aidueleoni.com</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicAvailabilityCalendar;
