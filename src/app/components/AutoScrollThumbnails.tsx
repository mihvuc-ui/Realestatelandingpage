import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApartments } from '@/app/hooks/useApartments';

export function AutoScrollThumbnails() {
  const { apartments, loading } = useApartments();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingRef = useRef(false);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (loading || apartments.length === 0 || isPaused) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 88; // Širina thumbnail-a + gap (80px + 8px)

        // Skroluj za jedan thumbnail
        container.scrollLeft += scrollAmount;

        // Proveri da li smo stigli do kraja
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          // Vrati se na početak
          container.scrollLeft = 0;
        }
      }
    }, 2000); // Svakih 2 sekunde

    return () => clearInterval(scrollInterval);
  }, [loading, apartments.length, isPaused]);

  if (loading) {
    return <div className="text-center text-white py-4">Učitavam oglase...</div>;
  }

  if (apartments.length === 0) {
    return null;
  }

  // Dupliraj niz za beskonačan scroll efekat
  const displayApartments = [...apartments, ...apartments];

  const handleTouchStart = () => {
    isUserScrollingRef.current = true;
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    isUserScrollingRef.current = false;
    // Nastavi scroll nakon 3 sekunde od poslednjeg dodira
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const handleScroll = () => {
    // Ako korisnik manuelno skroluje, pauziraj auto-scroll
    if (isUserScrollingRef.current) {
      setIsPaused(true);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      resumeTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        {displayApartments.map((apartment, index) => (
          <Link
            key={`${apartment.id}-${index}`}
            to={`/listing/${apartment.id}`}
            className="flex-shrink-0 group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-pink-500/50 hover:border-pink-500">
              <img
                src={apartment.images[0]}
                alt={apartment.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="mt-1 text-center">
              <p className="text-xs text-white font-semibold drop-shadow-lg truncate max-w-[80px] sm:max-w-[96px]">
                €{apartment.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
