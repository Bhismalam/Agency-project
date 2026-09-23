import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
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
      <section className="mx-auto max-w-[1440px] border-l-[5px] border-grow px-6 py-14 sm:px-10 md:py-20">
        <div className="sm:pl-9">
          <Reveal>
            <Eyebrow className="text-grow-ink">Grow</Eyebrow>
            <h1 className="mb-4.5 max-w-[720px] font-display text-3xl leading-tight font-semibold sm:text-[46px]">
              Marketing that earns attention, not just spends it.
            </h1>
            <p className="mb-6.5 max-w-[520px] text-base leading-relaxed text-muted">
              Marketing, social media, and content SEO — led by the marketing
              half of the team.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="solid">
                Book a Consultation
              </Button>
              <Link href="/build" className="font-mono text-xs text-build uppercase tracking-wide hover:underline">
                Need a website too? See Build →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-alt px-6 py-17 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mb-7.5 font-display text-[27px] font-semibold">
            What Grow covers
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {growServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-17 sm:px-10">
        <Eyebrow>Grow portfolio</Eyebrow>
        <h2 className="mb-7 font-display text-[27px] font-semibold">
          Recent campaigns
        </h2>
        <div className="mb-6.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {growProjects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="#" className="font-mono text-sm text-grow-ink hover:underline">
          View all Grow work →
        </Link>
      </section>

      <section className="bg-alt px-6 py-17 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>How we grow</Eyebrow>
          <h2 className="mb-7.5 font-display text-2xl font-semibold sm:text-[25px]">
            Our process
          </h2>
          <ProcessSteps steps={steps} tone="grow" />
        </div>
      </section>

      <CTASection
        heading="Ready to grow your audience? Let's talk strategy."
        secondaryLabel="Also explore Build →"
        secondaryHref="/build"
      />
    </>
  );
}
