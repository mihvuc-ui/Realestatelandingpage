/**
 * Dodavanje novog oglasa - Stan Kluz (Zvezdara, Ilindenska)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addKluz2Apartment() {
  console.log('📝 Dodajem oglas - Stan Kluz (Zvezdara)...\n');

  // 1. Lista slika iz foldera Kluz2
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('Kluz2', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder Kluz2 je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} fajlova u folderu Kluz2\n`);

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
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/Kluz2/${file.name}`;
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
  const descriptionSr = `Stan za kupca koji traži vrhunski kvalitet, privatnost i dugoročnu vrednost – 70m² promišljeno projektovanog prostora u kom je samo ostalo da vi ostavite svoj pečat.

Plafoni visine 2,75m daju dodatni osećaj prostranosti i luksuza, dok je ceo stan dodatno zvučno izolovan – kako između prostorija (zatvorite vrata i imate potpunu tišinu), tako i prema spolja. Ulična buka se u stanu praktično ne čuje, što obezbeđuje mir i komfor retko dostupan na gradskoj lokaciji.

Stan se nalazi u Ilindenskoj ulici, na Zelenom brdu, kod Kluza, na svega 200m hoda od Bulevara kralja Aleksandra.

Enterijer je realizovan po najvišim standardima – kompletan nameštaj rađen po meri, vrhunska ALU-drvo stolarija proizvođača Alumil, podno grejanje sprovedeno kroz ceo stan, kao i elektronske roletne koje dodatno doprinose komforu i energetskoj efikasnosti.

Raspored je izuzetno funkcionalan:
• Prostrana, svetla dnevna soba sa trpezarijom
• Dve velike, potpuno odvojene spavaće sobe

Lokacija omogućava odličnu povezanost – tramvajske linije sa Bulevara kralja Aleksandra direktno vode ka centru grada, dok je autoput na svega nekoliko minuta vožnje. U blizini su škole, vrtići, prodavnice i kompletna infrastruktura potrebna za kvalitetan porodičan život.

Postoji mogućnost kupovine:
• Garažnog mesta na klackalici – 20.000€ + PDV
• Spoljnog parking mesta ispred zgrade – 15.000€
• Zasebne garaže sa rolovratima unutar zgrade - 50.000€

Ključne karakteristike:
• Cena: 240.000€
• Ilindenska – Zeleno brdo (kod Kluza)
• 70m² uknjiženo + 27m² terasa
• Visina plafona 2,75m
• Dodatna zvučna izolacija (unutrašnja i spoljašnja)
• Podno grejanje u celom stanu
• Elektronske roletne
• 2 velike spavaće sobe
• ALU-drvo stolarija (Alumil)
• 200m do Bulevara kralja Aleksandra
• Brz izlaz na autoput`;

  const descriptionEn = `An apartment for a buyer seeking top quality, privacy and long-term value – 70m² of thoughtfully designed space where all that remains is for you to leave your mark.

Ceilings 2.75m high provide an additional sense of spaciousness and luxury, while the entire apartment is additionally soundproofed – both between rooms (close the door and you have complete silence) and from the outside. Street noise is practically inaudible in the apartment, providing peace and comfort rarely available in an urban location.

The apartment is located in Ilindenska Street, on Zeleno Brdo, near Kluz, just 200m walk from Bulevar kralja Aleksandra.

The interior is executed to the highest standards – complete custom-made furniture, top-quality ALU-wood joinery by Alumil, underfloor heating throughout the apartment, as well as electronic blinds that further contribute to comfort and energy efficiency.

The layout is extremely functional:
• Spacious, bright living room with dining area
• Two large, completely separate bedrooms

The location offers excellent connectivity – tram lines from Bulevar kralja Aleksandra lead directly to the city center, while the highway is just a few minutes drive away. Nearby are schools, kindergartens, shops and complete infrastructure needed for quality family life.

Purchase options available:
• Garage space on a lift platform – €20,000 + VAT
• Outdoor parking space in front of the building – €15,000
• Separate garage with roller doors inside the building - €50,000

Key features:
• Price: €240,000
• Ilindenska – Zeleno Brdo (near Kluz)
• 70m² registered + 27m² terrace
• Ceiling height 2.75m
• Additional soundproofing (internal and external)
• Underfloor heating throughout
• Electronic blinds
• 2 large bedrooms
• ALU-wood joinery (Alumil)
• 200m to Bulevar kralja Aleksandra
• Quick access to highway`;

  const descriptionRu = `Квартира для покупателя, ищущего высшее качество, приватность и долгосрочную ценность – 70м² продуманно спроектированного пространства, где остается только оставить свой след.

Потолки высотой 2,75м создают дополнительное ощущение простора и роскоши, а вся квартира дополнительно звукоизолирована – как между комнатами (закройте дверь и получите полную тишину), так и от внешнего шума. Уличный шум практически не слышен в квартире, что обеспечивает покой и комфорт, редко доступные в городской локации.

Квартира расположена на улице Илинденска, на Зелено Брдо, возле Клуза, всего в 200м ходьбы от Булевара короля Александра.

Интерьер выполнен по высшим стандартам – полная мебель на заказ, высококачественные алюминиево-деревянные столярные изделия от Alumil, теплый пол по всей квартире, а также электронные жалюзи, которые дополнительно способствуют комфорту и энергоэффективности.

Планировка чрезвычайно функциональна:
• Просторная, светлая гостиная со столовой
• Две большие, полностью отдельные спальни

Расположение обеспечивает отличное сообщение – трамвайные линии с Булевара короля Александра ведут прямо в центр города, а автомагистраль находится всего в нескольких минутах езды. Рядом школы, детские сады, магазины и полная инфраструктура, необходимая для качественной семейной жизни.

Возможность приобретения:
• Гаражное место на подъемнике – €20,000 + НДС
• Наружное парковочное место перед зданием – €15,000
• Отдельный гараж с роллетными воротами внутри здания - €50,000`;

  const descriptionTr = `Üst düzey kalite, mahremiyet ve uzun vadeli değer arayan bir alıcı için daire – kendi izinizi bırakmanız için 70m² düşünceli tasarlanmış alan.

2,75m yüksekliğindeki tavanlar ek bir genişlik ve lüks hissi sağlarken, tüm daire ayrıca ses yalıtımlıdır – hem odalar arasında (kapıyı kapatın ve tam sessizliğe sahip olun) hem de dışarıdan. Sokak gürültüsü dairede neredeyse duyulmuyor, bu da şehir lokasyonunda nadiren bulunan huzur ve konfor sağlıyor.

Daire, Kluz yakınında, Zeleno Brdo'da, Ilindenska Sokağı'nda, Kral Aleksandar Bulvarı'na sadece 200m yürüme mesafesinde bulunmaktadır.

İç mekan en yüksek standartlarda yürütülmüştür – tam özel yapım mobilya, Alumil tarafından üst kalite ALU-ahşap doğrama, daire boyunca yerden ısıtma ve konfor ve enerji verimliliğine daha fazla katkıda bulunan elektronik panjurlar.

Düzen son derece işlevseldir:
• Geniş, aydınlık yemek bölümü ile oturma odası
• İki büyük, tamamen ayrı yatak odası

Konum mükemmel bağlantı sunmaktadır – Kral Aleksandar Bulvarı'ndan tramvay hatları doğrudan şehir merkezine götürürken, otoyol sadece birkaç dakikalık sürüş mesafesindedir. Yakınlarda okullar, anaokulları, mağazalar ve kaliteli aile yaşamı için gerekli tam altyapı bulunmaktadır.

Satın alma seçenekleri:
• Kaldırma platformunda garaj yeri – €20,000 + KDV
• Bina önünde açık park yeri – €15,000
• Bina içinde rulo kapılı ayrı garaj - €50,000`;

  // 4. Kreiraj oglas - postavljam ga kao najnoviji (created_at će biti najsvežiji)
  const newApartment = {
    name: 'Trosoban stan - Kluz, Zvezdara',
    location: 'Zvezdara - Kluz, Ilindenska (Zeleno brdo)',
    price: 240000,
    type: 'sale',
    property_type: 'apartment',
    square_meters: 70,
    bedrooms: 3,
    bathrooms: 1,
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: '1/3',
    heating: 'Podno grejanje',
    parking: 'Mogućnost kupovine garažnog mesta (20.000€+PDV), parking mesta (15.000€) ili garaže (50.000€)',
    year_renovated: 'Novogradnja - Lux',
    orientation: null,
    furnished: 'Odmah useljiv',
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
  console.log(`   Cena: €${data[0].price.toLocaleString()}`);
  console.log(`   Površina: ${data[0].square_meters}m²`);
  console.log(`   Sobe: ${data[0].bedrooms}`);
  console.log(`   Kupatila: ${data[0].bathrooms}`);
  console.log(`   Broj slika: ${data[0].images.length}`);
  console.log(`   ID: ${data[0].id}\n`);
}

addKluz2Apartment()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
