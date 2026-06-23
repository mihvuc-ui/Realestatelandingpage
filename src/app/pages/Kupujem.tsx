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
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-50 dark:bg-brand-900/30 text-primary rounded-xl mb-6 shadow-sm">
            <Home className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t('buying.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('buying.subtitle')}
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg mb-12 transition-colors">
          <div className="relative">
            {/* Form Header */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-border">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t('buying.personalInfo')}</h2>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('buying.namePlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('buying.phonePlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('buying.emailPlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-border">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{t('buying.searchingFor')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.propertyType')}
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t('buying.locationPlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.budget')}
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder={t('buying.budgetPlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.rooms')}
                </label>
                <input
                  type="text"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder={t('buying.roomsPlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('buying.additionalInfo')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('buying.messagePlaceholder')}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            {/* Send Buttons */}
            <div className="space-y-4">
              <p className="text-center text-muted-foreground font-medium mb-4">
                {t('buying.sendVia')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={sendWhatsApp}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{t('buying.whatsapp')}</span>
                </button>

                <button
                  onClick={sendViber}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <Phone className="h-5 w-5" />
                  <span>{t('buying.viber')}</span>
                </button>

                <button
                  onClick={sendEmail}
                  disabled={!isFormValid}
                  className="flex items-center justify-center space-x-3 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-semibold transition-opacity shadow-sm"
                >
                  <Mail className="h-5 w-5" />
                  <span>{t('buying.emailButton')}</span>
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {t('buying.required')}
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">{t('buying.whyUs')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-50 dark:bg-brand-900/30 rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">{t('buying.completedDeals')}</div>
            </div>
            <div className="bg-brand-50 dark:bg-brand-900/30 rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">{t('buying.legalSupport')}</div>
            </div>
            <div className="bg-brand-50 dark:bg-brand-900/30 rounded-xl p-6">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t('buying.clientSupport')}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}