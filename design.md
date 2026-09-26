# Design — Agency 2gether

> Status: kerangka awal, belum diisi detail. Rujuk `prd.md` untuk konteks fitur.

## 0. Analisis Kompetitor

> Riset 5 kompetitor (struktur & konten — dibaca via fetch teks, bukan screenshot visual, jadi warna/tipografi/motion tidak terverifikasi visual).

**Kompetitor:** Dipa Inhouse, Arkhea, Kayana Creative, Flight Mode Studio, SeekThem.

### Pola yang konsisten di semua 5
| Aspek | Pola |
|---|---|
| Nav | Home / About / Work-Portfolio / Services (dropdown) / Blog / Contact — sama dengan sitemap kita |
| Harga | Tidak ada satupun yang menampilkan harga di halaman manapun |
| Services | Ditampilkan bernomor (01-04, 01-06), deskripsi singkat, tanpa hierarki harga |
| Portfolio | Grid/carousel ringkas di homepage → halaman detail per proyek |
| CTA | Berulang 4-8x per halaman ("Start Project", "Book a Call") — 2 kompetitor (Flight Mode, SeekThem) malah kelebihan CTA sampai terasa fatigue |
| Positioning premium | Tiap brand punya satu metafora/filosofi konsisten di seluruh copy (Flight Mode = aviation, SeekThem = filosofi Rumi, Arkhea = "Creative Forward") |

### Insight kunci
- **"One team, no handoff"** adalah positioning berulang di kompetitor premium (Arkhea: "one creative direction", Flight Mode: "one studio holds the entire thread so nothing gets lost"). Ini persis value proposition kita: dev + marketing satu tim, klien tidak perlu 2 vendor. Jadikan inti Hero & About.
- **Kelemahan konsisten di semua 5** (peluang buat kita): deskripsi layanan generic/vague, case study minim metrik nyata, tidak ada transparansi proses kerja, testimoni dangkal tanpa spesifisitas.

### Rekomendasi untuk Agency 2gether
1. Headline Hero berbasis "1 tim, 2 disiplin, tanpa handoff" — otentik karena memang cuma 2 orang, bukan klaim marketing kosong.
2. Belum punya awards/100+ klien seperti kompetitor besar — jangan tiru gaya metrics-heavy (Dipa, Flight Mode), itu akan terasa dipaksakan. Lebih cocok arah Arkhea/SeekThem: narrative personal + proses transparan (kekuatan tim kecil = akses langsung ke founder).
3. Isi gap yang kompetitor lewatkan: proses kerja eksplisit (mis. Discovery → Design → Build → Growth), metrik nyata begitu ada proyek pertama, hindari superlative kosong ("world-class", "cutting-edge").
4. Jangan tiru numbered-service (01-04) mentah-mentah — sudah jadi konvensi umum mendekati generic. Kalau dipakai, kombinasikan dengan visual 2 kolom "Build" vs "Grow" yang mencerminkan 2 keahlian tim, bukan sekadar angka urut.

## 1. Gaya Visual

> Redesain 2026-09-26 (skill Impeccable, arah "standar kategori" dieksekusi penuh; acuan Pentagram, Locomotive, Basement). Menggantikan sistem lama (Montserrat, Seam gradient, biru/amber pucat).

- **Mood:** editorial, tegas, tipografi besar, warna sebagai bidang penuh (bukan aksen kecil).
- **Palet:** Ink `#0E0F12`, Paper `#F3F2EE`, Alt `#E9E7E0`, Line `#D9D7CF`, Muted `#55585F`. **Build** navy `#12276B` (teks putih), **Grow** mint `#6FE3B5` (teks ink), Grow-ink `#0B6B47` untuk teks di atas paper. Strategi: Committed, Hub terbelah dua bidang penuh Build|Grow.
- **Tipografi:** Bricolage Grotesque (display, 600, tracking -0.035 s/d -0.045em, maks 6rem) + Hanken Grotesk (body/UI). Tanpa kicker/eyebrow di atas heading.
- **Signature:** mark dua lingkaran tumpang-tindih (navy/mint, multiply) di header/footer; bidang warna penuh per vertical; hero vertical berupa satu bidang warna penuh.
- **Komponen:** tombol pill (hover: ganti warna + scale 1.02), daftar proyek berbaris (hover mengisi warna vertical), kartu layanan bergaris atas (hover mengisi warna), langkah proses bernomor dengan garis atas.
- **Motion:** tetap tenang: reveal sekali, hover 200-300ms, hormati prefers-reduced-motion.

## 2. Sitemap

> **Revisi struktural (2026-09-22):** bukan lagi 1 situs flat, tapi **Hub + 2 Vertical** dalam 1 domain (subdirectory, bukan subdomain terpisah) — lihat keputusan di `prd.md` section 9. Alasan: 2 sisi keahlian (dev vs marketing) butuh "wajah" sendiri-sendiri, tapi tetap 1 codebase/1 deploy untuk SEO & maintenance yang lebih ringan buat tim 2 orang.

```
Hub (/)
├── About (/about)                               — index: cerita duo, kenapa berdua
│   ├── [Nama Kamu] (/about/[slug-kamu])         — profil lengkap: bio, kredensial, skillset Build
│   └── [Nama Pasangan] (/about/[slug-pasangan]) — profil lengkap: bio, kredensial, skillset Grow
├── Build (/build)                               — vertical hub: Web Dev + UI/UX + SEO teknis
│   ├── Web Development (/build/web-development)
│   ├── UI/UX Design (/build/ui-ux-design)
│   ├── SEO — Technical (/build/seo)
│   └── Portfolio (/build/portfolio)             — grid proyek dev
│       └── Project Detail (/build/portfolio/[slug])
├── Grow (/grow)                                 — vertical hub: Marketing + Sosmed + SEO konten
│   ├── Marketing (/grow/marketing)
│   ├── Social Media (/grow/social-media)
│   ├── SEO — Content (/grow/seo)
│   └── Portfolio (/grow/portfolio)              — grid campaign
│       └── Project Detail (/grow/portfolio/[slug])
├── Blog (/blog)                                 — gabungan, bisa difilter kategori Build/Grow
│   └── Post Detail (/blog/[slug])
└── Contact (/contact)                           — form terpusat, 1 untuk semua permintaan
```

- **Nav header:** Home, About, Build, Grow, Blog, Contact — tampil di semua halaman. "About" sekarang link ke halaman `/about` sungguhan (bukan lagi anchor scroll `#about` di Hub).
- **Hub (`/`)** menampilkan ringkasan KEDUA vertical berdampingan (bukan salah satu didahulukan) — supaya positioning "1 tim, 2 disiplin, tanpa handoff" langsung kelihatan dari homepage. Section "Why Us" di Hub tetap ada tapi ringkas (foto+nama+role saja), dengan link "Lihat profil lengkap →" ke `/about`.
- **`/about`** adalah halaman index yang cerita tentang duo (kenapa berdua bikin agency ini), lalu 2 kartu besar link ke profil masing-masing.
- **`/about/[slug]`** — profil individual lengkap: foto, bio, kredensial/pengalaman, skillset spesifik, mungkin portfolio personal/CV-style. Person yang megang Build (dev/UI-UX/SEO teknis) dan person yang megang Grow (marketing/sosmed/SEO konten) masing-masing dapat 1 halaman.
- **`/build`** dan **`/grow`** masing-masing adalah mini-homepage sendiri: hero singkat, services list (3 layanan), portfolio preview khusus vertical itu, dan CTA ke Contact — bukan cuma daftar link.
- SEO muncul di KEDUA vertical (teknis di Build, konten di Grow) karena memang skill yang di-share berdua — bedakan framing kontennya, jangan duplikat copy mentah-mentah (risiko SEO duplicate content).
- **Footer:** info kontak singkat, link sosmed, shortcut ke Build & Grow, CTA ke Contact.
- Tidak ada harga di halaman manapun — CTA selalu arahkan ke Contact.

## 3. User Flow

**Flow A — Klien tahu butuh jasa spesifik (satu sisi saja)**
```
Hub → Build atau Grow → pilih 1 layanan (mis. SEO teknis) → baca detail → Contact → isi form
```

**Flow B — Klien butuh KEDUANYA (bundling dev + marketing)** ⭐ flow paling penting — ini value proposition inti
```
Hub (lihat ringkasan Build & Grow berdampingan) → explore Build → balik ke Hub → explore Grow → Contact (sebut butuh dua-duanya)
```

**Flow C — Trust-building lewat portfolio**
```
Hub → Build/Grow → Portfolio vertical tsb → klik 1 proyek → baca case study/hasil/testimoni → Contact
```

**Flow D — Visitor dari konten/organic**
```
Search engine / Sosmed → Blog post (kategori Build atau Grow) → baca artikel → CTA akhir artikel → Contact
```

**Flow E — Riset tim dulu sebelum kontak**
```
Hub → About (index, kenal cerita duo) → profil individual (Build person atau Grow person) → Build/Grow terkait → Contact
```

- Semua flow konvergen ke **Contact** sebagai konversi akhir (form konsultasi/booking, terpusat — bukan per-vertical) — halaman paling kritis, harus low-friction.
- Form Contact idealnya punya field "Butuh layanan apa?" dengan opsi Build / Grow / **Keduanya** — supaya Flow B (bundling) kelihatan datanya, bukan cuma diasumsikan.
- Setiap halaman services & portfolio detail wajib punya CTA ke Contact (bukan cuma nav header).
- Navigasi antara Hub ↔ Build ↔ Grow harus mudah bolak-balik (nav header persist), karena Flow B butuh user menjelajah 2 vertical sebelum konversi.

## 4. Wireframe / Prototipe
> Direvisi (2026-09-22) ke struktur Hub + Build + Grow. Wireframe low-fidelity (grayscale, fokus struktur bukan visual), dibuat sebagai artifact interaktif (nav & CTA antar halaman bisa diklik untuk simulasi flow, termasuk cross-link Build ↔ Grow).

**Link:** https://claude.ai/artifact/92qKzwsuqtZWN7826b3RSB *(private — hanya bisa dibuka oleh pemilik akun, share dulu kalau mau ditunjukkan ke orang lain)*

- **Hub** — Nav → Hero ("1 tim, 2 disiplin") → **Build vs Grow split section** (2 kartu besar berdampingan, masing-masing link ke `/build`/`/grow`) → Why Us (duo, ringkas + link "Lihat profil lengkap →" ke About) → Portfolio preview gabungan (tag Build/Grow) → Social proof → Blog teaser → CTA banner → Footer
- **About** (baru) — Nav (About aktif) → Hero → Our Story (cerita duo) → 2 kartu profil besar (foto+nama+role+teaser bio, link ke masing-masing profil) → "How We Work Together" (3 value point) → CTA banner → Footer
- **Profile — Build** (baru) — Nav → back-link ke About → Hero profil (foto besar+nama+role+tagline) → Bio → Skills & Tools (tag chips) → Experience (timeline ringkas) → Selected Work (3 proyek) → CTA banner → Footer
- **Profile — Grow** (baru) — cermin dari Profile Build, konten untuk sisi marketing/sosmed/SEO konten
- **Build** — Nav (Build aktif) → Hero khusus dev → 3 service card (Web Dev, UI/UX, SEO Technical) → Portfolio preview dev → Proses "How We Build" (4 tahap) → CTA banner (dengan cross-link "Also explore Grow →") → Footer
- **Grow** — cermin dari Build: Hero khusus marketing → 3 service card (Marketing, Social Media, SEO Content) → Portfolio preview campaign → Proses "How We Grow" (4 tahap) → CTA banner (cross-link "Also explore Build →") → Footer
- **Contact** — Nav → Intro → Form (Name/Email/**"Butuh Build, Grow, atau keduanya?"**/Message) + info kontak alternatif → Footer

Nav "About" di semua halaman sekarang mengarah ke halaman `About.dc.html` sungguhan (bukan lagi anchor scroll).

Semua elemen teks masih placeholder berlabel (mis. `[Headline — ...]`), belum copywriting final — itu pekerjaan Tahap 4/5.

## 5. Mockup UI
> High-fidelity mockup (warna, tipografi, komponen penuh) untuk 2 halaman kunci dulu — Hub & Build — sesuai token system di section 1.

**Link:** https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw *(private — share dulu kalau mau ditunjukkan ke orang lain)*

- **Hub** — nav dengan logo "Seam" underline, hero 2 kolom, split Build/Grow (border-left aksen warna beda per kartu), Why Us, portfolio preview bertag warna, social proof, blog teaser, CTA banner gelap, footer
- **Build** — nav dengan Build aktif (warna biru), hero border-left aksen Build, 3 service card border-top biru, portfolio preview bertag, proses "How We Build" 4 tahap, CTA banner dengan cross-link ke Grow

Grow, About, Profile, Contact, Portfolio belum di-mockup — nunggu feedback arah visual dari Hub & Build dulu sebelum diperluas ke halaman lain (biar revisi warna/tipografi kalau ada tidak perlu diulang di semua halaman).

## 6. Komponen UI Utama
| Komponen | Deskripsi | Dipakai di halaman |
|---|---|---|
| | | |

## 7. Catatan Aksesibilitas & Responsif
- Breakpoint: sm 640, md 768 (tablet), lg 1024 (desktop; nav penuh, hamburger di bawahnya), xl 1280, 2xl 1536 (monitor besar). Diverifikasi tanpa scroll horizontal di 320, 390, 768, 1024, 1440, 1920, 2560px.
- Kolom konten: utilitas `max-w-site` (1440px, 1760px di 2xl) untuk elemen yang punya padding sendiri, `max-w-inner` untuk wrapper di dalam section berpadding; bidang penuh (Hub, About) memakai `pl-site`/`pr-site` agar isinya sejajar dengan kolom konten.
- Grid bertahap 1 kolom (HP), 2 kolom (md), 3 kolom (lg); langkah proses 1, 2, 4.
- Judul display fluid dengan `clamp()` (min 2.5rem, maks 6rem); gambar placeholder memakai `aspect-*`, bukan tinggi tetap.
- Menu mobile mengunci scroll saat terbuka; `prefers-reduced-motion` dihormati.

## 8. Motion & Animasi

> Prinsip utama: motion harus punya tujuan, bukan dekorasi. Konteks: user eksplisit tidak mau animasi "too much" seperti kesan umum situs agency template (semua section fade-in bareng, ada elemen bergerak terus-menerus/parallax-particle-blob, transisi/hover terlalu dramatis) — ini juga selaras dengan constraint "no AI slop" di `prd.md` section 6.

### Prinsip
1. **Satu bahasa entrance, konsisten** — satu gaya animasi masuk (mis. fade + translateY 8px, 300-400ms, ease-out) dipakai di semua tempat. Jangan campur zoom/rotate/blur/slide-kiri/slide-kanan di section berbeda.
2. **Animasi hanya di titik penting, bukan tiap section** — paragraf/section biasa tampil langsung tanpa animasi.
3. **Tidak ada motion ambient/looping** — no parallax background, no floating blob, no particle system, no cursor-follow gradient.
4. **Hover/transisi cepat & halus** — 150-200ms, bukan 500-800ms yang terasa berat/lag.
5. **Hormati `prefers-reduced-motion`** — matikan/kurangi animasi untuk user yang mengaktifkan setting itu.
6. **Scroll-trigger sekali saja** — pakai IntersectionObserver dengan `once: true`, bukan re-trigger tiap scroll naik-turun.

### Titik animasi yang direkomendasikan
| Elemen | Animasi | Catatan |
|---|---|---|
| Hero (headline/subhead/CTA) | Stagger ringan saat load, sekali saja | Bahasa entrance utama situs |
| Portfolio card | Scale ~1.03-1.05 + caption muncul saat hover | Bukan tilt/rotate/blur |
| Service card | Lift halus (translateY -4px) + shadow saat hover | Bukan bounce |
| Button/CTA | Scale 1.03 (hover) / 0.98 (active) + transisi warna, ~150ms | Ditambahkan per feedback user 2026-09-24 — skala kecil, konsisten dengan rentang "Portfolio card" di atas, bukan efek baru yang berlebihan |
| Nav | Underline slide-in per link (scaleX 0→1, ~200ms), warna sesuai tujuan (Build biru/Grow amber/lainnya ink) | Implemented 2026-09-24. Warna underline saat hover jadi preview "kamu akan masuk ke sisi mana" — bukan dekorasi, functional signal |
| Nav (mobile menu) | Buka/tutup pakai CSS grid-rows trick (0fr↔1fr), ~200ms | Implemented 2026-09-24, ganti dari show/hide instan |
| Header (scroll) | Shadow tipis muncul setelah scroll >8px | Implemented 2026-09-24 — sinyal nyata (posisi scroll), bukan animasi hias |
| Logo/Seam | Garis Seam di logo melebar (w-7→w-10) saat hover | Implemented 2026-09-24, delight kecil di brand mark |
| Form | Feedback validasi & sukses yang jelas tapi cepat | |
| Section reveal (scroll) | Bahasa entrance yang sama dari hero, trigger sekali | Dipakai selektif, bukan di semua section |

### Yang dihindari (feedback eksplisit dari user)
- Semua elemen fade/slide-in bareng saat scroll di tiap section
- Elemen bergerak terus-menerus tanpa interaksi user (parallax, particle, blob)
- Transisi/hover yang besar, lambat, atau berlebihan (terasa lag)