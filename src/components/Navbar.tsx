
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button 
          onClick={scrollToTop}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          aria-label="Ai due leoni"
        >
          <span className="text-xl sm:text-2xl font-bold text-amber-600">
            🦁 Ai due leoni
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={scrollToTop}
            className="nav-link text-gray-800 hover:text-amber-600 py-2 transition-colors duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('appartamento')}
            className="nav-link text-gray-800 hover:text-amber-600 py-2 transition-colors duration-300"
          >
            Appartamento
          </button>
          <button 
            onClick={() => scrollToSection('chi-siamo')}
            className="nav-link text-gray-800 hover:text-amber-600 py-2 transition-colors duration-300"
          >
            Chi Siamo
          </button>
          <button 
            onClick={() => scrollToSection('dove-ci-troviamo')}
            className="nav-link text-gray-800 hover:text-amber-600 py-2 transition-colors duration-300"
          >
            Dove Siamo
          </button>
          <button 
            onClick={() => scrollToSection('contatti')}
            className="nav-link text-gray-800 hover:text-amber-600 py-2 transition-colors duration-300"
          >
            Contatti
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <button 
            onClick={scrollToTop}
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('appartamento')}
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
          >
            Appartamento
          </button>
          <button 
            onClick={() => scrollToSection('chi-siamo')}
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
          >
            Chi Siamo
          </button>
          <button 
            onClick={() => scrollToSection('dove-ci-troviamo')}
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
          >
            Dove Siamo
          </button>
          <button 
            onClick={() => scrollToSection('contatti')}
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100"
          >
            Contatti
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
