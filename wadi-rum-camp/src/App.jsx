import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import BookingSection from "./components/BookingSection";
import RoomDetailModal from "./components/RoomDetailModal";
import TourDetailModal from "./components/TourDetailModal";
import GalleryModal from "./components/GalleryModal";
import { flags, galleryImages } from "./data/media";
import { getRooms } from "./data/rooms";
import { getTourDetails } from "./data/tours";
export default function App() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const getBundle = (lng) =>
    i18n.hasResourceBundle(lng, "translation")
      ? i18n.getResourceBundle(lng, "translation")
      : null;
  const enBundle = getBundle("en") || {};
  const currentBundle = getBundle(currentLang) || {};
  const t = { ...enBundle, ...currentBundle };
  const aboutParagraphs =
    Array.isArray(t.aboutParagraphs) && t.aboutParagraphs.length > 0
      ? t.aboutParagraphs
      : [t.aboutText];
  const rtlLangs = new Set(["ar"]);

  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedGallery, setExpandedGallery] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedJeepVariant, setSelectedJeepVariant] = useState("full");
  const [selectedHikingVariant, setSelectedHikingVariant] = useState("umm");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomImageIndex, setRoomImageIndex] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    room: "",
    tour: "",
    message: "",
  });

  const [notification, setNotification] = useState("");
  const isSuccessNotification =
    notification.includes("✅") || notification.includes("successfully");
  const isSendingNotification = notification.toLowerCase().includes("sending");

  const rooms = getRooms(t);
  const tourDetails = getTourDetails(t);
  const gallery = galleryImages;

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dir = rtlLangs.has(currentLang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", currentLang);
  }, [currentLang, rtlLangs]);

  useEffect(() => {
    if (selectedTour?.id === 0) {
      setSelectedJeepVariant("full");
    }
  }, [selectedTour]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const whatsappLink =
    `https://wa.me/962776569810?text=Hello!%20I'd%20like%20to%20book%20a%20stay.%0D%0AName:%20${form.name}%0D%0APhone:%20${form.phone}%0D%0ACheck-In:%20${form.checkIn}%0D%0ACheck-Out:%20${form.checkOut}%0D%0AGuests:%20${form.guests}%0D%0ARoom:%20${form.room}%0D%0ATour:%20${form.tour}`;

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return (
      form.name.trim() &&
      form.email.trim() &&
      emailRegex.test(form.email) &&
       form.phone.trim() &&
      phoneRegex.test(form.phone.replace(/\s/g, "")) &&
      form.checkIn &&
      form.checkOut &&
      form.guests &&
      form.room &&
      form.tour
    );
  };

  const getMissingFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    const missing = [];
    if (!form.name.trim()) missing.push(t.errorName);
    if (!form.email.trim()) missing.push(t.errorEmail);
    if (form.email.trim() && !emailRegex.test(form.email)) missing.push(t.errorValidEmail);
    if (!form.phone.trim()) missing.push(t.errorPhone);
    if (form.phone.trim() && !phoneRegex.test(form.phone.replace(/\s/g, ""))) missing.push(t.errorValidPhone);
    if (!form.checkIn) missing.push(t.errorCheckInDate);
    if (!form.checkOut) missing.push(t.errorCheckOutDate);
    if (!form.guests) missing.push(t.errorGuests);
    if (!form.room) missing.push(t.errorRoom);
    if (!form.tour) missing.push(t.errorTour);
    return missing;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      const missing = getMissingFields();
      setNotification(`${t.pleaseFillIn}: ${missing.join(", ")}`);
      return;
    }

    // EmailJS Configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setNotification("❌ Booking email is not configured yet. Please use WhatsApp for now.");
      return;
    }

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      check_in: form.checkIn,
      check_out: form.checkOut,
      guests: form.guests,
      room: form.room,
      tour: form.tour,
      message: form.message,
      to_email: 'desertwonderscampwadirum@gmail.com'
    };

    try {
      setNotification('Sending...');
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setNotification('✅ Booking request sent successfully!');
      // Reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        room: '',
        tour: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setNotification('❌ Failed to send. Please try WhatsApp instead.');
    }
  };

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const googleMapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.372916360092!2d35.49229580000001!3d29.7089553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1500e9002cbcd4ad%3A0xcacbeb5989f4f4ba!2sWadi%20Rum%20Desert%20Wonders%20Camp!5e0!3m2!1sen!2sjo!4v1769193958032!5m2!1sen!2sjo";

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
      <Header
        scrolled={scrolled}
        t={t}
        flags={flags}
        currentLang={currentLang}
        langDropdown={langDropdown}
        setLangDropdown={setLangDropdown}
        i18n={i18n}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* HERO SECTION - Desert Image */}
      <section
        id="hero"
        className="min-h-screen sm:h-screen bg-cover bg-center flex items-end justify-center relative overflow-hidden pt-16"
        style={{
          backgroundImage:
            "url('/hero.jpeg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pb-16 sm:pb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-3 sm:mb-4 text-white leading-tight">
            {t.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 font-light">
            {t.subtitle}
          </p>
          <a
            href="#booking"
            className="inline-block bg-white/90 hover:bg-white text-amber-900 font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            {t.booking}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      <AboutSection t={t} aboutParagraphs={aboutParagraphs} />

      {/* TOURS SECTION */}
      <section id="tours" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-amber-900 mb-4">
              {t.tours}
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.trips.map((trip, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedTour(tourDetails[i]);
                  if (i === 0) setSelectedJeepVariant("full");
                  if (i === 2) setSelectedHikingVariant("umm");
                }}
                id={`trip-${i}`}
                className="group text-left bg-white/80 border border-amber-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-amber-200 cursor-pointer"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full mb-6 group-hover:from-amber-400 group-hover:to-orange-400 transition-colors duration-300"></div>
                <h3 className="text-2xl font-light text-amber-900 mb-3">
                  {trip}
                </h3>
                <p className="text-amber-800 leading-relaxed font-light mb-4">
                  {t.tripsDesc[i]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-br from-amber-50/40 to-orange-50/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-amber-900 mb-4">
              {t.gallery}
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedGallery(i)}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer w-48 sm:w-56 flex-shrink-0"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    loading="lazy"
                    className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section id="rooms" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-amber-900 mb-4">
              {t.roomsTitle}
            </h2>
            <p className="text-amber-700 font-light mb-4">{t.roomsDesc}</p>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoom(room);
                  setRoomImageIndex({ ...roomImageIndex, [room.id]: 0 });
                }}
                className="text-left bg-white border border-amber-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:border-amber-200 cursor-pointer"
              >
                <h3 className="text-xl sm:text-2xl font-light text-amber-900 mb-2">{room.name}</h3>
                <p className="text-sm sm:text-base text-amber-700 font-light mb-3">{room.capacity}</p>
                <p className="text-sm sm:text-base text-amber-800 leading-relaxed font-light mb-4 sm:mb-6">{room.description}</p>
                <p className="text-2xl sm:text-3xl font-light text-amber-900">{room.price} JOD <span className="text-base sm:text-lg font-light text-amber-700">{t.pricePerNight}</span></p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS SECTION */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-amber-900 mb-3 sm:mb-4">
              {t.getToUsTitle}
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
          </div>

          {/* Meeting Point & Parking */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-light text-amber-900 mb-4 sm:mb-6">{t.parkingTitle}</h3>
            <div className="bg-white/60 border border-amber-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6">
              <p className="text-lg text-amber-800 leading-relaxed font-light mb-4">
                {t.parkingDesc}
              </p>
              <ul className="space-y-2 text-amber-800 font-light">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {t.parkingItem1}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {t.parkingItem2}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  {t.parkingItem3}
                </li>
              </ul>
            </div>
            <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-md border border-amber-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216.88253586608758!2d35.42265646541148!3d29.571094898492163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15009300372ab163%3A0xdea5e25991ef9160!2sWadi%20Rum%20Desert%20Wonders%20Camp%20Park!5e0!3m2!1shr!2shr!4v1769204464817!5m2!1shr!2shr"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Main Camp Location Map */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-light text-amber-900 mb-4 sm:mb-6">{t.campLocationTitle}</h3>
            <div className="rounded-lg sm:rounded-2xl overflow-hidden shadow-md border border-amber-100">
              <iframe
                src={googleMapsEmbed}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <BookingSection
        t={t}
        today={today}
        form={form}
        notification={notification}
        setNotification={setNotification}
        isSuccessNotification={isSuccessNotification}
        isSendingNotification={isSendingNotification}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
        isFormValid={isFormValid}
        getMissingFields={getMissingFields}
        whatsappLink={whatsappLink}
      />

      {/* MAP SECTION */}

      <Footer t={t} />

      <RoomDetailModal
        t={t}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        roomImageIndex={roomImageIndex}
        setRoomImageIndex={setRoomImageIndex}
      />

      <GalleryModal
        expandedGallery={expandedGallery}
        setExpandedGallery={setExpandedGallery}
        gallery={gallery}
      />

      <TourDetailModal
        t={t}
        selectedTour={selectedTour}
        setSelectedTour={setSelectedTour}
        selectedJeepVariant={selectedJeepVariant}
        setSelectedJeepVariant={setSelectedJeepVariant}
        selectedHikingVariant={selectedHikingVariant}
        setSelectedHikingVariant={setSelectedHikingVariant}
        gallery={gallery}
      />
    </div>
  );
}
