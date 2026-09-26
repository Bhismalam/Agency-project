import type { Metadata } from "next";
import { PortfolioCard } from "@/components/portfolio-card";
import { CTASection } from "@/components/ui/cta-section";
import { buildProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Build Portfolio",
  description: "Recent web development, UI/UX, and technical SEO work.",
};

export default function BuildPortfolioPage() {
  return (
    <>
      <section className="mx-auto flex max-w-[720px] flex-col items-center gap-4 px-6 py-16 text-center sm:px-8 lg:px-10 2xl:px-16 md:py-18">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          Selected work, build side
        </h1>
        <p className="max-w-[52ch] text-xl leading-relaxed text-muted">
          Websites and products shipped for real clients.
        </p>
      </section>

      <section className="bg-alt px-6 py-16 sm:px-8 lg:px-10 2xl:px-16 md:py-18">
        <div className="mx-auto grid max-w-inner grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildProjects.map((project) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              href={`/build/portfolio/${project.slug}`}
            />
          ))}
        </div>
      </section>

      <CTASection
        heading="Like what you see? Let's build yours next."
        secondaryLabel="Explore Grow work →"
        secondaryHref="/grow/portfolio"
      />
    </>
  );
}
