export default function AboutSection({ t, aboutParagraphs }) {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-amber-900 mb-4">
            {t.about}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-300 to-orange-300 mx-auto rounded-full"></div>
        </div>
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-100">
          <div className="space-y-5">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed text-amber-900 font-light">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="text-sm md:text-base text-amber-700 font-light mt-4 text-center">
            {t.licensedText}
          </p>
        </div>
      </div>
    </section>
  );
}
