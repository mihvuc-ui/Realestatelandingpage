# KAKO DODATI NOVI OGLAS

## Korak 1: Upload slika u Supabase Storage

1. Idite na: https://supabase.com/dashboard/project/saoxrazxkagpolfkszek/storage/buckets/apartment-images
2. Napravite novi folder (npr. "NoviStan1")
3. Upload-ujte sve slike u taj folder

## Korak 2: Pokrenite skriptu za dodavanje oglasa

Kopirajte jednu od postojećih skripta kao template:
- Za stan: `scripts/add-kluz-apartment.ts`
- Za plac: `scripts/add-avala-plac.ts`

Promenite:
- Naziv foldera sa slikama
- Naziv, lokaciju, cenu
- Površinu, sobe, kupatila
- Opise (srpski, engleski, ruski, turski)
- Ostale detalje

Pokrenite:
```bash
pnpm exec tsx scripts/add-NAZIV-VASE-SKRIPTE.ts
```

## Korak 3: Održite placeve na kraju liste

Nakon dodavanja novih stanova, pokrenite:
```bash
pnpm exec tsx scripts/keep-land-last.ts
```

Ovo će automatski pomeriti sva zemljišta na kraj liste.

## Korak 4: Provera

Pokrenite:
```bash
pnpm exec tsx scripts/verify-data.ts
```

Da vidite sve oglase i redosled.

---

## Trenutni redosled oglasa:

1. **Dvosoban stan - Vračar, Desanke Maksimović** (€239,990)
2. **Trosoban stan - Zvezdara, Kluz** (€365,000)
3. **Plac - Avala, Pinosava** (€99,999) ← UVEK POSLEDNJI

Kada dodate nove stanove, pokrenite `keep-land-last.ts` da plac ostane poslednji!
