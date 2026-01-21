import { useState } from 'react';
import { Home, MapPin, Euro, Maximize2, MessageCircle, Phone, Mail, TrendingUp, Building2, Zap, Star } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { toast } from 'sonner';

export function Prodajem() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    price: '',
    squareMeters: '',
    floor: '',
    rooms: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateMessage = () => {
    return `🏢 ${t('selling.title').toUpperCase()}

👤 ${t('selling.name')}: ${formData.name}
📱 ${t('selling.phone')}: ${formData.phone}
📧 ${t('selling.email')}: ${formData.email}

🏠 ${t('selling.propertyDetails')}:
• ${t('selling.propertyType')}: ${formData.propertyType}
• ${t('selling.location')}: ${formData.location}
• ${t('selling.squareMeters')}: ${formData.squareMeters}
• ${t('selling.floor')}: ${formData.floor}
• ${t('selling.rooms')}: ${formData.rooms}
• ${t('selling.price')}: ${formData.price}

💬 ${t('selling.additionalInfo')}:
${formData.message}`;
  };

  const phone = '+38162671155';
  const email = 'agencijastepenik@gmail.com';

  const sendWhatsApp = () => {
    const message = generateMessage();
    const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendViber = async () => {
    const message = generateMessage();
    
    try {
      // Copy message to clipboard
      await navigator.clipboard.writeText(message);
      
      // Show success notification with manual Viber open option
      toast.success('✅ Poruka je kopirana u clipboard!', {
        description: 'Otvori Viber i zalepi poruku pritiskom na Viber dugme ili dugme ispod',
        duration: 8000,
        action: {
          label: 'Otvori Viber',
          onClick: () => {
            // Try to open Viber when user clicks the button
            window.open(`viber://chat?number=${phone.replace(/\+/g, '')}`, '_blank');
          },
        },
      });
    } catch (err) {
      console.error('Clipboard error:', err);
      toast.error('❌ Greška pri kopiranju', {
        description: 'Molimo pokušajte ponovo ili kopirajte poruku ručno',
        duration: 5000,
      });
    }
  };

  const sendEmail = () => {
    const message = generateMessage();
    const subject = `${t('selling.title')} - ${formData.location}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  const isFormValid = formData.name && formData.phone && formData.location && formData.squareMeters;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 transition-colors relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-600 rounded-2xl mb-6 shadow-2xl shadow-fuchsia-500/50 animate-pulse">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            {t('selling.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('selling.subtitle')}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-fuchsia-500/30 mb-12 transition-colors relative">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
          
          <div className="relative">
            {/* Form Header */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b-2 border-fuchsia-500/30">
              <Zap className="h-6 w-6 text-fuchsia-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">{t('selling.personalInfo')}</h2>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('selling.namePlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('selling.phonePlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('selling.emailPlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b-2 border-fuchsia-500/30">
              <Home className="h-6 w-6 text-pink-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">{t('selling.propertyDetails')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.propertyType')}
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all cursor-pointer backdrop-blur-sm"
                >
                  <option value="">{t('selling.selectType')}</option>
                  <option value={t('selling.apartment')}>{t('selling.apartment')}</option>
                  <option value={t('selling.house')}>{t('selling.house')}</option>
                  <option value={t('selling.commercial')}>{t('selling.commercial')}</option>
                  <option value={t('selling.land')}>{t('selling.land')}</option>
                  <option value={t('selling.garage')}>{t('selling.garage')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t('selling.locationPlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.squareMeters')} *
                </label>
                <input
                  type="text"
                  name="squareMeters"
                  value={formData.squareMeters}
                  onChange={handleChange}
                  placeholder={t('selling.squareMetersPlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.floor')}
                </label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder={t('selling.floorPlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.rooms')}
                </label>
                <input
                  type="text"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder={t('selling.roomsPlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.price')}
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={t('selling.pricePlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all backdrop-blur-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-fuchsia-400 mb-3">
                  {t('selling.additionalInfo')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('selling.messagePlaceholder')}
                  className="w-full bg-slate-800/50 border-2 border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all resize-none backdrop-blur-sm"
                ></textarea>
              </div>
            </div>

            {/* Send Buttons */}
            <div className="space-y-4">
              <p className="text-center text-fuchsia-300 font-semibold mb-4 flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-fuchsia-400 animate-pulse" />
                <span>{t('selling.sendVia')}</span>
                <Star className="h-5 w-5 text-fuchsia-400 animate-pulse" />
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={sendWhatsApp}
                  disabled={!isFormValid}
                  className="relative group flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <MessageCircle className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{t('selling.whatsapp')}</span>
                </button>

                <button
                  onClick={sendViber}
                  disabled={!isFormValid}
                  className="relative group flex items-center justify-center space-x-3 bg-[#7360F2] hover:bg-[#5F4DD1] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 disabled:hover:scale-100 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <Phone className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{t('selling.viber')}</span>
                </button>

                <button
                  onClick={sendEmail}
                  disabled={!isFormValid}
                  className="relative group flex items-center justify-center space-x-3 bg-pink-500/30 hover:bg-pink-500/60 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden border-2 border-pink-700 disabled:border-gray-600"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <Mail className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">{t('selling.emailButton')}</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                {t('selling.required')}
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-fuchsia-600 via-pink-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl shadow-fuchsia-500/50 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <h3 className="text-2xl font-bold text-white mb-6 relative z-10">{t('selling.advantages')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 text-fuchsia-200" />
              <div className="text-3xl font-bold mb-2">{t('selling.fastSale')}</div>
              <div className="text-fuchsia-100">{t('selling.fastSaleText')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Euro className="h-12 w-12 mx-auto mb-3 text-pink-200" />
              <div className="text-3xl font-bold mb-2">{t('selling.bestPrice')}</div>
              <div className="text-fuchsia-100">{t('selling.bestPriceText')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Star className="h-12 w-12 mx-auto mb-3 text-purple-200" />
              <div className="text-3xl font-bold mb-2">{t('selling.legalSafety')}</div>
              <div className="text-fuchsia-100">{t('selling.legalSafetyText')}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}