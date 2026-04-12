
import React, { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import camera1 from "@/assets/appartamento/camera1.jpg";
import camera2 from "@/assets/appartamento/camera2.jpg";
import camera3 from "@/assets/appartamento/camera3.jpg";
import camera4 from "@/assets/appartamento/camera4.jpg";

const images = [
  { src: camera1, alt: "Camera da letto principale con parete in pietra" },
  { src: camera2, alt: "Camera con arco in pietra e balcone panoramico" },
  { src: camera3, alt: "Camera con vista e arredi d'epoca" },
  { src: camera4, alt: "Camera con balcone e muri in pietra naturale" },
];

const PhotoGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative w-full mb-12 group">
      {/* Main carousel */}
      <div ref={emblaRef} className="overflow-hidden rounded-[10px]">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Foto precedente"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Foto successiva"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-foreground shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Vai alla foto ${i + 1}`}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center",
            )}
          >
            <span
              className={cn(
                "block w-2.5 h-2.5 rounded-full transition-all duration-200",
                i === selectedIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          </button>
        ))}
      </div>

      {/* Thumbnails - desktop only */}
      <div className="hidden lg:flex justify-center gap-3 mt-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              "w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200",
              i === selectedIndex
                ? "border-primary shadow-sm"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
