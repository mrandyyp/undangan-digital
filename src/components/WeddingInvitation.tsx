import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MapPin, Calendar, Clock, User, Users, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PhotoGallery from './PhotoGallery';
import CountdownTimer from './CountdownTimer';
import CommentsSection from './CommentsSection';
import MusicPlayer from './MusicPlayer';

export default function WeddingInvitation() {
  const { guestName } = useParams<{ guestName: string }>();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formatGuestName = (name: string | undefined) => {
    if (!name) return 'Tamu Undangan';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedGuestName = formatGuestName(guestName);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToCalendar = () => {
    const title = 'Resepsi Pernikahan Pian & Sintia';
    const description = 'Resepsi Pernikahan Sofyan Dwi Cahyo (Pian) & Sintia Diah Pitaloka (Sintia)';
    const location = 'Jln. M. Yunus Gg. Duku RT. 06 Kel. Waykandis, Kec. Tanjungseneng Bandarlampung';
    const startDate = '20260117T080000';
    const endDate = '20260117T170000';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;

    window.open(googleCalendarUrl, '_blank');
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/foto/hero.jpg')] bg-cover bg-center opacity-20"></div>

        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <Mail className="w-20 h-20 mx-auto text-white drop-shadow-lg animate-bounce" />
          </div>

          <div className="mb-6">
            <p className="text-white/90 text-sm uppercase tracking-widest mb-2">Undangan Pernikahan</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-2 drop-shadow-lg">
              Pian <span className="text-rose-200">&</span> Sintia
            </h1>
            <p className="text-white/90 text-lg">17 Januari 2026</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md mx-auto mb-8">
            <p className="text-gray-600 text-sm mb-2">Kepada Yth.</p>
            <p className="font-semibold text-2xl text-gray-800 mb-4">{formattedGuestName}</p>
            <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-white text-rose-600 font-semibold py-4 px-10 rounded-full shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-3 hover:shadow-rose-300/50"
          >
            <Mail className="w-5 h-5" />
            Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Music Player */}
      <MusicPlayer autoplay={true} />

      {/* Hero Section */}
      <section className={`relative h-screen flex items-end justify-center overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/95 z-10"></div>
        <div className="absolute inset-0 bg-[url('header.webp')] bg-cover bg-center"></div>

        <div className="relative z-20 text-center px-6 pb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-gray-800 mb-4">
            Pian <span className="text-rose-500">&</span> Sintia
          </h1>
          <p className="text-gray-600 text-lg mb-8">17 Januari 2026</p>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md mx-auto">

            <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 text-sm leading-relaxed italic mb-3">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <p className="text-gray-600 text-xs font-medium">
              (QS. Ar-Rum: 21)
            </p>
          </div>
        </div>
      </section>

      {/* Bride & Groom Info */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Mempelai</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg">
              <img
                src="pian.jpg"
                alt="Sofyan Dwi Cahyo (Pian)"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-rose-200', 'to-rose-300', 'flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                    parent.appendChild(icon);
                  }
                }}
              />
            </div>
            <h3 className="font-serif text-2xl text-gray-800 mb-2">Sofyan Dwi Cahyo</h3>
            <p className="text-rose-500 font-medium mb-4">(Pian)</p>
            <div className="text-gray-600 space-y-2 text-sm">
              <p>Putra ke-2 dari</p>
              <p className="font-medium">Bapak Aan Ansori</p>
              <p>&</p>
              <p className="font-medium">Ibu Purnamawati</p>
            </div>
          </div>

          {/* Bride */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg">
              <img
                src="sintia.jpg"
                alt="Sintia Diah Pitaloka (Sintia)"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-rose-200', 'to-rose-300', 'flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                    parent.appendChild(icon);
                  }
                }}
              />
            </div>
            <h3 className="font-serif text-2xl text-gray-800 mb-2">Sintia Diah Pitaloka</h3>
            <p className="text-rose-500 font-medium mb-4">(Sintia)</p>
            <div className="text-gray-600 space-y-2 text-sm">
              <p>Putri ke-2 dari</p>
              <p className="font-medium">Bapak Sumarno</p>
              <p>&</p>
              <p className="font-medium">Ibu Siti Anisa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Event Details */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-gray-800 mb-2">Waktu & Tempat</h2>
            <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Akad Nikah */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl text-gray-800 mb-2">Akad Nikah</h3>
                <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5 text-rose-500" />
                  <span className="text-gray-700">Sabtu, 10 Januari 2026</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <span className="text-gray-700">10.00 WIB</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <span className="text-gray-700">Lampung Selatan</span>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl mb-2">Resepsi</h3>
                <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Sabtu, 17 Januari 2026</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>08.00 WIB s/d Selesai</span>
                </div>
                <div className="flex items-start justify-center gap-3 text-center">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="text-sm">Jln. M. Yunus Gg. Duku RT. 06 Kel. Waykandis, Kec. Tanjungseneng Bandarlampung</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>Musik</span>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <CountdownTimer targetDate="2026-01-17T08:00:00" />

          {/* Add to Calendar Button */}
          <div className="text-center mt-8">
            <button
              onClick={addToCalendar}
              className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Tambahkan ke Kalender
            </button>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl text-gray-800 mb-2">Lokasi Acara</h2>
          <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63455.12345678901!2d105.12345678901234!3d-5.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDcnMjQuNCJTIDEwNcKwMDcnMjQuNCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-6 text-center">
            <a
              href="https://maps.app.goo.gl/1MWwrQKMWsFE2rbC7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Special Guests */}
      <section className="py-16 px-6 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-gray-800 mb-2">Turut Mengundang</h2>
            <div className="w-20 h-1 bg-rose-500 mx-auto rounded-full"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ul className="text-center space-y-3 text-gray-700">
              <li className="font-medium">Hendarsam Marantoko Inisiator Group</li>
              <li className="font-medium">Keluarga Besar Kedua Mempelai</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <CommentsSection defaultName={formattedGuestName} />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-12 px-6 text-center">
        <Heart className="w-12 h-12 mx-auto mb-4 fill-white" />
        <p className="font-serif text-2xl mb-4">Pian & Sintia</p>
        <p className="text-rose-100 text-sm">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>
        <p className="mt-6 text-rose-100 text-sm">
          Atas kehadiran dan doa restunya, kami ucapkan terima kasih.
        </p>
      </footer>
    </div>
  );
}
