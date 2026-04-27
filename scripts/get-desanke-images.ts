/**
 * Dobijanje slika iz "Desanke Maksimovic 1" foldera i kreiranje oglasa
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/utils/supabase/types.js';

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function createDesankeApartment() {
  console.log('🔍 Tražim slike u "Desanke Maksimovic 1" folderu...\n');

  // Proverimo folder sa razmakom
  const { data: files, error } = await supabase.storage
    .from('apartment-images')
    .list('Desanke Maksimovic 1', { limit: 100 });

  if (error) {
    console.error('❌ Greška:', error.message);
    console.log('\n💡 Folder možda ne postoji ili ima drugačiji naziv.');
    console.log('   Proverite u Supabase Dashboard → Storage → apartment-images\n');
    process.exit(1);
  }

  if (!files || files.length === 0) {
    console.log('📭 Folder je prazan ili ne postoji.\n');
    console.log('💡 Molim vas upload-ujte slike kroz Admin Panel:\n');
    console.log('   1. Kliknite ⚙️ (Admin Panel)');
    console.log('   2. "Dodaj Novi Oglas"');
    console.log('   3. "Upload Slike"');
    console.log('   4. Izaberite slike iz "Desanke Maksimovic1" foldera\n');
    process.exit(0);
  }

  console.log(`✅ Pronađeno ${files.length} slika!\n`);

  const imageUrls: string[] = [];

  files.forEach((file, i) => {
    const { data } = supabase.storage
      .from('apartment-images')
      .getPublicUrl(`Desanke Maksimovic 1/${file.name}`);

    console.log(`${i + 1}. ${file.name}`);
    imageUrls.push(data.publicUrl);
  });

  console.log(`\n📸 Ukupno ${imageUrls.length} URL-ova kreirano!`);
  console.log('\n🏢 Kreiram oglas sa ovim slikama...\n');

  const apartment = {
    name: 'Dvosoban stan - Vračar, Desanke Maksimović',
    location: 'Vračar - Desanke Maksimović / Krunska',
    price: 239990,
    type: 'sale' as const,
    square_meters: 58,
    bedrooms: 2,
    bathrooms: 1,
    description_sr: `Dragi kupci, predstavljamo vam stan na jednoj od najtraženijih lokacija u Beogradu, u ulici Desanke Maksimović, sa ulazom iz Krunske ulice.

Stan površine 58m², po strukturi 2.0, nalazi se na visokom prizemlju i poseduje dvostranu orijentaciju – sa jedne strane gleda ka ulici Desanke Maksimović, dok sa druge pruža pogled ka zelenilu i parku iza Pozorišta Dadov, što mu daje savršen balans između gradske dinamike i mira.

U pitanju je nekretnina za kompletnu renovaciju, što budućem vlasniku ostavlja mogućnost da prostor uredi potpuno po sopstvenim željama i potrebama.

Ono što ovu ponudu čini izuzetnom jeste činjenica da se ovakvi stanovi na ovoj lokaciji gotovo ne pojavljuju, posebno uz dodatni benefit pripadajućeg parking mesta, koje značajno povećava vrednost nekretnine.

Lokacija je izuzetno tražena kako za život, tako i za izdavanje — u neposrednoj blizini nalaze se Pravni fakultet, Tašmajdanski park, Crkva Svetog Marka, kao i brojni sadržaji koji privlače turiste, studente i porodice.

Za investitore, ovo je jasna prilika — stan ovog tipa, nakon renoviranja, može ostvarivati prihod od 80€ do 100€ dnevno kroz Airbnb izdavanje, uz dodatni potencijal zarade kroz dalju preprodaju.

Ukoliko tražite nekretninu sa karakterom, lokacijom i sigurnim investicionim potencijalom — ovo je prilika koju ne treba propustiti.

✨ Dodatno:
• Pripadajuće parking mesto
• 58m² | 2.0 stan | visoko prizemlje
• Dvostrana orijentacija – pogled na ulicu i park
• Ulaz iz Krunske i Desanke Maksimović
• Pogled ka parku iza Pozorišta Dadov
• Investicija sa potencijalom – Airbnb 80–100€ dnevno
• Retkost na tržištu – ovakvi stanovi se gotovo ne pojavljuju`,
    description_en: `Dear buyers, we present to you an apartment in one of the most sought-after locations in Belgrade, on Desanke Maksimović Street, with entrance from Krunska Street.

The apartment of 58m², structured as a 2.0, is located on the high ground floor and has a double orientation – on one side it overlooks Desanke Maksimović Street, while on the other it offers a view of the greenery and park behind Dadov Theater, giving it a perfect balance between urban dynamics and peace.

This is a property for complete renovation, which leaves the future owner the opportunity to arrange the space completely according to their own wishes and needs.

What makes this offer exceptional is the fact that such apartments in this location almost never appear, especially with the additional benefit of an assigned parking space, which significantly increases the property value.

The location is extremely sought after both for living and renting — nearby are the Faculty of Law, Tašmajdan Park, St. Mark's Church, as well as numerous facilities that attract tourists, students and families.

For investors, this is a clear opportunity — an apartment of this type, after renovation, can generate income of €80 to €100 per day through Airbnb rental, with additional earning potential through further resale.

If you are looking for a property with character, location and secure investment potential — this is an opportunity not to be missed.`,
    description_ru: `Дорогие покупатели, представляем вам квартиру в одном из самых востребованных мест Белграда, на улице Десанке Максимович, со входом с улицы Крунска.

Квартира площадью 58м², структуры 2.0, расположена на высоком первом этаже и имеет двойную ориентацию – с одной стороны выходит на улицу Десанке Максимович, а с другой открывается вид на зелень и парк позади театра Дадов, что дает ей идеальный баланс между городской динамикой и спокойствием.

Это недвижимость для полной реновации, что оставляет будущему владельцу возможность обустроить пространство полностью по своим желаниям и потребностям.

Что делает это предложение исключительным, так это то, что такие квартиры в этом месте почти никогда не появляются, особенно с дополнительным преимуществом назначенного парковочного места, которое значительно увеличивает стоимость недвижимости.

Локация чрезвычайно востребована как для жизни, так и для аренды — рядом находятся Юридический факультет, парк Ташмайдан, церковь Святого Марка, а также многочисленные объекты, привлекающие туристов, студентов и семьи.`,
    description_tr: `Değerli alıcılar, size Belgrat'ın en çok aranan lokasyonlarından birinde, Krunska Caddesi'nden girişli Desanke Maksimović Sokağı'nda bir daire sunuyoruz.

58m² alanlı, 2.0 yapısında daire, yüksek zemin katta yer almakta ve çift yönlüdür – bir taraftan Desanke Maksimović Sokağı'na bakarken, diğer taraftan Dadov Tiyatrosu arkasındaki yeşillik ve parka manzara sunarak kentsel dinamizm ve huzur arasında mükemmel bir denge sağlamaktadır.

Bu, tam renovasyon için bir mülktür, bu da gelecekteki sahibine alanı tamamen kendi istekleri ve ihtiyaçlarına göre düzenleme fırsatı bırakır.

Lokasyon hem yaşam hem de kiralama için son derece aranmaktadır — yakınlarda Hukuk Fakültesi, Tašmajdan Parkı, Aziz Markos Kilisesi ve turistleri, öğrencileri ve aileleri çeken çok sayıda tesis bulunmaktadır.`,
    images: imageUrls,
    featured: true,
    floor: 'Visoko prizemlje',
    heating: 'Centralno grejanje',
    parking: 'Pripadajuće parking mesto',
    year_renovated: 'Za renoviranje',
    orientation: 'Dvostrana - ulica i park',
    furnished: 'Prazno',
    distance_to_river: null
  };

  const { data, error: insertError } = await supabase
    .from('apartments')
    .insert(apartment)
    .select();

  if (insertError) {
    console.error('❌ Greška pri dodavanju oglasa:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Oglas uspešno kreiran!\n');
  console.log('📊 Detalji:');
  console.log(`   Naziv: ${data[0].name}`);
  console.log(`   Lokacija: ${data[0].location}`);
  console.log(`   Cena: €${data[0].price.toLocaleString()}`);
  console.log(`   Površina: ${data[0].square_meters}m²`);
  console.log(`   Broj slika: ${imageUrls.length}`);
  console.log('\n🎉 Oglas je live na sajtu! Refreshujte stranicu!\n');
}

createDesankeApartment()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
