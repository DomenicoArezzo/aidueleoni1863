import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/hooks/use-lang";
import { translations, t } from "@/lib/translations";

interface NavChild {
  label: string;
  sectionId: string;
}

interface NavNode {
  label: string;
  sectionId?: string;
  children?: NavChild[];
}

const SidebarNav = () => {
  const lang = useLang();
  const n = translations.nav;

  const navItems: NavNode[] = useMemo(
    () => [
      { label: t(n.home, lang), sectionId: "hero" },
      {
        label: t(n.laStruttura, lang),
        children: [
          { label: t(n.appartamento, lang), sectionId: "appartamento" },
          { label: t(n.chiSiamo, lang), sectionId: "chi-siamo" },
        ],
      },
      { label: t(n.doveSiamo, lang), sectionId: "dove-ci-troviamo" },
      {
        label: t({ it: "Disponibilità", en: "Availability", es: "Disponibilidad", de: "Verfügbarkeit" }, lang),
        sectionId: "disponibilita",
      },
      { label: t(n.contatti, lang), sectionId: "contatti" },
    ],
    [lang, n]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>("");

  // Auto-open on desktop
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

  // Intersection observer for active section
  useEffect(() => {
    const sectionIds = new Set<string>();
    navItems.forEach((item) => {
      if (item.sectionId) sectionIds.add(item.sectionId);
      item.children?.forEach((c) => sectionIds.add(c.sectionId));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  // Auto-expand group containing active section
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children?.some((c) => c.sectionId === activeSection)) {
        setExpandedGroups((prev) => new Set(prev).add(item.label));
      }
    });
  }, [activeSection, navItems]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleGroup = useCallback((label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const scrollTo = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close on mobile/tablet
      if (window.innerWidth < 1280) setIsOpen(false);
    },
    []
  );

  const isActive = (sectionId?: string) => sectionId === activeSection;

  const isGroupActive = (item: NavNode) =>
    item.children?.some((c) => c.sectionId === activeSection) ?? false;

  return (
    <>
      {/* Toggle button — always visible when sidebar closed, or on tablet/mobile */}
      <button
        onClick={toggle}
        className={cn(
          "fixed z-[60] right-4 top-20 min-w-[44px] min-h-[44px] flex items-center justify-center",
          "rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-200",
          "text-gray-700 hover:bg-amber-50 hover:text-amber-700",
          "transition-all duration-200 ease-in-out",
          "xl:hidden", // hide toggle on desktop when sidebar is auto-open
          isOpen && "xl:hidden"
        )}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay (mobile only) */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-200 ease-in-out md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[56] h-full",
          "w-64 bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-2xl",
          "flex flex-col pt-20 pb-6 overflow-y-auto",
          "transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button inside sidebar (desktop) */}
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
              const itemActive = isActive(item.sectionId);

              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      if (hasChildren) toggleGroup(item.label);
                      else if (item.sectionId) scrollTo(item.sectionId);
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
                    {/* Active indicator dot */}
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

                  {/* Children */}
                  {hasChildren && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out",
                        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="ml-5 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.sectionId);
                          return (
                            <li key={child.sectionId}>
                              <button
                                onClick={() => scrollTo(child.sectionId)}
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

        {/* CTA at bottom */}
        <div className="px-4 mt-4">
          <button
            onClick={() => scrollTo("contatti")}
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
