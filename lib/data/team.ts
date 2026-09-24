export type TeamMember = {
  slug: string;
  name: string;
  vertical: "build" | "grow";
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  experience: { title: string; context: string; period: string }[];
};

export const team: TeamMember[] = [
  {
    slug: "build-lead",
    name: "Bagus Bhismantara",
    vertical: "build",
    role: "Web Developer, UI/UX Designer",
    tagline: "Saya mulai dari masalahnya, lalu membangun website yang menyelesaikannya.",
    bio: "Web developer dan UI/UX designer di Bali yang membangun website dan sistem berbasis riset, dari bisnis penginapan sampai produk SaaS.",
    skills: ["UI/UX Des", "Front-end Development", "Web Building & CMS", "Riset & Strategi", "Full-flow Delivery", "AI-assisted development"],
    experience: [
      { title: "Bali Reclaimed Timber Website", context: "Bali Reclaimed Timber & Furniture adalah perusahaan di Bali (berdiri 2023) yang menyelamatkan kayu ulin dari kapal nelayan kayu bekas di lima pulau Indonesia, lalu mengolahnya menjadi material arsitektur, furnitur, dan pesanan khusus untuk villa, resor, dan proyek hospitality. Saya dipercaya sebagai freelancer untuk membangun kehadiran webnya dari nol, mulai dari riset kompetitor, desain UI, sampai situs yang tayang.", period: "Agustus-September 2026" },
      { title: "SWIMCLUB MANAGEMENT SYSTEM", context: "Proyek mandiri untuk klub olahraga yang masih mengelola latihan secara manual di atas kertas. Saya mengerjakannya dari sudut pandang dua pengguna utama, yaitu pelatih dan atlet, dan memakainya untuk menguji stack modern (Next.js, React, TypeScript, Tailwind CSS) pada produk yang berisi data dan visualisasi progres.", period: "Juli 2026 - agustus 2026" },
      { title: "INVOICE INFORMATION SYSTEM", context: "Proyek magang untuk sistem informasi invoice yang ditujukan bagi UMKM. Tantangan utamanya adalah penggunanya bukan orang teknis, jadi sistem harus terasa sederhana untuk mencatat data dan tetap menghasilkan laporan otomatis. Di proyek ini saya bekerja dari riset kebutuhan pengguna sampai integrasi front-end dan back-end.", period: "April 2026 – Juni 2026" },
      { title: "Software development (CPro) -", context: "BNSP", period: "2026" },
    ],
  },
  {
    slug: "grow-lead",
    name: "[Nama Pasangan]",
    vertical: "grow",
    role: "Marketing, Social Media Specialist, SEO",
    tagline: "[1-2 sentence tagline — what makes your approach to growth distinct]",
    bio: "[Paragraph — experience, background, what led you to marketing/social/SEO, philosophy on growing brands]",
    skills: ["[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]", "[Skill/tool]"],
    experience: [
      { title: "[Role / Campaign]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Role / Campaign]", context: "[Company or context]", period: "[Year–Year]" },
      { title: "[Certification / Education]", context: "[Institution]", period: "[Year]" },
    ],
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}
