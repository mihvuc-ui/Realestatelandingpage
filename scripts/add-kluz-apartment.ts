/**
 * Dodavanje novog oglasa - Stan Zvezdara, Kluz
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addKluzApartment() {
  console.log('📝 Dodajem oglas - Stan Zvezdara, Kluz...\n');

  // 1. Lista slika iz foldera Kluz1
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('Kluz1', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder Kluz1 je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} slika u folderu Kluz1\n`);

  // 2. Kreiraj URL-ove za slike
  const imageUrls = files
    .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/Kluz1/${file.name}`;
    });

  console.log(`📸 Kreirao ${imageUrls.length} URL-ova za slike\n`);

  // 3. Opisi
  const descriptionSr = `Predstavljamo vam stan za kupce koji traže vrhunski kvalitet, privatnost i dugoročnu vrednost – 70m² uknjižene stambene površine + 27m² terase, realizovan bez kompromisa u svakom detalju.

Plafoni visine 2,75m daju dodatni osećaj prostranosti i luksuza, dok je ceo stan dodatno zvučno izolovan – kako između prostorija (zatvorite vrata i imate potpunu tišinu), tako i prema spolja. Ulična buka se u stanu praktično ne čuje, što obezbeđuje mir i komfor retko dostupan na gradskoj lokaciji.

Stan se nalazi u Ilindenskoj ulici, na Zelenom brdu, kod Kluza, na svega 200m hoda od Bulevara kralja Aleksandra.

Enterijer je realizovan po najvišim standardima – kompletan nameštaj rađen po meri, vrhunska ALU-drvo stolarija proizvođača Alumil, podno grejanje sprovedeno kroz ceo stan, kao i elektronske roletne koje dodatno doprinose komforu i energetskoj efikasnosti.

Raspored je izuzetno funkcionalan:
• Prostrana, svetla dnevna soba sa trpezarijom
• Dve velike, potpuno odvojene spavaće sobe
• Dva zasebna kupatila, oba sa tuš kabinom
• Dvostrana orijentacija
• Otvori na tri strane zgrade

Posebnu vrednost daje izdvojena terasa površine 27m², opremljena bioklimatskom pergolom sa pokretnim lamelama. Izvedene su instalacije za đakuzi i saunu, čime je predviđena mogućnost formiranja privatne spa zone.

Lokacija omogućava odličnu povezanost – tramvajske linije sa Bulevara kralja Aleksandra direktno vode ka centru grada, dok je autoput na svega nekoliko minuta vožnje. U blizini su škole, vrtići, prodavnice i kompletna infrastruktura potrebna za kvalitetan porodičan život.

Postoji mogućnost kupovine:
• Garažnog mesta na klackalici – 20.000€ + PDV
• Spoljnog parking mesta ispred zgrade – 15.000€
• Zasebne garaže sa rolovratima unutar zgrade - 50.000€

Ključne karakteristike:
✨ 70m² uknjiženo + 27m² terasa
✨ Visina plafona 2,75m
✨ Dodatna zvučna izolacija (unutrašnja i spoljašnja)
✨ Podno grejanje u celom stanu
✨ Elektronske roletne
✨ 2 velike spavaće sobe
✨ 2 zasebna kupatila sa tuš kabinama
✨ Izdvojena terasa sa bioklimatskom pergolom
✨ Instalacije za đakuzi i saunu
✨ ALU-drvo stolarija (Alumil)
✨ 200m do Bulevara kralja Aleksandra
✨ Brz izlaz na autoput`;

  const descriptionEn = `We present you an apartment for buyers seeking top quality, privacy and long-term value – 70m² of registered living space + 27m² terrace, realized without compromise in every detail.

Ceilings of 2.75m height provide an additional sense of spaciousness and luxury, while the entire apartment is additionally soundproofed – both between rooms (close the door and you have complete silence) and from outside. Street noise is practically inaudible in the apartment, providing peace and comfort rarely available in an urban location.

The apartment is located in Ilindenska Street, on Zeleno Brdo, near Kluz, just 200m walk from Boulevard of King Alexander.

The interior is realized to the highest standards – complete custom-made furniture, premium ALU-wood joinery by Alumil manufacturer, underfloor heating throughout the apartment, as well as electronic blinds that additionally contribute to comfort and energy efficiency.

The layout is extremely functional:
• Spacious, bright living room with dining area
• Two large, completely separate bedrooms
• Two separate bathrooms, both with shower cabins
• Double orientation
• Openings on three sides of the building

Special value is added by a separate terrace of 27m², equipped with a bioclimatic pergola with movable slats. Installations for jacuzzi and sauna have been made, providing the possibility of forming a private spa zone.

The location provides excellent connectivity – tram lines from Boulevard of King Alexander lead directly to the city center, while the highway is just a few minutes' drive away. Nearby are schools, kindergartens, shops and complete infrastructure needed for quality family life.

Purchase options available:
• Garage space on platform – €20,000 + VAT
• Outdoor parking space in front of building – €15,000
• Separate garage with roller doors inside building - €50,000`;

  const descriptionRu = `Представляем вам квартиру для покупателей, ищущих высочайшее качество, приватность и долгосрочную ценность – 70м² зарегистрированной жилой площади + 27м² террасы, реализованных без компромиссов в каждой детали.

Потолки высотой 2,75м создают дополнительное ощущение простора и роскоши, в то время как вся квартира дополнительно звукоизолирована – как между комнатами (закройте дверь и у вас полная тишина), так и от внешних звуков. Уличный шум практически не слышен в квартире, что обеспечивает мир и комфорт, редко доступные в городской локации.

Квартира находится на улице Илинденска, на Зеленом холме, возле Клуза, всего в 200м ходьбы от Бульвара короля Александра.

Интерьер реализован по высочайшим стандартам – полностью изготовленная на заказ мебель, премиум ALU-деревянная столярка производителя Alumil, теплые полы по всей квартире, а также электронные жалюзи, которые дополнительно способствуют комфорту и энергоэффективности.

Планировка чрезвычайно функциональна:
• Просторная, светлая гостиная со столовой
• Две большие, полностью отдельные спальни
• Две отдельные ванные комнаты, обе с душевыми кабинами
• Двухсторонняя ориентация
• Окна на трех сторонах здания

Особую ценность добавляет отдельная терраса площадью 27м², оборудованная биоклиматической пергулой с подвижными ламелями. Выполнены установки для джакузи и сауны, что предоставляет возможность формирования частной спа-зоны.

Местоположение обеспечивает отличную связь – трамвайные линии с Бульвара короля Александра ведут прямо в центр города, в то время как автомагистраль находится всего в нескольких минутах езды. Рядом находятся школы, детские сады, магазины и полная инфраструктура, необходимая для качественной семейной жизни.`;

  const descriptionTr = `Size en yüksek kalite, mahremiyet ve uzun vadeli değer arayan alıcılar için bir daire sunuyoruz – 70m² kayıtlı yaşam alanı + 27m² teras, her detayda taviz vermeden gerçekleştirilmiş.

2,75m yüksekliğindeki tavanlar ek bir genişlik ve lüks hissi sağlar, tüm daire ayrıca ses yalıtımlıdır – hem odalar arasında (kapıyı kapatın ve tam sessizlik elde edin) hem de dışarıdan. Sokak gürültüsü dairede neredeyse duyulmaz, bu da kentsel bir konumda nadiren bulunan huzur ve konfor sağlar.

Daire Ilindenska Caddesi'nde, Zeleno Brdo'da, Kluz yakınında, Kral Alexander Bulvarı'na sadece 200m yürüme mesafesindedir.

İç mekan en yüksek standartlarda gerçekleştirilmiştir – tamamen özel yapım mobilyalar, Alumil üreticisinin premium ALU-ahşap doğraması, tüm dairede döşeme ısıtması ve konfora ve enerji verimliliğine ek katkı sağlayan elektronik storlar.

Düzen son derece işlevseldir:
• Geniş, aydınlık yemek odalı oturma odası
• İki büyük, tamamen ayrı yatak odası
• İkisi de duş kabinli iki ayrı banyo
• Çift yönlü oryantasyon
• Binanın üç tarafında açıklıklar

Hareketli lamellerle donatılmış biyo-klimatik bir pergola ile donatılmış 27m²'lik ayrı bir teras özel değer katar. Jakuzi ve sauna için kurulumlar yapılmış olup, özel bir spa bölgesi oluşturma imkanı sağlamaktadır.

Konum mükemmel bağlantı sağlar – Kral Alexander Bulvarı'ndan tramvay hatları doğrudan şehir merkezine gider, otoyol ise sadece birkaç dakikalık sürüş mesafesindedir. Yakınlarda okullar, anaokulları, dükkanlar ve kaliteli aile yaşamı için gerekli tam altyapı bulunmaktadır.`;

  // 4. Kreiraj oglas
  const newApartment = {
    name: 'Trosoban stan - Zvezdara, Kluz',
    location: 'Zvezdara - Kluz / Ilindenska',
    price: 365000,
    type: 'sale',
    property_type: 'apartment',
    square_meters: 70,
    bedrooms: 3,
    bathrooms: 2,
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: 'Visoko prizemlje (VPR)',
    heating: 'Podno grejanje',
    parking: 'Mogućnost kupovine garaže (20.000€+PDV) ili parking mesta (15.000€)',
    year_renovated: 'Novogradnja - Lux',
    orientation: 'Dvostrana orijentacija',
    furnished: 'Kompletno namešten, nameštaj rađen po meri',
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

  console.log('✅ Oglas uspešno dodat!\n');
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

addKluzApartment()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
