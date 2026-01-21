import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ContactModal } from '@/app/components/ContactModal';
import { Logo } from '@/app/components/Logo';
import { LanguageSelector } from '@/app/components/LanguageSelector';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b-2 border-cyan-400 dark:border-fuchsia-600 transition-all duration-300 ${
      scrolled ? 'shadow-lg shadow-cyan-500/20 dark:shadow-fuchsia-600/20' : ''
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                isActive('/') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-semibold transition-colors ${
                isActive('/browse') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
              }`}
            >
              {t('nav.browse')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                isActive('/about') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
              }`}
            >
              {t('nav.about')}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-cyan-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-slate-700 transition-colors shadow-sm border-2 border-cyan-400/30 dark:border-cyan-500/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-fuchsia-600/30 hover:shadow-lg hover:shadow-fuchsia-600/40 border-2 border-fuchsia-500/30"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-400/30 dark:border-fuchsia-600/30">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/browse"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/browse') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {t('nav.browse')}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${
                  isActive('/about') ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {t('nav.about')}
              </Link>
              
              {/* Language Selector Mobile */}
              <div className="py-2">
                <LanguageSelector />
              </div>
              
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-sm py-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-semibold"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>{t('nav.lightTheme')}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>{t('nav.darkTheme')}</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 hover:from-fuchsia-700 hover:to-fuchsia-800 text-white px-4 py-2 rounded-lg text-sm font-bold text-center transition-all shadow-md shadow-fuchsia-600/30 border-2 border-fuchsia-500/30"
              >
                {t('nav.contact')}
              </button>
            </nav>
          </div>
        )}
      </nav>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </header>
  );
}