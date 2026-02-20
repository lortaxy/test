import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BOOKING_LINKS, SITE_CONTACT, SOCIAL_LINKS } from "../config/site";

export default function Footer({ t }) {
  return (
    <footer className="bg-amber-900 text-white py-10 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4">{t.footerCampName}</h3>
            <p className="text-xs sm:text-sm text-amber-100 font-light">{t.footerTagline}</p>
            <p className="text-xs sm:text-sm text-amber-100 font-light mt-2">{t.footerLicensed}</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4">{t.contact}</h3>
            <p className="text-xs sm:text-sm text-amber-100 font-light">Email: {SITE_CONTACT.email}</p>
            <p className="text-xs sm:text-sm text-amber-100 font-light">Phone: {SITE_CONTACT.phoneDisplay}</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4">{t.footerFollowUs}</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-100 hover:text-white transition-colors duration-200"
                title="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-100 hover:text-white transition-colors duration-200"
                title="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4">Also available on</h3>
            <div className="space-y-2">
              <a
                href={BOOKING_LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-amber-100 hover:text-white transition-colors duration-200 block"
              >
                Booking.com
              </a>
              <a
                href={BOOKING_LINKS.expedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-amber-100 hover:text-white transition-colors duration-200 block"
              >
                Expedia
              </a>
              <a
                href={BOOKING_LINKS.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-amber-100 hover:text-white transition-colors duration-200 block"
              >
                TripAdvisor
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-amber-100 font-light">
          <p>© {new Date().getFullYear()} {t.footerCopyright}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            <a href={`${import.meta.env.BASE_URL}privacy-policy.html`} className="hover:text-white transition-colors duration-200">{t.privacyTitle}</a>
            <a href={`${import.meta.env.BASE_URL}terms-of-use.html`} className="hover:text-white transition-colors duration-200">{t.termsTitle}</a>
            <a href={`${import.meta.env.BASE_URL}cookie-notice.html`} className="hover:text-white transition-colors duration-200">{t.cookiesTitle}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
