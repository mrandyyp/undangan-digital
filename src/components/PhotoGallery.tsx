import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const photos = [
  '/foto/galeri/1.webp',
  '/foto/galeri/2.webp',
  '/foto/galeri/3.webp',
  '/foto/galeri/4.webp',
  '/foto/galeri/5.webp',
  '/foto/galeri/6.webp',
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Galeri Foto</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-[2/3] overflow-hidden">
            <div className="relative h-full">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateY(${(index - currentIndex) * 100}%)`,
                  }}
                >
                  <img
                    src={photo}
                    alt={`Wedding photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronUp className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 p-4 bg-gradient-to-b from-transparent to-rose-50">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? 'w-8 bg-rose-500'
                    : 'w-2 bg-gray-300 hover:bg-rose-300'
                  }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
