import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Inicio", id: "inicio" },
    { name: "Fotos", id: "fotos" },
    { name: "Itinerario", id: "itinerario" },
    { name: "Ubicación", id: "ubicacion" },
    { name: "Regalos", id: "regalos" },
    { name: "RSVP", id: "rsvp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // Altura reducida tras scroll
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    // Quitamos el backdrop-blur y el bg del nav principal para evitar el bug del fixed
    <nav className="fixed bg-white/90 shadow-[0_0px_2px_-2px_rgba(0,0,0,0.5)] top-0 left-0 right-0 z-9998 transition-all duration-300 in-[.lightbox-active]:hidden">
      {/* CAPA DE FONDO: Aquí aplicamos el diseño para que no afecte al menú móvil */}
      <div
        className={`absolute inset-0 transition-all duration-300 -z-10 ${
          scrolled
            ? "bg-[#FAF7F5]/95 backdrop-blur-md h-16 shadow-md"
            : "bg-transparent h-20"
        }`}
      />

      {/* CONTENEDOR DE CONTENIDO */}
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <button
          onClick={() => scrollToSection("inicio")}
          className="text-2xl font-serif text-[#6B1D36] tracking-wider cursor-pointer"
        >
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="w-12 md:w-15 shrink-0">
              <img
                src="/assets/logo_dyk.png"
                alt="Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="whitespace-nowrap pt-1">D & K</div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-xs uppercase tracking-[0.2em] text-[#6B1D36] hover:text-[#D4AF37] transition-colors cursor-pointer font-sans"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#6B1D36] z-120" // Z-index extra para estar sobre el menú abierto
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            // Cambiamos inset-0 por h-screen y w-full para asegurar cobertura total
            className="fixed top-0 left-0 w-full h-dvh bg-[#FAF7F5] z-110 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xl uppercase tracking-[0.3em] text-[#6B1D36] hover:text-[#D4AF37] transition-colors font-sans"
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
