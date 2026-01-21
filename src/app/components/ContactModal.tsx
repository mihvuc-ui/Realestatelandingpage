import { X, User, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-fuchsia-200 dark:border-slate-800 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-fuchsia-500 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-500 transition-colors z-10 p-2 hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/30 rounded-full"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 rounded-full">
            <Phone className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Kontaktirajte nas
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Pozovite nas za sve informacije
        </p>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 mb-6 border border-fuchsia-100 dark:border-slate-700">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Agent</p>
              <p className="font-semibold text-gray-900 dark:text-white">Branka Gojković</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400 mr-3" />
            <a 
              href="tel:+38162671155" 
              className="font-semibold text-lg text-gray-900 dark:text-white hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
            >
              +381 62 671 155
            </a>
          </div>
        </div>

        {/* Call Button */}
        <a
          href="tel:+38162671155"
          className="block w-full bg-pink-700 hover:bg-pink-600 text-white text-center py-3 rounded-lg font-semibold transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105"
        >
          Pozovi Odmah
        </a>
      </div>
    </div>
  );
}