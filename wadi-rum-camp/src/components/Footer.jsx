import { FaFacebook, FaInstagram } from "react-icons/fa";

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
            <p className="text-xs sm:text-sm text-amber-100 font-light">Email: desertwonderscampwadirum@gmail.com</p>
            <p className="text-xs sm:text-sm text-amber-100 font-light">Phone: +962 7 7656 9810</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4">{t.footerFollowUs}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61587461497164"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-100 hover:text-white transition-colors duration-200"
                title="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/desertwonderscampwadirum/"
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
                href="https://www.booking.com/hotel/jo/wadi-rum-desert-wonders-camp-ldys.hr.html?aid=318615&label=New_English_EN_HR_27034596865-TuPNwxV7uxm4JdkpR_TY3gS637942140464%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-64415224945%3Alp9195867%3Ali%3Adec%3Adm%3Aag27034596865%3Acmp400849465&sid=37f901b9828656c97547326521791f04&dest_id=900062497&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1771513576&srpvid=92016a236d2003ca&type=total&ucfs=1&"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-amber-100 hover:text-white transition-colors duration-200 block"
              >
                Booking.com
              </a>
              <a
                href="https://www.expedia.com/Wadi-Rum-Hotels-Wadi-Rum-Desert-Wonders-Camp.h124912693.Hotel-Information"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-amber-100 hover:text-white transition-colors duration-200 block"
              >
                Expedia
              </a>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g499126-d.html"
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
            <a href="/privacy-policy.html" className="hover:text-white transition-colors duration-200">{t.privacyTitle}</a>
            <a href="/terms-of-use.html" className="hover:text-white transition-colors duration-200">{t.termsTitle}</a>
            <a href="/cookie-notice.html" className="hover:text-white transition-colors duration-200">{t.cookiesTitle}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
