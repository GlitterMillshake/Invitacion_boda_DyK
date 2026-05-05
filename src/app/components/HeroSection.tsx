import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  onOpen: () => void;
}

export function HeroSection({ onOpen }: HeroSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    días: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const targetDate = new Date("July 18, 2026 17:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        días: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    onOpen(); // <--- Aquí disparamos la música
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden bg-[#FAF7F5] isolate"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/bg_hs.jpg" // <-- Coloca aquí tu imagen principal
          alt="Fondo"
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out transform
      ${
        isOpen
          ? "blur-md brightness-50 scale-110"
          : "blur-none brightness-100 scale-100"
      }`}
        />
        {/* Capa extra de color para asegurar que el texto destaque */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 
    ${isOpen ? "bg-[#6B1D36]/20 opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Contenedor principal */}
      <div className="max-w-4xl w-full text-center flex flex-col items-center justify-center relative">
        <div
          className={`transition-all duration-1000 ease-in-out shrink-0 z-50 ${
            isOpen
              ? "opacity-0 scale-75 -translate-y-32 pointer-events-none absolute"
              : "opacity-100 relative cursor-pointer group"
          }`}
          style={{ width: "300px", height: "200px" }}
          onClick={handleOpenEnvelope} // <--- Usamos la nueva función
        >
          {/* Sombra del sobre */}
          <div className="absolute inset-0 bg-black/10 blur-xl rounded-lg transform translate-y-4 scale-95"></div>

          {/* CUERPO DEL SOBRE */}
          <div className="absolute inset-0 bg-[#6B1D36] rounded-sm shadow-lg overflow-hidden border border-[#5A1828]">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#D4AF37 1px, transparent 1px)",
                backgroundSize: "15px 15px",
              }}
            ></div>
          </div>

          {/* CAPAS FRONTALES DEL SOBRE */}
          <svg
            viewBox="0 0 320 220"
            className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-md"
          >
            <path
              d="M 0 0 L 160 110 L 0 220 Z"
              fill="#7A2342"
              stroke="#5A1828"
              strokeWidth="0.5"
            />
            <path
              d="M 320 0 L 160 110 L 320 220 Z"
              fill="#7A2342"
              stroke="#5A1828"
              strokeWidth="0.5"
            />
            <path
              d="M 0 220 L 160 110 L 320 220 Z"
              fill="#8B2E4A"
              stroke="#5A1828"
              strokeWidth="0.5"
            />
          </svg>

          {/* SOLAPA DEL SOBRE */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out z-20 origin-top ${
              isOpen
                ? "-rotate-x-180 opacity-0 pointer-events-none"
                : "rotate-x-0 opacity-100"
            }`}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              backfaceVisibility: "hidden",
            }}
          >
            <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-sm">
              <path
                d="M 0 0 L 160 110 L 320 0 Z"
                fill="#8B2E4A"
                stroke="#5A1828"
                strokeWidth="0.5"
              />
              <text
                x="160"
                y="55"
                textAnchor="middle"
                fill="#D4AF37"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "24px",
                  letterSpacing: "0.1em",
                }}
              >
                D & K
              </text>
            </svg>
          </div>

          {/* Sello de lacre o indicador */}
          {!isOpen && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full shadow-lg flex items-center justify-center border-2 border-[#B8860B] animate-pulse">
                <Heart className="w-6 h-6 text-[#6B1D36] fill-[#6B1D36]" />
              </div>
            </div>
          )}

          {/* Texto de ayuda si está cerrado */}
          {!isOpen && (
            <div className="absolute p-2 rounded-lg bg-[#FAF7F5]/30 backdrop-blur-sm -bottom-12.5 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 group-hover:scale-110">
              <span className="text-[#6B1D36] text-[12px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
                Click para abrir invitación
              </span>
            </div>
          )}
        </div>

        {/* --- CAMBIO 2: INFO PRINCIPAL (Ajuste de posición) --- */}
        <div
          className={`top-10 transition-all duration-1000 ease-out w-full max-w-4xl mx-auto ${
            isOpen
              ? "opacity-100 translate-y-0 relative z-10" // Sube a su posición original (0)
              : "opacity-0 translate-y-20 absolute pointer-events-none z-0"
          }`}
        >
          {/* ESTA ES LA CAPA DE LA TARJETA (Fondo, Sombra y Bordes) */}
          <div
            className={`absolute inset-0 transition-all duration-1000 overflow-hidden ${
              isOpen
                ? "bg-white rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border border-[#D4AF37]/10"
                : "bg-transparent shadow-none"
            }`}
          >
            {isOpen && (
              <>
                <img
                  src="/assets/bg_inv.JPG"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
              </>
            )}

            {/* Flores de esquina responsivas */}
            {isOpen && (
              <img
                src="/assets/flowers (1).png"
                alt=""
                className="absolute top-0 left-0 pointer-events-none opacity-90 transition-all duration-1000 delay-300
                  w-40 md:w-50 lg:w-80 xl:w-[25vw] xl:max-w-90"
              />
            )}
            <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-[#D4AF37] rounded-tr-lg opacity-90"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-[#D4AF37] rounded-bl-lg opacity-90"></div>
            {isOpen && (
              <img
                src="/assets/flowers (3).png"
                alt=""
                className="absolute bottom-0 right-0 pointer-events-none opacity-90 transition-all duration-1000 delay-300
                  w-40 md:w-50 lg:w-80 xl:w-[25vw] xl:max-w-90"
              />
            )}
          </div>

          {/* CONTENIDO DE LA TARJETA */}
          <div className="relative z-10 p-14 md:p-20 text-center flex flex-col items-center">
            {/* --- CAMBIO 3: BOTÓN PARA VOLVER A CERRAR (La Solapa de Retorno) --- */}
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)} // Cierra la invitación
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 group flex flex-col items-center gap-2 transition-all duration-700 hover:-translate-y-1"
              >
                {/* Círculo estilo Sello de Lacre */}
                <div className="w-14 h-14 bg-[#6B1D36] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#D4AF37] transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                  <Heart className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
                </div>
                {/* Texto pequeño de ayuda */}
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#6B1D36] font-bold bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  Cerrar
                </span>
              </button>
            )}

            {/* Foto de los novios */}
            <div className="mb-10 w-48 h-48 md:w-80 md:h-80 shrink-0 relative group">
              <div className="absolute inset-0 bg-black rounded-full blur-2xl translate-y-4 scale-100 opacity-90"></div>
              <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] shadow-inner overflow-hidden bg-white z-10 transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <img src="/assets/IMG_2853.png" className="object-cover" />
              </div>
            </div>

            {/* Nombres y Fecha */}
            <div className="mt-5 mb-10">
              <h1
                className="text-5xl md:text-7xl mb-4 text-[#D4AF37]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Daniel & Katya
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-[#D4AF37]"></div>
                <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                <div className="h-px w-16 bg-[#D4AF37]"></div>
              </div>
              <p className="text-2xl md:text-2xl text-[#6B1D36] mb-2 font-serif italic">
                18 de Julio de 2026
              </p>
              <p className="text-lg text-[#6B5B52] tracking-widest uppercase">
                Ensenada, Baja California
              </p>
            </div>

            {/* COUNTDOWN */}
            <div className="flex justify-center gap-3 md:gap-6 mb-12">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-[#6B1D36] rounded-lg shadow-md border border-[#D4AF37]/20 flex items-center justify-center mb-2">
                    <span className="text-xl md:text-3xl font-serif text-[#ffff]">
                      {value}
                    </span>
                  </div>
                  <span className="text-[15px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Cita */}
            <div className="max-w-xl mx-auto">
              <p className="text-lg md:text-xl text-[#6B5B52] italic mb-4 font-serif leading-relaxed">
                "El amor se compone de una sola alma que habita en dos cuerpos."
              </p>
              <p className="text-xs tracking-widest text-[#D4AF37] uppercase">
                — Aristóteles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
