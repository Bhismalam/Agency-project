# Todo — Agency 2gether

> Status: kerangka awal, belum ada task teknis (belum masuk Tahap 5 — Coding).
> Legend: `[ ]` belum · `[~]` sedang dikerjakan · `[x]` selesai

## Requirement & Planning
- [x] Isi Project Brief (tujuan, target user, fitur utama) — `prd.md`
- [ ] Tentukan nama brand (masih TBD)
- [x] Susun sitemap & user flow — `design.md` (direvisi ke struktur Hub + Build + Grow, 2026-09-22)
- [x] Wireframe halaman kunci (7 artboard: Hub, About, Profile-Build, Profile-Grow, Build, Grow, Contact) — https://claude.ai/artifact/92qKzwsuqtZWN7826b3RSB
- [~] Mockup UI artifact (Hub, Build selesai — Grow/Contact sudah dikoding langsung tanpa mockup dulu; About/Profile-Build/Profile-Grow belum) — https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw
- [x] Tentukan tech stack — Next.js + Tailwind + Resend, `prd.md` section 7

## Coding
> Breakdown teknis Tahap 5. Urutan: setup → token/layout dasar → komponen shared → halaman (mulai dari yang sudah di-mockup) → data/konten → form. Tandai dependency di tiap item.

### 1. Setup proyek
- [x] Init Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- [x] Config font via `next/font/google`: Space Grotesk, IBM Plex Sans, IBM Plex Mono
- [x] Token warna via Tailwind v4 `@theme` di `app/globals.css` (ink, muted, paper, card, line, alt, build, build-tint, grow, grow-tint, grow-ink)
- [ ] Connect repo ke Vercel — belum, tunggu repo di-push

### 2. Layout dasar & komponen shared (depends on: 1)
- [x] Root layout (`app/layout.tsx`) — metadata default, font, `globals.css`
- [x] Komponen `SiteHeader` — desktop + mobile hamburger, active-state per route (termasuk garis Seam warna Build/Grow di bawah nav saat di vertical itu), logo dengan underline "Seam"
- [x] Komponen `SiteFooter`
- [x] Komponen `Button` (variant solid/line/white)
- [x] Komponen `Eyebrow`, `Seam`, `Tag`, `ImagePlaceholder`
- [x] Komponen `CTASection` (banner gelap, reusable)
- [x] Komponen `Reveal` — wrapper scroll-reveal (IntersectionObserver); `prefers-reduced-motion` ditangani global di CSS, bukan cabang JS terpisah (hindari hydration mismatch)

### 3. Komponen per konten (depends on: 2)
- [x] `ServiceCard`, `PortfolioCard`, `Tag`, `ProcessSteps` (dengan garis penyambung "Seam", fix dari feedback mockup)
- [ ] `TestimonialCard`, `ArticleCard` — masih inline di halaman Hub, belum diekstrak jadi komponen (baru dipakai 1 tempat, belum perlu)

### 4. Halaman (depends on: 2, 3)
- [x] `/` Hub — full responsive, sesuai mockup
- [x] `/build` — full responsive, sesuai mockup
- [x] `/grow` — cermin `/build`
- [x] `/contact` — form dengan validasi inline (blur), loading/success/error state
- [ ] `/about` + `/about/[slug]` × 2 — belum ada mockup visual, belum dikerjakan
- [ ] `/build/portfolio`, `/grow/portfolio` + halaman detail `[slug]`
- [ ] `/build/web-development`, `/build/ui-ux-design`, `/build/seo`, `/grow/marketing`, `/grow/social-media`, `/grow/seo`
- [ ] `/blog` + `/blog/[slug]`

### 5. Data & konten (depends on: 4, bisa paralel dengan halaman)
- [x] `lib/data/services.ts`, `lib/data/portfolio.ts` — data statis (TS), bukan DB
- [ ] `lib/data/testimonials.ts` — masih inline placeholder di Hub
- [ ] `content/blog/*.mdx` — post blog file-based, belum ada karena `/blog` belum dikerjakan

### 6. Form Contact (depends on: 2, 4 `/contact`)
- [x] `app/api/contact/route.ts` — validasi input, kirim via Resend
- [ ] Setup akun Resend + API key beneran (baru ada `.env.example`, belum diisi kredensial asli)

### 7. Cross-cutting (diterapkan di halaman yang sudah ada)
- [x] Responsive breakpoints (mobile → sm → md) di Hub/Build/Grow/Contact
- [x] Accessibility: semantic HTML, label form, aria-invalid/aria-describedby, focus-visible di Button
- [ ] SEO: metadata per halaman sudah ada (Build/Grow/Contact), tapi `sitemap.xml`/`robots.xml`/OG image belum dibuat

## Testing
> Diisi setelah fitur mulai diimplementasi.
- 

## Backlog — Fase 2 (bukan scope v1)
> Lihat `prd.md` section 10 untuk detail & alasan penundaan.
- [ ] Admin dashboard untuk owner kelola anggota tim
- [ ] Self-service profile — tiap anggota tim login & edit portfolio/skill sendiri
- [ ] Struktur tim jadi 2 divisi (Development Team, Social Media Specialist Team)
- [ ] Migrasi `/about` dari 2 profil tetap → roster tim dinamis
- [ ] Backend + database + autentikasi (baru dibutuhkan mulai fase ini)
