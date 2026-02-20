export default function RoomDetailModal({
  t,
  selectedRoom,
  setSelectedRoom,
  roomImageIndex,
  setRoomImageIndex,
}) {
  if (!selectedRoom) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto" onClick={() => setSelectedRoom(null)}>
      <div className="min-h-screen px-4 py-4 sm:py-8 flex items-start sm:items-center justify-center">
        <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <img
              src={selectedRoom.images[roomImageIndex[selectedRoom.id] || 0]}
              alt={selectedRoom.name}
              loading="lazy"
              className="w-full h-48 sm:h-64 object-cover rounded-t-xl sm:rounded-t-2xl"
            />
          <button
            onClick={() => setSelectedRoom(null)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close room details"
          >
            ✕
          </button>
          {selectedRoom.images.length > 1 && (
            <>
              <button
                onClick={() => {
                  const currentIndex = roomImageIndex[selectedRoom.id] || 0;
                  setRoomImageIndex({
                    ...roomImageIndex,
                    [selectedRoom.id]: currentIndex === 0 ? selectedRoom.images.length - 1 : currentIndex - 1,
                  });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous room image"
              >
                ←
              </button>
              <button
                onClick={() => {
                  const currentIndex = roomImageIndex[selectedRoom.id] || 0;
                  setRoomImageIndex({
                    ...roomImageIndex,
                    [selectedRoom.id]: currentIndex === selectedRoom.images.length - 1 ? 0 : currentIndex + 1,
                  });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next room image"
              >
                →
              </button>
            </>
          )}
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-amber-900 mb-2">{selectedRoom.name}</h2>
          <p className="text-sm sm:text-base text-amber-700 font-light mb-4 sm:mb-6">{selectedRoom.capacity}</p>
          <p className="text-sm sm:text-base text-amber-800 leading-relaxed font-light mb-4 sm:mb-6">{selectedRoom.description}</p>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-medium text-amber-900 mb-2.5 sm:mb-3">{t.amenities}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRoom.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs sm:text-sm text-amber-800 font-light"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {selectedRoom.images.length > 1 && (
            <div className="flex justify-center gap-2 mb-4 sm:mb-6">
              {selectedRoom.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRoomImageIndex({ ...roomImageIndex, [selectedRoom.id]: i })}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    i === (roomImageIndex[selectedRoom.id] || 0) ? "bg-amber-900" : "bg-amber-300"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-amber-100 pt-4 sm:pt-6">
            <p className="text-2xl sm:text-3xl font-light text-amber-900">
              {selectedRoom.price} JOD <span className="text-base sm:text-lg font-light text-amber-700">{t.pricePerNight}</span>
            </p>
            <a
              href="#booking"
              onClick={() => setSelectedRoom(null)}
              className="w-full sm:w-auto text-center bg-amber-900 hover:bg-amber-800 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300"
            >
              {t.bookNow}
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
