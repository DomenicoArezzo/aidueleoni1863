
import React from "react";
import { Heart, Award, Users, Clock } from "lucide-react";

const ChiSiamoSection = () => {
  return (
    <section id="chi-siamo" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Chi Siamo
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            La nostra passione per l'ospitalità siciliana ci guida nel creare 
            esperienze indimenticabili per i nostri ospiti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              La Nostra Storia
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>"Ai due leoni"</strong> nasce dalla nostra passione per la Sicilia e il desiderio 
                di condividere la bellezza di questa terra meravigliosa con viaggiatori da tutto il mondo.
              </p>
              <p>
                Siamo una famiglia siciliana che da generazioni vive a Ragusa e conosce ogni angolo 
                di questa splendida provincia. Abbiamo deciso di aprire la nostra casa vacanze per 
                offrire un'esperienza autentica e confortevole.
              </p>
              <p>
                Il nome "Ai due leoni" deriva da un antico simbolo della nostra famiglia, che rappresenta 
                forza, orgoglio e accoglienza - valori che cerchiamo di trasmettere a ogni ospite.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Passione</h4>
              <p className="text-sm text-gray-600">Per l'ospitalità e la Sicilia</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Qualità</h4>
              <p className="text-sm text-gray-600">Standard elevati di comfort</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Famiglia</h4>
              <p className="text-sm text-gray-600">Gestione familiare attenta</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Disponibilità</h4>
              <p className="text-sm text-gray-600">Assistenza 24/7</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            La Nostra Missione
          </h3>
          <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">
            Vogliamo che ogni ospite si senta come a casa propria, scoprendo non solo 
            un appartamento confortevole, ma anche l'autenticità, il calore e la bellezza 
            della Sicilia attraverso i nostri consigli e la nostra accoglienza.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
