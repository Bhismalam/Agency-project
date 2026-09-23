# Workflow — Agency 2gether

> Status: kerangka awal. Menyimpan tahapan kerja proyek ini dan progres di tiap tahap.

## Tahapan Proyek

- [x] **Tahap 1 — Requirement Gathering**
  - Output: Project Brief di `prd.md` (section 1-3)
  - Status: selesai — nama brand masih TBD, tidak menghalangi lanjut ke Tahap 2
- [~] **Tahap 2 — User Flow & Sitemap**
  - Output: Sitemap + User Flow di `design.md` (section 2-3)
  - Status: direvisi ke struktur Hub + Build + Grow (2026-09-22) — sitemap & user flow baru sudah ditulis, tidak perlu revisi lagi kecuali ada perubahan baru
- [x] **Tahap 3 — Prototipe / Wireframe**
  - Output: Wireframe artifact (Hub, Build, Grow, Contact) — link di `design.md` (section 4)
  - Status: selesai, sudah direvisi ke struktur Hub + Build + Grow — menunggu feedback user sebelum lanjut ke Desain UI
- [~] **Tahap 4 — Desain UI**
  - Output: Mockup UI di `design.md` (section 5) — https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw
  - Status: 2 dari 7 halaman selesai (Hub, Build), arah visual dikonfirmasi user (2026-09-23). **User memilih skip sisa mockup (Grow/About/Profile/Contact) untuk sekarang** dan lanjut ke Tahap 5 — bisa dilanjutkan lagi kapan saja
- [~] **Tahap 5 — Coding**
  - Output: Breakdown teknis + implementasi, task-nya dipecah di `todo.md`
  - Status: project Next.js 16 + Tailwind v4 sudah di-setup, komponen shared jadi, 4 halaman jalan (Hub, Build, Grow, Contact + form/API route), build & lint bersih. Sisa: About/Profile/Portfolio/Blog, sitemap.xml, koneksi Resend beneran, deploy Vercel.
- [ ] **Tahap 6 — Testing**
  - Output: Checklist manual + test case
  - Status: belum dimulai

## Cara Kerja Sesi
- Tiap tahap ditutup dengan ringkasan singkat + konfirmasi sebelum lanjut ke tahap berikutnya.
- Perubahan arah besar (fitur, desain, tech stack) dicatat sebagai keputusan di `prd.md` section 9.
- Task teknis harian/per-fitur dipecah di `todo.md`, bukan di sini — file ini fokus ke tahapan besar.

## Log Progres
- [2026-09-22] Setup awal: `prd.md`, `design.md`, `workflow.md`, `todo.md` dibuat sebagai kerangka kosong, belum ada requirement gathering.
- [2026-09-22] Tahap 1 selesai: Project Brief terisi di `prd.md`. Nama brand belum ditentukan (TBD), constraint desain "no AI slop" dicatat.
- [2026-09-22] Koreksi: Services tanpa harga di halaman manapun, CTA selalu ke Contact.
- [2026-09-22] Tahap 2 selesai: Sitemap (Services index+5 detail, Portfolio grid+case study, Blog index+post) dan 4 user flow ditulis di `design.md`.
- [2026-09-22] Riset 5 kompetitor (Dipa Inhouse, Arkhea, Kayana Creative, Flight Mode Studio, SeekThem) dianalisis, insight & rekomendasi disimpan di `design.md` section 0.
- [2026-09-22] Panduan motion/animasi ditulis di `design.md` section 8 — prinsip restraint, hindari animasi berlebihan seperti keluhan user soal Kayana Creative.
- [2026-09-22] Tahap 3 selesai: wireframe artifact untuk Home, Services, Portfolio, Contact — link di `design.md` section 4.
- [2026-09-22] **Perubahan struktural besar:** disepakati struktur Hub + 2 Vertical (`/build`, `/grow`) menggantikan struktur flat `/services`. Sitemap & user flow di `design.md` sudah direvisi. Detail alasan di `prd.md` section 9.
- [2026-09-22] Wireframe Tahap 3 direvisi ke struktur baru: artboard Services & Portfolio lama diganti dengan Build & Grow (masing-masing mini-homepage dengan services + portfolio preview + cross-link ke sisi lain), Hub direvisi dengan split section Build vs Grow, Contact form ditambah field "Build/Grow/Keduanya". Link sama: https://claude.ai/artifact/92qKzwsuqtZWN7826b3RSB
- [2026-09-22] Halaman About diperluas jadi halaman sungguhan (`/about` index + 2 halaman profil individual per orang), bukan cuma section kecil di Hub. Sitemap & user flow di `design.md` sudah diupdate.
- [2026-09-22] Wireframe About + 2 profil individual (Build, Grow) ditambahkan ke artifact yang sama. Nav "About" di semua halaman direpoint dari anchor scroll ke halaman sungguhan. Hub dapat tambahan link "Lihat profil lengkap →" di section Why Us. Total sekarang 7 artboard: Hub, About, Profile-Build, Profile-Grow, Build, Grow, Contact.
- [2026-09-22] Rencana admin dashboard + self-service profile (tim berkembang jadi 2 divisi: Dev Team & Sosmed Team) diputuskan sebagai **Fase 2** — dicatat di `prd.md` section 10 (Roadmap), TIDAK masuk scope v1. v1 tetap situs statis untuk 2 orang seperti yang sudah dirancang.
- [2026-09-23] Skill `ui-ux-pro-max` diinstall & dipakai untuk Tahap 4. Token system (warna/tipografi/pattern/motion) disusun & divalidasi — detail di `design.md` section 1.
- [2026-09-23] Mockup high-fidelity Hub & Build selesai — https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw. Signature "The Seam" (garis gradient Build→Grow) jadi elemen pengikat visual di seluruh situs.
- [2026-09-23] Feedback user: section "Our process" di Build terasa kaku (4 lingkaran terpisah simetris). Fix: ditambah garis penyambung tipis (varian "Seam") supaya terasa alur, bukan checklist. User konfirmasi sudah oke.
- [2026-09-23] User pilih skip sisa mockup (Grow/About/Profile/Contact) dan lanjut ke Tahap 5. Tech stack ditentukan: Next.js + Tailwind CSS + Resend (form) + Vercel. Breakdown teknis 7 bagian tersusun di `todo.md` (setup → layout/komponen shared → komponen konten → halaman → data → form → cross-cutting).
- [2026-09-23] Implementasi dimulai: Next.js 16 (App Router, Turbopack) + Tailwind v4 di-setup langsung di root repo (scaffold awal dibuat di folder sementara karena nama folder repo mengandung huruf besar, lalu dipindah). Token desain dari `design.md` section 1 dipasang sebagai Tailwind `@theme`. Komponen shared (SiteHeader dengan mobile menu, SiteFooter, Button, Eyebrow, Seam, Tag, ImagePlaceholder, Reveal, CTASection, ProcessSteps), 4 halaman (Hub, Build, Grow, Contact), dan API route `/api/contact` (Resend) selesai dikoding — responsif, `npm run build` & `npm run lint` bersih. Grow & Contact langsung dikoding tanpa mockup artifact terpisah (reuse sistem token dari Hub/Build).
