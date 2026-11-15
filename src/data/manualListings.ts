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

const kopaonikImages = [img1, img2, img3, img4, img5, img6, img7, img8];

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

export const manualListings: Apartment[] = [
  {
    id: 'kopaonik-lisina-apartman',
    name: 'Moderan apartman - Kopaonik, Lisina',
    location: 'Kopaonik - Vikend naselje / Lisina',
    price: 65000,
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
