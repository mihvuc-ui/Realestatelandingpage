import { Link } from 'react-router-dom';
import { Search, Building } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-black via-slate-950 to-black dark:from-black dark:via-slate-900 dark:to-black overflow-hidden transition-colors">
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
          <div className="inline-flex items-center space-x-2 bg-fuchsia-500/20 border-2 border-fuchsia-400/50 rounded-full px-4 py-2 mb-8 shadow-lg shadow-fuchsia-500/30 backdrop-blur-sm">
            <Building className="h-4 w-4 text-fuchsia-300" />
            <span className="text-fuchsia-200 text-sm font-black">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.6), 0 2px 20px rgba(0,0,0,0.9)' }}>
            {t('hero.headline')}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"> {t('hero.headlineAccent')}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-100 dark:text-gray-200 mb-10 max-w-2xl mx-auto font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/browse"
              className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-fuchsia-400"
            >
              <div className="flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>{t('hero.viewListings')}</span>
              </div>
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-lg font-black transition-all border-2 border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t-2 border-fuchsia-400/50 shadow-[0_-2px_20px_rgba(236,72,153,0.3)]">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}>2021</div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-semibold">{t('hero.founded')}</div>
            </div>
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}>150+</div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-semibold">{t('hero.completedDeals')}</div>
            </div>
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}>100%</div>
              <div className="text-sm text-gray-200 dark:text-gray-300 font-semibold">{t('hero.legalSupport')}</div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}