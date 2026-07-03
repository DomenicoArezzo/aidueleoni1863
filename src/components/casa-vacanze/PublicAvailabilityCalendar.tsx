import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/translations";
import { CalendarDays, ChevronRight, Users } from "lucide-react";
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
  checkin: { it: "Seleziona check-in", en: "Select check-in", es: "Selecciona check-in", de: "Check-in wählen" },
  checkout: { it: "Seleziona check-out", en: "Select check-out", es: "Selecciona check-out", de: "Check-out wählen" },
  nights: { it: "notti selezionate", en: "nights selected", es: "noches seleccionadas", de: "Nächte ausgewählt" },
  night: { it: "notte selezionata", en: "night selected", es: "noche seleccionada", de: "Nacht ausgewählt" },
  available: { it: "Disponibile", en: "Available", es: "Disponible", de: "Verfügbar" },
  notAvailable: { it: "Non disponibile", en: "Not available", es: "No disponible", de: "Nicht verfügbar" },
  checkAvailability: { it: "Verifica Disponibilità", en: "Check Availability", es: "Comprobar Disponibilidad", de: "Verfügbarkeit prüfen" },
  legend: { it: "Legenda", en: "Legend", es: "Leyenda", de: "Legende" },
  booked: { it: "Non disponibile", en: "Unavailable", es: "No disponible", de: "Nicht verfügbar" },
  free: { it: "Disponibile", en: "Available", es: "Disponible", de: "Verfügbar" },
  today: { it: "Oggi", en: "Today", es: "Hoy", de: "Heute" },
  guests: { it: "ospiti", en: "guests", es: "huéspedes", de: "Gäste" },
};

const PublicAvailabilityCalendar = () => {
  const lang = useLang();
  const [unavailable, setUnavailable] = useState<UnavailableRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(2);

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

  const formatDate = (date: Date) => format(date, "d MMM yyyy", { locale: localeMap[lang] });

  const bookedModifier = useMemo(() => {
    return Array.from(bookedDateSet).map((d) => new Date(d + "T00:00:00"));
  }, [bookedDateSet]);

  return (
    <section id="disponibilita" className="py-10 sm:py-16 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-3">
            <CalendarDays className="w-4 h-4" />
            {t(tr.title, lang)}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-display">
            {t(tr.title, lang)}
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {t(tr.subtitle, lang)}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-background rounded-2xl shadow-lg border p-5 sm:p-8">
            {/* Check-in / Check-out bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-muted/30">
                <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className={`flex-1 text-sm ${selectedRange?.from ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {selectedRange?.from ? formatDate(selectedRange.from) : t(tr.checkin, lang)}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-muted/30">
                <CalendarDays className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className={`flex-1 text-sm ${selectedRange?.to ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {selectedRange?.to ? formatDate(selectedRange.to) : t(tr.checkout, lang)}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Calendar */}
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              numberOfMonths={2}
              disabled={[...disabledDates, { before: new Date() }]}
              locale={localeMap[lang]}
              className="rounded-xl w-full !p-0"
              fromMonth={new Date()}
              modifiers={{ booked: bookedModifier }}
              modifiersClassNames={{ booked: "!bg-muted !text-muted-foreground/50 line-through" }}
            />

            {/* Bottom bar */}
            <div className="mt-6 pt-5 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Left: legend + status */}
              <div className="space-y-3">
                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-primary" />
                    {t(tr.today, lang)}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/20" />
                    {t(tr.free, lang)}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/40 bg-muted" />
                    {t(tr.booked, lang)}
                  </span>
                </div>
                {/* Status text */}
                {nightsCount > 0 && (
                  <p className={`text-sm font-semibold ${isRangeAvailable ? "text-primary" : "text-destructive"}`}>
                    {nightsCount} {nightsCount === 1 ? t(tr.night, lang) : t(tr.nights, lang)}
                    {isRangeAvailable !== null && (
                      <> - {isRangeAvailable ? t(tr.available, lang) : t(tr.notAvailable, lang)}</>
                    )}
                  </p>
                )}
              </div>

              {/* Right: CTA + guests */}
              <div className="flex flex-col items-stretch sm:items-end gap-3 sm:min-w-[260px]">
                <button
                  onClick={scrollToContatti}
                  disabled={!isRangeAvailable}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-semibold py-3 px-8 rounded-full transition-all duration-200 text-sm whitespace-nowrap"
                >
                  {t(tr.checkAvailability, lang)}
                </button>
                <div className="flex items-center gap-3 border rounded-xl px-4 py-2.5 bg-muted/30">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 text-sm text-foreground">{guestCount} {t(tr.guests, lang)}</span>
                  <button
                    onClick={() => setGuestCount((c) => Math.min(c + 1, 10))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicAvailabilityCalendar;
