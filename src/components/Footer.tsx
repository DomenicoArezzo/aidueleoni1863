
import React from "react";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

const Footer = () => {
  const lang = useLang();
  const f = translations.footer;
  const n = translations.nav;

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white text-lg font-light mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Ai due leoni
            </h4>
            <p className="text-sm leading-relaxed">{t(f.description, lang)}</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{t(f.navigazione, lang)}</h4>
            <nav className="space-y-2 text-sm">
              <a href="#appartamento" className="block hover:text-white transition-colors">{t(n.appartamento, lang)}</a>
              <a href="#chi-siamo" className="block hover:text-white transition-colors">{t(n.chiSiamo, lang)}</a>
              <a href="#dove-ci-troviamo" className="block hover:text-white transition-colors">{t(n.doveSiamo, lang)}</a>
              <a href="#contatti" className="block hover:text-white transition-colors">{t(n.contatti, lang)}</a>
            </nav>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{t(n.contatti, lang)}</h4>
            <div className="space-y-2 text-sm">
              <p>Contrada Castiglione snc, 97013 Comiso (RG)</p>
              <p>info@aidueleonisicilia.com</p>
              <a href="tel:+393280534920" className="block hover:text-white transition-colors">+39 328 053 4920</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {t(f.copyright, lang)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
