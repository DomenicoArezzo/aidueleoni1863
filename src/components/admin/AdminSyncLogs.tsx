import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminSyncLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const { data } = await supabase
      .from("sync_logs")
      .select("*, ical_feeds(name)")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setLogs(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Sincronizzazioni</CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nessun log disponibile. Esegui la prima sincronizzazione dalla sezione Feed iCal.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Feed</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Trovati</TableHead>
                <TableHead>Creati</TableHead>
                <TableHead>Aggiornati</TableHead>
                <TableHead>Rimossi</TableHead>
                <TableHead>Durata</TableHead>
                <TableHead>Errore</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs">{new Date(log.created_at).toLocaleString("it")}</TableCell>
                  <TableCell className="text-sm">{(log.ical_feeds as any)?.name || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === "success" ? "default" : "destructive"}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.events_found}</TableCell>
                  <TableCell>{log.events_created}</TableCell>
                  <TableCell>{log.events_updated}</TableCell>
                  <TableCell>{log.events_removed}</TableCell>
                  <TableCell className="text-xs">{log.duration_ms ? `${log.duration_ms}ms` : "—"}</TableCell>
                  <TableCell className="text-xs text-destructive max-w-xs truncate">{log.error_message || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSyncLogs;
