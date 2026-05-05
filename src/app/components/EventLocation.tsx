import { MapPin, Shirt } from "lucide-react";

export function EventLocation() {
  return (
    <section id="ubicacion" className="relative py-24 px-6 bg-[#FAF7F5]/90">
      <img
        src="src/assets/flowers (10).png"
        alt=""
        className={'absolute bottom-0 left-0 pointer-events-none transition-all duration-1000 ease-in-out z-0 w-100 sm:w-120 md:w-140 lg:w-160'}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#6B1D36]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Lugar y Detalles
          </h2>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-lg overflow-hidden shadow-lg h-85 z-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.2715653329496!2d-116.62628612457911!3d31.872031774054967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d893998b7d9129%3A0xedc572a047a4f4e1!2sCASA%20DALBA!5e0!3m2!1ses-419!2smx!4v1776827082387!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento en Google Maps"
            ></iframe>
          </div>

          <div className="space-y-6 z-1">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-2xl mb-2 text-[#6B1D36]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Casa Dalba
                  </h3>
                  <p
                    className="text-[#6B5B52] mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Av. Ruiz 901-9NA
                  </p>
                  <p
                    className="text-[#6B5B52]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Zona Centro, 22800 Ensenada, B.C.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E8E0DB] pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Shirt className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4
                      className="font-medium text-[#6B1D36] mb-1"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Código de Vestimenta
                    </h4>
                    <p
                      className="text-[#6B5B52] text-sm"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Coctel – Vestido y Traje
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAF7F5] rounded-md p-4 mt-4">
                  <p
                    className="text-sm text-[#6B5B52] italic"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    La ceremonia comienza puntualmente a las
                    5:00 PM. Por favor, llegue 30 minutos antes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}