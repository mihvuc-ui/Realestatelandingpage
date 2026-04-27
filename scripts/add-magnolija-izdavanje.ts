/**
 * Dodavanje novog oglasa - Izdavanje stan Magnolija
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addMagnolijaRental() {
  console.log('📝 Dodajem oglas - Izdavanje Stan Magnolija...\n');

  // 1. Lista slika iz foldera IzdavanjeMagnolija
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('IzdavanjeMagnolija', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder IzdavanjeMagnolija je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova u folderu IzdavanjeMagnolija\n`);

  // 2. Filtriraj samo podržane formate i sortiraj numerički
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

  const imageUrls = files
    .filter(file => {
      if (file.name.includes('.emptyFolderPlaceholder')) return false;
      const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      const isSupported = supportedFormats.includes(ext);

      if (!isSupported) {
        console.log(`⚠️  Preskačem ${file.name} - format ${ext.toUpperCase()} nije podržan u browser-u`);
      }

      return isSupported;
    })
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/IzdavanjeMagnolija/${file.name}`;
    })
    .sort((a, b) => {
      const filenameA = a.substring(a.lastIndexOf('/') + 1);
      const filenameB = b.substring(b.lastIndexOf('/') + 1);
      const numA = parseInt(filenameA.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(filenameB.match(/(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`\n📸 Kreirano ${imageUrls.length} validnih URL-ova\n`);

  if (imageUrls.length === 0) {
    console.log('❌ Nema validnih slika (JPG/PNG/WEBP) u folderu!');
    return;
  }

  console.log('📊 Validne slike:\n');
  imageUrls.forEach((img, i) => {
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(`   ${i + 1}. ✅ ${decodeURIComponent(filename)}`);
  });

  // 3. Opisi
  const descriptionSr = `Stan ima 32m² i jednoiposobne je strukture, veoma funkcionalnog rasporeda, idealan za pojedince ili par koji želi prijatan i moderan životni prostor.

Prostor je veoma uredan, sve je novo i pažljivo uređeno, tako da je stan potpuno spreman za useljenje bez dodatnih ulaganja.

🛋 Struktura: 1.5 stan
📐 Površina: 32m²
🛏 Spavaća soba: lepa i komforna, odvojena od dnevnog dela
🛋 Dnevna soba: prostrana i svetla
🍽 Kuhinja: potpuno opremljena
✨ Stanje: sve novo, moderno uređeno i veoma uredno

📍 Lokacija:
🛒 Prodavnice, marketi i svi potrebni sadržaji nalaze se u neposrednoj blizini
🌳 U okviru naselja nalaze se parkovi, šetališta i uređeni zajednički prostori
🚌 Odlična povezanost autobuskim linijama sa ostalim delovima grada

Stan predstavlja odličan izbor za miran i komforan život u uređenom naselju sa kompletnom infrastrukturom.

Dodatna opremljenost:
• Igralište
• Lift
• Terasa
• Garderoberi
• Recepcija
• Toplotna izolacija

Tehnička opremljenost:
• Telefon
• Internet
• Optička mreža

Sigurnosna oprema:
• Sigurnosna vrata
• Video nadzor / Interfon

📞 Za više informacija i zakazivanje razgledanja, slobodno nas kontaktirajte.`;

  const descriptionEn = `The apartment has 32m² and a 1.5-room structure, with a very functional layout, ideal for individuals or couples looking for a pleasant and modern living space.

The space is very tidy, everything is new and carefully decorated, so the apartment is completely ready for occupancy without additional investments.

🛋 Structure: 1.5 room apartment
📐 Area: 32m²
🛏 Bedroom: beautiful and comfortable, separated from the living area
🛋 Living room: spacious and bright
🍽 Kitchen: fully equipped
✨ Condition: everything new, modern furnished and very tidy

📍 Location:
🛒 Shops, markets and all necessary facilities are in the immediate vicinity
🌳 Within the settlement there are parks, walkways and landscaped common areas
🚌 Excellent connection by bus lines to other parts of the city

The apartment is an excellent choice for a peaceful and comfortable life in a well-organized settlement with complete infrastructure.

Additional features:
• Playground
• Elevator
• Terrace
• Wardrobes
• Reception
• Thermal insulation

Technical equipment:
• Telephone
• Internet
• Optical network

Security equipment:
• Security door
• Video surveillance / Intercom

📞 For more information and to schedule a viewing, feel free to contact us.`;

  const descriptionRu = `Квартира площадью 32м² с планировкой 1,5 комнаты, очень функциональная, идеальна для одиноких людей или пар, ищущих приятное и современное жилое пространство.

Пространство очень аккуратное, все новое и тщательно обставлено, поэтому квартира полностью готова к заселению без дополнительных вложений.

🛋 Структура: 1,5-комнатная квартира
📐 Площадь: 32м²
🛏 Спальня: красивая и удобная, отделена от гостиной
🛋 Гостиная: просторная и светлая
🍽 Кухня: полностью оборудованная
✨ Состояние: все новое, современно обставлено и очень аккуратно

📍 Расположение:
🛒 Магазины, рынки и все необходимые удобства находятся в непосредственной близости
🌳 В поселении есть парки, пешеходные дорожки и благоустроенные общие зоны
🚌 Отличное автобусное сообщение с другими частями города

Квартира - отличный выбор для спокойной и комфортной жизни в благоустроенном поселении с полной инфраструктурой.`;

  const descriptionTr = `Daire 32m² ve 1,5 oda yapısına sahip, çok fonksiyonel bir düzene sahip, hoş ve modern bir yaşam alanı arayan bireyler veya çiftler için idealdir.

Alan çok düzenli, her şey yeni ve özenle dekore edilmiş, bu nedenle daire ek yatırım yapılmadan tamamen yerleşime hazırdır.

🛋 Yapı: 1,5 odalı daire
📐 Alan: 32m²
🛏 Yatak odası: güzel ve rahat, oturma alanından ayrı
🛋 Oturma odası: geniş ve aydınlık
🍽 Mutfak: tam donanımlı
✨ Durum: her şey yeni, modern döşenmiş ve çok düzenli

📍 Konum:
🛒 Dükkanlar, marketler ve gerekli tüm tesisler yakın çevrededir
🌳 Yerleşim içinde parklar, yürüyüş yolları ve peyzajlı ortak alanlar bulunmaktadır
🚌 Şehrin diğer bölgelerine otobüs hatlarıyla mükemmel bağlantı

Daire, eksiksiz altyapıya sahip düzenli bir yerleşimde huzurlu ve rahat bir yaşam için mükemmel bir seçimdir.`;

  // 4. Kreiraj oglas - IZDAVANJE (rent)
  const newApartment = {
    name: 'Jednoiposoban stan - Magnolija (Izdavanje)',
    location: 'Novi Beograd - Magnolija',
    price: 400, // Cena za izdavanje (mesečno)
    type: 'rent', // VAŽNO: rent, ne sale!
    property_type: 'apartment',
    square_meters: 32,
    bedrooms: 1,
    bathrooms: 1,
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: '2/3',
    heating: 'Etažno grejanje na struju',
    parking: null,
    year_renovated: 'Novo - Lux',
    orientation: null,
    furnished: 'Iznad standarda - odmah useljiv',
    distance_to_river: null,
    land_location: null,
    building_on_land: null,
    land_type: null,
  };

  const { data, error } = await supabase
    .from('apartments')
    .insert([newApartment])
    .select();

  if (error) {
    console.error('❌ Greška pri dodavanju oglasa:', error.message);
    return;
  }

  console.log('\n✅ Oglas uspešno dodat!\n');
  console.log('📋 Podaci:');
  console.log(`   Naziv: ${data[0].name}`);
  console.log(`   Lokacija: ${data[0].location}`);
  console.log(`   Tip: ${data[0].type === 'rent' ? 'IZDAVANJE' : 'PRODAJA'}`);
  console.log(`   Cena: €${data[0].price}/mesec`);
  console.log(`   Površina: ${data[0].square_meters}m²`);
  console.log(`   Sobe: ${data[0].bedrooms}`);
  console.log(`   Kupatila: ${data[0].bathrooms}`);
  console.log(`   Broj slika: ${data[0].images.length}`);
  console.log(`   ID: ${data[0].id}\n`);
}

addMagnolijaRental()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
