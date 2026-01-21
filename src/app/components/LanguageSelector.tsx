import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

type Language = 'sr' | 'en' | 'ru' | 'tr';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
        aria-label="Izaberi jezik"
      >
        <span className="text-2xl">{currentLanguage?.flag}</span>
        <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-rose-200 dark:border-slate-800 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors ${
                language === lang.code ? 'bg-rose-50 dark:bg-slate-800' : ''
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-gray-900 dark:text-white font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}