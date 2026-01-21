import { Hero } from '@/app/components/Hero';
import { FeaturedListings } from '@/app/components/FeaturedListings';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <Hero />

      {/* Featured Listings */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-fuchsia-700 dark:from-cyan-400 dark:via-fuchsia-500 dark:to-fuchsia-600 bg-clip-text text-transparent mb-4">{t('featured.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          <FeaturedListings />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 relative overflow-hidden">
        {/* Neon accent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-fuchsia-600/10 to-cyan-500/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/browse"
              className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/30"
            >
              {t('cta.browse')}
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-fuchsia-600/30 border-2 border-fuchsia-500/30"
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