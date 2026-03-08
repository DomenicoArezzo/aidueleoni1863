
import React from "react";
import { Bed, Bath, ChefHat, Wifi, Car, AirVent, Tv, Coffee } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const AppartamentoSection = () => {
  const lang = useLang();
  const a = translations.appartamento;
  const f = a.features;

  const caratteristiche = [
    { icon: Bed, title: t(f.camere, lang), desc: t(f.camereDesc, lang) },
    { icon: Bath, title: t(f.bagni, lang), desc: t(f.bagniDesc, lang) },
    { icon: ChefHat, title: t(f.cucina, lang), desc: t(f.cucinaDesc, lang) },
    { icon: Wifi, title: t(f.wifi, lang), desc: t(f.wifiDesc, lang) },
    { icon: AirVent, title: t(f.aria, lang), desc: t(f.ariaDesc, lang) },
    { icon: Tv, title: t(f.tv, lang), desc: t(f.tvDesc, lang) },
    { icon: Coffee, title: t(f.colazione, lang), desc: t(f.colazioneDesc, lang) },
    { icon: Car, title: t(f.parcheggio, lang), desc: t(f.parcheggioDesc, lang) },
  ];

  const bullets = [a.bullets.cucina, a.bullets.camere, a.bullets.bagni, a.bullets.soggiorno];

  return (
    <section id="appartamento" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t(a.title, lang)}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t(a.description, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {caratteristiche.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {t(a.ristrutturato, lang)}
              </h3>
              <div className="space-y-4">
                {bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(bullet, lang) }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{t(a.dettagli, lang)}</h4>
              <div className="space-y-3">
                {[
                  [t(a.superficie, lang), "85 m²"],
                  [t(a.piano, lang), t(a.pianoVal, lang)],
                  [t(a.balcone, lang), t(a.si, lang)],
                  ["Check-in", "15:00"],
                  ["Check-out", "11:00"],
                ].map(([label, value], i) => (
                  <div key={i} className={`flex justify-between py-2 ${i < 3 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppartamentoSection;
