
import React from "react";
import { Bed, Bath, ChefHat, Wifi, Car, AirVent, Tv, Coffee } from "lucide-react";

const AppartamentoSection = () => {
  const caratteristiche = [
    { icon: Bed, title: "3 Camere da Letto", desc: "Matrimoniali con possibilità di letti singoli" },
    { icon: Bath, title: "2 Bagni", desc: "Moderni e completamente attrezzati" },
    { icon: ChefHat, title: "Cucina Completa", desc: "Attrezzata con tutti gli elettrodomestici" },
    { icon: Wifi, title: "WiFi Gratuito", desc: "Connessione internet ad alta velocità" },
    { icon: AirVent, title: "Aria Condizionata", desc: "In tutte le stanze" },
    { icon: Tv, title: "TV Smart", desc: "Con canali satellitari" },
    { icon: Coffee, title: "Colazione", desc: "Set per colazione incluso" },
    { icon: Car, title: "Parcheggio", desc: "Posto auto disponibile" }
  ];

  return (
    <section id="appartamento" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Il Nostro Appartamento
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Appartamento completamente ristrutturato con tutti i comfort moderni. 
            Perfetto per famiglie e gruppi fino a 6 persone che desiderano esplorare 
            le bellezze della Sicilia orientale.
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
                Recentemente Ristrutturato
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Cucina moderna</strong> completamente attrezzata con frigorifero, forno, piano cottura e lavastoviglie
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Camere spaziose</strong> con armadi a muro e possibilità di configurare letti matrimoniali o singoli
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Bagni moderni</strong> con doccia, asciugacapelli e set di cortesia
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Soggiorno accogliente</strong> con divano letto e TV smart per il relax serale
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Dettagli Appartamento</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Superficie</span>
                  <span className="font-semibold">85 m²</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Piano</span>
                  <span className="font-semibold">2° Piano</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Balcone</span>
                  <span className="font-semibold">Sì</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-semibold">15:00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-semibold">11:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppartamentoSection;
