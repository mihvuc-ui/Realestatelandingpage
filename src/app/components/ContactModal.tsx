import { X, Phone, User } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-cyan-500/20 dark:shadow-fuchsia-600/20 max-w-md w-full p-8 border-2 border-cyan-400 dark:border-fuchsia-600 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-500 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 rounded-full">
            <Phone className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          {t('contact.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Pozovite nas za sve informacije
        </p>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 mb-6 border border-rose-100 dark:border-slate-700">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.agent')}</p>
              <p className="font-semibold text-gray-900 dark:text-white">Branka Gojković</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-3" />
            <a 
              href="tel:+38162671155" 
              className="font-semibold text-lg text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              +381 62 671 155
            </a>
          </div>
        </div>

        {/* Call Button */}
        <a
          href="tel:+38162671155"
          className="block w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white text-center py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          Pozovi Odmah
        </a>
      </div>
    </div>
  );
}