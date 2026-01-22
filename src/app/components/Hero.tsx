import { Link } from 'react-router-dom';
import { Search, Building, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Hero() {
  const { t, language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);

  // Haptic feedback function for mobile
  const handleTouchFeedback = (e: React.TouchEvent) => {
    e.preventDefault();
    // Vibrate for 50ms on touch (supported on most mobile devices)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Prevent context menu on long press
  const preventContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative bg-white dark:bg-gray-50 overflow-hidden transition-colors h-full flex items-center">
      {/* Belgrade Panorama Background Image - Day - Clean */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1733561589475-2492c96283f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxncmFkZSUyMGRheSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjkxMTI4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Belgrade Panorama"
          className="w-full h-full object-cover opacity-80"
        />
        {/* White fade overlay */}
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center space-x-2 bg-pink-500/30 border-2 border-pink-700 rounded-full px-4 py-2 mb-8 shadow-[0_0_10px_rgba(236,72,153,0.2)] backdrop-blur-sm transition-all duration-500 ease-out hover:bg-pink-500/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 active:bg-pink-500/70 active:shadow-[0_0_60px_rgba(236,72,153,1)] active:scale-110 cursor-default touch-manipulation select-none"
            onTouchStart={handleTouchFeedback}
            onContextMenu={preventContextMenu}
            onTouchEnd={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{ 
              WebkitTouchCallout: 'none', 
              WebkitUserSelect: 'none',
              touchAction: 'none',
              userSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            <Building className="h-4 w-4 text-pink-600 transition-colors duration-500 group-hover:text-pink-700" />
            <span className="text-gray-700 text-sm font-extralight transition-colors duration-500 hover:text-gray-800">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-700 dark:text-gray-700 mb-6 leading-tight select-none" 
            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            onContextMenu={preventContextMenu}
          >
            {language === 'sr' && (
              <>
                Pravi <span 
                  className="inline-flex relative cursor-default select-none"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onTouchStart={(e) => {
                    handleTouchFeedback(e);
                    setIsHovering(true);
                  }}
                  onTouchEnd={() => setIsHovering(false)}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >
                  {'stepenik'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-pink-400"
                      style={{
                        transform: isHovering ? `translateY(${index * -4}px)` : 'translateY(0)',
                        transitionDelay: isHovering ? `${index * 50}ms` : '0ms',
                        textShadow: isHovering ? '0 0 20px rgba(236, 72, 153, 0.8)' : 'none',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span> između ponude{' '}
                {t('hero.headlineAccent')}
              </>
            )}
            {language === 'en' && (
              <>
                The right <span 
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-pink-400 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-pink-300 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
                  onTouchStart={handleTouchFeedback}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >step</span> between offer{' '}
                {t('hero.headlineAccent')}
              </>
            )}
            {language === 'ru' && (
              <>
                Правильный <span 
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-pink-400 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-pink-300 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
                  onTouchStart={handleTouchFeedback}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >шаг</span> ежду{' '}
                {t('hero.headlineAccent')}
              </>
            )}
            {language === 'tr' && (
              <>
                Teklif ile {t('hero.headlineAccent')} arasında doğru <span 
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-pink-400 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-pink-300 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
                  onTouchStart={handleTouchFeedback}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >adım</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-700 dark:text-gray-700 mb-10 max-w-2xl mx-auto font-light">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/kupujem"
              className="w-full sm:w-56 bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-pink-700"
            >
              <div className="flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{t('hero.buying')}</span>
              </div>
            </Link>
            <Link
              to="/prodajem"
              className="w-full sm:w-56 bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-pink-700 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>{t('hero.selling')}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}