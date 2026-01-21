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
      'https://i.imgur.com/fYAApDHh.jpg',
      'https://i.imgur.com/B24eQRZh.jpg',
      'https://i.imgur.com/EmaLgNlh.jpg',
      'https://i.imgur.com/2I2sUmJh.jpg',
      'https://i.imgur.com/rhk2C8oh.jpg',
      'https://i.imgur.com/srqdJnBh.jpg',
      'https://i.imgur.com/nQxcF7Mh.jpg',
      'https://i.imgur.com/l3eyZ2oh.jpg',
      'https://i.imgur.com/lL8e1xxh.jpg',
      'https://i.imgur.com/AVnXiPlh.jpg',
      'https://i.imgur.com/P5DSIpCh.jpg',
      'https://i.imgur.com/0I3SQAQh.jpg',
      'https://i.imgur.com/E4cR7ICh.jpg',
    ],
    featured: true,
  },
];