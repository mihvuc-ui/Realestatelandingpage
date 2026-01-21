import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ShoppingCart, TrendingUp, Phone } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { SEO } from '@/app/components/SEO';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="Nekretnine u Beogradu – Prodaja i Izdavanje Stanova"
        description="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova, kuće na prodaju. Preko 150 uspešno završenih poslova. Profesionalna pravna podrška."
        keywords="nekretnine Beograd, prodaja stanova Beograd, izdavanje stanova Beograd, stan na prodaju, stan za izdavanje, agencija za nekretnine Beograd, kuće na prodaju Srbija, nekretnine Srbija"
        canonical="/"
      />
      
      <div>
        {/* Hero Section */}
        <section className="h-screen flex flex-col">
          <Hero />
        </section>

        {/* Featured Listings */}
        <section className="h-screen py-20 bg-white dark:bg-black flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <section className="h-screen py-20 relative overflow-hidden flex items-center">
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
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Kupujem i Prodajem - Prvi red */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Link
                  to="/kupujem"
                  className="w-full sm:w-56 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-[0_0_0_3px_rgba(0,0,0,0.8),0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-fuchsia-400"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t('cta.buying')}</span>
                </Link>
                <Link
                  to="/prodajem"
                  className="w-full sm:w-56 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-[0_0_0_3px_rgba(0,0,0,0.8),0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.9)] border-2 border-pink-400 hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>{t('cta.selling')}</span>
                </Link>
              </div>
              {/* Kontaktirajte nas - Drugi red, centrirano */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full sm:w-[464px] inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-[0_0_0_3px_rgba(0,0,0,0.8),0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.9),0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-fuchsia-400 whitespace-nowrap"
              >
                <Phone className="h-5 w-5" />
                <span>{t('cta.contact')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </>
  );
}