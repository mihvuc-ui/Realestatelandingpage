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
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                isActive('/') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/browse"
              className={`text-sm transition-colors ${
                isActive('/browse') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.browse')}
            </Link>
            <Link
              to="/about"
              className={`text-sm transition-colors ${
                isActive('/about') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t('nav.about')}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-rose-100 dark:bg-slate-800 text-rose-600 dark:text-gray-300 hover:bg-rose-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
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
          <div className="md:hidden py-4 border-t border-rose-200 dark:border-slate-800">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/browse"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/browse') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('nav.browse')}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  isActive('/about') ? 'text-rose-600 dark:text-rose-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
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
                className="flex items-center space-x-2 text-sm py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm text-center transition-all shadow-md"
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