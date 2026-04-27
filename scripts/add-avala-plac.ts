/**
 * Dodavanje novog oglasa - Plac Avala, Pinosava
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addAvalaPlac() {
  console.log('📝 Dodajem oglas - Plac Avala...\n');

  // 1. Lista slika iz foldera PlacAvala
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('PlacAvala', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder PlacAvala je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} slika u folderu PlacAvala\n`);

  // 2. Kreiraj URL-ove za slike
  const imageUrls = files
    .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/PlacAvala/${file.name}`;
    });

  console.log(`📸 Kreirao ${imageUrls.length} URL-ova za slike\n`);

  // 3. Opisi
  const descriptionSr = `Na prodaju 15.87 ari placa u Pinosavi, prelepoj okolini Avale. Uknjižen.

U mirnom i zelenom okruženju, idealnom za porodični život, prodaje se ograđen plac sa zasađenim sadnicama raznog voća.

Lokacija: okolina Avale, svega 13 km od Slavije – spoj prirode i blizine centra grada!

Plac se nalazi u građevinskoj zoni – idealan za izgradnju porodične kuće iz snova.

Infrastruktura:
• Asfalt do samog placa
• Struja ⚡
• Voda 💧
• Gas ispred placa

U blizini su osnovna škola, gradski prevoz i sve što je potrebno za udoban život.

Ono što ovaj plac posebno izdvaja jeste otvoren, neometan pogled na šume i livade – retkost na tržištu koja garantuje privatnost, mir i osećaj slobode.

Investicioni potencijal:
• Postavljanje montažnih kućica ili A-frame objekata za izdavanje (Airbnb koncept) – priroda, pogled i blizina Beograda čine ovu lokaciju izuzetno traženom za vikend turizam.
• Kreiranje mini eko-resorta sa više manjih objekata – idealno za digitalne nomade i beg iz grada.
• Dodatna sadnja voća i formiranje privatnog voćnjaka ili organske proizvodnje – dugoročna i održiva investicija.
• Izgradnja vikendice sa pratećim sadržajem (letnjikovac, bazen, sauna) za lično uživanje ili rentiranje.
• Glamping koncept (luksuzni šatori u prirodi) – sve popularniji vid turizma sa odličnim povraćajem investicije.

Plac nudi širok spektar mogućnosti – od mirnog porodičnog doma do pametne investicije koja može generisati prihod tokom cele godine.

Ako tražite mesto koje kombinuje prirodu, privatnost i ozbiljan potencijal za razvoj – ovo je prilika koju ne treba propustiti.`;

  const descriptionEn = `For sale: 15.87 ares of land in Pinosava, the beautiful surroundings of Avala. Registered in the land registry.

In a quiet and green environment, ideal for family life, a fenced plot with planted fruit tree saplings is for sale.

Location: Avala area, only 13 km from Slavija – a combination of nature and proximity to the city center!

The plot is located in a construction zone – ideal for building your dream family home.

Infrastructure:
• Asphalt road to the plot
• Electricity ⚡
• Water 💧
• Gas in front of the plot

Nearby are an elementary school, public transport and everything needed for comfortable living.

What makes this plot particularly special is the open, unobstructed view of forests and meadows – a rarity on the market that guarantees privacy, peace and a sense of freedom.

Investment potential:
• Placement of prefab houses or A-frame structures for rental (Airbnb concept) – nature, views and proximity to Belgrade make this location highly sought after for weekend tourism.
• Creation of a mini eco-resort with several smaller buildings – ideal for digital nomads and city escape.
• Additional fruit planting and formation of a private orchard or organic production – long-term and sustainable investment.
• Construction of a weekend house with additional facilities (summer house, pool, sauna) for personal enjoyment or rental.
• Glamping concept (luxury tents in nature) – an increasingly popular type of tourism with excellent return on investment.

The plot offers a wide range of possibilities – from a peaceful family home to a smart investment that can generate income throughout the year.

If you are looking for a place that combines nature, privacy and serious development potential – this is an opportunity not to be missed.`;

  const descriptionRu = `Продается 15,87 соток земли в Пиносаве, красивом окрестностях Авалы. Зарегистрирован в земельном кадастре.

В тихой и зеленой среде, идеальной для семейной жизни, продается огороженный участок с посаженными саженцами фруктовых деревьев.

Местоположение: район Авалы, всего в 13 км от Славии – сочетание природы и близости к центру города!

Участок находится в строительной зоне – идеально подходит для строительства дома вашей мечты.

Инфраструктура:
• Асфальтированная дорога до участка
• Электричество ⚡
• Вода 💧
• Газ перед участком

Поблизости находятся начальная школа, общественный транспорт и все необходимое для комфортной жизни.

Что делает этот участок особенно привлекательным, так это открытый, беспрепятственный вид на леса и луга – редкость на рынке, которая гарантирует приватность, покой и чувство свободы.

Инвестиционный потенциал:
• Размещение сборных домов или А-образных конструкций для аренды (концепция Airbnb) – природа, виды и близость к Белграду делают эту локацию очень востребованной для выходного туризма.
• Создание мини-эко-курорта с несколькими небольшими зданиями – идеально для цифровых кочевников и бегства из города.
• Дополнительная посадка фруктов и формирование частного сада или органического производства – долгосрочная и устойчивая инвестиция.
• Строительство дачи с дополнительными удобствами (летний дом, бассейн, сауна) для личного удовольствия или аренды.
• Концепция глэмпинга (роскошные палатки на природе) – все более популярный вид туризма с отличной окупаемостью инвестиций.

Участок предлагает широкий спектр возможностей – от мирного семейного дома до умной инвестиции, которая может приносить доход круглый год.

Если вы ищете место, которое сочетает природу, приватность и серьезный потенциал развития – это возможность, которую нельзя упустить.`;

  const descriptionTr = `Avala'nın güzel çevresinde Pinosava'da 15,87 dönüm arazi satılıktır. Tapu kayıtlı.

Aile yaşamı için ideal, sakin ve yeşil bir ortamda, meyve ağacı fidanları dikilmiş çitli bir arsa satılıktır.

Konum: Avala bölgesi, Slavija'ya sadece 13 km – doğa ve şehir merkezine yakınlığın birleşimi!

Arsa inşaat bölgesinde bulunmaktadır – hayalinizdeki aile evini inşa etmek için idealdir.

Altyapı:
• Arsaya kadar asfalt yol
• Elektrik ⚡
• Su 💧
• Arsa önünde gaz

Yakınlarda ilkokul, toplu taşıma ve rahat yaşam için gereken her şey bulunmaktadır.

Bu arsayı özellikle özel kılan şey, ormanlara ve çayırlara açık, engelsiz manzarasıdır – piyasada gizlilik, huzur ve özgürlük hissi garanti eden bir nadirlik.

Yatırım potansiyeli:
• Kiralama için prefabrik evler veya A-çerçeve yapıların yerleştirilmesi (Airbnb konsepti) – doğa, manzara ve Belgrad'a yakınlık bu lokasyonu hafta sonu turizmi için oldukça cazip kılıyor.
• Birkaç küçük binadan oluşan mini eko-tatil köyü oluşturma – dijital göçebeler ve şehirden kaçış için ideal.
• Ek meyve ekimi ve özel bahçe veya organik üretim oluşturma – uzun vadeli ve sürdürülebilir yatırım.
• Kişisel keyif veya kiralama için ek tesislerle (yazlık ev, havuz, sauna) hafta sonu evi inşaatı.
• Glamping konsepti (doğada lüks çadırlar) – mükemmel yatırım getirisi olan giderek popüler bir turizm türü.

Arsa geniş bir olasılık yelpazesi sunuyor – huzurlu bir aile evinden yıl boyunca gelir sağlayabilecek akıllı bir yatırıma kadar.

Doğa, gizlilik ve ciddi gelişim potansiyelini birleştiren bir yer arıyorsanız – bu kaçırılmaması gereken bir fırsattır.`;

  // 4. Kreiraj oglas
  const newApartment = {
    name: 'Plac - Avala, Pinosava',
    location: 'Voždovac - Avala / Pinosava',
    price: 99999,
    type: 'sale',
    square_meters: 1587, // 15.87 ari = 1587 m²
    bedrooms: 0, // zemljište nema sobe
    bathrooms: 0, // zemljište nema kupatila
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: null,
    heating: null,
    parking: null,
    year_renovated: null,
    orientation: 'Otvoren pogled na šume i livade',
    furnished: 'Ograđen plac sa voćem',
    distance_to_river: null,
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
  console.log(`   Cena: €${data[0].price}`);
  console.log(`   Površina: ${data[0].square_meters}m² (15.87 ari)`);
  console.log(`   Broj slika: ${data[0].images.length}`);
  console.log(`   ID: ${data[0].id}\n`);
}

addAvalaPlac()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
