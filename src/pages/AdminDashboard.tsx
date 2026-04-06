import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Settings, List, BarChart3 } from "lucide-react";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminFeeds from "@/components/admin/AdminFeeds";
import AdminSyncLogs from "@/components/admin/AdminSyncLogs";
import AdminBookings from "@/components/admin/AdminBookings";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }

      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });

      if (!isAdmin) { navigate("/admin"); return; }
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin");
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Caricamento...</p></div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold">Ai due leoni — Dashboard</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Esci
        </Button>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Prenotazioni
            </TabsTrigger>
            <TabsTrigger value="feeds" className="flex items-center gap-2">
              <Settings className="w-4 h-4" /> Feed iCal
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Log Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar"><AdminCalendar /></TabsContent>
          <TabsContent value="bookings"><AdminBookings /></TabsContent>
          <TabsContent value="feeds"><AdminFeeds /></TabsContent>
          <TabsContent value="logs"><AdminSyncLogs /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
