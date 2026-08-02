import type { Apartment } from './apartments';

// Lokalni oglasi (slike se učitavaju iz src/imports).
// Ovi oglasi se spajaju sa oglasima iz Supabase baze u useApartments hook-u.
import img1 from '@/imports/1.jpeg';
import img2 from '@/imports/2.jpeg';
import img3 from '@/imports/3.jpeg';
import img4 from '@/imports/4.jpeg';
import img5 from '@/imports/5.jpeg';
import img6 from '@/imports/6.jpeg';
import img7 from '@/imports/7.jpeg';
import img8 from '@/imports/8.jpeg';
import mirijevo1 from '@/imports/1f.jpeg';
import mirijevo2 from '@/imports/2f.jpeg';
import mirijevo3 from '@/imports/3f.jpeg';
import mirijevo4 from '@/imports/4f.jpeg';
import mirijevo5 from '@/imports/5f.jpeg';
import mirijevo15_1 from '@/imports/1m.jpeg';
import mirijevo15_2 from '@/imports/2m.jpeg';
import mirijevo15_3 from '@/imports/3m.jpeg';
import mirijevo15_4 from '@/imports/4m.jpeg';
import mirijevo15_5 from '@/imports/5m.jpeg';
import mirijevo15_6 from '@/imports/6m.jpeg';
import mirijevo15_7 from '@/imports/7m.jpeg';
import mirijevo15_8 from '@/imports/8m.jpeg';
import karaburma1 from '@/imports/1k.jpeg';
import karaburma2 from '@/imports/2k.jpeg';
import karaburma3 from '@/imports/3k.jpeg';
import karaburma4 from '@/imports/4k.jpeg';
import karaburma5 from '@/imports/5k.jpeg';
import karaburma6 from '@/imports/6k.jpeg';
import karaburma7 from '@/imports/7k.jpeg';
import karaburma8 from '@/imports/8k.jpeg';
import karaburma9 from '@/imports/9k.jpeg';
import karaburma10 from '@/imports/10k.jpeg';

const kopaonikImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const mirijevoImages = [mirijevo1, mirijevo2, mirijevo3, mirijevo4, mirijevo5];
const mirijevo15Images = [
  mirijevo15_1,
  mirijevo15_2,
  mirijevo15_3,
  mirijevo15_4,
  mirijevo15_5,
  mirijevo15_6,
  mirijevo15_7,
  mirijevo15_8,
];
const karaburmaImages = [
  karaburma1,
  karaburma2,
  karaburma3,
  karaburma4,
  karaburma5,
  karaburma6,
  karaburma7,
  karaburma8,
  karaburma9,
  karaburma10,
];

const kopaonikSr = `Na prodaju moderan i potpuno opremljen apartman površine 32 m², smešten u mirnom delu Vikend naselja – Lisina, na svega 8 minuta vožnje od centra Kopaonika.

Apartman je funkcionalno organizovan, svetao i moderno uređen, sa odličnim rasporedom prostorija koji pruža maksimalnu iskorišćenost prostora. Prodaje se potpuno opremljen i spreman za useljenje ili izdavanje.

Poseban utisak ostavlja prelep pogled na prirodu i planinske predele, dok je parking obezbeđen u okviru kompleksa.

Odlična prilika kako za uživanje tokom cele godine, tako i kao investicija za turističko izdavanje.

Karakteristike:
• Vikend naselje – Lisina, Kopaonik
• 8 minuta do centra Kopaonika
• 32 m² potpuno opremljeno
• Moderan enterijer i odličan raspored
• Prelep pogled na prirodu
• Parking u sklopu kompleksa`;

const kopaonikEn = `For sale: a modern and fully furnished apartment of 32 m², located in a quiet part of the Lisina weekend resort, just an 8-minute drive from the center of Kopaonik.

The apartment is functionally organized, bright and modernly decorated, with an excellent layout that provides maximum use of space. It is sold fully furnished and ready to move in or rent out.

A special impression is left by the beautiful view of nature and the mountain landscape, while parking is provided within the complex.

An excellent opportunity both for enjoyment throughout the year and as an investment for tourist rentals.

Features:
• Lisina weekend resort, Kopaonik
• 8 minutes to the center of Kopaonik
• 32 m² fully furnished
• Modern interior and excellent layout
• Beautiful view of nature
• Parking within the complex`;

const kopaonikRu = `Продается современная и полностью меблированная квартира площадью 32 м², расположенная в тихой части курортного поселка Лисина, всего в 8 минутах езды от центра Копаоника.

Квартира функционально организована, светлая и современно оформлена, с отличной планировкой, обеспечивающей максимальное использование пространства. Продается полностью меблированной и готовой к заселению или сдаче в аренду.

Особое впечатление производит прекрасный вид на природу и горные пейзажи, а парковка предусмотрена на территории комплекса.

Отличная возможность как для отдыха в течение всего года, так и в качестве инвестиции для туристической аренды.

Характеристики:
• Курортный поселок Лисина, Копаоник
• 8 минут до центра Копаоника
• 32 м² полностью меблировано
• Современный интерьер и отличная планировка
• Прекрасный вид на природу
• Парковка на территории комплекса`;

const kopaonikTr = `Satılık: Kopaonik merkezine sadece 8 dakika mesafede, Lisina hafta sonu tatil köyünün sakin bir bölümünde yer alan 32 m² modern ve tam eşyalı bir daire.

Daire fonksiyonel olarak düzenlenmiş, aydınlık ve modern dekorludur; alanı maksimum kullanım sağlayan mükemmel bir yerleşim planına sahiptir. Tam eşyalı, taşınmaya veya kiraya vermeye hazır olarak satılmaktadır.

Doğaya ve dağ manzarasına açılan güzel manzara özel bir izlenim bırakırken, otopark kompleks içinde sağlanmaktadır.

Hem yıl boyunca keyif almak hem de turistik kiralama için yatırım olarak mükemmel bir fırsat.

Özellikler:
• Lisina hafta sonu tatil köyü, Kopaonik
• Kopaonik merkezine 8 dakika
• 32 m² tam eşyalı
• Modern iç mekan ve mükemmel yerleşim
• Doğaya açılan güzel manzara
• Kompleks içinde otopark`;

const mirijevoSr = `Na prodaju moderan studio stan površine 31 m² u kvalitetnoj novogradnji, smešten na odličnoj lokaciji u Mirijevu. Stan je idealan izbor za mlade, studente, samce ili kao investicija za izdavanje, zahvaljujući odličnoj poziciji i velikoj potražnji za zakupom.

Lokacija: na samo 150 metara hoda od Ulice Koste Nađa, u blizini prodavnica, škola, vrtića, javnog prevoza i svih sadržaja neophodnih za udoban svakodnevni život. Pruža odličnu povezanost sa svim delovima grada.

Jedna od najvećih prednosti ovog kompleksa jeste to što će se u njegovom sklopu nalaziti veliki Mega Maxi, koji budućim stanarima omogućava maksimalnu praktičnost za svakodnevnu kupovinu. U prizemlju kompleksa planirani su i lokali različite namene – prodavnice, uslužne delatnosti, kafići i drugi sadržaji koji dodatno unapređuju kvalitet života.

Osnovne informacije:
• Površina: 31 m²
• Struktura: 1.0 (studio)
• Novogradnja
• Useljenje od 1. oktobra

Odlična prilika kako za život, tako i za sigurnu investiciju sa visokim potencijalom za rentiranje.`;

const mirijevoEn = `For sale: a modern studio apartment of 31 m² in a quality new-build development, located in an excellent spot in Mirijevo. The apartment is an ideal choice for young people, students, singles, or as a rental investment, thanks to its great position and high demand for leasing.

Location: just 150 meters on foot from Koste Nađa Street, close to shops, schools, kindergartens, public transport and everything needed for comfortable daily life. It offers excellent connectivity to all parts of the city.

One of the biggest advantages of this complex is that it will house a large Mega Maxi supermarket, providing future residents with maximum convenience for everyday shopping. The ground floor of the complex will also feature commercial units of various purposes – shops, service businesses, cafés and other amenities that further improve the quality of life.

Key information:
• Area: 31 m²
• Layout: 1.0 (studio)
• New construction
• Move-in from October 1st

An excellent opportunity both for living and as a secure investment with high rental potential.`;

const mirijevoRu = `Продается современная квартира-студия площадью 31 м² в качественной новостройке, расположенная в отличном месте в Мириево. Квартира — идеальный выбор для молодежи, студентов, одиноких людей или в качестве инвестиции для сдачи в аренду, благодаря отличному расположению и высокому спросу на аренду.

Расположение: всего в 150 метрах пешком от улицы Косте Нађа, рядом с магазинами, школами, детскими садами, общественным транспортом и всем необходимым для комфортной повседневной жизни. Обеспечивает отличную связь со всеми районами города.

Одно из главных преимуществ этого комплекса — наличие большого супермаркета Mega Maxi, что обеспечит будущим жильцам максимальное удобство для повседневных покупок. На первом этаже комплекса также запланированы коммерческие помещения различного назначения — магазины, сфера услуг, кафе и другие объекты, повышающие качество жизни.

Основная информация:
• Площадь: 31 м²
• Планировка: 1.0 (студия)
• Новостройка
• Заселение с 1 октября

Отличная возможность как для жизни, так и в качестве надежной инвестиции с высоким потенциалом аренды.`;

const mirijevoTr = `Satılık: Mirijevo'da mükemmel bir konumda, kaliteli bir yeni yapı projesinde 31 m² modern bir stüdyo daire. Daire; mükemmel konumu ve yüksek kiralama talebi sayesinde gençler, öğrenciler, bekarlar veya kiralama yatırımı için ideal bir seçimdir.

Konum: Koste Nađa Caddesi'ne yürüyerek yalnızca 150 metre; mağazalara, okullara, anaokullarına, toplu taşımaya ve rahat bir günlük yaşam için gereken tüm olanaklara yakın. Şehrin tüm bölgelerine mükemmel bağlantı sunar.

Bu kompleksin en büyük avantajlarından biri, bünyesinde büyük bir Mega Maxi süpermarketinin bulunacak olmasıdır; bu da gelecekteki sakinlere günlük alışverişte maksimum kolaylık sağlar. Kompleksin zemin katında ayrıca çeşitli amaçlara yönelik ticari birimler planlanmıştır – mağazalar, hizmet işletmeleri, kafeler ve yaşam kalitesini artıran diğer olanaklar.

Temel bilgiler:
• Alan: 31 m²
• Yapı: 1.0 (stüdyo)
• Yeni yapı
• 1 Ekim'den itibaren taşınmaya hazır

Hem yaşamak hem de yüksek kiralama potansiyeline sahip güvenli bir yatırım için mükemmel bir fırsat.`;

const mirijevo15Sr = `Na prodaju moderan jednoiposoban stan površine 40 m² u kvalitetnoj novogradnji, smešten na odličnoj lokaciji u Mirijevu. Zahvaljujući odlično organizovanom rasporedu sa odvojenom spavaćom sobom, stan predstavlja idealan izbor za mlade parove, manje porodice ili kao sigurnu investiciju za izdavanje.

Lokacija: na samo 150 metara hoda od Ulice Koste Nađa, u blizini prodavnica, škola, vrtića, javnog prevoza i svih sadržaja neophodnih za udoban svakodnevni život. Pruža odličnu povezanost sa svim delovima grada.

Jedna od najvećih prednosti ovog kompleksa jeste to što će se u njegovom sklopu nalaziti veliki Mega Maxi, koji budućim stanarima omogućava maksimalnu praktičnost za svakodnevnu kupovinu. U prizemlju kompleksa planirani su i lokali različite namene – prodavnice, uslužne delatnosti, kafići i drugi sadržaji koji dodatno unapređuju kvalitet života.

Osnovne informacije:
• Površina: 40 m²
• Struktura: 1.5 (jednoiposoban – odvojena spavaća soba)
• Novogradnja
• Useljenje od 1. oktobra

Odlična prilika kako za rešavanje stambenog pitanja, tako i za sigurnu investiciju sa odličnim potencijalom za rentiranje.`;

const mirijevo15En = `For sale: a modern one-and-a-half-room apartment of 40 m² in a quality new-build development, located in an excellent spot in Mirijevo. Thanks to its well-organized layout with a separate bedroom, the apartment is an ideal choice for young couples, small families, or as a secure rental investment.

Location: just 150 meters on foot from Koste Nađa Street, close to shops, schools, kindergartens, public transport and everything needed for comfortable daily life. It offers excellent connectivity to all parts of the city.

One of the biggest advantages of this complex is that it will house a large Mega Maxi supermarket, providing future residents with maximum convenience for everyday shopping. The ground floor of the complex will also feature commercial units of various purposes – shops, service businesses, cafés and other amenities that further improve the quality of life.

Key information:
• Area: 40 m²
• Layout: 1.5 (one-and-a-half-room – separate bedroom)
• New construction
• Move-in from October 1st

An excellent opportunity both for solving your housing needs and as a secure investment with great rental potential.`;

const mirijevo15Ru = `Продается современная полутора­комнатная квартира площадью 40 м² в качественной новостройке, расположенная в отличном месте в Мириево. Благодаря хорошо организованной планировке с отдельной спальней, квартира — идеальный выбор для молодых пар, небольших семей или в качестве надежной инвестиции для сдачи в аренду.

Расположение: всего в 150 метрах пешком от улицы Косте Нађа, рядом с магазинами, школами, детскими садами, общественным транспортом и всем необходимым для комфортной повседневной жизни. Обеспечивает отличную связь со всеми районами города.

Одно из главных преимуществ этого комплекса — наличие большого супермаркета Mega Maxi, что обеспечит будущим жильцам максимальное удобство для повседневных покупок. На первом этаже комплекса также запланированы коммерческие помещения различного назначения — магазины, сфера услуг, кафе и другие объекты, повышающие качество жизни.

Основная информация:
• Площадь: 40 м²
• Планировка: 1.5 (полутора­комнатная – отдельная спальня)
• Новостройка
• Заселение с 1 октября

Отличная возможность как для решения жилищного вопроса, так и в качестве надежной инвестиции с отличным потенциалом аренды.`;

const mirijevo15Tr = `Satılık: Mirijevo'da mükemmel bir konumda, kaliteli bir yeni yapı projesinde 40 m² modern bir 1.5 odalı daire. Ayrı yatak odasına sahip iyi düzenlenmiş yerleşim planı sayesinde daire; genç çiftler, küçük aileler veya güvenli bir kiralama yatırımı için ideal bir seçimdir.

Konum: Koste Nađa Caddesi'ne yürüyerek yalnızca 150 metre; mağazalara, okullara, anaokullarına, toplu taşımaya ve rahat bir günlük yaşam için gereken tüm olanaklara yakın. Şehrin tüm bölgelerine mükemmel bağlantı sunar.

Bu kompleksin en büyük avantajlarından biri, bünyesinde büyük bir Mega Maxi süpermarketinin bulunacak olmasıdır; bu da gelecekteki sakinlere günlük alışverişte maksimum kolaylık sağlar. Kompleksin zemin katında ayrıca çeşitli amaçlara yönelik ticari birimler planlanmıştır – mağazalar, hizmet işletmeleri, kafeler ve yaşam kalitesini artıran diğer olanaklar.

Temel bilgiler:
• Alan: 40 m²
• Yapı: 1.5 (bir buçuk odalı – ayrı yatak odası)
• Yeni yapı
• 1 Ekim'den itibaren taşınmaya hazır

Hem konut ihtiyacınızı çözmek hem de yüksek kiralama potansiyeline sahip güvenli bir yatırım için mükemmel bir fırsat.`;

const karaburmaSr = `Na prodaju kompletno renoviran dvoiposoban stan na odličnoj lokaciji u ulici Jovanke Radaković na Karaburmi, opština Palilula. Stan se nalazi na prvom spratu stambene zgrade koja je trenutno u fazi kompletne renovacije, što dodatno doprinosi kvalitetu i budućoj vrednosti nekretnine.

Stan ima 57 m² i odlikuje se veoma funkcionalnim rasporedom prostorija sa dve spavaće sobe koje izlaze na balkon i dvostranom orijentacijom koja omogućava dosta prirodne svetlosti tokom celog dana i prijatnu atmosferu za život. Kompletno je renoviran i sređen po višim standardima, uz pažljivo birane materijale i moderan stil uređenja, te je spreman za useljenje bez dodatnih ulaganja.

Za grejanje i hlađenje ugrađena je inverter klima, dok su dodatno kupljeni i norveški radijatori, koji pružaju visok nivo komfora i energetsku efikasnost tokom zimskog perioda.

Nekretnina je udaljena svega 150 m od raskrsnice ulica Jovanke Radaković i Viteza Karađorđeve Zvezde, na odlično povezanoj i traženoj lokaciji. U samoj ulici nalaze se veliki supermarketi, teretana i brojni sadržaji neophodni za svakodnevni život, dok su škola i ostali važni sadržaji u neposrednoj blizini. Mirijevski bulevar udaljen je oko 500 m, što omogućava odličnu povezanost sa svim delovima grada, a u blizini se nalazi i gimnazija, što ovu lokaciju čini posebno pogodnom za porodičan život.

Stan predstavlja i odličnu investiciju za izdavanje, budući da je lokacija veoma dobro povezana sa gradom i atraktivna kako za porodični život, tako i za dugoročno rentiranje. Dodatnu pogodnost predstavlja pripadajuće parking mesto iza zgrade, što je velika prednost u ovom delu grada.

Osnovne informacije:
• Površina: 57 m²
• Struktura: dvoiposoban stan
• 1. sprat
• Dvostrana orijentacija
• Dve odvojene spavaće sobe
• Inverter klima i norveški radijatori
• Parking mesto u ceni stana
• Udaljenost od Bogoslovije 3,5 km, od centra grada 6 km

Za više informacija i zakazivanje razgledanja, slobodno nas kontaktirajte.`;

const karaburmaEn = `For sale: a fully renovated two-and-a-half-room apartment in an excellent location on Jovanke Radaković Street in Karaburma, Palilula municipality. The apartment is on the first floor of a residential building currently undergoing a complete renovation, which further contributes to the quality and future value of the property.

The apartment is 57 m² and features a very functional layout with two bedrooms opening onto the balcony and a dual orientation that provides plenty of natural light throughout the day and a pleasant living atmosphere. It has been fully renovated to high standards, with carefully selected materials and a modern style, and is ready to move in without any additional investment.

For heating and cooling, an inverter air conditioner has been installed, while Norwegian radiators have additionally been purchased, providing a high level of comfort and energy efficiency during winter.

The property is only 150 m from the intersection of Jovanke Radaković and Viteza Karađorđeve Zvezde streets, in a well-connected and sought-after location. The street itself has large supermarkets, a gym and numerous amenities needed for everyday life, while a school and other important facilities are in the immediate vicinity. Mirijevski Bulevar is about 500 m away, providing excellent connectivity to all parts of the city, and a high school is nearby, making this location especially suitable for family life.

The apartment is also an excellent rental investment, as the location is very well connected to the city and attractive both for family living and long-term renting. An additional benefit is the dedicated parking space behind the building, a great advantage in this part of the city.

Key information:
• Area: 57 m²
• Layout: two-and-a-half-room apartment
• 1st floor
• Dual orientation
• Two separate bedrooms
• Inverter AC and Norwegian radiators
• Parking space included in the price
• Distance from Bogoslovija 3.5 km, from the city center 6 km

For more information and to schedule a viewing, feel free to contact us.`;

const karaburmaRu = `Продается полностью отремонтированная двух-с-половиной-комнатная квартира в отличном месте на улице Йованке Радакович на Карабурме, община Палилула. Квартира находится на первом этаже жилого дома, который в настоящее время проходит полную реновацию, что дополнительно повышает качество и будущую стоимость недвижимости.

Квартира площадью 57 м² отличается очень функциональной планировкой с двумя спальнями, выходящими на балкон, и двусторонней ориентацией, обеспечивающей много естественного света в течение всего дня и приятную атмосферу для жизни. Полностью отремонтирована по высоким стандартам, с тщательно подобранными материалами и современным стилем, готова к заселению без дополнительных вложений.

Для отопления и охлаждения установлен инверторный кондиционер, а дополнительно приобретены норвежские радиаторы, обеспечивающие высокий уровень комфорта и энергоэффективность зимой.

Недвижимость находится всего в 150 м от перекрестка улиц Йованке Радакович и Витеза Карагеоргиевой Звезды, в хорошо связанном и востребованном месте. На самой улице есть крупные супермаркеты, спортзал и множество объектов, необходимых для повседневной жизни, а школа и другие важные объекты находятся в непосредственной близости. Мириевский бульвар находится примерно в 500 м, что обеспечивает отличную связь со всеми районами города, а рядом расположена гимназия, что делает это место особенно подходящим для семейной жизни.

Квартира также является отличной инвестицией для сдачи в аренду, поскольку локация очень хорошо связана с городом и привлекательна как для семейной жизни, так и для долгосрочной аренды. Дополнительным преимуществом является собственное парковочное место за зданием, что является большим плюсом в этой части города.

Основная информация:
• Площадь: 57 м²
• Планировка: двух-с-половиной-комнатная квартира
• 1-й этаж
• Двусторонняя ориентация
• Две отдельные спальни
• Инверторный кондиционер и норвежские радиаторы
• Парковочное место в цене квартиры
• Расстояние до Богословии 3,5 км, до центра города 6 км

Для получения дополнительной информации и записи на просмотр, свяжитесь с нами.`;

const karaburmaTr = `Satılık: Palilula belediyesi, Karaburma'da Jovanke Radaković Caddesi'nde mükemmel bir konumda tamamen yenilenmiş 2.5 odalı daire. Daire, şu anda tamamen renovasyon aşamasında olan bir konut binasının birinci katında yer almakta olup bu durum mülkün kalitesine ve gelecekteki değerine katkı sağlamaktadır.

Daire 57 m² olup, balkona açılan iki yatak odası ve gün boyu bol doğal ışık ile keyifli bir yaşam atmosferi sağlayan çift yönlü konumlanmasıyla çok fonksiyonel bir yerleşim planına sahiptir. Yüksek standartlarda, özenle seçilmiş malzemeler ve modern bir tarzla tamamen yenilenmiş olup, ek yatırım gerektirmeden taşınmaya hazırdır.

Isıtma ve soğutma için inverter klima kurulmuş, ayrıca kışın yüksek düzeyde konfor ve enerji verimliliği sağlayan Norveç radyatörleri temin edilmiştir.

Mülk, Jovanke Radaković ve Viteza Karađorđeve Zvezde caddelerinin kesişimine yalnızca 150 m mesafede, iyi bağlantılı ve talep gören bir konumdadır. Caddede büyük süpermarketler, spor salonu ve günlük yaşam için gerekli birçok olanak bulunurken, okul ve diğer önemli tesisler hemen yakındadır. Mirijevski Bulvarı yaklaşık 500 m uzaklıkta olup şehrin tüm bölgelerine mükemmel bağlantı sağlar ve yakınında bir lise bulunması bu konumu aile yaşamı için özellikle uygun kılar.

Daire aynı zamanda mükemmel bir kiralama yatırımıdır; konum şehre çok iyi bağlıdır ve hem aile yaşamı hem de uzun vadeli kiralama için caziptir. Binanın arkasındaki tahsisli otopark yeri, şehrin bu bölümünde büyük bir avantaj olan ek bir kolaylıktır.

Temel bilgiler:
• Alan: 57 m²
• Yapı: 2.5 odalı daire
• 1. kat
• Çift yönlü konumlanma
• İki ayrı yatak odası
• İnverter klima ve Norveç radyatörleri
• Fiyata dahil otopark yeri
• Bogoslovija'ya 3,5 km, şehir merkezine 6 km mesafe

Daha fazla bilgi ve randevu için bizimle iletişime geçebilirsiniz.`;

export const manualListings: Apartment[] = [
  {
    id: 'karaburma-dvoiposoban-jovanke-radakovic',
    name: 'Dvoiposoban stan - Karaburma, Jovanke Radaković',
    location: 'Palilula - Karaburma / Jovanke Radaković',
    price: 175000,
    type: 'sale',
    propertyType: 'apartment',
    squareMeters: 57,
    bedrooms: 2,
    bathrooms: 1,
    description: karaburmaSr,
    descriptions: {
      sr: karaburmaSr,
      en: karaburmaEn,
      ru: karaburmaRu,
      tr: karaburmaTr,
    },
    images: karaburmaImages,
    featured: true,
    floor: '1',
    parking: 'Parking mesto u ceni stana',
    heating: 'Inverter klima + norveški radijatori',
    orientation: 'Dvostrana orijentacija',
    furnished: 'Kompletno renoviran',
  },
  {
    id: 'mirijevo-jednoiposoban-novogradnja',
    name: 'Jednoiposoban stan - Mirijevo (Novogradnja)',
    location: 'Zvezdara - Mirijevo / Koste Nađa',
    price: 115000,
    type: 'sale',
    propertyType: 'apartment',
    squareMeters: 40,
    bedrooms: 1,
    bathrooms: 1,
    description: mirijevo15Sr,
    descriptions: {
      sr: mirijevo15Sr,
      en: mirijevo15En,
      ru: mirijevo15Ru,
      tr: mirijevo15Tr,
    },
    images: mirijevo15Images,
    featured: true,
    floor: '3/5',
    furnished: 'Nenamešten',
  },
  {
    id: 'mirijevo-studio-novogradnja',
    name: 'Studio stan - Mirijevo (Novogradnja)',
    location: 'Zvezdara - Mirijevo / Koste Nađa',
    price: 95000,
    type: 'sale',
    propertyType: 'apartment',
    squareMeters: 31,
    bedrooms: 1,
    bathrooms: 1,
    description: mirijevoSr,
    descriptions: {
      sr: mirijevoSr,
      en: mirijevoEn,
      ru: mirijevoRu,
      tr: mirijevoTr,
    },
    images: mirijevoImages,
    featured: true,
    floor: '2/5',
    furnished: 'Nenamešten',
  },
  {
    id: 'kopaonik-lisina-apartman',
    name: 'Moderan apartman - Kopaonik, Lisina',
    location: 'Kopaonik - Vikend naselje / Lisina',
    price: 49990,
    type: 'sale',
    propertyType: 'apartment',
    squareMeters: 32,
    bedrooms: 1,
    bathrooms: 1,
    description: kopaonikSr,
    descriptions: {
      sr: kopaonikSr,
      en: kopaonikEn,
      ru: kopaonikRu,
      tr: kopaonikTr,
    },
    images: kopaonikImages,
    featured: true,
    parking: 'Parking u sklopu kompleksa',
    furnished: 'Potpuno opremljen',
    orientation: 'Pogled na prirodu i planinske predele',
  },
];
