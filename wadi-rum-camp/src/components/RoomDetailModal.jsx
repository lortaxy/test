export default function RoomDetailModal({
  t,
  selectedRoom,
  setSelectedRoom,
  roomImageIndex,
  setRoomImageIndex,
}) {
  if (!selectedRoom) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedRoom(null)}>
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img
            src={selectedRoom.images[roomImageIndex[selectedRoom.id] || 0]}
            alt={selectedRoom.name}
            loading="lazy"
            className="w-full h-64 object-contain bg-gray-100 rounded-t-2xl"
          />
          <button
            onClick={() => setSelectedRoom(null)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
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
              >
                →
              </button>
            </>
          )}
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-light text-amber-900 mb-2">{selectedRoom.name}</h2>
          <p className="text-amber-700 font-light mb-6">{selectedRoom.capacity}</p>
          <p className="text-amber-800 leading-relaxed font-light mb-6">{selectedRoom.description}</p>

          <div className="mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h3 className="text-sm font-medium text-amber-900 mb-2">{t.amenities}</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-1">
                {selectedRoom.amenities.map((amenity, i) => (
                  <li key={i} className="text-amber-800 font-light text-xs flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRoom.images.length > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {selectedRoom.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRoomImageIndex({ ...roomImageIndex, [selectedRoom.id]: i })}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === (roomImageIndex[selectedRoom.id] || 0) ? "bg-amber-900" : "bg-amber-300"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-amber-100 pt-6">
            <p className="text-3xl font-light text-amber-900">
              {selectedRoom.price} JOD <span className="text-lg font-light text-amber-700">{t.pricePerNight}</span>
            </p>
            <a
              href="#booking"
              onClick={() => setSelectedRoom(null)}
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
