import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminFeeds = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [propertyId, setPropertyId] = useState("");
  const [newFeed, setNewFeed] = useState({ name: "", source: "booking_com", ical_url: "", poll_interval_minutes: 15 });
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: prop } = await supabase.from("properties").select("id").eq("slug", "ai-due-leoni").single();
    if (prop) {
      setPropertyId(prop.id);
      const { data } = await supabase.from("ical_feeds").select("*").eq("property_id", prop.id).order("created_at");
      if (data) setFeeds(data);
    }
  };

  const addFeed = async () => {
    if (!newFeed.name || !newFeed.ical_url || !propertyId) return;
    const { error } = await supabase.from("ical_feeds").insert({
      property_id: propertyId,
      name: newFeed.name,
      source: newFeed.source as any,
      ical_url: newFeed.ical_url,
      poll_interval_minutes: newFeed.poll_interval_minutes,
    });

    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Feed aggiunto" });
      setNewFeed({ name: "", source: "booking_com", ical_url: "", poll_interval_minutes: 15 });
      loadData();
    }
  };

  const deleteFeed = async (id: string) => {
    await supabase.from("ical_feeds").delete().eq("id", id);
    toast({ title: "Feed rimosso" });
    loadData();
  };

  const triggerSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-ical");
      if (error) throw error;
      toast({ title: "Sincronizzazione completata", description: JSON.stringify(data?.results?.length || 0) + " feed sincronizzati" });
      loadData();
    } catch (err: any) {
      toast({ title: "Errore sync", description: err.message, variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  const exportUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/export-ical?property=ai-due-leoni`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Feed iCal</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(exportUrl); toast({ title: "URL copiato!" }); }}>
            <ExternalLink className="w-4 h-4 mr-2" /> Copia URL Export
          </Button>
          <Button size="sm" onClick={triggerSync} disabled={syncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} /> Sincronizza ora
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Aggiungi Feed</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={newFeed.name} onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })} placeholder="es. Booking.com" />
            </div>
            <div>
              <Label>Piattaforma</Label>
              <Select value={newFeed.source} onValueChange={(v) => setNewFeed({ ...newFeed, source: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking_com">Booking.com</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>URL Feed iCal</Label>
              <Input value={newFeed.ical_url} onChange={(e) => setNewFeed({ ...newFeed, ical_url: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <Label>Intervallo polling (minuti)</Label>
              <Input type="number" value={newFeed.poll_interval_minutes} onChange={(e) => setNewFeed({ ...newFeed, poll_interval_minutes: parseInt(e.target.value) || 15 })} />
            </div>
          </div>
          <Button onClick={addFeed}><Plus className="w-4 h-4 mr-2" /> Aggiungi Feed</Button>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
            <p className="font-medium">Come ottenere i feed iCal:</p>
            <p><strong>Booking.com:</strong> Vai su Extranet → Tariffe e disponibilità → Sincronizzazione calendario → Esporta calendario → Copia il link iCal</p>
            <p><strong>Airbnb:</strong> Vai sul tuo Annuncio → Disponibilità → Sincronizzazione dei calendari → Esporta calendario → Copia il link</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Feed Configurati</CardTitle></CardHeader>
        <CardContent>
          {feeds.length === 0 && <p className="text-sm text-muted-foreground">Nessun feed configurato</p>}
          <div className="space-y-3">
            {feeds.map((f) => (
              <div key={f.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{f.name}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${f.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {f.is_active ? "Attivo" : "Disattivato"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate max-w-md">{f.ical_url}</p>
                  <p className="text-xs text-muted-foreground">
                    Polling: ogni {f.poll_interval_minutes} min
                    {f.last_synced_at && ` • Ultimo sync: ${new Date(f.last_synced_at).toLocaleString("it")}`}
                  </p>
                  {f.last_error && <p className="text-xs text-destructive">Errore: {f.last_error}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteFeed(f.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">URL Export (per Booking/Airbnb)</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Usa questo URL per importare il tuo calendario nelle piattaforme esterne:
          </p>
          <code className="block p-3 bg-muted rounded text-xs break-all">{exportUrl}</code>
          <div className="mt-3 p-4 bg-muted/50 rounded-lg text-sm space-y-2">
            <p><strong>Booking.com:</strong> Extranet → Tariffe e disponibilità → Sincronizzazione calendario → Importa calendario → Incolla l'URL</p>
            <p><strong>Airbnb:</strong> Annuncio → Disponibilità → Sincronizzazione dei calendari → Importa calendario → Incolla l'URL</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFeeds;
