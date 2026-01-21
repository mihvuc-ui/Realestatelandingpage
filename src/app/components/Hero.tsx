import { Link } from 'react-router-dom';
import { Search, Building } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 dark:from-black dark:via-cyan-950 dark:to-black overflow-hidden transition-colors">
      {/* Neon Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(6, 182, 212) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-600/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border-2 border-cyan-400/30 rounded-full px-4 py-2 mb-8 shadow-lg shadow-cyan-500/20">
            <Building className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-bold">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {t('hero.headline')}
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-fuchsia-600 bg-clip-text text-transparent"> {t('hero.headlineAccent')}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/browse"
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-black transition-all shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>{t('hero.viewListings')}</span>
              </div>
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-8 py-4 rounded-lg font-black transition-all border-2 border-fuchsia-500/30 shadow-lg shadow-fuchsia-600/40 hover:shadow-fuchsia-600/60"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-cyan-500/30">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-1">2021</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.founded')}</div>
            </div>
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 bg-clip-text text-transparent mb-1">150+</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.completedDeals')}</div>
            </div>
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-1">100%</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.legalSupport')}</div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}