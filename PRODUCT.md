# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Calon klien (bisnis kecil-menengah atau individu) yang butuh website sekaligus strategi marketing/sosmed, dan tidak mau mengurus dua vendor terpisah. Mereka menilai apakah tim kecil ini kredibel sebelum menghubungi. Audiens sekunder: pembaca blog dari pencarian organik dan sosmed.

## Product Purpose
Website company profile untuk Agency 2gether, agency dua orang. Berfungsi sebagai etalase jasa dan mesin lead generation: semua alur berujung ke halaman Contact (konsultasi/booking). Sukses = calon klien memahami penawaran, percaya pada tim, dan mengisi form kontak.

## Positioning
"1 tim, 2 disiplin, tanpa handoff": pengembangan (Build) dan marketing (Grow) dipegang satu tim kecil, klien punya akses langsung ke dua orang yang mengerjakan. Ini fakta struktural (memang hanya dua orang), bukan klaim marketing.

## Operating Context
Struktur Hub + 2 Vertical dalam satu domain: `/` (Hub), `/about` (+ 2 profil `/about/[slug]`), `/build` (Web Development, UI/UX Design, SEO teknis, portfolio), `/grow` (Marketing, Social Media, SEO konten, portfolio), `/blog`, `/contact`. Tidak ada harga di halaman manapun; CTA selalu ke Contact. Form Contact punya opsi Build / Grow / Keduanya. Stack: Next.js 16 (App Router), React 19, Tailwind 4, Resend untuk email form.

## Capabilities and Constraints
- Build: Web Development, UI/UX Design, SEO teknis. Grow: Marketing, Social Media, SEO konten. SEO ada di kedua sisi dengan framing berbeda (hindari duplikat copy).
- v1 statis/company profile; tanpa client portal, e-commerce, atau admin dashboard (Fase 2: roster tim dinamis, auth).
- Bahasa konten: Indonesia.
- Nama brand resmi belum final ("Agency 2gether" nama kerja). Profil Grow masih placeholder.
- Redesain mencakup seluruh situs; struktur halaman, konten, dan fungsi tetap.

## Brand Commitments
Nama kerja Agency 2gether. Konsep dua sisi Build/Grow harus tetap terbaca. Pemilik menyatakan warna, tipografi, dan elemen visual lama (Seam, Build biru, Grow amber, Montserrat) boleh diganti total. Arah visual redesain (dipilih pemilik 2026-09-26): standar kategori agency, dieksekusi dengan craft penuh tanpa gimmick; acuan kualitas Pentagram, Locomotive, Basement (rapi, editorial, tipografi kuat). Motion: tidak berlebihan (tanpa ambient/looping, tanpa semua-elemen-fade-bareng), hormati prefers-reduced-motion.

## Evidence on Hand
Satu profil nyata (Bagus Bhismantara, Build): tiga pengalaman proyek (Bali Reclaimed Timber website, Swimclub Management System, Invoice Information System). Foto profil di `Assets/fotoprofile`. Belum ada testimoni, angka metrik, klien, penghargaan, atau harga; jangan dikarang. Profil Grow, sebagian portfolio dan blog masih placeholder.

## Product Principles
1. Duo adalah bukti, bukan slogan: kekuatan tim kecil (akses langsung, satu benang merah) harus terlihat, bukan diklaim.
2. Spesifik mengalahkan superlatif: hindari "world-class/cutting-edge"; tunjukkan proses dan hasil nyata.
3. Semua jalan menuju Contact, dengan friksi serendah mungkin.
4. Jujur soal skala: jangan meniru gaya metrics-heavy agency besar tanpa data.
5. Bedakan tampilan dari template agency umum ("no AI slop").

## Accessibility & Inclusion
Belum ada standar khusus dari pemilik; gunakan baseline WCAG AA dan prefers-reduced-motion.
