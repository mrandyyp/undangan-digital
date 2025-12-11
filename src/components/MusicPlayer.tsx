import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

interface MusicPlayerProps {
  autoplay?: boolean;
}

export default function MusicPlayer({ autoplay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/musik.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.addEventListener('loadeddata', () => {
      setIsLoaded(true);
    });

    if (autoplay) {
      playMusic();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (autoplay && isLoaded) {
      playMusic();
    }
  }, [autoplay, isLoaded]);

  const playMusic = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play failed:', error);
      });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-8 right-8 z-50 bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all group"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div className="relative">
        {isPlaying ? (
          <>
            <Pause className="w-6 h-6" />
            <Music className="w-3 h-3 absolute -top-1 -right-1 animate-pulse" />
          </>
        ) : (
          <Play className="w-6 h-6" />
        )}
      </div>
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      </span>
    </button>
  );
}
