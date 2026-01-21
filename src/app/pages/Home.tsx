import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <Hero />

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-fuchsia-500 via-pink-600 to-fuchsia-700 dark:from-fuchsia-400 dark:via-pink-500 dark:to-fuchsia-600 bg-clip-text text-transparent mb-4">{t('featured.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* CTA Section with Belgrade Panorama */}
      <section className="py-20 relative overflow-hidden min-h-[500px]">
        {/* Belgrade Panorama Background - LOWEST LAYER */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759662280507-424f675fbf82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxncmFkZSUyMHBhbm9yYW1hJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc2OTAxMTkyNHww&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Belgrade Panorama"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Neon Pink Color Overlay - MIDDLE LAYER */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/60 via-slate-950/50 to-black/60"></div>
        
        {/* Neon pink accent gradient overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-tr from-fuchsia-600/20 via-transparent to-pink-600/20"></div>
        
        {/* Animated glow effects */}
        <div className="absolute inset-0 z-[3] opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-500/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Content - TOP LAYER */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {t('cta.title')}
          </h2>
          <p className="text-gray-100 text-lg mb-8 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/browse"
              className="inline-block bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-fuchsia-400"
            >
              {t('cta.browse')}
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-fuchsia-600/50 hover:shadow-fuchsia-600/70 border-2 border-fuchsia-500/30 hover:scale-105"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}