# PRD — Agency 2gether

> Status: Tahap 1 (Requirement Gathering) — Project Brief terisi, nama brand masih TBD.

## 1. Ringkasan Proyek
- **Nama proyek (kerja):** Agency 2gether (nama brand resmi belum ditentukan — lihat section 9)
- **Deskripsi singkat:** Website company profile untuk agency dua orang: web dev/UI-UX/SEO + marketing/sosmed/SEO. Berfungsi sebagai etalase jasa untuk menarik dan meyakinkan calon klien.
- **Masalah yang diselesaikan:** Belum ada presence digital yang menunjukkan kombinasi skill dev + marketing sebagai satu kesatuan penawaran ke calon klien.

## 2. Tujuan & Target User
- **Tujuan utama:** Mendapatkan klien baru (lead generation) untuk jasa web dev & marketing; website akan terus berkembang seiring bisnis tumbuh.
- **Tim/pembagian peran:**
  - Kamu: Web Developer, UI/UX Designer, SEO
  - Pasangan: Marketing, Social Media Specialist, SEO
- **Target user / persona:** Calon klien (bisnis/individu) yang butuh jasa pembuatan website sekaligus strategi marketing/sosmed — value proposition-nya "one-stop": dev + marketing dalam satu tim.
- **Kenapa mereka butuh ini:** Klien tidak perlu cari vendor terpisah untuk web dev dan marketing — dikerjakan oleh tim yang sama, terkoordinasi.

## 3. Fitur Utama
| Fitur | Deskripsi | Prioritas (must/should/nice) |
|---|---|---|
| Portfolio/showcase | Galeri hasil kerja web dev & campaign marketing | Must |
| Halaman Services | Rincian jasa (web dev, UI/UX, SEO, marketing, sosmed) — tanpa harga, arahkan ke konsultasi/kontak | Must |
| Form kontak/booking konsultasi | Cara calon klien menghubungi/jadwalkan diskusi awal | Must |
| Blog/insight | Konten SEO/marketing untuk traffic organik & menunjukkan expertise | Must |

## 4. Non-Goals (v1)
- Belum ada scope untuk client portal / dashboard klien (baru company profile + lead gen).
- Belum ada e-commerce / pembayaran online di versi awal.
- **Admin dashboard untuk manage anggota tim** — direncanakan Fase 2, lihat section 10 (Roadmap). v1 tetap situs statis/company profile untuk 2 orang.
- **Self-service profile** (tiap anggota tim login & edit portfolio sendiri) — direncanakan Fase 2, butuh auth + backend + database yang belum ada di v1.

## 5. Halaman / Section yang Dibutuhkan
> Struktur: **Hub + 2 Vertical** (1 domain, subdirectory) — lihat detail & alasan di `design.md` section 2.
- [ ] Hub (`/`) — hero, ringkasan Build & Grow berdampingan, social proof
- [ ] About (`/about`) — index: cerita berdua, kenapa kombinasi dev+marketing jadi nilai jual, link ke 2 profil individual
- [ ] About/[slug] × 2 — profil lengkap tiap orang: bio, kredensial, skillset, portfolio personal
- [ ] Build (`/build`) — mini-homepage vertical dev: Web Development, UI/UX Design, SEO teknis + portfolio dev
- [ ] Grow (`/grow`) — mini-homepage vertical marketing: Marketing, Social Media, SEO konten + portfolio campaign
- [ ] Blog — index (`/blog`) + halaman detail post (`/blog/[slug]`), filterable Build/Grow
- [ ] Contact (`/contact`) — form terpusat, dengan field pilihan Build/Grow/Keduanya

## 6. Referensi Desain / Kompetitor
- Belum ada referensi spesifik dari user — Claude akan mengusulkan arah visual yang distinctive di Tahap 4 (lihat `design.md`).
- **Constraint penting:** desain TIDAK BOLEH terkesan "AI slop" (generic, template-y, ciri khas AI-generated design). Harus terasa custom & punya karakter brand sendiri.

## 7. Tech Stack
- Frontend: **Next.js** (App Router, React) — SSR/SSG bawaan bagus untuk SEO (salah satu jasa kita sendiri), file-based routing cocok dengan struktur Hub/Build/Grow, dan tidak menutup opsi tambah backend di Fase 2
- Styling: **Tailwind CSS** — dikonfigurasi pakai token desain dari `design.md` section 1 (warna, font Space Grotesk/IBM Plex Sans/IBM Plex Mono via `next/font/google`)
- Backend (v1): tidak ada backend/database persisten — hanya 1 API route serverless (`/api/contact`) untuk form Contact
- Form Contact: submit → API route Next.js → kirim email via **Resend**, tanpa simpan data ke database
- Konten (blog, portfolio, services): file-based (MDX/TS data), bukan CMS — konsisten dengan prinsip v1 tetap ringan/statis
- Database: tidak ada di v1 (lihat Non-Goals section 4 & Roadmap section 10 untuk kapan dibutuhkan)
- Hosting/Deploy: **Vercel** — pasangan standar untuk Next.js

## 8. Metrik Keberhasilan
- Jumlah lead/inquiry masuk lewat form kontak
- Traffic organik dari SEO/blog
- Konversi visitor → konsultasi terjadwal

## 9. Keputusan Penting (log)
> Catat keputusan besar di sini beserta tanggal, biar bisa dirujuk lagi nanti.
- [2026-09-22] File PRD/design/workflow/todo dibuat sebagai kerangka awal.
- [2026-09-22] Project Brief disepakati: website agency 2 orang (dev+UI/UX+SEO / marketing+sosmed+SEO), tujuan lead generation, akan berkembang. Nama brand resmi belum diputuskan.
- [2026-09-22] Constraint desain: hindari kesan "AI slop", harus distinctive.
- [2026-09-22] Fitur wajib: Portfolio, Services, Contact/booking, Blog. Halaman: Home, About, Services, Portfolio, Blog, Contact (multi-page, bukan one-page).
- [2026-09-22] Koreksi: halaman Services TIDAK menampilkan harga di awal — harga dibahas via konsultasi/kontak langsung.
- [2026-09-22] Struktur disepakati: Services = index + 5 halaman detail per layanan. Portfolio = grid + halaman case study per proyek. Lihat sitemap & user flow di `design.md`.
- [2026-09-22] **Perubahan struktural besar:** bukan 1 situs flat, tapi Hub + 2 Vertical (`/build` untuk dev/UI-UX/SEO teknis, `/grow` untuk marketing/sosmed/SEO konten) dalam 1 domain (subdirectory, bukan subdomain terpisah) — alasan: SEO domain authority tetap terkumpul, 1 codebase/1 deploy lebih ringan buat tim 2 orang. Menggantikan struktur flat `/services` sebelumnya.
- [2026-09-22] Wireframe Tahap 3 direvisi ke struktur Hub + Build + Grow (artboard Services/Portfolio lama diganti Build/Grow) — lihat `design.md` section 4.
- [2026-09-22] Halaman About diperluas: bukan cuma section kecil di Hub, tapi halaman `/about` (index cerita duo) + 2 halaman profil individual terpisah (`/about/[slug]`) dengan bio, kredensial, skillset, dan portfolio personal masing-masing. Nav "About" sekarang link ke halaman sungguhan, bukan anchor scroll.
- [2026-09-22] Admin dashboard + self-service profile untuk anggota tim (rencana tim berkembang jadi 2 divisi) diputuskan jadi **Fase 2**, TIDAK masuk scope v1 — v1 tetap situs statis 2 orang. Detail roadmap di section 10.
- [2026-09-23] Skill `ui-ux-pro-max` (129rb+ bintang GitHub, terverifikasi sebelum install) dipasang di project untuk referensi desain. Dipakai untuk memvalidasi & menyusun token system Tahap 4 — hasil lengkap di `design.md` section 1. Tool merekomendasikan tipografi EB Garamond/Lato tapi disimpangi (terlalu formal/legal untuk brief ini) demi Space Grotesk + IBM Plex Sans + IBM Plex Mono.
- [2026-09-23] Tahap 4 dimulai: mockup high-fidelity untuk Hub & Build selesai — https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw. Signature element "The Seam" (garis gradient Build→Grow) diperkenalkan sebagai penanda konteks & metafora "tanpa handoff".

## 10. Roadmap (Fase 2+)
> Dicatat supaya tidak hilang, tapi TIDAK masuk scope build v1. Baru dikerjakan setelah tim benar-benar bertambah dan v1 sudah live/dapat klien.

- **Tim berkembang jadi 2 divisi**, bukan cuma 1 orang per vertical:
  - Development Team (di bawah Build)
  - Social Media Specialist Team (di bawah Grow)
- **Admin dashboard** — kamu (owner) bisa tambah/kelola anggota tim baru lewat dashboard, bukan edit kode manual.
- **Self-service profile per anggota tim** — tiap orang punya login sendiri untuk edit portfolio/skill/bio mereka sendiri, tanpa perlu lewat kamu.
- **Implikasi teknis saat Fase 2 mulai dikerjakan:**
  - Situs tidak bisa lagi full-statis — butuh backend + database (data anggota tim, portfolio, skill).
  - Butuh sistem autentikasi + role-based access (owner/admin vs anggota tim biasa).
  - Halaman `/about` (saat ini 2 profil tetap) perlu berevolusi jadi roster tim dinamis (daftar anggota per divisi, bukan hardcoded 2 orang) — dipertimbangkan lagi saat Fase 2 dirancang, tidak perlu diantisipasi berlebihan di v1.
  - Tech stack v1 (dipilih di Tahap 5) sebaiknya tidak menutup opsi menambah backend nanti (hindari pilihan yang bikin migrasi ke Fase 2 jadi rewrite total).
