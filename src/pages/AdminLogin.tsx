import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.user) throw new Error("Registrazione fallita");

        toast({ 
          title: "Account creato!", 
          description: "Ora accedi con le tue credenziali. Un amministratore dovrà abilitare il tuo accesso.",
        });
        setIsSignUp(false);
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check if user has admin role
        const { data: roleData } = await supabase.rpc("is_admin");

        if (!roleData) {
          await supabase.auth.signOut();
          toast({ 
            title: "Accesso negato", 
            description: "Non hai i permessi di amministratore. Contatta un admin.",
            variant: "destructive",
          });
          return;
        }

        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      toast({ title: "Errore", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display">Admin — Ai due leoni</CardTitle>
          <CardDescription>
            {isSignUp ? "Crea un nuovo account amministratore" : "Accedi alla dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Caricamento..." : isSignUp ? "Registrati" : "Accedi"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
