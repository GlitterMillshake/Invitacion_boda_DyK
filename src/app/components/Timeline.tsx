import { motion } from "motion/react";
import { GlassWater, Church, Utensils, Music} from "lucide-react";

const events = [
  {
    time: "16:30",
    title: "Recepción de Invitados",
    description: "Bienvenida con coctelería y música ambiental.",
    icon: GlassWater,
  },
  {
    time: "17:00",
    title: "Ceremonia",
    description: "Nuestra unión por el civil.",
    icon: Church,
  },
  {
    time: "18:30",
    title: "Banquete",
    description: "Cena y brindis.",
    icon: Utensils,
  },
  {
    time: "21:30",
    title: "Fiesta",
    description: "Celebración, baile y momentos inolvidables.",
    icon: Music,
  },
];

export function Timeline() {
  return (
    <section id="itinerario" className="py-24 relative overflow-hidden bg-[#FAF7F5]/90">
      <img
        src="/assets/flowers (8).png"
        alt=""
        className={'absolute top-0 right-0 pointer-events-none transition-all duration-1000 ease-in-out z-0 w-50 sm:w-100 md:w-140 lg:w-160'}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#6B1D36] mb-4">Itinerario</h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-[#6B5B52] font-sans max-w-lg mx-auto uppercase tracking-widest text-sm">
            Nuestra celebración paso a paso
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#D4AF37]/80 hidden md:block"></div>

          <div className="space-y-12 md:space-y-0">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } md:py-12`}
              >
                {/* Content */}
                <div className="flex-1 w-full md:w-1/2 px-8 text-center md:text-left">
                  <div className={`${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-2xl font-serif text-[#D4AF37] mb-2 block">{event.time}</span>
                    <h3 className="text-2xl font-serif text-[#6B1D36] mb-3">{event.title}</h3>
                    <p className="text-[#6B5B52] font-sans leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-[#6B1D36] rounded-full shadow-xl border-4 border-[#FAF7F5] my-6 md:my-0">
                  <event.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>

                {/* Spacer for empty side */}
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
