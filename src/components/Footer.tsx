
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white text-lg font-light mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              Ai due leoni
            </h4>
            <p className="text-sm leading-relaxed">
              Casa vacanze di lusso nel cuore di Ragusa, Sicilia.
              Eleganza, comfort e autenticità siciliana.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Navigazione</h4>
            <nav className="space-y-2 text-sm">
              <a href="#appartamento" className="block hover:text-white transition-colors">L'Appartamento</a>
              <a href="#chi-siamo" className="block hover:text-white transition-colors">Chi Siamo</a>
              <a href="#dove-ci-troviamo" className="block hover:text-white transition-colors">Dove Siamo</a>
              <a href="#contatti" className="block hover:text-white transition-colors">Contatti</a>
            </nav>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contatti</h4>
            <div className="space-y-2 text-sm">
              <p>Via delle Medaglie d'Oro, Ragusa (RG)</p>
              <p>info@aidueleonisicilia.com</p>
              <p>+39 XXX XXX XXXX</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Ai due leoni — Casa Vacanze a Ragusa, Sicilia. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
