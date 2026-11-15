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
// Nušićeva – redosled: ulazna vrata → hodnik → sobe/kuhinja → kupatilo → lift → ulaz → zgrada
import nusiceva1 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.22__4_.jpeg'; // ulazna vrata stana
import nusiceva2 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__1_.jpeg'; // dnevni boravak / hodnik ka sobama
import nusiceva3 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__4_.jpeg'; // unutrašnja vrata
import nusiceva4 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__5_.jpeg'; // velika kuhinja sa prozorom
import nusiceva5 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__6_.jpeg'; // soba 1
import nusiceva6 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__3_.jpeg'; // soba 2
import nusiceva7 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.23__2_.jpeg'; // kupatilo
import nusiceva8 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.22__3_.jpeg'; // novi lift
import nusiceva9 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.22__2_.jpeg'; // renoviran ulaz
import nusiceva10 from '@/imports/WhatsApp_Image_2026-11-15_at_20.16.22.jpeg'; // zgrada spolja

const kopaonikImages = [img1, img2, img3, img4, img5, img6, img7, img8];
const nusicevaImages = [
  nusiceva1,
  nusiceva2,
  nusiceva3,
  nusiceva4,
  nusiceva5,
  nusiceva6,
  nusiceva7,
  nusiceva8,
  nusiceva9,
  nusiceva10,
];

const nusicevaSr = `U jednoj od najlepših i najpoželjnijih ulica u samom centru Beograda, Nušićevoj ulici, nalazi se potpuno renoviran stan površine 55 m², koji predstavlja idealan spoj savremenog komfora, funkcionalnosti i izuzetne lokacije.

Stan se nalazi na 4. spratu održavane stambene zgrade sa novim liftom, renoviranim ulazom i video-nadzorom.

Funkcionalno organizovan prostor obuhvata dve odvojene sobe, prostran dnevni boravak povezan sa velikom kuhinjom i kupatilo. Posebnu čar stanu daje velika kuhinja sa prostranim prozorom, koji omogućava obilje prirodne svetlosti i doprinosi prijatnoj, svetloj i prozračnoj atmosferi celokupnog dnevnog prostora.

Stan je kompletno renoviran, sa pažljivo osmišljenim rasporedom koji maksimalno iskorišćava svaki kvadratni metar.

Lokacija je jedna od njegovih najvećih prednosti. Nušićeva ulica pruža autentičan doživljaj života u centru Beograda, na svega nekoliko minuta hoda od Trga Republike, Knez Mihailove ulice, Terazija, restorana, kafića, kulturnih sadržaja i svih važnih gradskih institucija.

Ova nekretnina predstavlja odličan izbor kako za udoban gradski život, tako i za investiciju, zahvaljujući izuzetno atraktivnoj i traženoj lokaciji.

Retka prilika da se na jednoj od najprepoznatljivijih adresa u Beogradu pronađe potpuno renoviran stan, spreman za novo poglavlje.`;

const nusicevaEn = `On one of the most beautiful and sought-after streets in the very center of Belgrade, Nušićeva Street, is a fully renovated 55 m² apartment that offers an ideal blend of modern comfort, functionality and an exceptional location.

The apartment is on the 4th floor of a well-maintained residential building with a new elevator, a renovated entrance and video surveillance.

The functionally organized space includes two separate rooms, a spacious living room connected to a large kitchen, and a bathroom. The large kitchen with its generous window gives the apartment special charm, letting in plenty of natural light and creating a pleasant, bright and airy atmosphere throughout the living area.

The apartment has been completely renovated, with a carefully designed layout that makes the most of every square meter.

The location is one of its greatest advantages. Nušićeva Street offers an authentic experience of life in central Belgrade, just a few minutes' walk from Republic Square, Knez Mihailova Street, Terazije, restaurants, cafés, cultural venues and all important city institutions.

This property is an excellent choice both for comfortable city living and as an investment, thanks to its highly attractive and sought-after location.

A rare opportunity to find a fully renovated apartment at one of Belgrade's most recognizable addresses, ready for a new chapter.`;

const nusicevaRu = `На одной из самых красивых и востребованных улиц в самом центре Белграда, улице Нушичева, находится полностью отремонтированная квартира площадью 55 м², которая представляет собой идеальное сочетание современного комфорта, функциональности и исключительного расположения.

Квартира расположена на 4-м этаже ухоженного жилого дома с новым лифтом, отремонтированным подъездом и видеонаблюдением.

Функционально организованное пространство включает две отдельные комнаты, просторную гостиную, соединенную с большой кухней, и ванную комнату. Особый шарм квартире придает большая кухня с просторным окном, которое обеспечивает обилие естественного света и создает приятную, светлую и воздушную атмосферу во всей жилой зоне.

Квартира полностью отремонтирована, с тщательно продуманной планировкой, максимально использующей каждый квадратный метр.

Расположение — одно из ее главных преимуществ. Улица Нушичева дарит подлинное ощущение жизни в центре Белграда, всего в нескольких минутах ходьбы от площади Республики, улицы Князя Михаила, Теразие, ресторанов, кафе, культурных объектов и всех важных городских учреждений.

Эта недвижимость — отличный выбор как для комфортной городской жизни, так и для инвестиций благодаря исключительно привлекательному и востребованному расположению.

Редкая возможность найти полностью отремонтированную квартиру по одному из самых узнаваемых адресов Белграда, готовую к новой главе.`;

const nusicevaTr = `Belgrad'ın tam merkezindeki en güzel ve en çok tercih edilen sokaklardan biri olan Nušićeva Caddesi'nde, modern konfor, işlevsellik ve olağanüstü konumu ideal biçimde bir araya getiren, tamamen yenilenmiş 55 m² bir daire bulunmaktadır.

Daire; yeni asansörü, yenilenmiş girişi ve video gözetim sistemi bulunan bakımlı bir konut binasının 4. katındadır.

İşlevsel olarak düzenlenmiş alan; iki ayrı oda, geniş bir mutfağa bağlanan ferah bir oturma odası ve banyodan oluşmaktadır. Geniş penceresiyle büyük mutfak daireye ayrı bir çekicilik katar; bol doğal ışık sağlayarak tüm yaşam alanında hoş, aydınlık ve ferah bir atmosfer oluşturur.

Daire, her metrekareyi en verimli şekilde kullanan özenle tasarlanmış bir yerleşim planıyla tamamen yenilenmiştir.

Konum, dairenin en büyük avantajlarından biridir. Nušićeva Caddesi, Cumhuriyet Meydanı, Knez Mihailova Caddesi, Terazije, restoranlar, kafeler, kültürel mekanlar ve tüm önemli şehir kurumlarına yalnızca birkaç dakikalık yürüme mesafesinde, Belgrad merkezinde otantik bir yaşam deneyimi sunar.

Bu mülk, son derece cazip ve talep gören konumu sayesinde hem konforlu bir şehir yaşamı hem de yatırım için mükemmel bir seçimdir.

Belgrad'ın en tanınmış adreslerinden birinde, yeni bir sayfaya hazır, tamamen yenilenmiş bir daire bulmak için nadir bir fırsat.`;

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
    id: 'nusiceva-renoviran-stan-centar',
    name: 'Nušićeva – Kompletno renoviran stan u srcu Beograda, 55 m²',
    location: 'Stari Grad - Centar / Nušićeva',
    price: 325000,
    type: 'sale',
    propertyType: 'apartment',
    squareMeters: 55,
    bedrooms: 2,
    bathrooms: 1,
    description: nusicevaSr,
    descriptions: {
      sr: nusicevaSr,
      en: nusicevaEn,
      ru: nusicevaRu,
      tr: nusicevaTr,
    },
    images: nusicevaImages,
    featured: true,
    floor: '4',
    furnished: 'Kompletno renoviran',
  },
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
