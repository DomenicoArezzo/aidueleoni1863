
import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Euro, MapPin, Navigation, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.5!2d14.7351!3d36.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU1JzQxLjIiTiAxNMKwNDQnMDYuNCJF!5e0!3m2!1sit!2sit!4v1700000000000";
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=36.9281,14.7351&travelmode=driving";

const ContattiSection = () => {
  const lang = useLang();
  const c = translations.contatti;

  const [formData, setFormData] = useState({
    nome: "", email: "", telefono: "", checkin: "", checkout: "", ospiti: "2", messaggio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.checkin || !formData.checkout) {
      toast.error(t(c.errore, lang));
      return;
    }
    toast.success(t(c.successo, lang));
    setFormData({ nome: "", email: "", telefono: "", checkin: "", checkout: "", ospiti: "2", messaggio: "" });
  };

  return (
    <section id="contatti" className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t(c.title, lang)}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t(c.subtitle, lang)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t(c.richiedi, lang)}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.nome, lang)} *</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.email, lang)} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.telefono, lang)}</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.checkin, lang)} *</label>
                  <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.checkout, lang)} *</label>
                  <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.numOspiti, lang)}</label>
                <select name="ospiti" value={formData.ospiti} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={String(n)}>{n} {n === 1 ? t(c.ospite, lang) : t(c.ospiti, lang)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t(c.messaggio, lang)}</label>
                <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder={t(c.messaggioPlaceholder, lang)} />
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300">
                {t(c.invia, lang)}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t(c.contattiDiretti, lang)}</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: t(c.telefono, lang), value: "+39 XXX XXX XXXX" },
                  { icon: Mail, label: t(c.email, lang), value: "info@aidueleonisicilia.com" },
                  { icon: MessageCircle, label: "WhatsApp", value: "24/7" },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-gray-600">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  {t(c.comeRaggiungerci, lang)}
                </h3>
                <p className="text-sm text-gray-500">Via delle Medaglie d'Oro, Ragusa (RG)</p>
              </div>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe src={GOOGLE_MAPS_EMBED_URL} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t(c.mapTitle, lang)} />
              </div>
              <div className="p-5 flex flex-col sm:flex-row gap-3">
                <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300">
                  <Navigation className="w-4 h-4" />
                  {t(c.ottieniIndicazioni, lang)}
                </a>
                <a href="https://www.google.com/maps/place/36.9281,14.7351" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 hover:border-amber-600 hover:text-amber-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-300">
                  <ExternalLink className="w-4 h-4" />
                  {t(c.apriMaps, lang)}
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Euro className="w-6 h-6" />
                {t(c.tariffe, lang)}
              </h3>
              <div className="space-y-4">
                {[[t(c.bassa, lang), "€80"], [t(c.media, lang), "€100"], [t(c.alta, lang), "€120"]].map(([label, price], i) => (
                  <div key={i} className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span>{label}</span>
                    <span className="font-bold">{price}/{lang === "en" ? "night" : lang === "es" ? "noche" : lang === "de" ? "Nacht" : "notte"}</span>
                  </div>
                ))}
                <p className="text-sm opacity-90 mt-4">{t(c.tariffeNote, lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContattiSection;
