
import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Euro, MapPin, Navigation, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.5!2d14.7351!3d36.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU1JzQxLjIiTiAxNMKwNDQnMDYuNCJF!5e0!3m2!1sit!2sit!4v1700000000000";

const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=36.9281,14.7351&travelmode=driving";

const ContattiSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    checkin: "",
    checkout: "",
    ospiti: "2",
    messaggio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.checkin || !formData.checkout) {
      toast.error("Compila tutti i campi obbligatori");
      return;
    }
    toast.success("Richiesta inviata con successo! Ti contatteremo presto.");
    setFormData({ nome: "", email: "", telefono: "", checkin: "", checkout: "", ospiti: "2", messaggio: "" });
  };

  return (
    <section id="contatti" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Prenota il Tuo Soggiorno
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Contattaci per prenotare o per qualsiasi informazione.
            Saremo felici di aiutarti a pianificare la tua vacanza in Sicilia!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form di Prenotazione */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Richiedi Disponibilità</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome e Cognome *</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in *</label>
                  <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out *</label>
                  <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Numero di Ospiti</label>
                <select name="ospiti" value={formData.ospiti} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>{n} {n === 1 ? "Ospite" : "Ospiti"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Messaggio</label>
                <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Raccontaci qualcosa di più sul tuo soggiorno..." />
              </div>

              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300">
                Invia Richiesta di Prenotazione
              </button>
            </form>
          </div>

          {/* Info + Mappa */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contatti Diretti</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Telefono</p>
                    <p className="text-gray-600">+39 XXX XXX XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@aidueleonisicilia.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">Disponibile 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Come Raggiungerci
                </h3>
                <p className="text-sm text-gray-500">Via delle Medaglie d'Oro, Ragusa (RG)</p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={GOOGLE_MAPS_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Posizione Casa Vacanze Ai due leoni - Ragusa, Sicilia"
                />
              </div>
              <div className="p-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
                >
                  <Navigation className="w-4 h-4" />
                  Ottieni Indicazioni
                </a>
                <a
                  href="https://www.google.com/maps/place/36.9281,14.7351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 hover:border-amber-600 hover:text-amber-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apri in Google Maps
                </a>
              </div>
            </div>

            {/* Tariffe */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Euro className="w-6 h-6" />
                Tariffe
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Bassa stagione</span>
                  <span className="font-bold">€80/notte</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Media stagione</span>
                  <span className="font-bold">€100/notte</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Alta stagione</span>
                  <span className="font-bold">€120/notte</span>
                </div>
                <p className="text-sm opacity-90 mt-4">
                  * Le tariffe possono variare in base al periodo e alla durata del soggiorno.
                  Contattaci per un preventivo personalizzato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContattiSection;
