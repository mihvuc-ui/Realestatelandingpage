import { Building2, Target, Heart, Award, Users, Home as HomeIcon, Phone, Mail, Scale, FileCheck } from 'lucide-react';
import { Footer } from '@/app/components/Footer';

export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-500/10 rounded-xl mb-6 shadow-sm">
            <Building2 className="h-8 w-8 text-fuchsia-600 dark:text-fuchsia-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">O Agenciji Nekretnine Stepenik</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Vaš pouzdani partner u svetu nekretnina od 2021. godine
          </p>
        </div>

        {/* Company Story */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-fuchsia-200 dark:border-slate-800 mb-12 shadow-md transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Naša Priča</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Nekretnine Stepenik je agencija za nekretnine osnovana 2021. godine sa jasnom misijom: pružiti kompletnu, transparentnu i profesionalnu podršku svim klijentima koji žele da kupe, prodaju ili iznajme nekretninu.
            </p>
            <p>
              Ono što nas izdvaja je naš holistički pristup. Ne samo da pomažemo u pronalaženju savršene nekretnine, već vas <strong>pratimo od početka do kraja procesa</strong> - od prvog razgledanja, preko pregovaranja, pa sve do potpisivanja ugovora i predaje ključeva.
            </p>
            <p>
              Naš <strong>advokatski tim</strong> brine se o svim pravnim aspektima transakcije, što znači da možete biti potpuno sigurni da su vaša prava zaštićena i da nema skrivenih rizika. Pravna podrška je uključena u naše usluge - to nije dodatna stavka, već neodvojivi deo našeg pristupa.
            </p>
            <p>
              Za nepune pet godina rada, uspešno smo završili <strong>preko 150 poslova</strong> u prodaji i izdavanju nekretnina. Svaki zadovoljan klijent je za nas potvrda da radimo pravu stvar.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Naše Vrednosti</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-fuchsia-200 dark:border-slate-800 shadow-md transition-colors">
              <div className="bg-fuchsia-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Posvećenost</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Od prvog kontakta do predaje ključeva - tu smo za vas u svakom trenutku, sa potpunom pažnjom i profesionalizmom.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-fuchsia-200 dark:border-slate-800 shadow-md transition-colors">
              <div className="bg-pink-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Integritet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transparentnost i iskrenost u svakoj transakciji. Bez skrivenih troškova, bez iznenađenja - samo čista komunikacija.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-fuchsia-200 dark:border-slate-800 shadow-md transition-colors">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Stručnost</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Naš tim permanentno prati tržište i pravne propise, osiguravajući da dobijete najbolju moguću podršku i savete.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 rounded-xl p-8 text-center mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-8">Naši Rezultati</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">2021</div>
              <div className="text-fuchsia-100">Godina Osnivanja</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-fuchsia-100">Završenih Poslova</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-fuchsia-100">Pravna Podrška</div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-fuchsia-200 dark:border-slate-800 mb-12 shadow-md transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Šta Radimo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-fuchsia-500/10 p-2 rounded-lg flex-shrink-0">
                <HomeIcon className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Kupovina i Prodaja</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pomažemo vam da pronađete savršenu nekretninu ili prodate vašu po najboljoj ceni na tržištu.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-pink-500/10 p-2 rounded-lg flex-shrink-0">
                <Building2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Iznajmljivanje</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Pronađite idealan prostor za zakup ili iznajmite vašu nekretninu pouzdanim zakupcima.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500/10 p-2 rounded-lg flex-shrink-0">
                <Scale className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Pravna Podrška</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Naš advokatski tim obezbjeđuje da sve transakcije budu pravno bezbedne i u skladu sa zakonom.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-fuchsia-500/10 p-2 rounded-lg flex-shrink-0">
                <FileCheck className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Kompletna Administracija</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Vodimo računa o svim dokumentima, ugovorima i administrativnim procedurama umesto vas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Legal Support Matters */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-fuchsia-200 dark:border-slate-800 mb-12 shadow-md transition-colors">
          <div className="flex items-start space-x-4">
            <div className="bg-fuchsia-500/10 p-3 rounded-lg flex-shrink-0">
              <Scale className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Zašto Je Pravna Podrška Važna?</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Kupovina ili prodaja nekretnine je često najveća finansijska transakcija u životu. Pravni aspekti mogu biti kompleksni i rizični - od provere vlasništva i tereta na nepokretnosti, preko izrade i analize ugovora, do rešavanja imovinsko-pravnih odnosa i predaje poseda. Jedna greška ili previd može da vas košta desetine hiljada evra ili da dovede do dugotrajnih sudskih sporova.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>U saradnji sa advokatskom kancelarijom Bisevac</strong>, pratimo svaki korak vaše transakcije - od provere dokumentacije u katastarskim evidencijama, preko izrade i pregleda svih ugovora, pa sve do registracije prava svojine u katastru nepokretnosti. Naši pravni stručnjaci brinu se o tome da nema skrivenih dugova, hipoteka ili drugih tereta koji bi mogli ugroziti vašu kupovinu.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Pravna podrška nije dodatna stavka na računu - ona je srce naše usluge i razlog zašto naši klijenti mogu mirno da spavaju znajući da je njihova investicija potpuno zaštićena. Zato kažemo: <em>"Svaki stepenik prema vašem novom domu gradimo sa pravnom sigurnošću."</em>
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-fuchsia-200 dark:border-slate-800 text-center shadow-md transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontaktirajte Nas</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Spremni smo da odgovorimo na vaša pitanja i pomognemo vam da pronađete savršenu nekretninu. Pozovite nas ili pošaljite email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+38162671155"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>+381 62 671-155</span>
            </a>
            <a
              href="mailto:agencijastepenik@gmail.com"
              className="inline-flex items-center space-x-2 bg-fuchsia-50 dark:bg-slate-800 hover:bg-fuchsia-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg transition-colors border border-fuchsia-200 dark:border-slate-700 shadow-sm"
            >
              <Mail className="h-4 w-4" />
              <span>agencijastepenik@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}