import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const CasaVacanze = lazy(() => import("./pages/CasaVacanze"));
const AppartamentoPage = lazy(() => import("./pages/AppartamentoPage"));
const ChiSiamoPage = lazy(() => import("./pages/ChiSiamoPage"));
const DoveSiamoPage = lazy(() => import("./pages/DoveSiamoPage"));
const ContattiPage = lazy(() => import("./pages/ContattiPage"));
const DisponibilitaPage = lazy(() => import("./pages/DisponibilitaPage"));
const DintorniPage = lazy(() => import("./pages/DintorniPage"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-700">
              Caricamento...
            </div>
          }
        >
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
            <Route path="/dintorni" element={<DintorniPage lang="it" />} />
            <Route path="/en/surroundings" element={<DintorniPage lang="en" />} />
            <Route path="/es/alrededores" element={<DintorniPage lang="es" />} />
            <Route path="/de/umgebung" element={<DintorniPage lang="de" />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/pulse-robot" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
