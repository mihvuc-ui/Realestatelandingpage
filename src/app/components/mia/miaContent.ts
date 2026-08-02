// Bilingvalni sadržaj i baza znanja za AI asistenta "Mia"

export type Lang = 'sr' | 'en';

export const CONTACT = {
  phone: '+38162671155',
  phoneFormatted: '+381 62 671 155',
  email: 'brankastepenik@gmail.com',
  whatsapp: '38162671155',
  agent: 'Branka Gojković',
  address: 'Cara Lazara 5, 11000 Beograd, Srbija',
  maps: 'https://www.google.com/maps/search/?api=1&query=Cara+Lazara+5,+11000+Beograd',
};

// Približan kurs za konverter (može se ažurirati)
export const EUR_RSD = 117.2;

export const UI = {
  sr: {
    title: 'Mia',
    subtitle: 'AI asistent za nekretnine',
    online: 'Dostupna 24/7',
    placeholder: 'Napišite poruku...',
    send: 'Pošalji',
    empty:
      '👋 Zdravo! Ja sam Mia, vaš AI asistent za nekretnine. Mogu da vam pomognem da pronađete savršenu nekretninu, odgovorim na pitanja ili zakažem razgledanje.',
    footer: 'Pokreće AI • Dostupno 24/7',
    typing: 'Mia kuca...',
    quicks: 'Brze opcije',
    call: 'Pozovi',
    whatsapp: 'WhatsApp',
    email: 'Email',
    location: 'Lokacija',
    viewDetails: 'Detalji',
    schedule: 'Zakaži razgledanje',
    save: 'Sačuvaj',
    saved: 'Sačuvano',
    share: 'Podeli',
    skip: 'Preskoči',
    any: 'Svejedno',
    newChat: 'Novi razgovor',
  },
  en: {
    title: 'Mia',
    subtitle: 'AI Real Estate Assistant',
    online: 'Available 24/7',
    placeholder: 'Type a message...',
    send: 'Send',
    empty:
      "👋 Welcome! I'm Mia, your AI Real Estate Assistant. I can help you find your perfect property, answer your questions, or schedule a viewing.",
    footer: 'Powered by AI • Available 24/7',
    typing: 'Mia is typing...',
    quicks: 'Quick options',
    call: 'Call',
    whatsapp: 'WhatsApp',
    email: 'Email',
    location: 'Location',
    viewDetails: 'View Details',
    schedule: 'Schedule Viewing',
    save: 'Save',
    saved: 'Saved',
    share: 'Share',
    skip: 'Skip',
    any: 'Any',
    newChat: 'New chat',
  },
} as const;

export interface QuickAction {
  id: string;
  label: string;
}

export const QUICK_ACTIONS: Record<Lang, QuickAction[]> = {
  sr: [
    { id: 'apartments', label: '🏢 Stanovi' },
    { id: 'houses', label: '🏡 Kuće' },
    { id: 'investment', label: '📈 Investicije' },
    { id: 'new', label: '✨ Novogradnja' },
    { id: 'schedule', label: '📅 Zakaži razgledanje' },
    { id: 'sell', label: '🏷️ Prodaj nekretninu' },
    { id: 'mortgage', label: '🧮 Kalkulator kredita' },
    { id: 'agent', label: '👤 Kontakt agent' },
  ],
  en: [
    { id: 'apartments', label: '🏢 Apartments' },
    { id: 'houses', label: '🏡 Houses' },
    { id: 'investment', label: '📈 Investment' },
    { id: 'new', label: '✨ New construction' },
    { id: 'schedule', label: '📅 Schedule viewing' },
    { id: 'sell', label: '🏷️ Sell my property' },
    { id: 'mortgage', label: '🧮 Mortgage calculator' },
    { id: 'agent', label: '👤 Contact agent' },
  ],
};

// Baza znanja: procedure, dokumentacija, porezi, pravni koraci, finansiranje
export const KB: Record<string, Record<Lang, string>> = {
  buying: {
    sr: `## Kupovina nekretnine 🏠
Proces vodimo za vas od početka do kraja:
• **Definisanje potreba** — budžet, lokacija, tip nekretnine
• **Odabir i razgledanje** — pripremamo listu i vodimo vas u obilazak
• **Provera dokumentacije** — pravna sigurnost i uknjižba
• **Kapara i predugovor** — obezbeđujemo uslove kupovine
• **Ugovor i overa** — kod javnog beležnika
• **Primopredaja i uknjižba** — predaja ključeva

Prosečno traje 30–60 dana. Želite da počnemo? 😊`,
    en: `## Buying a property 🏠
We guide you from start to finish:
• **Define your needs** — budget, location, property type
• **Selection & viewings** — we prepare a shortlist and tour with you
• **Document check** — legal safety and registration
• **Deposit & preliminary contract** — securing the terms
• **Contract & notarization** — at the notary public
• **Handover & registration** — keys handed over

Usually takes 30–60 days. Shall we start? 😊`,
  },
  selling: {
    sr: `## Prodaja nekretnine 🏷️
• **Procena tržišne vrednosti** — realna i konkurentna cena
• **Profesionalne fotografije i oglas** — na vodećim portalima
• **Marketing i organizacija razgledanja**
• **Pregovori sa kupcima** — u vašem interesu
• **Pravna podrška** — ugovor, overa, uknjižba

Pošaljite nam podatke o nekretnini i brzo je prodajemo po najboljoj ceni.`,
    en: `## Selling a property 🏷️
• **Market valuation** — a realistic, competitive price
• **Professional photos & listing** — on leading portals
• **Marketing & viewing organization**
• **Negotiations with buyers** — in your interest
• **Legal support** — contract, notarization, registration

Send us your property details and we'll sell it quickly at the best price.`,
  },
  renting: {
    sr: `## Izdavanje / Rentiranje 🔑
• Pronalazimo pouzdane zakupce ili idealan prostor za zakup
• Priprema ugovora o zakupu i evidencija
• Provera platežne sposobnosti zakupca
• Primopredaja sa zapisnikom

Recite mi da li tražite da iznajmite ili izdate nekretninu.`,
    en: `## Renting 🔑
• We find reliable tenants or the ideal space to rent
• Lease contract preparation and registration
• Tenant background & affordability check
• Handover with inventory report

Tell me whether you want to rent or lease out a property.`,
  },
  documentation: {
    sr: `## Potrebna dokumentacija 📑
• **Vlasnički list** (izvod iz katastra) — dokaz vlasništva
• **Osnov sticanja** — ugovor o kupoprodaji/nasleđu
• **Uverenje o izmirenim porezima**
• **Energetski pasoš** (za novije objekte)
• Lična dokumenta ugovornih strana

Ne brinite — mi proveravamo svu dokumentaciju umesto vas.`,
    en: `## Required documentation 📑
• **Title deed** (cadastre extract) — proof of ownership
• **Basis of acquisition** — sale/inheritance contract
• **Tax clearance certificate**
• **Energy certificate** (for newer buildings)
• ID documents of the parties

Don't worry — we verify all documentation for you.`,
  },
  taxes: {
    sr: `## Porezi 💶
• **Porez na prenos apsolutnih prava — 2,5%** (kod starogradnje, plaća kupac osim ako nije drugačije dogovoreno)
• **PDV 10%** kod prve prodaje novogradnje (umesto poreza na prenos)
• **Porez na imovinu** — godišnji, zavisi od zone i površine
• Prvi kupac stana može ostvariti **oslobođenje od PDV-a** uz uslove

Rado vam objasnimo šta se odnosi na vaš konkretan slučaj.`,
    en: `## Taxes 💶
• **Property transfer tax — 2.5%** (on older builds, paid by buyer unless agreed otherwise)
• **VAT 10%** on first sale of new construction (instead of transfer tax)
• **Annual property tax** — depends on zone and size
• First-time buyers may qualify for a **VAT refund** under conditions

We're happy to explain what applies to your specific case.`,
  },
  legal: {
    sr: `## Pravni koraci ⚖️
• Provera vlasništva i tereta (hipoteke, zabeležbe)
• Izrada predugovora i ugovora
• Overa kod javnog beležnika
• Uknjižba prava svojine u katastar

Naš pravni tim vas prati kroz ceo postupak radi potpune sigurnosti.`,
    en: `## Legal steps ⚖️
• Ownership & encumbrance check (mortgages, notes)
• Drafting preliminary and final contracts
• Notarization at the notary public
• Registration of ownership in the cadastre

Our legal team supports you throughout for complete safety.`,
  },
  financing: {
    sr: `## Finansiranje i krediti 🏦
• Stambeni krediti uz učešće od obično **10–20%**
• Rok otplate do 30 godina
• Pomažemo u pripremi dokumentacije za banku
• Mogu vam odmah izračunati okvirnu mesečnu ratu 🧮

Napišite „kalkulator" da izračunamo ratu.`,
    en: `## Financing & mortgages 🏦
• Home loans usually with a **10–20% down payment**
• Repayment up to 30 years
• We help prepare the documentation for the bank
• I can estimate your monthly instalment right away 🧮

Type "calculator" to estimate your instalment.`,
  },
};
