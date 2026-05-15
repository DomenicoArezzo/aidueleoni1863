
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

interface NavChild {
  label: string;
  path: Record<string, string>;
}

interface NavNode {
  label: string;
  path?: Record<string, string>;
  children?: NavChild[];
}

const SidebarNav = () => {
  const lang = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const n = translations.nav;

  const langPrefix = lang === "it" ? "" : `/${lang}`;

  const navItems: NavNode[] = useMemo(
    () => [
      { label: t(n.home, lang), path: { it: "/", en: "/en", es: "/es", de: "/de" } },
      {
        label: t(n.laStruttura, lang),
        children: [
          { label: t(n.appartamento, lang), path: { it: "/appartamento", en: "/en/apartment", es: "/es/apartamento", de: "/de/wohnung" } },
          { label: t(n.chiSiamo, lang), path: { it: "/chi-siamo", en: "/en/about", es: "/es/quienes-somos", de: "/de/ueber-uns" } },
        ],
      },
      { label: t(n.doveSiamo, lang), path: { it: "/dove-siamo", en: "/en/location", es: "/es/ubicacion", de: "/de/lage" } },
      { label: t({ it: "Dintorni", en: "Surroundings", es: "Alrededores", de: "Umgebung" }, lang), path: { it: "/dintorni", en: "/en/surroundings", es: "/es/alrededores", de: "/de/umgebung" } },
      {
        label: t({ it: "Disponibilità", en: "Availability", es: "Disponibilidad", de: "Verfügbarkeit" }, lang),
        path: { it: "/disponibilita", en: "/en/availability", es: "/es/disponibilidad", de: "/de/verfuegbarkeit" },
      },
      { label: t(n.contatti, lang), path: { it: "/contatti", en: "/en/contact", es: "/es/contacto", de: "/de/kontakt" } },
    ],
    [lang, n]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setIsOpen(true);
      else setIsOpen(false);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Auto-expand group containing active path
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((c) => c.path[lang] === location.pathname)) {
        setExpandedGroups((prev) => new Set(prev).add(item.label));
      }
    });
  }, [location.pathname, navItems, lang]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const toggleGroup = useCallback((label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const goTo = useCallback(
    (path: Record<string, string>) => {
      navigate(path[lang] || path.it);
      if (window.innerWidth < 1280) setIsOpen(false);
    },
    [navigate, lang]
  );

  const isActive = (path?: Record<string, string>) =>
    path ? location.pathname === (path[lang] || path.it) : false;

  const isGroupActive = (item: NavNode) =>
    item.children?.some((c) => isActive(c.path)) ?? false;

  return (
    <>
      <button
        onClick={toggle}
        className={cn(
          "fixed z-[60] right-4 top-20 min-w-[44px] min-h-[44px] flex items-center justify-center",
          "rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200",
          "text-gray-700 hover:bg-amber-50 hover:text-amber-700",
          "transition-all duration-200 ease-in-out",
          "xl:hidden"
        )}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-200 ease-in-out md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 right-0 z-[56] h-full",
          "w-64 bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-2xl",
          "flex flex-col pt-20 pb-6 overflow-y-auto",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={toggle}
          className="hidden xl:flex absolute top-4 left-4 min-w-[44px] min-h-[44px] items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>

        <nav className="flex-1 px-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const hasChildren = !!item.children;
              const expanded = expandedGroups.has(item.label);
              const groupActive = isGroupActive(item);
              const itemActive = isActive(item.path);

              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      if (hasChildren) toggleGroup(item.label);
                      else if (item.path) goTo(item.path);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 min-h-[44px] px-3 rounded-lg text-sm tracking-wide",
                      "transition-all duration-200 ease-in-out",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1",
                      itemActive || groupActive
                        ? "bg-amber-50 text-amber-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200",
                        itemActive || groupActive ? "bg-amber-500" : "bg-transparent"
                      )}
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    {hasChildren && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "shrink-0 text-gray-400 transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                      />
                    )}
                  </button>

                  {hasChildren && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out",
                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="ml-5 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.path);
                          return (
                            <li key={child.path.it}>
                              <button
                                onClick={() => goTo(child.path)}
                                className={cn(
                                  "w-full flex items-center gap-2 min-h-[44px] px-3 rounded-lg text-sm",
                                  "transition-all duration-200 ease-in-out",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1",
                                  childActive
                                    ? "text-amber-700 font-semibold bg-amber-50/60"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-normal"
                                )}
                              >
                                <ChevronRight
                                  size={12}
                                  className={cn(
                                    "shrink-0 transition-colors duration-200",
                                    childActive ? "text-amber-500" : "text-gray-300"
                                  )}
                                />
                                <span className="text-left">{child.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 mt-4">
          <button
            onClick={() => goTo({ it: "/contatti", en: "/en/contact", es: "/es/contacto", de: "/de/kontakt" })}
            className="w-full min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-full transition-colors duration-200"
          >
            {t(n.prenota, lang)}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;
