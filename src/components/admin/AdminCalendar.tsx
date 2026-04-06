import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import type { DateRange } from "react-day-picker";

interface UnavailableDate {
  date_start: string;
  date_end: string;
  block_type: string;
  source: string;
}

const AdminCalendar = () => {
  const [propertyId, setPropertyId] = useState<string>("");
  const [unavailable, setUnavailable] = useState<UnavailableDate[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [blockReason, setBlockReason] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    const { data } = await supabase.from("properties").select("id").eq("slug", "ai-due-leoni").single();
    if (data) {
      setPropertyId(data.id);
      loadData(data.id);
    }
  };

  const loadData = async (pid: string) => {
    const { data: dates } = await supabase.rpc("get_unavailable_dates", { _property_id: pid });
    if (dates) setUnavailable(dates);

    const { data: blockData } = await supabase
      .from("availability_blocks")
      .select("*")
      .eq("property_id", pid)
      .gte("end_date", new Date().toISOString().split("T")[0])
      .order("start_date");
    if (blockData) setBlocks(blockData);
  };

  const addBlock = async () => {
    if (!selectedRange?.from || !propertyId) return;
    const from = selectedRange.from.toISOString().split("T")[0];
    const to = (selectedRange.to || selectedRange.from).toISOString().split("T")[0];

    const { error } = await supabase.from("availability_blocks").insert({
      property_id: propertyId,
      start_date: from,
      end_date: to,
      reason: blockReason || "Blocco manuale",
    });

    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Blocco aggiunto" });
      setSelectedRange(undefined);
      setBlockReason("");
      loadData(propertyId);
    }
  };

  const removeBlock = async (id: string) => {
    await supabase.from("availability_blocks").delete().eq("id", id);
    toast({ title: "Blocco rimosso" });
    loadData(propertyId);
  };

  // Build disabled dates for calendar display
  const disabledDates: Date[] = [];
  unavailable.forEach((u) => {
    const start = new Date(u.date_start);
    const end = new Date(u.date_end);
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      disabledDates.push(new Date(d));
    }
  });

  const getSourceColor = (source: string) => {
    switch (source) {
      case "booking_com": return "bg-blue-100 text-blue-800";
      case "airbnb": return "bg-red-100 text-red-800";
      case "manual": return "bg-yellow-100 text-yellow-800";
      case "website": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Calendario Disponibilità</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={2}
            disabled={disabledDates}
            className="rounded-md border p-4"
          />
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400" /> Booking.com</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400" /> Airbnb</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400" /> Blocco manuale</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400" /> Sito web</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aggiungi Blocco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedRange?.from && (
              <p className="text-sm text-muted-foreground">
                {selectedRange.from.toLocaleDateString("it")}
                {selectedRange.to && ` — ${selectedRange.to.toLocaleDateString("it")}`}
              </p>
            )}
            <div>
              <Label>Motivo</Label>
              <Input value={blockReason} onChange={(e) => setBlockReason(e.target.value)} placeholder="es. Manutenzione" />
            </div>
            <Button onClick={addBlock} disabled={!selectedRange?.from} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Blocca date
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Blocchi Attivi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {blocks.length === 0 && <p className="text-sm text-muted-foreground">Nessun blocco attivo</p>}
            {blocks.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{b.reason || "Blocco manuale"}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(b.start_date).toLocaleDateString("it")} — {new Date(b.end_date).toLocaleDateString("it")}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeBlock(b.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Occupazione</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unavailable.map((u, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSourceColor(u.source)}`}>
                    {u.source === "booking_com" ? "Booking" : u.source === "airbnb" ? "Airbnb" : u.block_type === "block" ? "Manuale" : u.source}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(u.date_start).toLocaleDateString("it")} → {new Date(u.date_end).toLocaleDateString("it")}
                  </span>
                </div>
              ))}
              {unavailable.length === 0 && <p className="text-sm text-muted-foreground">Nessuna occupazione registrata</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCalendar;
