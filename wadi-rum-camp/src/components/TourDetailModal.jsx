export default function TourDetailModal({
  t,
  selectedTour,
  setSelectedTour,
  selectedJeepVariant,
  setSelectedJeepVariant,
  selectedHikingVariant,
  setSelectedHikingVariant,
  gallery,
}) {
  if (!selectedTour) return null;

  const isJeep = selectedTour.id === 0;
  const isHiking = selectedTour.id === 2;

  const jeepData =
    selectedJeepVariant === "half"
      ? {
          name: t.tourJeepHalfNightTitle,
          duration: t.tourJeepHalfNightTitle,
          description: t.tourJeepHalfNightDesc,
          pricing: t.tourJeepHalfNightPricing,
          privateNote: t.tourJeepHalfNightPrivateNote,
          includes: t.tourJeepHalfNightIncludes ?? t.tourJeepIncludes,
          excluded: t.tourJeepExcluded,
          highlights: t.tourJeepHalfNightHighlights ?? t.tourJeepHighlights,
        }
      : selectedJeepVariant === "short"
        ? {
            name: t.tourJeepShortTitle,
            duration: t.tourJeepShortTitle,
            description: t.tourJeepShortDesc,
            pricing: t.tourJeepShortPricing,
            privateNote: t.tourJeepShortPrivateNote,
            includes: t.tourJeepShortIncludes ?? t.tourJeepIncludes,
            excluded: t.tourJeepExcluded,
            highlights: t.tourJeepShortHighlights ?? t.tourJeepHighlights,
          }
        : selectedJeepVariant === "2hour"
          ? {
              name: t.tourJeep2HourTitle,
              duration: t.tourJeep2HourTitle,
              description: t.tourJeep2HourDesc,
              pricing: t.tourJeep2HourPricing,
              privateNote: t.tourJeep2HourPrivateNote,
              includes: t.tourJeep2HourIncludes,
              excluded: t.tourJeepExcluded,
              highlights: t.tourJeep2HourHighlights,
            }
          : {
              name: "Full Day Adventure & 1 Night",
              duration: t.tourJeepDuration,
              description: t.tourJeepDesc,
              pricing: t.tourJeepPricing,
              privateNote: t.tourPrivateTourNote,
              includes: t.tourJeepIncludes,
              excluded: t.tourJeepExcluded,
              highlights: t.tourJeepHighlights,
            };

  const hikingData =
    selectedHikingVariant === "burdah"
      ? {
          name: t.tourHikingBurdahTitle,
          description: t.tourHikingBurdahDesc,
          pricing: t.tourHikingBurdahPricing,
          includes: t.tourHikingBurdahIncludes,
          excluded: t.tourHikingBurdahExcluded,
          highlights: t.tourHikingBurdahHighlights,
        }
      : {
          name: t.tourHikingTitle,
          description: t.tourHikingDesc,
          pricing: t.tourHikingPricing,
          includes: t.tourHikingIncludes,
          excluded: t.tourHikingExcluded,
          highlights: t.tourHikingHighlights,
        };

  const displayName = isJeep ? selectedTour.name : isHiking ? t.trips[2] : selectedTour.name;
  const displayDuration = isJeep ? jeepData.name : isHiking ? hikingData.name : selectedTour.duration;
  const displayDesc = isJeep ? jeepData.description : isHiking ? hikingData.description : selectedTour.description;
  const displayPricing = isJeep ? jeepData.pricing : isHiking ? hikingData.pricing : selectedTour.pricing;
  const displayPrivateNote = isJeep ? jeepData.privateNote : selectedTour.id === 1 ? null : selectedTour.privateTourNote;
  const displayIncludes = isJeep ? jeepData.includes : isHiking ? hikingData.includes : selectedTour.includes;
  const displayExcluded = isJeep ? jeepData.excluded : isHiking ? hikingData.excluded : selectedTour.excluded;
  const displayHighlights = isJeep ? jeepData.highlights : isHiking ? hikingData.highlights : selectedTour.highlights;

  const pricingValues = Array.isArray(displayPricing)
    ? displayPricing.map((tier) => tier.price).filter((price) => typeof price === "number")
    : [];

  const isCamel = selectedTour.id === 1;
  const minValue = pricingValues.length ? Math.min(...pricingValues) : null;
  const maxValue = pricingValues.length ? Math.max(...pricingValues) : null;
  const rangeMin = isCamel ? Math.min(minValue ?? 15, 15) : minValue;
  const rangeMax = isCamel ? Math.max(maxValue ?? 75, 75) : maxValue;

  const priceRange =
    rangeMin !== null && rangeMax !== null
      ? `${rangeMin}-${rangeMax} JOD`
      : `${selectedTour.price} JOD`;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedTour(null)}>
      <div className="bg-white rounded-2xl max-w-5xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img
            src={selectedTour.id === 1 ? "/WhatsApp Image 2026-01-29 at 15.24.14 (1).jpeg" : gallery[selectedTour.id]}
            alt={displayName}
            loading="lazy"
            className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
          />
          <button
            onClick={() => setSelectedTour(null)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-amber-900">{displayName}</h2>
              <p className="text-amber-700 font-light">{displayDuration}</p>
            </div>

            {isJeep && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedJeepVariant("full")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedJeepVariant === "full"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  Full Day & 1 Night
                </button>
                <button
                  onClick={() => setSelectedJeepVariant("half")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedJeepVariant === "half"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  Half-Day & 1 Night
                </button>
                <button
                  onClick={() => setSelectedJeepVariant("short")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedJeepVariant === "short"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  3 Hour & 1 Night
                </button>
                <button
                  onClick={() => setSelectedJeepVariant("2hour")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedJeepVariant === "2hour"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  2 Hour Tour
                </button>
              </div>
            )}
            {isHiking && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedHikingVariant("umm")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedHikingVariant === "umm"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  Jabal Umm Addamy & 1 Night
                </button>
                <button
                  onClick={() => setSelectedHikingVariant("burdah")}
                  className={`px-3 py-2.5 rounded-lg text-xs font-light transition-all ${
                    selectedHikingVariant === "burdah"
                      ? "bg-amber-900 text-white"
                      : "bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  Burdah Arch Hike & 1 Night
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <p className="text-amber-800 leading-relaxed font-light text-sm">{displayDesc}</p>

              {displayPricing && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-lg font-light text-amber-900 mb-3">{t.pricing}</h3>
                  <div className="space-y-2 mb-3">
                    {displayPricing.map((tier, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-amber-800 font-light text-sm">{tier.guests}</span>
                        <span className="text-amber-900 font-medium">{tier.price} JOD {t.perPerson}</span>
                      </div>
                    ))}
                  </div>
                  {displayPrivateNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2">💡 {displayPrivateNote}</p>
                  )}
                  {isJeep && selectedJeepVariant === "full" && t.childrenPricingNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2 mt-2">👶 {t.childrenPricingNote}</p>
                  )}
                  {isJeep && selectedJeepVariant === "half" && t.tourJeepHalfNightChildrenNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2 mt-2">👶 {t.tourJeepHalfNightChildrenNote}</p>
                  )}
                  {isJeep && selectedJeepVariant === "short" && t.tourJeepShortChildrenNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2 mt-2">👶 {t.tourJeepShortChildrenNote}</p>
                  )}
                  {isJeep && selectedJeepVariant === "2hour" && t.tourJeep2HourChildrenNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2 mt-2">👶 {t.tourJeep2HourChildrenNote}</p>
                  )}
                  {!isJeep && selectedTour.id === 1 && t.tourCamelChildrenNote && (
                    <p className="text-amber-700 text-xs font-light border-t border-amber-200 pt-2 mt-2">👶 {t.tourCamelChildrenNote}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h3 className="text-sm font-medium text-amber-900 mb-2">{t.includes}</h3>
                  <ul className="space-y-1">
                    {displayIncludes.map((item, i) => (
                      <li key={i} className="text-amber-800 font-light text-xs flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <h3 className="text-sm font-medium text-amber-900 mb-2">{t.highlights}</h3>
                  <ul className="grid grid-cols-2 gap-1">
                    {displayHighlights.map((item, i) => (
                      <li key={i} className="text-amber-800 font-light text-xs flex items-start">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {displayExcluded && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-amber-900 mb-2">{t.excludes}</h3>
                    <ul className="space-y-1">
                      {displayExcluded.map((item, i) => (
                        <li key={i} className="text-amber-800 font-light text-xs flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-amber-100 pt-4">
            {displayPricing ? (
              <p className="text-base font-light text-amber-700">
                {t.pricing}: <span className="text-amber-900 font-medium">{priceRange}</span> {t.perPerson}
              </p>
            ) : (
              <p className="text-2xl font-light text-amber-900">
                {selectedTour.price} JOD <span className="text-base font-light text-amber-700">{t.perPerson}</span>
              </p>
            )}
            <a
              href="#booking"
              onClick={() => setSelectedTour(null)}
              className="bg-amber-900 hover:bg-amber-800 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300"
            >
              {t.bookNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
