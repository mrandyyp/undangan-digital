const photos = [
  '/foto/galeri/1.webp',
  '/foto/galeri/foto-2.jpg',
  '/foto/galeri/foto-3.jpg',
  '/foto/galeri/foto-4.jpg',
  '/foto/galeri/foto-5.jpg',
  '/foto/galeri/foto-6.jpg',
];

export default function PhotoGallery() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Galeri Foto</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={photo}
                  alt={`Wedding photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
