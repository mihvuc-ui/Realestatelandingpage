import { X, Mail, MessageCircle, Phone } from 'lucide-react';

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartmentName?: string;
}

export function ScheduleViewingModal({ isOpen, onClose, apartmentName }: ScheduleViewingModalProps) {
  if (!isOpen) return null;

  const phone = '+38162671155';
  const phoneFormatted = '+381 62 671 155';
  const email = 'brankastepenik@gmail.com';
  const whatsappNumber = '38162671155'; // WhatsApp format (bez +)
  
  // WhatsApp poruka sa imenom stana ako postoji
  const whatsappMessage = apartmentName 
    ? `Zdravo, želim da zakažem razgledanje za: ${apartmentName}`
    : 'Zdravo, želim da zakažem razgledanje';
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const viberLink = `viber://chat?number=${phone}`;
  const emailSubject = apartmentName 
    ? `Zakazivanje razgledanja - ${apartmentName}` 
    : 'Zakazivanje razgledanja';
  const emailLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-fuchsia-200 dark:border-slate-800 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-fuchsia-500 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-500 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 rounded-full">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
          Zakažite Razgledanje
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Izaberite način kontakta
        </p>

        {/* Agent Info */}
        <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-4 mb-6 border border-fuchsia-100 dark:border-slate-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-1">
            Vaš agent
          </p>
          <p className="font-semibold text-gray-900 dark:text-white text-center text-lg">
            Branka Gojković
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-center text-sm mt-1">
            {phoneFormatted}
          </p>
        </div>

        {/* Contact Options */}
        <div className="space-y-3">
          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </a>

          {/* Viber */}
          <a
            href={viberLink}
            className="flex items-center justify-center space-x-3 w-full bg-[#7360F2] hover:bg-[#5F4DD1] text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Phone className="h-5 w-5" />
            <span>Viber</span>
          </a>

          {/* Email */}
          <a
            href={emailLink}
            className="flex items-center justify-center space-x-3 w-full bg-pink-500/30 hover:bg-pink-500/60 text-white py-3 rounded-lg font-semibold transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 border-2 border-pink-700"
          >
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </a>

          {/* Ili nazovite */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">ili pozovite direktno</p>
            <a 
              href={`tel:${phone}`}
              className="text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-500 font-semibold text-lg transition-colors"
            >
              {phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}