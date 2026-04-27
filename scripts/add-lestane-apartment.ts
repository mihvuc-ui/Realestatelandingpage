/**
 * Dodavanje novog oglasa - Stan Leštane, Grocka
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addLestaneApartment() {
  console.log('📝 Dodajem oglas - Stan Leštane...\n');

  // 1. Lista slika iz foldera Lestane1
  const { data: files, error: listError } = await supabase
    .storage
    .from('apartment-images')
    .list('Lestane1', {
      limit: 100,
      offset: 0,
    });

  if (listError) {
    console.error('❌ Greška pri čitanju foldera:', listError.message);
    return;
  }

  if (!files || files.length === 0) {
    console.error('❌ Folder Lestane1 je prazan ili ne postoji!');
    return;
  }

  console.log(`✅ Pronađeno ${files.length} slika u folderu Lestane1\n`);

  // 2. Kreiraj URL-ove za slike i sortiraj numerički
  const imageUrls = files
    .filter(file => !file.name.includes('.emptyFolderPlaceholder'))
    .map(file => {
      return `https://saoxrazxkagpolfkszek.supabase.co/storage/v1/object/public/apartment-images/Lestane1/${file.name}`;
    })
    .sort((a, b) => {
      const filenameA = a.substring(a.lastIndexOf('/') + 1);
      const filenameB = b.substring(b.lastIndexOf('/') + 1);
      const numA = parseInt(filenameA.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(filenameB.match(/(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`📸 Kreirao ${imageUrls.length} URL-ova za slike\n`);

  // 3. Opisi
  const descriptionSr = `U ponudi je prelepo uređena novogradnja u Leštanima, pažljivo projektovana da kombinuje modernu estetiku i funkcionalnost, u mirnom porodičnom delu sa odličnim gradskim i prigradskim povezivanjem, uz parking mesto koje ide uz stan.

Osnovne informacije:
📐 Površina: 48m²
🏠 Tip: Dvosoban stan
🏢 Sprat: Prvi sprat
🚗 Parking: Pripadajuće parking mesto uz stan

Lokacija i okolina:
✨ Miran i porodičan kraj sa urednim ulicama i lepom novogradnjom.
Leštane je naselje u opštini Grocka koje se brzo razvija i sve više postaje privlačno mesto za život.

Prevoz:
• Autobuske linije 302, 303, 304, 305, 306, 307, 311 i 313 povezuju Leštane sa Beogradom i prigradskim delovima, uključujući Mirijevo, Ustaničku i Kaludjericu.
• Stanica gradskog prevoza je 10 minuta hoda – praktično za sve pravce.
• Laki pristup javnom prevozu olakšava putovanje ka centru Beograda i okolini.

Škole i vrtići:
U naselju i okolini postoje osnovne škole i vrtići, što stan čini pogodnim za porodice sa decom.

Prodavnice i usluge:
• Lokalni marketi, apoteke i pekare su u neposrednoj blizini.
• Kaludjerica, kao centar veće kupovine i usluga, nalazi se vrlo blizu i nudi dodatne sadržaje – veće markete, prodavnice i usluge.

Dodatno:
• Mirna ulica i porodična atmosfera – idealno za svakodnevni život bez gradske gužve
• Mogućnost kupovine putem kredita za mlade

Stan ispunjava uslove za kupovinu putem programa subvencionisanih stambenih kredita za mlade, koje država trenutno sprovodi.

Ukoliko kupujete prvu nekretninu i želite da iskoristite ovu pogodnost, kroz ceo proces kupovine prolazimo zajedno – od provere dokumentacije i komunikacije sa bankom, do pripreme kompletne papirologije i realizacije kupoprodaje.

Naš tim pruža punu podršku kako bi procedura bila jasna, sigurna i maksimalno pojednostavljena za Vas, uz transparentno vođenje kroz svaki korak.`;

  const descriptionEn = `We offer a beautifully designed new construction in Leštane, carefully designed to combine modern aesthetics and functionality, in a quiet family area with excellent urban and suburban connections, with a parking space included with the apartment.

Basic information:
📐 Area: 48m²
🏠 Type: Two-bedroom apartment
🏢 Floor: First floor
🚗 Parking: Assigned parking space with apartment

Location and surroundings:
✨ Quiet and family-friendly area with tidy streets and beautiful new construction.
Leštane is a settlement in the municipality of Grocka that is developing rapidly and is becoming an increasingly attractive place to live.

Transportation:
• Bus lines 302, 303, 304, 305, 306, 307, 311 and 313 connect Leštane with Belgrade and suburban areas, including Mirijevo, Ustanička and Kaludjerica.
• City transport station is a 10-minute walk – practical for all directions.
• Easy access to public transport makes travel to the center of Belgrade and the surrounding area easier.

Schools and kindergartens:
There are primary schools and kindergartens in the settlement and surrounding area, making the apartment suitable for families with children.

Shops and services:
• Local markets, pharmacies and bakeries are in the immediate vicinity.
• Kaludjerica, as a center for larger shopping and services, is very close and offers additional facilities – larger markets, shops and services.

Additional:
• Quiet street and family atmosphere – ideal for everyday life without city crowds
• Possibility of purchase through youth loans

The apartment meets the conditions for purchase through the subsidized housing loan program for young people, which the state is currently implementing.

If you are buying your first property and want to take advantage of this benefit, we go through the entire purchase process together – from checking documentation and communicating with the bank, to preparing complete paperwork and completing the sale.

Our team provides full support to make the procedure clear, safe and as simple as possible for you, with transparent guidance through every step.`;

  const descriptionRu = `Мы предлагаем красиво оформленную новостройку в Лештане, тщательно спроектированную для сочетания современной эстетики и функциональности, в тихом семейном районе с отличным городским и пригородным сообщением, с парковочным местом, включенным в квартиру.

Основная информация:
📐 Площадь: 48м²
🏠 Тип: Двухкомнатная квартира
🏢 Этаж: Первый этаж
🚗 Парковка: Назначенное парковочное место с квартирой

Местоположение и окрестности:
✨ Тихий и семейный район с аккуратными улицами и красивым новым строительством.
Лештане - это поселение в муниципалитете Гроцка, которое быстро развивается и становится все более привлекательным местом для жизни.

Транспорт:
• Автобусные линии 302, 303, 304, 305, 306, 307, 311 и 313 соединяют Лештане с Белградом и пригородными районами, включая Мириево, Устаничку и Калуджерицу.
• Станция городского транспорта находится в 10 минутах ходьбы – удобно для всех направлений.
• Легкий доступ к общественному транспорту облегчает поездки в центр Белграда и окрестности.

Школы и детские сады:
В поселении и окрестностях есть начальные школы и детские сады, что делает квартиру подходящей для семей с детьми.

Магазины и услуги:
• Местные рынки, аптеки и пекарни находятся в непосредственной близости.
• Калуджерица, как центр для более крупных покупок и услуг, находится очень близко и предлагает дополнительные удобства – более крупные рынки, магазины и услуги.

Дополнительно:
• Тихая улица и семейная атмосфера – идеально для повседневной жизни без городской суеты
• Возможность покупки через кредиты для молодежи

Квартира соответствует условиям для покупки по программе субсидированного жилищного кредитования для молодежи, которую в настоящее время реализует государство.`;

  const descriptionTr = `Leštane'de, modern estetiği ve işlevselliği birleştirmek için özenle tasarlanmış, mükemmel şehir ve banliyö bağlantılarına sahip, sakin bir aile bölgesinde, daire ile birlikte park yeri dahil olmak üzere güzel bir şekilde tasarlanmış yeni bir inşaat sunuyoruz.

Temel bilgiler:
📐 Alan: 48m²
🏠 Tip: İki yatak odalı daire
🏢 Kat: Birinci kat
🚗 Park yeri: Daire ile atanmış park yeri

Konum ve çevre:
✨ Düzenli sokaklar ve güzel yeni inşaatlarla sakin ve aile dostu bir bölge.
Leštane, Grocka belediyesinde hızla gelişen ve giderek daha çekici bir yaşam yeri haline gelen bir yerleşimdir.

Ulaşım:
• 302, 303, 304, 305, 306, 307, 311 ve 313 otobüs hatları Leštane'yi Mirijevo, Ustanička ve Kaludjerica dahil Belgrad ve banliyö bölgeleriyle bağlar.
• Şehir ulaşım istasyonu 10 dakikalık yürüme mesafesindedir – tüm yönler için pratiktir.
• Toplu taşımaya kolay erişim, Belgrad merkezine ve çevresine seyahati kolaylaştırır.

Okullar ve anaokulları:
Yerleşim yerinde ve çevresinde ilkokullar ve anaokulları bulunmaktadır, bu da daireyi çocuklu aileler için uygun hale getirmektedir.

Dükkanlar ve hizmetler:
• Yerel marketler, eczaneler ve fırınlar yakın çevrededir.
• Kaludjerica, daha büyük alışveriş ve hizmetler için bir merkez olarak çok yakındır ve ek tesisler sunar – daha büyük marketler, dükkanlar ve hizmetler.

Ek:
• Sakin sokak ve aile atmosferi – şehir kalabalığı olmadan günlük yaşam için ideal
• Gençlik kredileri yoluyla satın alma imkanı

Daire, devletin şu anda uyguladığı gençler için sübvansiyonlu konut kredisi programı yoluyla satın alma koşullarını karşılamaktadır.`;

  // 4. Kreiraj oglas
  const newApartment = {
    name: 'Dvosoban stan - Leštane, Grocka',
    location: 'Grocka - Leštane / Živka Živkovića',
    price: 85000,
    type: 'sale',
    property_type: 'apartment',
    square_meters: 48,
    bedrooms: 2,
    bathrooms: 1,
    description_sr: descriptionSr,
    description_en: descriptionEn,
    description_ru: descriptionRu,
    description_tr: descriptionTr,
    images: imageUrls,
    featured: true,
    floor: '1/2',
    heating: 'EG (Električno grejanje)',
    parking: 'Pripadajuće parking mesto uz stan',
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

addLestaneApartment()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
