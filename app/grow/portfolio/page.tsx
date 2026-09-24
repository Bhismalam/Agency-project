import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PortfolioCard } from "@/components/portfolio-card";
import { CTASection } from "@/components/ui/cta-section";
import { growProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Grow Portfolio",
  description: "Recent marketing, social media, and content SEO campaigns.",
};

export default function GrowPortfolioPage() {
  return (
    <>
      <section className="mx-auto flex max-w-[720px] flex-col items-center gap-4 px-6 py-16 text-center sm:px-10 md:py-18">
        <Eyebrow className="text-grow-ink">Grow portfolio</Eyebrow>
        <h1 className="font-display text-3xl font-semibold sm:text-[40px]">
          Selected work, grow side
        </h1>
        <p className="max-w-[500px] text-base leading-relaxed text-muted">
          Campaigns shipped for real clients.
        </p>
      </section>

      <section className="bg-alt px-6 py-16 sm:px-10 md:py-18">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-3">
          {growProjects.map((project) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              href={`/grow/portfolio/${project.slug}`}
            />
          ))}
        </div>
      </section>

      <CTASection
        heading="Like what you see? Let's grow yours next."
        secondaryLabel="Explore Build work →"
        secondaryHref="/build/portfolio"
      />
    </>
  );
}
