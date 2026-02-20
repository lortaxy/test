import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function BookingSection({
  t,
  today,
  form,
  notification,
  setNotification,
  isSuccessNotification,
  isSendingNotification,
  handleChange,
  handleFormSubmit,
  isFormValid,
  getMissingFields,
  whatsappLink,
}) {
  const bookingRef = useRef(null);

  // Auto-scroll to booking form and extend timeout when notification appears
  useEffect(() => {
    if (notification) {
      // Scroll to booking section
      bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      // Auto-dismiss after longer timeout
      const timeout = setTimeout(() => setNotification(""), 8000);
      return () => clearTimeout(timeout);
    }
  }, [notification, setNotification]);

  const handleWhatsappClick = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      const missing = getMissingFields();
      setNotification(`${t.pleaseFillIn}: ${missing.join(", ")}`);
      return;
    }
    // Open WhatsApp if form is valid
    window.open(whatsappLink, "_blank");
  };
  return (
    <section id="booking" ref={bookingRef} className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-amber-50/40 to-orange-50/40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-amber-900 mb-3 sm:mb-4">
            {t.bookingTitle}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/70 border border-amber-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm">
          <p className="text-center text-amber-800 font-light mb-6 sm:mb-8 text-base sm:text-lg">
            {t.cash}
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
            {notification && (
              <div className={`rounded-lg p-3 sm:p-4 text-sm sm:text-base font-light flex justify-between items-start ${
                isSuccessNotification
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : isSendingNotification
                    ? "bg-yellow-100 border border-yellow-300 text-yellow-900"
                    : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                <span>{notification}</span>
                <button
                  onClick={() => setNotification("")}
                  className={`font-bold ml-2 cursor-pointer ${
                    isSuccessNotification
                      ? "text-green-500 hover:text-green-700"
                      : isSendingNotification
                        ? "text-yellow-700 hover:text-yellow-900"
                        : "text-red-500 hover:text-red-700"
                  }`}
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <input
                name="name"
                placeholder={t.fullname}
                value={form.name}
                onChange={handleChange}
                className="col-span-full bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
              />
              <input
                name="email"
                type="email"
                placeholder={t.email}
                value={form.email}
                onChange={handleChange}
                className="col-span-full md:col-span-1 bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
              />
              <input
                name="phone"
                type="tel"
                placeholder={t.phoneNumber}
                value={form.phone || ""}
                onChange={handleChange}
                className="col-span-full md:col-span-1 bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
              />
              <div className="col-span-full md:col-span-1">
                <label className="text-sm sm:text-base text-amber-600 mb-1 block text-center font-light">{t.checkIn}</label>
                <input
                  name="checkIn"
                  type="date"
                  value={form.checkIn}
                  onChange={handleChange}
                  min={today}
                  className="w-full bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
                />
              </div>
              <div className="col-span-full md:col-span-1">
                <label className="text-sm sm:text-base text-amber-600 mb-1 block text-center font-light">{t.checkOut}</label>
                <input
                  name="checkOut"
                  type="date"
                  value={form.checkOut}
                  onChange={handleChange}
                  min={form.checkIn}
                  className="w-full bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <input
                name="guests"
                type="number"
                placeholder={t.guests}
                value={form.guests}
                onChange={handleChange}
                min="1"
                className="bg-amber-50 border border-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
              />
              <select
                name="room"
                value={form.room}
                onChange={handleChange}
                className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
              >
                <option value="">{t.room}</option>
                <option>{t.roomSingleName}</option>
                <option>{t.roomDoubleName}</option>
                <option>{t.roomFamilyName}</option>
              </select>
            </div>

            <select
              name="tour"
              value={form.tour}
              onChange={handleChange}
              className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 font-light"
            >
              <option value="">{t.toursSelect}</option>
              <option value="none">{t.noTourOption}</option>
              <option value={t.bookingJeepFullDay}>{t.bookingJeepFullDay}</option>
              <option value={t.bookingJeepHalfDay}>{t.bookingJeepHalfDay}</option>
              <option value={t.bookingJeep3Hour}>{t.bookingJeep3Hour}</option>
              <option value={t.bookingJeep2Hour}>{t.bookingJeep2Hour}</option>
              <option value={t.bookingCamelSunrise}>{t.bookingCamelSunrise}</option>
              <option value={t.bookingCamelNight}>{t.bookingCamelNight}</option>
              <option value={t.bookingCamelOvernight}>{t.bookingCamelOvernight}</option>
              <option value={t.bookingHikingUmm}>{t.bookingHikingUmm}</option>
              <option value={t.bookingHikingBurdah}>{t.bookingHikingBurdah}</option>
            </select>

            <textarea
              name="message"
              placeholder={t.message}
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200 transition-all duration-200 resize-none font-light"
            />

            <div className="flex gap-4 flex-col sm:flex-row justify-center pt-4">
              <button
                type="submit"
                className={`py-3 px-8 rounded-xl transition-all duration-300 transform text-center font-light font-medium ${
                  isFormValid()
                    ? "bg-amber-900 hover:bg-amber-800 text-white hover:scale-105 cursor-pointer"
                    : "bg-amber-300 text-amber-700 cursor-not-allowed"
                }`}
              >
                {t.sendEmail}
              </button>
              <button
                type="button"
                onClick={handleWhatsappClick}
                className={`py-3 px-8 rounded-xl transition-all duration-300 transform text-center font-light flex items-center justify-center gap-2 font-medium ${
                  isFormValid()
                    ? "bg-green-600 hover:bg-green-700 text-white hover:scale-105 cursor-pointer"
                    : "bg-green-300 text-green-700 cursor-not-allowed"
                }`}
              >
                <FaWhatsapp size={20} />
                {t.whatsapp}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
