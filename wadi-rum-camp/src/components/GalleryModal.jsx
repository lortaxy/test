export default function GalleryModal({ expandedGallery, setExpandedGallery, gallery }) {
  if (expandedGallery === null) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setExpandedGallery(null)}>
      <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-black/10 backdrop-blur-sm rounded-2xl p-4">
          <img
            src={gallery[expandedGallery]}
            alt="Expanded Gallery"
            loading="lazy"
            className="w-full h-96 md:h-[600px] object-contain rounded-2xl"
          />
          <button
            onClick={() => setExpandedGallery(null)}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          <button
            onClick={() => setExpandedGallery((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setExpandedGallery((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            →
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setExpandedGallery(i)}
              className={`h-3 rounded-full transition-all ${i === expandedGallery ? "bg-white w-8" : "bg-white/50 w-3"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
