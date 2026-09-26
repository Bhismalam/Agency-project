import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { PortfolioCard } from "@/components/portfolio-card";
import { ProcessSteps } from "@/components/ui/process-steps";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { buildServices } from "@/lib/data/services";
import { buildProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Build — Web Development, UI/UX & Technical SEO",
  description:
    "Web development, UI/UX design, and technical SEO — led by the developer half of the 2gether team.",
};

const steps = [
  { title: "Discovery", description: "Understand the goal before writing a line of code." },
  { title: "Design", description: "Wireframes and visuals reviewed with you at every step." },
  { title: "Build", description: "Clean, maintainable code — not a black box." },
  { title: "Launch", description: "Then straight into Grow, if that's what you need." },
];

export default function BuildPage() {
  return (
    <>
      <section className="bg-build text-white px-6 pt-16 pb-16 sm:px-8 lg:px-10 2xl:px-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-inner">
          <Reveal>
            <div className="mb-10 font-display text-[clamp(3.5rem,14vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Build
            </div>
            <h1 className="mb-8 max-w-[20ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] font-medium tracking-[-0.025em]">
              Websites and products, engineered to work as hard as they look.
            </h1>
            <p className="mb-10 max-w-[50ch] text-lg leading-relaxed text-white/85">
              Web development, UI/UX design, and technical SEO — led by the
              developer half of the team.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/contact" variant="build">
                Book a Consultation <span aria-hidden="true">→</span>
              </Button>
              <Link href="/grow" className="text-[15px] font-semibold underline-offset-[6px] transition-colors text-white underline decoration-white/40 hover:decoration-white">
                Need marketing too? See Grow →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <h2 className="mb-12 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          What Build covers
        </h2>
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {buildServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-alt px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <div className="mx-auto max-w-inner">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
              Recent builds
            </h2>
            <Link href="/build/portfolio" className="hidden text-[15px] font-semibold underline underline-offset-[6px] text-build sm:block">
              View all Build work →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {buildProjects.map((project) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                href={`/build/portfolio/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <h2 className="mb-12 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          How we build
        </h2>
        <ProcessSteps steps={steps} tone="build" />
      </section>

      <CTASection
        heading="Building something new? Let's talk about your project."
        secondaryLabel="Also explore Grow →"
        secondaryHref="/grow"
      />
    </>
  );
}
