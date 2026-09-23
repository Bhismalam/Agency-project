import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
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
      <section className="mx-auto max-w-[1440px] border-l-[5px] border-build px-6 py-14 sm:px-10 md:py-20">
        <div className="sm:pl-9">
          <Reveal>
            <Eyebrow className="text-build">Build</Eyebrow>
            <h1 className="mb-4.5 max-w-[720px] font-display text-3xl leading-tight font-semibold sm:text-[46px]">
              Websites and products, engineered to work as hard as they look.
            </h1>
            <p className="mb-6.5 max-w-[520px] text-base leading-relaxed text-muted">
              Web development, UI/UX design, and technical SEO — led by the
              developer half of the team.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="solid">
                Book a Consultation
              </Button>
              <Link href="/grow" className="font-mono text-xs text-grow-ink uppercase tracking-wide hover:underline">
                Need marketing too? See Grow →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-alt px-6 py-17 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mb-7.5 font-display text-[27px] font-semibold">
            What Build covers
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {buildServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-17 sm:px-10">
        <Eyebrow>Build portfolio</Eyebrow>
        <h2 className="mb-7 font-display text-[27px] font-semibold">
          Recent builds
        </h2>
        <div className="mb-6.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {buildProjects.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
        <Link href="#" className="font-mono text-sm text-build hover:underline">
          View all Build work →
        </Link>
      </section>

      <section className="bg-alt px-6 py-17 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>How we build</Eyebrow>
          <h2 className="mb-7.5 font-display text-2xl font-semibold sm:text-[25px]">
            Our process
          </h2>
          <ProcessSteps steps={steps} tone="build" />
        </div>
      </section>

      <CTASection
        heading="Building something new? Let's talk about your project."
        secondaryLabel="Also explore Grow →"
        secondaryHref="/grow"
      />
    </>
  );
}
