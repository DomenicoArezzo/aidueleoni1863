import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CasaVacanze from "./pages/CasaVacanze";
import AppartamentoPage from "./pages/AppartamentoPage";
import ChiSiamoPage from "./pages/ChiSiamoPage";
import DoveSiamoPage from "./pages/DoveSiamoPage";
import ContattiPage from "./pages/ContattiPage";
import DisponibilitaPage from "./pages/DisponibilitaPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CasaVacanze lang="it" />} />
          <Route path="/en" element={<CasaVacanze lang="en" />} />
          <Route path="/es" element={<CasaVacanze lang="es" />} />
          <Route path="/de" element={<CasaVacanze lang="de" />} />
          <Route path="/appartamento" element={<AppartamentoPage lang="it" />} />
          <Route path="/en/apartment" element={<AppartamentoPage lang="en" />} />
          <Route path="/es/apartamento" element={<AppartamentoPage lang="es" />} />
          <Route path="/de/wohnung" element={<AppartamentoPage lang="de" />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage lang="it" />} />
          <Route path="/en/about" element={<ChiSiamoPage lang="en" />} />
          <Route path="/es/quienes-somos" element={<ChiSiamoPage lang="es" />} />
          <Route path="/de/ueber-uns" element={<ChiSiamoPage lang="de" />} />
          <Route path="/dove-siamo" element={<DoveSiamoPage lang="it" />} />
          <Route path="/en/location" element={<DoveSiamoPage lang="en" />} />
          <Route path="/es/ubicacion" element={<DoveSiamoPage lang="es" />} />
          <Route path="/de/lage" element={<DoveSiamoPage lang="de" />} />
          <Route path="/contatti" element={<ContattiPage lang="it" />} />
          <Route path="/en/contact" element={<ContattiPage lang="en" />} />
          <Route path="/es/contacto" element={<ContattiPage lang="es" />} />
          <Route path="/de/kontakt" element={<ContattiPage lang="de" />} />
          <Route path="/disponibilita" element={<DisponibilitaPage lang="it" />} />
          <Route path="/en/availability" element={<DisponibilitaPage lang="en" />} />
          <Route path="/es/disponibilidad" element={<DisponibilitaPage lang="es" />} />
          <Route path="/de/verfuegbarkeit" element={<DisponibilitaPage lang="de" />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/pulse-robot" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
