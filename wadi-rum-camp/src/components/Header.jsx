import { Menu, X } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SOCIAL_LINKS } from "../config/site";

const navigationItems = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "tours", href: "#tours" },
  { key: "gallery", href: "#gallery" },
  { key: "roomsTitle", href: "#rooms" },
  { key: "booking", href: "#booking" },
];

export default function Header({
  scrolled,
  t,
  flags,
  currentLang,
  langDropdown,
  setLangDropdown,
  i18n,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm"
          : "bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-yellow-50/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          <div className="flex-shrink-0 min-w-0">
            <a href="#hero" className="flex items-center">
              <img src={`${import.meta.env.BASE_URL}Gemini_Generated_Image_a4w9bqa4w9bqa4w9 (1).png`} alt="Logo" className="h-16 sm:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-amber-700 hover:text-amber-900 font-medium text-base lg:text-lg transition-colors duration-200"
              >
                {item.key === "roomsTitle" ? t.roomsTitle : t[item.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-900 transition-colors duration-200"
                title="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-900 transition-colors duration-200"
                title="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>

            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="text-amber-700 hover:text-amber-900 font-medium text-base lg:text-lg px-2 sm:px-3 py-2 rounded-lg hover:bg-amber-100/50 transition-colors duration-200 whitespace-nowrap"
              >
                {flags.find((f) => f.code === currentLang)?.label}
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-amber-100 overflow-hidden z-10 min-w-[140px]">
                  {flags.map((f) => (
                    <button
                      key={f.code}
                      onClick={() => {
                        i18n.changeLanguage(f.code);
                        setLangDropdown(false);
                      }}
                      className="block w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-amber-900 hover:bg-amber-50 transition-colors duration-150"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100/50 rounded-lg transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-100 bg-white/80 backdrop-blur">
            <nav className="px-2 py-3 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-amber-700 font-medium hover:bg-amber-100/50 rounded-lg transition-colors duration-200"
                >
                  {item.key === "roomsTitle" ? t.roomsTitle : t[item.key]}
                </a>
              ))}
              <div className="flex items-center justify-center gap-6 pt-3 pb-2 border-t border-amber-100 mt-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 transition-colors duration-200"
                  title="Facebook"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 transition-colors duration-200"
                  title="Instagram"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
