import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from '@/app/components/Logo';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-fuchsia-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo size="md" showTagline />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mb-4 mt-6">
              {t('footer.description')}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                <span>agencijastepenik@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                <span>+381 62 671-155</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
                <span>Cara Lazara 5, 11000 Beograd, Srbija</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.browse')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.buying')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.selling')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.renting')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors">
                  {t('footer.legal')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Stats Section */}
        <div className="mt-12 pt-8 border-t border-fuchsia-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-default transition-all">
              <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">2021</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors">{t('stats.yearFounded')}</div>
            </div>
            <div className="group cursor-default transition-all">
              <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">150+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors">{t('stats.completedDeals')}</div>
            </div>
            <div className="group cursor-default transition-all">
              <div className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">100%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-400 dark:group-hover:text-gray-500 transition-colors">{t('stats.legalSupport')}</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-fuchsia-200 dark:border-slate-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Nekretnine Stepenik. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}