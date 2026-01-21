export interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  type: 'sale' | 'rent';
  squareMeters: number;
  bedrooms: number;
  bathrooms: number;
  description: string; // Kept for backward compatibility
  descriptions?: {
    sr: string;
    en: string;
    ru: string;
    tr: string;
  };
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
    descriptions: {
      sr: `Ako tražite stan na lokaciji koja spaja udobnost, odličnu povezanost i sve sadržaje potrebne za savremen život, ovo je prava prilika za vas. U ponudi je dvostrano orijentisan, dvosoban stan sa pripojenom terasom dnevnoj sobi, ukupne građevinske površine 65m² i korisne površine 60m², smešten na 4. spratu u zgradi koja ima ukupno 4 sprata.

Stan je renoviran 2008. godine, kada su urađene sve ključne stvari – postavljena je aluminijumska stolarija koja obezbeđuje dobru izolaciju, ugrađen je kvalitetan jasenov parket, renovirano kupatilo sa potpuno zamenjenim cevima, urađene su nove elektro instalacije, a ugrađeni su i novi radijatori.

Zgrada je bez lifta, ali su stepenice planirane sa dužim odmorištima, čineći uspon i silazak znatno lakšim i prijatnijim.

Grejanje je centralno, a u neposrednoj blizini zgrade nalazi se javni parking, što dodatno olakšava svakodnevni život.

Stan se može kupiti sa ili bez nameštaja, u dogovoru sa vlasnikom, što ostavlja budućem kupcu fleksibilnost da prostor prilagodi sopstvenim potrebama i ukusu.

Posebna vrednost ovog stana je njegova lokacija – Savski kej i šetalište uz reku udaljeni su samo 350m pešaka, pružajući prostor za rekreaciju, vožnju bicikla i opuštajuće šetnje. U okruženju su i brojne gradske atrakcije, kao i kafići i restorani. Infrastruktura je razvijena do maksimuma: na dohvat ruke su škole, vrtići, dom zdravlja, veliki supermarketi i shopping centri, a javni prevoz vas povezuje sa svim delovima Beograda brzo i jednostavno.

Dvostrana orijentacija stana omogućava obilje prirodne svetlosti tokom celog dana, kao i bolju cirkulaciju vazduha, što prostor čini prijatnijim i funkcionalnijim za svakodnevni život.`,
      en: `If you are looking for an apartment in a location that combines comfort, excellent connectivity, and all the amenities needed for modern living, this is the right opportunity for you. We offer a double-oriented, two-bedroom apartment with an attached terrace to the living room, with a total construction area of 65m² and usable area of 60m², located on the 4th floor in a building with a total of 4 floors.

The apartment was renovated in 2008, when all the key things were done - aluminum joinery was installed providing good insulation, quality ash parquet was installed, the bathroom was renovated with completely replaced pipes, new electrical installations were done, and new radiators were installed.

The building has no elevator, but the stairs are designed with longer landings, making the ascent and descent much easier and more pleasant.

The heating is central, and in the immediate vicinity of the building there is public parking, which further facilitates everyday life.

The apartment can be purchased with or without furniture, in agreement with the owner, which gives the future buyer the flexibility to adapt the space to their own needs and taste.

The special value of this apartment is its location - Savski kej and the promenade along the river are only 350m away on foot, providing space for recreation, cycling and relaxing walks. In the surroundings there are numerous city attractions, as well as cafes and restaurants. The infrastructure is developed to the maximum: schools, kindergartens, health centers, large supermarkets and shopping centers are within reach, and public transport connects you with all parts of Belgrade quickly and easily.

The double orientation of the apartment allows plenty of natural light throughout the day, as well as better air circulation, which makes the space more pleasant and functional for everyday life.`,
      ru: `Если вы ищете квартиру в месте, которое сочетает в себе комфорт, отличную транспортную доступность и все удобства, необходимые для современной жизни, это правильная возможность для вас. Мы предлагаем двухстороннюю двухкомнатную квартиру с пристроенной террасой к гостиной, общей строительной площадью 65м² и полезной площадью 60м², расположенную на 4-м этаже здания с общим количеством 4 этажей.

Квартира была отремонтирована в 2008 году, когда были сделаны все ключевые вещи - установлены алюминиевые окна, обеспечивающие хорошую изоляцию, уложен качественный паркет из ясеня, отремонтирована ванная комната с полностью замененными трубами, сделаны новые электрические установки и установлены новые радиаторы.

В здании нет лифта, но лестницы спроектированы с более длинными площадками, что делает подъем и спуск намного легче и приятнее.

Отопление центральное, а в непосредственной близости от здания есть общественная парковка, что дополнительно облегчает повседневную жизнь.

Квартира может быть приобретена с мебелью или без нее, по договоренности с владельцем, что дает будущему покупателю гибкость адаптировать пространство к своим собственным потребностям и вкусу.

Особая ценность этой квартиры - ее расположение - Савский кей и набережная вдоль реки находятся всего в 350 м пешком, предоставляя место для отдыха, велосипедных прогулок и расслабляющих прогулок. В окрестностях находятся многочисленные городские достопримечательности, а также кафе и рестораны. Инфраструктура развита по максимуму: школы, детские сады, медицинские центры, крупные супермаркеты и торговые центры находятся в пределах досягаемости, а общественный транспорт соединяет вас со всеми частями Белграда быстро и легко.

Двухсторонняя ориентация квартиры обеспечивает много естественного света в течение дня, а также лучшую циркуляцию воздуха, что делает пространство более приятным и функциональным для повседневной жизни.`,
      tr: `Modern yaşam için gereken konfor, mükemmel bağlantı ve tüm olanakları bir araya getiren bir konumda daire arıyorsanız, bu sizin için doğru fırsattır. Toplam inşaat alanı 65m² ve kullanılabilir alanı 60m² olan, 4 katlı bir binanın 4. katında bulunan, oturma odasına bitişik teraslı, iki yönlü, iki yatak odalı bir daire sunuyoruz.

Daire 2008 yılında yenilenmiş, tüm önemli işler yapılmış - iyi yalıtım sağlayan alüminyum doğramalar takılmış, kaliteli dişbudak parke döşenmiş, tamamen değiştirilmiş borularla banyo yenilenmiş, yeni elektrik tesisatları yapılmış ve yeni radyatörler takılmıştır.

Binada asansör yok, ancak merdivenler daha uzun sahanlıklarla tasarlanmış, bu da inişi ve çıkışı çok daha kolay ve hoş hale getiriyor.

Isıtma merkezi, binanın yakınında halka açık otopark var, bu da günlük yaşamı daha da kolaylaştırıyor.

Daire, mal sahibi ile anlaşmaya bağlı olarak mobilyalı veya mobilyasız satın alınabilir, bu da gelecekteki alıcıya alanı kendi ihtiyaçlarına ve zevkine göre uyarlama esnekliği sağlar.

Bu dairenin özel değeri konumudur - Savski kej ve nehir boyunca yürüyüş yolu sadece 350m uzakta, rekreasyon, bisiklet sürme ve rahatlatıcı yürüyüşler için alan sağlıyor. Çevrede çok sayıda şehir cazibesi, kafeler ve restoranlar var. Altyapı maksimuma geliştirilmiş: okullar, anaokulları, sağlık merkezleri, büyük süpermarketler ve alışveriş merkezleri erişilebilir mesafede ve toplu taşıma sizi Belgrat'ın tüm bölümlerine hızlı ve kolay bir şekilde bağlar.

Dairenin iki yönlü oryantasyonu gün boyunca bol doğal ışık sağlar, ayrıca daha iyi hava sirkülasyonu sağlar, bu da alanı günlük yaşam için daha hoş ve işlevsel hale getirir.`,
    },
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