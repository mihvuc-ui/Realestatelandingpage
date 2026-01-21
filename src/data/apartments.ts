export interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  type: 'sale' | 'rent';
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images: string[];
  featured?: boolean;
  floor?: string;
  heating?: string;
  parking?: string;
  yearRenovated?: string;
  orientation?: string;
  furnished?: string;
  distanceToRiver?: string;
}

export const apartments: Apartment[] = [
  {
    id: '1',
    name: 'Dvosoban stan - Nehruova, Savski blokovi',
    location: 'Novi Beograd - Nehruova, Savski blokovi',
    price: 175000,
    type: 'sale',
    squareMeters: 65,
    bedrooms: 2,
    bathrooms: 1,
    floor: '4/4',
    heating: 'Centralno',
    parking: 'Javni parking ispred zgrade',
    yearRenovated: '2008',
    orientation: 'Dvostrano orijentisan',
    furnished: 'Sa ili bez nameštaja (po dogovoru)',
    distanceToRiver: '350m',
    description: `Ako tražite stan na lokaciji koja spaja udobnost, odličnu povezanost i sve sadržaje potrebne za savremen život, ovo je prava prilika za vas. U ponudi je dvostrano orijentisan, dvosoban stan sa pripojenom terasom dnevnoj sobi, ukupne građevinske površine 65m² i korisne površine 60m², smešten na 4. spratu u zgradi koja ima ukupno 4 sprata.

Stan je renoviran 2008. godine, kada su urađene sve ključne stvari – postavljena je aluminijumska stolarija koja obezbeđuje dobru izolaciju, ugrađen je kvalitetan jasenov parket, renovirano kupatilo sa potpuno zamenjenim cevima, urađene su nove elektro instalacije, a ugrađeni su i novi radijatori.

Zgrada je bez lifta, ali su stepenice planirane sa dužim odmorištima, čineći uspon i silazak znatno lakšim i prijatnijim.

Grejanje je centralno, a u neposrednoj blizini zgrade nalazi se javni parking, što dodatno olakšava svakodnevni život.

Stan se može kupiti sa ili bez nameštaja, u dogovoru sa vlasnikom, što ostavlja budućem kupcu fleksibilnost da prostor prilagodi sopstvenim potrebama i ukusu.

Posebna vrednost ovog stana je njegova lokacija – Savski kej i šetalište uz reku udaljeni su samo 350m pešaka, pružajući prostor za rekreaciju, vožnju bicikla i opuštajuće šetnje. U okruženju su i brojne gradske atrakcije, kao i kafići i restorani. Infrastruktura je razvijena do maksimuma: na dohvat ruke su škole, vrtići, dom zdravlja, veliki supermarketi i shopping centri, a javni prevoz vas povezuje sa svim delovima Beograda brzo i jednostavno.

Dvostrana orijentacija stana omogućava obilje prirodne svetlosti tokom celog dana, kao i bolju cirkulaciju vazduha, što prostor čini prijatnijim i funkcionalnijim za svakodnevni život.`,
    images: [
      'https://i.imgur.com/rhk2C8oh.jpg', // Nova pozicija 1 (stara slika 5)
      'https://i.imgur.com/srqdJnBh.jpg', // Nova pozicija 2 (stara slika 6)
      'https://i.imgur.com/nQxcF7Mh.jpg', // Nova pozicija 3 (stara slika 7)
      'https://i.imgur.com/l3eyZ2oh.jpg', // Nova pozicija 4 (stara slika 8)
      'https://i.imgur.com/lL8e1xxh.jpg', // Nova pozicija 5 (stara slika 9)
      'https://i.imgur.com/AVnXiPlh.jpg', // Nova pozicija 6 (stara slika 10)
      'https://i.imgur.com/P5DSIpCh.jpg', // Nova pozicija 7 (stara slika 11)
      'https://i.imgur.com/0I3SQAQh.jpg', // Nova pozicija 8 (stara slika 12)
      'https://i.imgur.com/E4cR7ICh.jpg', // Nova pozicija 9 (stara slika 13)
      'https://i.imgur.com/B24eQRZh.jpg', // Nova pozicija 10 (stara slika 1)
      'https://i.imgur.com/fYAApDHh.jpg', // Nova pozicija 11 (stara slika 2)
      'https://i.imgur.com/EmaLgNlh.jpg', // Nova pozicija 12 (stara slika 3)
      // Slika 4 je obrisana
    ],
    featured: true,
  },
];