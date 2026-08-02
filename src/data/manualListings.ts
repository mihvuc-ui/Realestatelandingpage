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

const kopaonikImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const mirijevoImages = [mirijevo1, mirijevo2, mirijevo3, mirijevo4, mirijevo5];

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

export const manualListings: Apartment[] = [
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
