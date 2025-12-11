import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mt-12">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl text-gray-800 mb-2">Hitung Mundur Resepsi</h3>
        <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-1">
            {timeLeft.days}
          </div>
          <div className="text-gray-600 text-sm">Hari</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-1">
            {timeLeft.hours}
          </div>
          <div className="text-gray-600 text-sm">Jam</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-1">
            {timeLeft.minutes}
          </div>
          <div className="text-gray-600 text-sm">Menit</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-1">
            {timeLeft.seconds}
          </div>
          <div className="text-gray-600 text-sm">Detik</div>
        </div>
      </div>
    </div>
  );
}
