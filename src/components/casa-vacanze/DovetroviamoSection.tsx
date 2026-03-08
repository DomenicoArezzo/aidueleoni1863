
import React from "react";
import { MapPin, Car, Plane, Clock, Coffee, ShoppingBag } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const DovetroviamoSection = () => {
  const lang = useLang();
  const d = translations.dove;

  const attrazioni = [
    { nome: "Centro Storico di Ragusa Ibla", distanza: "8 km", tempo: "15 min" },
    { nome: "Duomo di San Giorgio", distanza: "8 km", tempo: "15 min" },
    { nome: "Castello di Donnafugata", distanza: "15 km", tempo: "20 min" },
    { nome: "Marina di Ragusa", distanza: "25 km", tempo: "30 min" },
    { nome: "Modica", distanza: "20 km", tempo: "25 min" },
    { nome: "Scicli", distanza: "30 km", tempo: "35 min" },
  ];

  return (
    <section id="dove-ci-troviamo" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{t(d.title, lang)}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t(d.subtitle, lang)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-amber-600" />
                <h3 className="text-2xl font-bold text-gray-900">{t(d.posizione, lang)}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{t(d.indirizzo, lang)}</p>
                    <p className="text-gray-600">Via delle Medaglie d'Oro, Ragusa (RG)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{t(d.vicinoA, lang)}</p>
                    <p className="text-gray-600">{t(d.vicinoAVal, lang)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{t(d.zona, lang)}</p>
                    <p className="text-gray-600">{t(d.zonaVal, lang)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <Car className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{t(d.parcheggio, lang)}</p>
                <p className="text-xs text-gray-600">{t(d.gratuito, lang)}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <ShoppingBag className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{t(d.shopping, lang)}</p>
                <p className="text-xs text-gray-600">Ipercoop 2 min</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{t(d.ristoranti, lang)}</p>
                <p className="text-xs text-gray-600">{t(d.nelleVicinanze, lang)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-600" />
              {t(d.attrazioni, lang)}
            </h3>
            <div className="space-y-4">
              {attrazioni.map((att, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">{att.nome}</h4>
                      <p className="text-sm text-gray-600">{t(d.distanza, lang)}: {att.distanza}</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">{att.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plane className="w-8 h-8 text-blue-600" />
                {t(d.comeRaggiungerci, lang)}
              </h3>
              <div className="space-y-4">
                {[
                  [t(d.aeroporto, lang), t(d.aeroportoVal, lang)],
                  [t(d.stazione, lang), t(d.stazioneVal, lang)],
                  [t(d.autostrada, lang), t(d.autostradaVal, lang)],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{title}</p>
                      <p className="text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{t(d.coordinate, lang)}</h4>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-center">
                <p className="text-gray-900 font-semibold">36.9281° N, 14.7351° E</p>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">{t(d.coordinateHint, lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DovetroviamoSection;
