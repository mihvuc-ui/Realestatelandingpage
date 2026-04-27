/**
 * Dodavanje novog oglasa - Izdavanje stan Zeleno Brdo, Zvezdara
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addZelenoBrdoRental() {
  console.log('📝 Dodajem oglas - Izdavanje Stan Zeleno Brdo...\n');

  // 1. Lista slika iz foldera zelenobrdo
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('zelenobrdo', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder zelenobrdo je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova u folderu zelenobrdo\n`);

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
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/zelenobrdo/${file.name}`;
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
  const descriptionSr = `Funkcionalan stan od 35 m² u blizini Aviv Parka — odličan raspored i prelep pogled

Pametno organizovan stan koji na maloj kvadraturi pruža maksimum komfora. Zahvaljujući izuzetnom rasporedu, poseduje odvojenu spavaću sobu, što ga čini idealnim kako za samce tako i za parove. Poseban kvalitet stana predstavlja terasa sa veoma lepim, otvorenim pogledom koji prostoru daje dodatnu širinu i prijatan osećaj.

Karakteristike stana:

🛏️ Odvojena spavaća soba — privatnost i mir za odmor
📐 Odličan raspored — maksimalno iskorišćen svaki kvadrat
🗄️ Dovoljno ormara i prostora za odlaganje stvari
🍳 Funkcionalna kuhinja povezana sa dnevnim boravkom
☀️ Svetao i prijatan ambijent
🌅 Terasa sa veoma lepim, otvorenim pogledom
🏡 Mirno okruženje u blizini svih sadržaja

📍 Lokacija:

🛍️ U neposrednoj blizini Aviv Parka (prodavnice, kafići, restorani)
🚌 Odlična povezanost sa svim delovima grada
🎓 Blizina škola, vrtića i važnih institucija
🚗 Brz pristup glavnim saobraćajnicama

Dodatna opremljenost:
• Lift
• Terasa
• Toplotna izolacija

Tehnička opremljenost:
• Internet
• Optička mreža

Sigurnosna oprema:
• Sigurnosna vrata

Grejanje: Etažno grejanje na struju
Topla voda: Bojler
Smeštaj studenta: Moguć

Idealan izbor za one koji žele praktičan, lepo organizovan stan na atraktivnoj lokaciji.

📞 Za više informacija i zakazivanje razgledanja, slobodno nas kontaktirajte.`;

  const descriptionEn = `Functional 35 m² apartment near Aviv Park — excellent layout and beautiful view

Smartly organized apartment that provides maximum comfort on a small square footage. Thanks to the exceptional layout, it has a separate bedroom, making it ideal for both singles and couples. A special quality of the apartment is the terrace with a very beautiful, open view that gives the space additional width and a pleasant feeling.

Apartment features:

🛏️ Separate bedroom — privacy and peace for rest
📐 Excellent layout — every square meter maximally utilized
🗄️ Enough closets and storage space
🍳 Functional kitchen connected to the living room
☀️ Bright and pleasant ambiance
🌅 Terrace with a very beautiful, open view
🏡 Quiet surroundings close to all amenities

📍 Location:

🛍️ In the immediate vicinity of Aviv Park (shops, cafes, restaurants)
🚌 Excellent connection to all parts of the city
🎓 Close to schools, kindergartens and important institutions
🚗 Quick access to main roads

Additional features:
• Elevator
• Terrace
• Thermal insulation

Technical equipment:
• Internet
• Optical network

Security equipment:
• Security door

Heating: Floor heating with electricity
Hot water: Boiler
Student accommodation: Possible

An ideal choice for those who want a practical, well-organized apartment in an attractive location.

📞 For more information and to schedule a viewing, feel free to contact us.`;

  const descriptionRu = `Функциональная квартира 35 м² рядом с Aviv Park — отличная планировка и прекрасный вид

Разумно организованная квартира, которая обеспечивает максимальный комфорт на небольшой площади. Благодаря исключительной планировке, имеет отдельную спальню, что делает ее идеальной как для одиноких людей, так и для пар. Особое качество квартиры — терраса с очень красивым, открытым видом, который придает пространству дополнительную ширину и приятное ощущение.

Характеристики квартиры:

🛏️ Отдельная спальня — приватность и покой для отдыха
📐 Отличная планировка — максимально использован каждый квадратный метр
🗄️ Достаточно шкафов и места для хранения
🍳 Функциональная кухня, соединенная с гостиной
☀️ Светлая и приятная атмосфера
🌅 Терраса с очень красивым, открытым видом
🏡 Тихие окрестности рядом со всеми удобствами

📍 Расположение:

🛍️ В непосредственной близости от Aviv Park (магазины, кафе, рестораны)
🚌 Отличное сообщение со всеми частями города
🎓 Рядом со школами, детскими садами и важными учреждениями
🚗 Быстрый доступ к основным дорогам`;

  const descriptionTr = `Aviv Park yakınında 35 m² fonksiyonel daire — mükemmel düzen ve güzel manzara

Küçük bir metrekare üzerinde maksimum konfor sağlayan akıllıca organize edilmiş daire. Olağanüstü düzeni sayesinde ayrı bir yatak odasına sahiptir, bu da hem bekarlar hem de çiftler için ideal hale getirir. Dairenin özel kalitesi, alana ek genişlik ve hoş bir his veren çok güzel, açık manzaralı terastır.

Daire özellikleri:

🛏️ Ayrı yatak odası — dinlenme için mahremiyet ve huzur
📐 Mükemmel düzen — her metrekare maksimum şekilde kullanılmış
🗄️ Yeterli dolap ve depolama alanı
🍳 Oturma odasına bağlı fonksiyonel mutfak
☀️ Aydınlık ve hoş ortam
🌅 Çok güzel, açık manzaralı teras
🏡 Tüm olanaklara yakın sakin çevre

📍 Konum:

🛍️ Aviv Park'ın hemen yakınında (mağazalar, kafeler, restoranlar)
🚌 Şehrin tüm bölgelerine mükemmel bağlantı
🎓 Okullara, anaokullarına ve önemli kurumlara yakın
🚗 Ana yollara hızlı erişim`;

  // 4. Kreiraj oglas - IZDAVANJE (rent)
  // NAPOMENA: Cena nije navedena u opisu, stavićemo placeholder
  const newApartment = {
    name: 'Dvosoban stan - Zeleno Brdo, Zvezdara (Izdavanje)',
    location: 'Zvezdara - Zeleno Brdo / Aviv Park',
    price: 450, // TODO: Ažurirati tačnu cenu
    type: 'rent',
    property_type: 'apartment',
    square_meters: 35,
    bedrooms: 2,
    bathrooms: 1,
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: '3/3',
    heating: 'Etažno grejanje na struju',
    parking: null,
    year_renovated: 'Novogradnja',
    orientation: null,
    furnished: 'Namešten sa uređajima - odmah useljiv',
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

  console.log('⚠️  NAPOMENA: Proveri i ažuriraj cenu ako nije tačna!\n');
}

addZelenoBrdoRental()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
