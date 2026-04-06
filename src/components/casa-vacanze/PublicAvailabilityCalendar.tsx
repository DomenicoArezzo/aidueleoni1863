import React, { useEffect, useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/translations";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { it, enUS, es, de } from "date-fns/locale";

interface UnavailableRange {
  date_start: string;
  date_end: string;
  block_type: string;
  source: string;
}

const localeMap = { it, en: enUS, es, de };

const translations = {
  title: { it: "Disponibilità", en: "Availability", es: "Disponibilidad", de: "Verfügbarkeit" },
  available: { it: "Disponibile", en: "Available", es: "Disponible", de: "Verfügbar" },
  notAvailable: { it: "Non disponibile", en: "Not available", es: "No disponible", de: "Nicht verfügbar" },
  selectDates: { it: "Seleziona le date per verificare la disponibilità", en: "Select dates to check availability", es: "Selecciona fechas para comprobar disponibilidad", de: "Wählen Sie Daten zur Verfügbarkeitsprüfung" },
  legend: { it: "Legenda", en: "Legend", es: "Leyenda", de: "Legende" },
  booked: { it: "Prenotato", en: "Booked", es: "Reservado", de: "Gebucht" },
  free: { it: "Libero", en: "Free", es: "Libre", de: "Frei" },
};

const PublicAvailabilityCalendar = () => {
  const { lang } = useLang();
  const [unavailable, setUnavailable] = useState<UnavailableRange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-availability", {
        body: null,
        method: "GET",
      });

      // Fallback: try direct RPC if edge function not deployed yet
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
      // Silent fail - calendar shows all available
    } finally {
      setLoading(false);
    }
  };

  const disabledDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    for (let d = new Date(today); d > new Date(today.getFullYear(), today.getMonth() - 1, 1); d.setDate(d.getDate() - 1)) {
      if (d < today) dates.push(new Date(d));
    }

    // Disable booked/blocked dates
    unavailable.forEach((u) => {
      const start = new Date(u.date_start);
      const end = new Date(u.date_end);
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
    });

    return dates;
  }, [unavailable]);

  return (
    <div className="bg-background rounded-2xl border shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-display font-semibold">{t(translations.title, lang)}</h3>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <Calendar
            mode="range"
            numberOfMonths={1}
            disabled={[...disabledDates, { before: new Date() }]}
            locale={localeMap[lang]}
            className="rounded-md"
            fromMonth={new Date()}
          />

          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {t(translations.free, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-destructive" />
              {t(translations.booked, lang)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{t(translations.selectDates, lang)}</p>
        </>
      )}
    </div>
  );
};

export default PublicAvailabilityCalendar;
