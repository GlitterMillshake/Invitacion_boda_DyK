import { motion } from "motion/react";
import { Mail } from "lucide-react";

export function Gifts() {
  return (
    <section
      id="regalos"
      className="py-24 bg-[#6B1D36] text-[#FAF7F5] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-45">
        <img
          src="/assets/bg_gifts.png" // <-- Coloca aquí tu imagen principal
          alt="Fondo"
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out transform`}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-6">
            Regalos
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-12"></div>

          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl font-serif leading-relaxed">
              "Su presencia es nuestro mejor regalo, pero si desean tener un
              detalle con nosotros, será muy apreciado."
            </p>

            <div className="w-100 mx-auto p-8 border-3 border-[#D4AF37]/50 rounded-lg bg-[#FAF7F5]/10 backdrop-blur-sm">
              <Mail className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-serif mb-2 text-[#D4AF37]">
                Lluvia de Sobres
              </h3>
              <p className="text-sm font-sans text-[#FAF7F5]/80">
                Habrá un buzón disponible en la recepción.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
