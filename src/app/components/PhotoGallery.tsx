import { useState, useEffect, useCallback, type TouchEvent } from "react";
import { X, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../../supabaseClient";

interface PhotoGalleryProps {
  onVideoStateChange: (isActive: boolean) => void;
}

export function PhotoGallery({ onVideoStateChange }: PhotoGalleryProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from("galeria")
      .select("*")
      .order("orden");
    
    if (error) {
      console.error("Error fetching media:", error);
      return;
    }
    if (data) setMedia(data);
  };

  // --- Lógica de Navegación ---
  const nextMedia = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const prevMedia = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextMedia, prevMedia]);

  // Manejo de video al cambiar de index
  useEffect(() => {
    if (lightboxOpen) {
      const currentItem = media[currentIndex];
      onVideoStateChange(currentItem?.tipo === "video");
    }
  }, [currentIndex, lightboxOpen, media, onVideoStateChange]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    onVideoStateChange(false);
  };

  // --- Lógica de Swipe para Móvil ---
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) nextMedia(); // Swipe izquierda -> Siguiente
    if (distance < -50) prevMedia(); // Swipe derecha -> Anterior
    setTouchStart(null);
  };

  const visibleMedia = showAll ? media : media.slice(0, 6);

  return (
    <section id="fotos" className="py-24 px-6 bg-[#6B1D36] relative overflow-hidden">
      {/* Flores decorativas */}
      <img src="/assets/flowers (11).png" alt="" className="absolute pointer-events-none z-0 top-0 left-0 w-60 md:w-80 opacity-60" />
      <img src="/assets/flowers (12).png" alt="" className="absolute rotate-25 pointer-events-none z-0 bottom-0 right-0 w-60 md:w-80 opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10 bg-red-950/30 rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#FAF7F5]" style={{ fontFamily: "var(--font-serif)" }}>
            Nuestra Historia
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-10"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {visibleMedia.map((item, index) => (
            <div
              key={item.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative bg-black/20 border border-white/5"
              onClick={() => openLightbox(index)}
            >
              {item.tipo === "image" ? (
                <img src={item.url} alt="Galería" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              ) : (
                <div className="relative w-full h-full">
                  <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {media.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-[#6B1D36] transition-all font-medium uppercase tracking-widest text-sm"
            >
              {showAll ? "Ver menos" : "Ver galería completa"}
            </button>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-9999 flex items-center justify-center backdrop-blur-md select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón Cerrar */}
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white z-10000 p-2">
            <X size={40} />
          </button>

          {/* Flecha Izquierda (PC) */}
          <button 
            onClick={prevMedia}
            className="hidden md:flex absolute left-4 text-white/50 hover:text-white transition-colors z-10000 p-4"
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>

          {/* Contenido Media */}
          <div className="w-full max-w-5xl h-full flex items-center justify-center p-4">
            {media[currentIndex].tipo === "image" ? (
              <img
                key={media[currentIndex].url} // Key para reiniciar animación al cambiar
                src={media[currentIndex].url}
                alt="Vista ampliada"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-in fade-in zoom-in duration-300"
              />
            ) : (
              <div className="w-full flex justify-center items-center">
                <video
                  key={media[currentIndex].url}
                  src={media[currentIndex].url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* Flecha Derecha (PC) */}
          <button 
            onClick={nextMedia}
            className="hidden md:flex absolute right-4 text-white/50 hover:text-white transition-colors z-10000 p-4"
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>

          {/* Indicador de posición (opcional) */}
          <div className="absolute bottom-8 text-white/50 text-sm font-light">
            {currentIndex + 1} / {media.length}
          </div>
        </div>
      )}
    </section>
  );
}