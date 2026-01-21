import { Link } from 'react-router-dom';
import { Search, Building, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Hero() {
  const { t, language } = useLanguage();

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
    <div className="relative bg-gradient-to-br from-black via-slate-950 to-black dark:from-black dark:via-slate-900 dark:to-black overflow-hidden transition-colors h-full flex items-center">
      {/* Belgrade Panorama Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759662280507-424f675fbf82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxncmFkZSUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjkwMTE5ODd8MA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Belgrade Panorama"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/60 via-slate-950/50 to-black/60"></div>
      
      {/* Neon Pink Background Effects */}
      <div className="absolute inset-0 z-[2] opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-fuchsia-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[3] opacity-15 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(236, 72, 153) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-[4] bg-gradient-to-tr from-fuchsia-600/20 via-transparent to-pink-600/20"></div>

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
            <Building className="h-4 w-4 text-fuchsia-300 transition-colors duration-500 group-hover:text-fuchsia-200" />
            <span className="text-fuchsia-200 text-sm font-extralight transition-colors duration-500 hover:text-fuchsia-100">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] select-none" 
            style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.6), 0 2px 20px rgba(0,0,0,0.9)', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            onContextMenu={preventContextMenu}
          >
            {language === 'sr' && (
              <>
                Pravi <span 
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-fuchsia-300 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-fuchsia-200 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
                  onTouchStart={handleTouchFeedback}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >stepenik</span> između ponude{' '}
                {t('hero.headlineAccent')}
              </>
            )}
            {language === 'en' && (
              <>
                The right <span 
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-fuchsia-300 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-fuchsia-200 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
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
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-fuchsia-300 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-fuchsia-200 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
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
                  className="inline-block transition-all duration-700 ease-out hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:text-fuchsia-300 active:drop-shadow-[0_0_40px_rgba(236,72,153,1)] active:text-fuchsia-200 active:scale-110 cursor-default touch-manipulation animate-pulse-subtle select-none"
                  onTouchStart={handleTouchFeedback}
                  onContextMenu={preventContextMenu}
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                >adım</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-100 dark:text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/kupujem"
              className="w-full sm:w-56 bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-[0_0_0_3px_rgba(0,0,0,0.8),0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-pink-700"
            >
              <div className="flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>{t('hero.buying')}</span>
              </div>
            </Link>
            <Link
              to="/prodajem"
              className="w-full sm:w-56 bg-pink-500/30 hover:bg-pink-500/60 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-pink-700 shadow-[0_0_0_3px_rgba(0,0,0,0.8),0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.9)] hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>{t('hero.selling')}</span>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t-2 border-fuchsia-400/50 shadow-[0_-2px_20px_rgba(236,72,153,0.3)]">
            <div 
              className="transition-all duration-500 ease-out hover:scale-105 active:scale-110 cursor-default touch-manipulation select-none"
              onTouchStart={handleTouchFeedback}
              onContextMenu={preventContextMenu}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            >
              <div className="inline-flex items-center justify-center bg-pink-500/30 border-2 border-pink-700 rounded-xl px-6 py-3 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:bg-pink-500/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] transition-all duration-500">
                <div className="text-4xl font-extralight text-white" style={{ transition: 'all 0.5s ease-out' }}>2021</div>
              </div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-light mt-3">{t('hero.founded')}</div>
            </div>
            <div 
              className="transition-all duration-500 ease-out hover:scale-105 active:scale-110 cursor-default touch-manipulation select-none"
              onTouchStart={handleTouchFeedback}
              onContextMenu={preventContextMenu}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            >
              <div className="inline-flex items-center justify-center bg-pink-500/30 border-2 border-pink-700 rounded-xl px-6 py-3 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:bg-pink-500/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] transition-all duration-500">
                <div className="text-4xl font-extralight text-white" style={{ transition: 'all 0.5s ease-out', animationDelay: '0.3s' }}>150+</div>
              </div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-light mt-3">{t('hero.completedDeals')}</div>
            </div>
            <div 
              className="transition-all duration-500 ease-out hover:scale-105 active:scale-110 cursor-default touch-manipulation select-none"
              onTouchStart={handleTouchFeedback}
              onContextMenu={preventContextMenu}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            >
              <div className="inline-flex items-center justify-center bg-pink-500/30 border-2 border-pink-700 rounded-xl px-6 py-3 shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:bg-pink-500/60 hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] transition-all duration-500">
                <div className="text-4xl font-extralight text-white" style={{ transition: 'all 0.5s ease-out', animationDelay: '0.6s' }}>500+</div>
              </div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-light mt-3">{t('hero.legalSupport')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}