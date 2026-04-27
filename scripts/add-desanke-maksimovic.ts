/**
 * Dodavanje oglasa - Vračar, Desanke Maksimović
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/utils/supabase/types.js';

config();

const supabaseUrl = `https://saoxrazxkagpolfkszek.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhb3hyYXp4a2FncG9sZmtzemVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTQzNjgsImV4cCI6MjA4NDU3MDM2OH0.AOH7_UTqzNE_wJ_aRB1mQZi0yxWWPkF_bsAjU0teHvY`;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function main() {
  console.log('🗑️  Brišem stari oglas (Nehruova)...\n');

  // Prvo obrišemo Nehruova oglas
  const { error: deleteError } = await supabase
    .from('apartments')
    .delete()
    .eq('name', 'Dvosoban stan - Nehruova, Savski blokovi');

  if (deleteError) {
    console.log('⚠️  Greška pri brisanju (možda već obrisan):', deleteError.message);
  } else {
    console.log('✅ Nehruova oglas obrisan!\n');
  }

  console.log('🏢 Dodajem novi oglas - Vračar, Desanke Maksimović...\n');

  // Prvo proveravamo folder u storage
  const { data: files, error: listError } = await supabase.storage
    .from('apartment-images')
    .list('apartments');

  console.log('📂 Fajlovi u storage:', files?.length || 0);

  // Filtrirajmo samo slike iz "Desanke Maksimovic1" foldera
  const desankeSlike = files?.filter(file =>
    file.name.toLowerCase().includes('desanke')
  ) || [];

  console.log('🖼️  Pronađene Desanke slike:', desankeSlike.length);

  const imageUrls = desankeSlike.map(file => {
    const { data } = supabase.storage
      .from('apartment-images')
      .getPublicUrl(`apartments/${file.name}`);
    return data.publicUrl;
  });

  console.log('📸 URL-ovi slika:', imageUrls);

  const apartment = {
    name: 'Dvosoban stan - Vračar, Desanke Maksimović',
    location: 'Vračar - Desanke Maksimović / Krunska',
    price: 239990,
    type: 'sale' as const,
    square_meters: 58,
    bedrooms: 2,
    bathrooms: 1,
    description_sr: $$Dragi kupci, predstavljamo vam stan na jednoj od najtraženijih lokacija u Beogradu, u ulici Desanke Maksimović, sa ulazom iz Krunske ulice.

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
• Retkost na tržištu – ovakvi stanovi se gotovo ne pojavljuju$$,
    description_en: $$Dear buyers, we present to you an apartment in one of the most sought-after locations in Belgrade, on Desanke Maksimović Street, with entrance from Krunska Street.

The apartment of 58m², structured as a 2.0, is located on the high ground floor and has a double orientation – on one side it overlooks Desanke Maksimović Street, while on the other it offers a view of the greenery and park behind Dadov Theater, giving it a perfect balance between urban dynamics and peace.

This is a property for complete renovation, which leaves the future owner the opportunity to arrange the space completely according to their own wishes and needs.

What makes this offer exceptional is the fact that such apartments in this location almost never appear, especially with the additional benefit of an assigned parking space, which significantly increases the property value.

The location is extremely sought after both for living and renting — nearby are the Faculty of Law, Tašmajdan Park, St. Mark's Church, as well as numerous facilities that attract tourists, students and families.

For investors, this is a clear opportunity — an apartment of this type, after renovation, can generate income of €80 to €100 per day through Airbnb rental, with additional earning potential through further resale.

If you are looking for a property with character, location and secure investment potential — this is an opportunity not to be missed.

✨ Additional features:
• Assigned parking space
• 58m² | 2.0 apartment | high ground floor
• Double orientation – view to street and park
• Entrance from Krunska and Desanke Maksimović
• View towards park behind Dadov Theater
• Investment with potential – Airbnb €80-100 daily
• Rarity on the market – such apartments rarely appear$$,
    description_ru: $$Дорогие покупатели, представляем вам квартиру в одном из самых востребованных мест Белграда, на улице Десанке Максимович, со входом с улицы Крунска.

Квартира площадью 58м², структуры 2.0, расположена на высоком первом этаже и имеет двойную ориентацию – с одной стороны выходит на улицу Десанке Максимович, а с другой открывается вид на зелень и парк позади театра Дадов, что дает ей идеальный баланс между городской динамикой и спокойствием.

Это недвижимость для полной реновации, что оставляет будущему владельцу возможность обустроить пространство полностью по своим желаниям и потребностям.

Что делает это предложение исключительным, так это то, что такие квартиры в этом месте почти никогда не появляются, особенно с дополнительным преимуществом назначенного парковочного места, которое значительно увеличивает стоимость недвижимости.

Локация чрезвычайно востребована как для жизни, так и для аренды — рядом находятся Юридический факультет, парк Ташмайдан, церковь Святого Марка, а также многочисленные объекты, привлекающие туристов, студентов и семьи.

Для инвесторов это явная возможность — квартира этого типа после ремонта может приносить доход от 80 до 100 евро в день через аренду Airbnb, с дополнительным потенциалом заработка через дальнейшую перепродажу.

Если вы ищете недвижимость с характером, местоположением и надежным инвестиционным потенциалом — это возможность, которую нельзя упустить.

✨ Дополнительные характеристики:
• Назначенное парковочное место
• 58м² | квартира 2.0 | высокий первый этаж
• Двойная ориентация – вид на улицу и парк
• Вход с Крунска и Десанке Максимович
• Вид на парк позади театра Дадов
• Инвестиция с потенциалом – Airbnb €80-100 в день
• Редкость на рынке – такие квартиры редко появляются$$,
    description_tr: $$Değerli alıcılar, size Belgrat'ın en çok aranan lokasyonlarından birinde, Krunska Caddesi'nden girişli Desanke Maksimović Sokağı'nda bir daire sunuyoruz.

58m² alanlı, 2.0 yapısında daire, yüksek zemin katta yer almakta ve çift yönlüdür – bir taraftan Desanke Maksimović Sokağı'na bakarken, diğer taraftan Dadov Tiyatrosu arkasındaki yeşillik ve parka manzara sunarak kentsel dinamizm ve huzur arasında mükemmel bir denge sağlamaktadır.

Bu, tam renovasyon için bir mülktür, bu da gelecekteki sahibine alanı tamamen kendi istekleri ve ihtiyaçlarına göre düzenleme fırsatı bırakır.

Bu teklifi istisnai kılan şey, bu lokasyonda bu tür dairelerin neredeyse hiç görünmemesi, özellikle de mülk değerini önemli ölçüde artıran tahsisli park yeri ek avantajıyla birlikte olmasıdır.

Lokasyon hem yaşam hem de kiralama için son derece aranmaktadır — yakınlarda Hukuk Fakültesi, Tašmajdan Parkı, Aziz Markos Kilisesi ve turistleri, öğrencileri ve aileleri çeken çok sayıda tesis bulunmaktadır.

Yatırımcılar için bu açık bir fırsattır — bu tip bir daire, renovasyondan sonra Airbnb kiralama yoluyla günde 80-100€ gelir sağlayabilir, ileri satış yoluyla ek kazanç potansiyeli ile birlikte.

Karakteri, konumu ve güvenli yatırım potansiyeli olan bir mülk arıyorsanız — bu kaçırılmaması gereken bir fırsattır.

✨ Ek özellikler:
• Tahsisli park yeri
• 58m² | 2.0 daire | yüksek zemin kat
• Çift yönlü – sokak ve park manzarası
• Krunska ve Desanke Maksimović'ten giriş
• Dadov Tiyatrosu arkasındaki parka manzara
• Potansiyelli yatırım – Airbnb günlük €80-100
• Piyasada nadirlik – bu tür daireler nadiren görünür$$,
    images: imageUrls.length > 0 ? imageUrls : [],
    featured: true,
    floor: 'Visoko prizemlje',
    heating: 'Centralno grejanje',
    parking: 'Pripadajuće parking mesto',
    year_renovated: 'Za renoviranje',
    orientation: 'Dvostrana - ulica i park',
    furnished: 'Prazno',
    distance_to_river: null
  };

  const { data, error } = await supabase
    .from('apartments')
    .insert(apartment)
    .select();

  if (error) {
    console.error('❌ Greška:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Oglas uspešno dodat!');
    console.log('📊 Podaci:', data);
    console.log(`\n🖼️  Broj slika: ${imageUrls.length}`);
    console.log('\n🎉 Refreshujte Admin Panel i sajt!\n');
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('💥 Greška:', err);
    process.exit(1);
  });
