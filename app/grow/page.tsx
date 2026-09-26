import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { PortfolioCard } from "@/components/portfolio-card";
import { ProcessSteps } from "@/components/ui/process-steps";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { growServices } from "@/lib/data/services";
import { growProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Grow — Marketing, Social Media & Content SEO",
  description:
    "Marketing, social media, and content SEO — led by the marketing half of the 2gether team.",
};

const steps = [
  { title: "Audit", description: "See what's working and what's leaving reach on the table." },
  { title: "Strategy", description: "A plan built around your actual goals, not vanity metrics." },
  { title: "Execute", description: "Content and campaigns shipped on a steady cadence." },
  { title: "Report", description: "Clear numbers, reviewed with you — not buried in a dashboard." },
];

export default function GrowPage() {
  return (
    <>
      <section className="bg-grow text-ink px-6 pt-16 pb-16 sm:px-8 lg:px-10 2xl:px-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-inner">
          <Reveal>
            <div className="mb-10 font-display text-[clamp(3.5rem,14vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Grow
            </div>
            <h1 className="mb-8 max-w-[20ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08] font-medium tracking-[-0.025em]">
              Marketing that earns attention, not just spends it.
            </h1>
            <p className="mb-10 max-w-[50ch] text-lg leading-relaxed text-ink/85">
              Marketing, social media, and content SEO — led by the marketing
              half of the team.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/contact" variant="grow">
                Book a Consultation <span aria-hidden="true">→</span>
              </Button>
              <Link href="/build" className="text-[15px] font-semibold underline-offset-[6px] transition-colors text-ink underline decoration-ink/40 hover:decoration-ink">
                Need a website too? See Build →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <h2 className="mb-12 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          What Grow covers
        </h2>
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {growServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-alt px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <div className="mx-auto max-w-inner">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
              Recent campaigns
            </h2>
            <Link href="/grow/portfolio" className="hidden text-[15px] font-semibold underline underline-offset-[6px] text-grow-ink sm:block">
              View all Grow work →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {growProjects.map((project) => (
              <PortfolioCard
                key={project.slug}
                project={project}
                href={`/grow/portfolio/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <h2 className="mb-12 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          How we grow
        </h2>
        <ProcessSteps steps={steps} tone="grow" />
      </section>

      <CTASection
        heading="Ready to grow your audience? Let's talk strategy."
        secondaryLabel="Also explore Build →"
        secondaryHref="/build"
      />
    </>
  );
}
