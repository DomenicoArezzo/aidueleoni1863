
import React from "react";
import { MapPin, Star, Users, Bed } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/castiglione.mp4"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Ai due leoni
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md">
            Casa Vacanze in Sicilia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <Bed className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">3 Camere da Letto</h3>
            <p className="text-sm text-gray-600">Matrimoniali con opzione letti singoli</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <Users className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Fino a 6 Ospiti</h3>
            <p className="text-sm text-gray-600">Appartamento completo</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Ragusa Centro</h3>
            <p className="text-sm text-gray-600">Vicino Ipercoop</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#appartamento" 
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-lg"
          >
            Scopri l'Appartamento
          </a>
          <a 
            href="#contatti" 
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 text-lg"
          >
            Prenota Ora
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
