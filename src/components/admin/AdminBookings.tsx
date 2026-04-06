import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [propertyId, setPropertyId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    guest_name: "", guest_email: "", guest_phone: "",
    check_in: "", check_out: "", num_guests: 1, notes: "", status: "confirmed",
  });
  const { toast } = useToast();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: prop } = await supabase.from("properties").select("id").eq("slug", "ai-due-leoni").single();
    if (prop) {
      setPropertyId(prop.id);
      const { data } = await supabase.from("bookings").select("*").eq("property_id", prop.id).order("check_in", { ascending: false });
      if (data) setBookings(data);
    }
  };

  const addBooking = async () => {
    if (!form.check_in || !form.check_out || !propertyId) return;
    const { error } = await supabase.from("bookings").insert({
      property_id: propertyId,
      source: "manual" as const,
      status: form.status as any,
      guest_name: form.guest_name || null,
      guest_email: form.guest_email || null,
      guest_phone: form.guest_phone || null,
      check_in: form.check_in,
      check_out: form.check_out,
      num_guests: form.num_guests,
      notes: form.notes || null,
    });
    if (error) {
      toast({ title: "Errore", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Prenotazione aggiunta" });
      setDialogOpen(false);
      setForm({ guest_name: "", guest_email: "", guest_phone: "", check_in: "", check_out: "", num_guests: 1, notes: "", status: "confirmed" });
      loadData();
    }
  };

  const deleteBooking = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    toast({ title: "Prenotazione rimossa" });
    loadData();
  };

  const cancelBooking = async (id: string) => {
    await supabase.from("bookings").update({ status: "cancelled" as any }).eq("id", id);
    toast({ title: "Prenotazione annullata" });
    loadData();
  };

  const getSourceLabel = (s: string) => {
    switch (s) {
      case "booking_com": return "Booking";
      case "airbnb": return "Airbnb";
      case "manual": return "Manuale";
      case "website": return "Sito web";
      default: return s;
    }
  };

  const getStatusVariant = (s: string) => {
    switch (s) {
      case "confirmed": return "default" as const;
      case "pending": return "secondary" as const;
      case "cancelled": return "destructive" as const;
      default: return "outline" as const;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Prenotazioni</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-2" /> Nuova Prenotazione</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Aggiungi Prenotazione Manuale</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome Ospite</Label>
                <Input value={form.guest_name} onChange={(e) => setForm({ ...form, guest_name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email</Label><Input type="email" value={form.guest_email} onChange={(e) => setForm({ ...form, guest_email: e.target.value })} /></div>
                <div><Label>Telefono</Label><Input value={form.guest_phone} onChange={(e) => setForm({ ...form, guest_phone: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Check-in</Label><Input type="date" value={form.check_in} onChange={(e) => setForm({ ...form, check_in: e.target.value })} /></div>
                <div><Label>Check-out</Label><Input type="date" value={form.check_out} onChange={(e) => setForm({ ...form, check_out: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Ospiti</Label><Input type="number" min={1} max={6} value={form.num_guests} onChange={(e) => setForm({ ...form, num_guests: parseInt(e.target.value) || 1 })} /></div>
                <div>
                  <Label>Stato</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confermata</SelectItem>
                      <SelectItem value="pending">In attesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Note</Label><Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
              <Button onClick={addBooking} className="w-full">Aggiungi</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessuna prenotazione</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ospite</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Ospiti</TableHead>
                  <TableHead>Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{b.guest_name || "—"}</p>
                        {b.guest_email && <p className="text-xs text-muted-foreground">{b.guest_email}</p>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{new Date(b.check_in).toLocaleDateString("it")}</TableCell>
                    <TableCell className="text-sm">{new Date(b.check_out).toLocaleDateString("it")}</TableCell>
                    <TableCell><Badge variant="outline">{getSourceLabel(b.source)}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusVariant(b.status)}>{b.status}</Badge></TableCell>
                    <TableCell>{b.num_guests}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {b.status !== "cancelled" && (
                          <Button variant="ghost" size="sm" onClick={() => cancelBooking(b.id)}>Annulla</Button>
                        )}
                        {b.source === "manual" && (
                          <Button variant="ghost" size="icon" onClick={() => deleteBooking(b.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookings;
