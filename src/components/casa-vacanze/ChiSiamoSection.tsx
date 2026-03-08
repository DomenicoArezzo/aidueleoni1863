
import React from "react";
import { Heart, Award, Users, Clock } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const ChiSiamoSection = () => {
  const lang = useLang();
  const c = translations.chiSiamo;

  const values = [
    { icon: Heart, title: t(c.passione, lang), desc: t(c.passioneDesc, lang) },
    { icon: Award, title: t(c.qualita, lang), desc: t(c.qualitaDesc, lang) },
    { icon: Users, title: t(c.famiglia, lang), desc: t(c.famigliaDesc, lang) },
    { icon: Clock, title: t(c.disponibilita, lang), desc: t(c.disponibilitaDesc, lang) },
  ];

  return (
    <section id="chi-siamo" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t(c.title, lang)}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t(c.subtitle, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              {t(c.storiaTitle, lang)}
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t(c.storia1, lang) }} />
              <p>{t(c.storia2, lang)}</p>
              <p>{t(c.storia3, lang)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <v.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t(c.missione, lang)}</h3>
          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">
            {t(c.missioneDesc, lang)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
