import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { ContactFooter } from "./ContactFooter";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div
      className="min-h-screen bg-[#FDFBF7]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen relative">
        <Outlet />
      </main>
      <div className="w-full h-px bg-linear-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      <ContactFooter />
    </div>
  );
}
