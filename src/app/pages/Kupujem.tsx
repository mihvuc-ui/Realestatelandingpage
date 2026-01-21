import { useState } from 'react';
import { Home, MapPin, Euro, Bed, MessageCircle, Phone, Mail, Send, Sparkles } from 'lucide-react';
import { Footer } from '@/app/components/Footer';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { toast } from 'sonner';

export function Kupujem() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    budget: '',
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
    return `🏠 ${t('buying.title').toUpperCase()}

👤 ${t('buying.name')}: ${formData.name}
📱 ${t('buying.phone')}: ${formData.phone}
📧 ${t('buying.email')}: ${formData.email}

🔍 ${t('buying.searchingFor')}:
• ${t('buying.propertyType')}: ${formData.propertyType}
• ${t('buying.location')}: ${formData.location}
• ${t('buying.budget')}: ${formData.budget}
• ${t('buying.rooms')}: ${formData.rooms}

💬 ${t('buying.additionalInfo')}:
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
    const subject = `${t('buying.title')} - ${formData.name}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  const isFormValid = formData.name && formData.phone && formData.location;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-white dark:from-slate-950 dark:via-fuchsia-950/20 dark:to-slate-950 py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl mb-6 shadow-2xl shadow-fuchsia-500/50">
            <Home className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('buying.title')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('buying.subtitle')}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-fuchsia-200 dark:border-fuchsia-500/30 mb-12 transition-colors">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuchsia-400/20 to-pink-400/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-fuchsia-400/20 rounded-full blur-3xl -z-10"></div>

          <div className="relative">
            {/* Form Header */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b-2 border-fuchsia-200 dark:border-fuchsia-500/30">
              <Sparkles className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('buying.personalInfo')}</h2>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('buying.namePlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('buying.phonePlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('buying.emailPlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b-2 border-fuchsia-200 dark:border-fuchsia-500/30">
              <MapPin className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('buying.searchingFor')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.propertyType')}
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all cursor-pointer"
                >
                  <option value="">{t('buying.selectType')}</option>
                  <option value={t('buying.apartment')}>{t('buying.apartment')}</option>
                  <option value={t('buying.house')}>{t('buying.house')}</option>
                  <option value={t('buying.commercial')}>{t('buying.commercial')}</option>
                  <option value={t('buying.land')}>{t('buying.land')}</option>
                  <option value={t('buying.garage')}>{t('buying.garage')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t('buying.locationPlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.budget')}
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder={t('buying.budgetPlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.rooms')}
                </label>
                <input
                  type="text"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder={t('buying.roomsPlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t('buying.additionalInfo')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('buying.messagePlaceholder')}
                  className="w-full bg-fuchsia-50 dark:bg-slate-800 border-2 border-fuchsia-200 dark:border-fuchsia-500/30 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Send Buttons */}
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-400 font-semibold mb-4">
                {t('buying.sendVia')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={sendWhatsApp}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{t('buying.whatsapp')}</span>
                </button>

                <button
                  onClick={sendViber}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-[#7360F2] hover:bg-[#5F4DD1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:scale-105 disabled:hover:scale-100"
                >
                  <Phone className="h-5 w-5" />
                  <span>{t('buying.viber')}</span>
                </button>

                <button
                  onClick={sendEmail}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-pink-500/30 hover:bg-pink-500/60 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none border-2 border-pink-700 disabled:border-gray-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>{t('buying.emailButton')}</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {t('buying.required')}
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-3xl p-8 text-center shadow-2xl shadow-fuchsia-500/50 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">{t('buying.whyUs')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-fuchsia-100">{t('buying.completedDeals')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-fuchsia-100">{t('buying.legalSupport')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-fuchsia-100">{t('buying.clientSupport')}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}