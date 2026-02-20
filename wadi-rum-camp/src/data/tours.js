export const getTourDetails = (t) => {
  const minPrice = (pricing) =>
    Array.isArray(pricing) && pricing.length > 0
      ? Math.min(...pricing.map((tier) => tier.price))
      : null;

  const defaultCamelPricing = [
    { guests: "Sunrise/Sunset Ride", price: 20 },
    { guests: "Night Ride", price: 15 },
    { guests: "Half-Day Overnight (1 person)", price: 75 },
    { guests: "Half-Day Overnight (2-4 people)", price: 50 },
  ];

  return [
    {
      id: 0,
      name: t.trips[0],
      pricing: t.tourJeepPricing,
      privateTourNote: t.tourPrivateTourNote,
      duration: t.tourJeepDuration,
      description: t.tourJeepDesc,
      includes: t.tourJeepIncludes,
      excluded: t.tourJeepExcluded,
      highlights: t.tourJeepHighlights,
      price: minPrice(t.tourJeepPricing) ?? 0,
    },
    {
      id: 1,
      name: t.trips[1],
      pricing: t.tourCamelPricing ?? defaultCamelPricing,
      privateTourNote: t.tourCamelPrivateTourNote,
      duration: t.tourCamelDuration,
      description: t.tourCamelDesc,
      includes: t.tourCamelIncludes,
      excluded: t.tourCamelExcluded,
      highlights: t.tourCamelHighlights,
      price: minPrice(t.tourCamelPricing ?? defaultCamelPricing) ?? 0,
    },
    {
      id: 2,
      name: t.tourHikingTitle,
      pricing: t.tourHikingPricing,
      duration: t.tourHikingDuration,
      description: t.tourHikingDesc,
      includes: t.tourHikingIncludes,
      excluded: t.tourHikingExcluded,
      highlights: t.tourHikingHighlights,
      price: minPrice(t.tourHikingPricing) ?? 0,
    },
  ];
};
