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

  const inputClass = "w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";
  const labelClass = "block text-sm font-medium text-foreground mb-2";

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-50 dark:bg-brand-900/30 text-primary rounded-2xl mb-6 shadow-sm">
            <Building2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('selling.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('selling.subtitle')}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg mb-12 transition-colors">
          {/* Form Header */}
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-border">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{t('selling.personalInfo')}</h2>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>
                {t('selling.name')} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('selling.namePlaceholder')}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                {t('selling.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('selling.phonePlaceholder')}
                className={inputClass}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                {t('selling.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('selling.emailPlaceholder')}
                className={inputClass}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-border">
            <Home className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{t('selling.propertyDetails')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>
                {t('selling.propertyType')}
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
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
              <label className={labelClass}>
                {t('selling.location')} *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t('selling.locationPlaceholder')}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                {t('selling.squareMeters')} *
              </label>
              <input
                type="text"
                name="squareMeters"
                value={formData.squareMeters}
                onChange={handleChange}
                placeholder={t('selling.squareMetersPlaceholder')}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                {t('selling.floor')}
              </label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder={t('selling.floorPlaceholder')}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                {t('selling.rooms')}
              </label>
              <input
                type="text"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                placeholder={t('selling.roomsPlaceholder')}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                {t('selling.price')}
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t('selling.pricePlaceholder')}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                {t('selling.additionalInfo')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('selling.messagePlaceholder')}
                className={`${inputClass} resize-none`}
              ></textarea>
            </div>
          </div>

          {/* Send Buttons */}
          <div className="space-y-4">
            <p className="text-center text-foreground font-semibold mb-4 flex items-center justify-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span>{t('selling.sendVia')}</span>
              <Star className="h-5 w-5 text-primary" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={sendWhatsApp}
                disabled={!isFormValid}
                className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('selling.whatsapp')}</span>
              </button>

              <button
                onClick={sendViber}
                disabled={!isFormValid}
                className="flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors shadow-sm"
              >
                <Phone className="h-5 w-5" />
                <span>{t('selling.viber')}</span>
              </button>

              <button
                onClick={sendEmail}
                disabled={!isFormValid}
                className="flex items-center justify-center space-x-3 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition-opacity shadow-sm"
              >
                <Mail className="h-5 w-5" />
                <span>{t('selling.emailButton')}</span>
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {t('selling.required')}
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">{t('selling.advantages')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary border border-border rounded-xl p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-50 dark:bg-brand-900/30 text-primary rounded-xl mb-3">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{t('selling.fastSale')}</div>
              <div className="text-muted-foreground">{t('selling.fastSaleText')}</div>
            </div>
            <div className="bg-secondary border border-border rounded-xl p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-50 dark:bg-brand-900/30 text-primary rounded-xl mb-3">
                <Euro className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{t('selling.bestPrice')}</div>
              <div className="text-muted-foreground">{t('selling.bestPriceText')}</div>
            </div>
            <div className="bg-secondary border border-border rounded-xl p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-50 dark:bg-brand-900/30 text-primary rounded-xl mb-3">
                <Star className="h-7 w-7" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{t('selling.legalSafety')}</div>
              <div className="text-muted-foreground">{t('selling.legalSafetyText')}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}