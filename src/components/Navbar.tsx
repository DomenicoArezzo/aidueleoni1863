
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { translations, t, type Lang } from "@/lib/translations";
import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  sectionId?: string;
  children?: { label: string; sectionId: string; description?: string }[];
}

const langLabels: Record<Lang, string> = { it: "Italiano", en: "English", es: "Español" };
const langPaths: Record<Lang, string> = { it: "/", en: "/en", es: "/es" };

const Navbar = () => {
  const lang = useLang();
  const navigate = useNavigate();
  const n = translations.nav;

  const navItems: NavItem[] = [
    { label: t(n.home, lang) },
    {
      label: t(n.laStruttura, lang),
      children: [
        { label: t(n.appartamento, lang), sectionId: "appartamento", description: t(n.appartamentoDesc, lang) },
        { label: t(n.chiSiamo, lang), sectionId: "chi-siamo", description: t(n.chiSiamoDesc, lang) },
      ],
    },
    { label: t(n.doveSiamo, lang), sectionId: "dove-ci-troviamo" },
    { label: t(n.contatti, lang), sectionId: "contatti" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileExpanded(null);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileExpanded(null);
    document.body.style.overflow = "";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
    setOpenDropdown(null);
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const handleLangEnter = () => {
    if (langTimeout.current) clearTimeout(langTimeout.current);
    setLangOpen(true);
  };
  const handleLangLeave = () => {
    langTimeout.current = setTimeout(() => setLangOpen(false), 150);
  };

  const switchLang = (targetLang: Lang) => {
    setLangOpen(false);
    closeMenu();
    navigate(langPaths[targetLang]);
  };

  const textColor = isScrolled ? "text-gray-800" : "text-white";
  const hoverColor = isScrolled ? "hover:text-amber-600" : "hover:text-white/70";
  const logoColor = isScrolled ? "text-amber-700" : "text-white";
  const iconColor = isScrolled ? "text-gray-700" : "text-white";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-2 bg-white/95 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={scrollToTop} className={cn("flex items-center gap-2 transition-colors duration-300", logoColor)} aria-label="Ai due leoni">
          <span className="text-xl sm:text-2xl font-light tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>Ai due leoni</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" onMouseEnter={() => handleDropdownEnter(item.label)} onMouseLeave={handleDropdownLeave}>
                <button className={cn("flex items-center gap-1 px-4 py-2 text-sm tracking-wide transition-colors duration-300 rounded-md", textColor, hoverColor)}>
                  {item.label}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openDropdown === item.label && "rotate-180")} />
                </button>
                <div
                  className={cn("absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top", openDropdown === item.label ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none")}
                  onMouseEnter={() => handleDropdownEnter(item.label)} onMouseLeave={handleDropdownLeave}
                >
                  {item.children.map((child) => (
                    <button key={child.sectionId} onClick={() => scrollToSection(child.sectionId)} className="w-full text-left px-5 py-3.5 hover:bg-amber-50 transition-colors duration-200 group">
                      <span className="block text-sm font-medium text-gray-900 group-hover:text-amber-700 transition-colors">{child.label}</span>
                      {child.description && <span className="block text-xs text-gray-400 mt-0.5">{child.description}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button key={item.label} onClick={item.sectionId ? () => scrollToSection(item.sectionId!) : scrollToTop} className={cn("px-4 py-2 text-sm tracking-wide transition-colors duration-300 rounded-md", textColor, hoverColor)}>
                {item.label}
              </button>
            )
          )}

          {/* Language Switcher */}
          <div className="relative ml-2" onMouseEnter={handleLangEnter} onMouseLeave={handleLangLeave}>
            <button className={cn("flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors duration-300", textColor, hoverColor)}>
              <Globe className="w-4 h-4" />
              <span className="uppercase text-xs font-medium">{lang}</span>
            </button>
            <div className={cn("absolute top-full right-0 mt-1 min-w-[140px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top", langOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none")}
              onMouseEnter={handleLangEnter} onMouseLeave={handleLangLeave}
            >
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button key={l} onClick={() => switchLang(l)} className={cn("w-full text-left px-4 py-2.5 text-sm transition-colors", l === lang ? "bg-amber-50 text-amber-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => scrollToSection("contatti")} className="ml-3 px-5 py-2 text-sm font-medium bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300">
            {t(n.prenota, lang)}
          </button>
        </nav>

        <button className={cn("md:hidden p-2 transition-colors", iconColor)} onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 md:hidden transition-all duration-300 ease-in-out", isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none")}>
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)} className="flex items-center justify-between w-full text-lg font-light py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  {item.label}
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", mobileExpanded === item.label && "rotate-180")} />
                </button>
                <div className={cn("overflow-hidden transition-all duration-200", mobileExpanded === item.label ? "max-h-96" : "max-h-0")}>
                  {item.children.map((child) => (
                    <button key={child.sectionId} onClick={() => scrollToSection(child.sectionId)} className="w-full text-left pl-8 pr-4 py-3 text-base text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors">
                      {child.label}
                      {child.description && <span className="block text-xs text-gray-400 mt-0.5">{child.description}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button key={item.label} onClick={item.sectionId ? () => scrollToSection(item.sectionId!) : scrollToTop} className="text-lg font-light py-4 px-4 w-full text-left rounded-lg hover:bg-gray-50 transition-colors">
                {item.label}
              </button>
            )
          )}

          {/* Mobile lang switcher */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex gap-2 px-4">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button key={l} onClick={() => switchLang(l)} className={cn("flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors", l === lang ? "bg-amber-100 text-amber-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100")}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto pb-8">
          <button onClick={() => scrollToSection("contatti")} className="w-full py-4 bg-amber-600 text-white font-medium rounded-full text-lg hover:bg-amber-700 transition-colors">
            {t(n.prenotaSoggiorno, lang)}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
