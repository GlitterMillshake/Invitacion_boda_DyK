import { useState, useEffect } from "react";
import { X, PlayCircle } from "lucide-react";
import { supabase } from "../../supabaseClient";

interface PhotoGalleryProps {
  onVideoStateChange: (isActive: boolean) => void;
}

export function PhotoGallery({ onVideoStateChange }: PhotoGalleryProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

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

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);

    // Si el elemento seleccionado es un video, notificamos al padre para pausar la música
    if (media[index].tipo === "video") {
      onVideoStateChange(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    onVideoStateChange(false); // Al cerrar, notificamos que ya no hay video activo
  };

  const visibleMedia = showAll ? media : media.slice(0, 6);

  return (
    <section
      id="fotos"
      className="py-24 px-6 bg-[#6B1D36] relative overflow-hidden"
    >
      {/* Flores decorativas */}
      <img
        src="/src/assets/flowers (11).png"
        alt=""
        className="absolute pointer-events-none transition-all duration-1000 ease-in-out z-0 top-0 left-0 w-60 md:w-70 lg:w-80 opacity-60"
      />

      <img
        src="/src/assets/flowers (12).png"
        alt=""
        className="absolute rotate-25 pointer-events-none transition-all duration-1000 ease-in-out z-0 bottom-0 right-0 w-60 md:w-70 lg:w-80 opacity-60"
      />

      <div className="max-w-7xl mx-auto relative z-10 bg-red-950/30 rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#FAF7F5]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Nuestra Historia
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-10"></div>
        </div>

        {/* Grid de Media */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {visibleMedia.map((item, index) => (
            <div
              key={item.id}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative bg-black/20 border border-white/5"
              onClick={() => openLightbox(index)}
            >
              {item.tipo === "image" ? (
                <img
                  src={item.url}
                  alt="Galería boda"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón Ver Más */}
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
        <div className="fixed inset-0 bg-black/95 z-9999 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10000 p-2"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-5xl h-full flex items-center justify-center">
            {media[currentIndex].tipo === "image" ? (
              <img
                src={media[currentIndex].url}
                alt="Vista ampliada"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-in fade-in zoom-in duration-300"
              />
            ) : (
              <div className="w-full flex justify-center items-center">
                <video
                  src={media[currentIndex].url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] shadow-2xl"
                  onPlay={() => onVideoStateChange(true)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}