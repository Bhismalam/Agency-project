# Todo — Agency 2gether

> Status: kerangka awal, belum ada task teknis (belum masuk Tahap 5 — Coding).
> Legend: `[ ]` belum · `[~]` sedang dikerjakan · `[x]` selesai

## Requirement & Planning
- [x] Isi Project Brief (tujuan, target user, fitur utama) — `prd.md`
- [ ] Tentukan nama brand (masih TBD)
- [x] Susun sitemap & user flow — `design.md` (direvisi ke struktur Hub + Build + Grow, 2026-09-22)
- [x] Wireframe halaman kunci (7 artboard: Hub, About, Profile-Build, Profile-Grow, Build, Grow, Contact) — https://claude.ai/artifact/92qKzwsuqtZWN7826b3RSB
- [~] Mockup UI artifact (Hub, Build selesai; sisanya dikoding langsung tanpa mockup terpisah, reuse token/komponen yang sudah ada) — https://claude.ai/artifact/MNn3T7hr76TDq8wLeag7qw
- [x] Tentukan tech stack — Next.js + Tailwind + Resend, `prd.md` section 7

## Coding
> Breakdown teknis Tahap 5. Urutan: setup → token/layout dasar → komponen shared → halaman (mulai dari yang sudah di-mockup) → data/konten → form. Tandai dependency di tiap item.

### 1. Setup proyek
- [x] Init Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- [x] Config font via `next/font/google`: **Montserrat** (diganti dari Space Grotesk/IBM Plex Sans/IBM Plex Mono per feedback user 2026-09-24 — satu font family untuk semua role: display/body/mono via CSS var, bukan rewrite tiap komponen)
- [x] Token warna via Tailwind v4 `@theme` di `app/globals.css` (ink, muted, paper, card, line, alt, build, build-tint, grow, grow-tint, grow-ink)
- [ ] Connect repo ke Vercel — belum, tunggu repo di-push

### 2. Layout dasar & komponen shared (depends on: 1)
- [x] Root layout (`app/layout.tsx`) — metadata default, font, `globals.css`
- [x] Komponen `SiteHeader` — desktop + mobile hamburger, active-state per route (termasuk garis Seam warna Build/Grow di bawah nav saat di vertical itu), logo dengan underline "Seam"
- [x] Komponen `SiteFooter`
- [x] Komponen `Button` (variant solid/line/white) — hover diberi zoom halus (`scale-[1.03]`) selain transisi warna, per feedback user
- [x] Komponen `Eyebrow`, `Seam`, `Tag`, `ImagePlaceholder`
- [x] Komponen `CTASection` (banner gelap, reusable)
- [x] Komponen `Reveal` — wrapper scroll-reveal (IntersectionObserver); `prefers-reduced-motion` ditangani global di CSS, bukan cabang JS terpisah (hindari hydration mismatch)

### 3. Komponen per konten (depends on: 2)
- [x] `ServiceCard`, `PortfolioCard` (dengan `href` opsional ke halaman detail), `Tag`, `ProcessSteps` (garis penyambung "Seam", fix dari feedback mockup), `ArticleCard`
- [ ] `TestimonialCard` — masih inline di halaman Hub (cuma dipakai 1 tempat, belum perlu diekstrak)

### 4. Halaman (depends on: 2, 3) — SEMUA 27 route sudah jalan (`npm run build` & `npm run lint` bersih)
- [x] `/` Hub — full responsive
- [x] `/build`, `/grow` — full responsive
- [x] `/contact` — form dengan validasi inline (blur), loading/success/error state
- [x] `/about` (index cerita duo) + `/about/[slug]` × 2 (profil individual, data dari `lib/data/team.ts`)
- [x] `/build/portfolio`, `/grow/portfolio` (grid) + `[slug]` (detail: description + result) — data dari `lib/data/portfolio.ts`
- [x] `/build/[slug]` (web-development, ui-ux-design, seo) + `/grow/[slug]` (marketing, social-media, seo) — dynamic route dari `lib/data/services.ts`
- [x] `/blog` (listing) + `/blog/[slug]` (detail) — data dari `lib/data/blog.ts`, **belum MDX** (lihat catatan di section 5)

### 5. Data & konten (depends on: 4, bisa paralel dengan halaman)
- [x] `lib/data/services.ts`, `lib/data/portfolio.ts`, `lib/data/team.ts`, `lib/data/blog.ts` — semua data statis (TS), bukan DB
- [ ] `lib/data/testimonials.ts` — masih inline placeholder di Hub
- [ ] **Blog masih data TS, belum MDX** — sengaja ditunda karena kontennya masih placeholder semua; `@next/mdx` butuh setup (`next.config.ts`, `mdx-components.tsx`, package tambahan) yang baru worth-it begitu ada tulisan asli untuk di-draft. Struktur `lib/data/blog.ts` (slug/title/date/body) gampang dimigrasi ke MDX nanti.

### 6. Form Contact (depends on: 2, 4 `/contact`)
- [x] `app/api/contact/route.ts` — validasi input, kirim via Resend
- [ ] Setup akun Resend + API key beneran (baru ada `.env.example`, belum diisi kredensial asli)

### 7. Cross-cutting (diterapkan di semua 27 halaman)
- [x] Responsive breakpoints (mobile → sm → md) di semua halaman
- [x] Accessibility: semantic HTML, label form, aria-invalid/aria-describedby, focus-visible di Button, `notFound()` untuk slug tidak valid (dites: 404 works)
- [x] SEO: metadata (title/description) per halaman termasuk semua dynamic route
- [ ] `sitemap.xml`, `robots.txt`, OG image — belum dibuat

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
