import { Link } from 'react-router-dom';
import { Search, Building } from 'lucide-react';
import { useState } from 'react';
import { ContactModal } from '@/app/components/ContactModal';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950 dark:from-slate-950 dark:via-gray-900 dark:to-black overflow-hidden transition-colors">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(100, 100, 110) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/10 via-transparent to-purple-600/10 opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-8 shadow-sm">
            <Building className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.headline')}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent"> {t('hero.headlineAccent')}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/browse"
              className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-700 hover:via-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>{t('hero.viewListings')}</span>
              </div>
            </Link>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-slate-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold transition-all border border-rose-300 dark:border-slate-600 shadow-md hover:shadow-lg"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-600 dark:border-slate-700">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">2021</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.founded')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">150+</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.completedDeals')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">100%</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">{t('hero.legalSupport')}</div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}