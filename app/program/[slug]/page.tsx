import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { ProgramApplicationForm } from "@/components/program-application-form";
import { getProgram, programs } from "@/lib/data/programs";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) return {};
  return { title: program.title, description: program.summary };
}

export default async function ProgramDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const program = getProgram(slug);
  if (!program) notFound();

  const open = program.status === "open";

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-5 sm:px-8 lg:px-10 2xl:px-16">
        <Link href="/program" className="font-sans text-[13px] text-muted hover:text-ink">
          ← Back to Program
        </Link>
      </div>

      <section className="mx-auto max-w-site px-6 py-10 sm:px-8 lg:px-10 2xl:px-16 md:py-14">
        <div className={`mb-4 text-[15px] font-semibold ${open ? "text-ink" : "text-muted"}`}>
          {open ? "Open for applications" : "Closed"}
        </div>
        <h1 className="mb-4 max-w-[20ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          {program.title}
        </h1>
        <p className="mb-8 max-w-[60ch] text-xl leading-relaxed text-muted">
          {program.summary}
        </p>
        <dl className="grid max-w-[560px] grid-cols-3 gap-6 border-t border-ink pt-6">
          <div>
            <dt className="mb-1 text-[13px] text-muted">Duration</dt>
            <dd className="text-[15px] font-semibold">{program.duration}</dd>
          </div>
          <div>
            <dt className="mb-1 text-[13px] text-muted">Location</dt>
            <dd className="text-[15px] font-semibold">{program.location}</dd>
          </div>
          <div>
            <dt className="mb-1 text-[13px] text-muted">Deadline</dt>
            <dd className="text-[15px] font-semibold">{program.deadline}</dd>
          </div>
        </dl>
      </section>

      <section className="bg-alt px-6 py-20 sm:px-8 lg:px-10 2xl:px-16 md:py-24">
        <div className="mx-auto max-w-site">
          <p className="mb-12 max-w-[60ch] text-xl leading-relaxed text-muted">
            {program.description}
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            <div>
              <h2 className="mb-5 font-display text-2xl font-semibold tracking-[-0.02em]">
                Requirements
              </h2>
              <ul className="flex flex-col gap-3 border-t border-ink pt-5">
                {program.requirements.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 font-display text-2xl font-semibold tracking-[-0.02em]">
                Benefits
              </h2>
              <ul className="flex flex-col gap-3 border-t border-ink pt-5">
                {program.benefits.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 sm:px-8 lg:px-10 2xl:px-16 md:py-24">
        <h2 className="mb-10 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
          {open ? "Apply now" : "Applications are closed"}
        </h2>
        {open ? (
          <ProgramApplicationForm programTitle={program.title} programSlug={program.slug} />
        ) : (
          <div className="flex flex-col items-start gap-5 border-t border-ink pt-6">
            <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
              This program isn&rsquo;t taking applications right now. Check
              back later, or explore what else is open.
            </p>
            <Button href="/program" variant="line">
              See other programs
            </Button>
          </div>
        )}
      </section>

      <CTASection heading="Have a question before applying?" primaryLabel="Contact Us" />
    </>
  );
}
