import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { team, getTeamMember } from "@/lib/data/team";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: member.tagline,
  };
}

export default async function ProfilePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const isBuild = member.vertical === "build";
  const accent = isBuild ? "text-build" : "text-grow-ink";
  const verticalHref = isBuild ? "/build" : "/grow";
  const verticalLabel = isBuild ? "Build" : "Grow";
  const workLabel = isBuild ? "Projects I led" : "Campaigns I led";

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-5 sm:px-10">
        <Link href="/about" className="font-mono text-[13px] text-muted hover:text-ink">
          ← Back to About
        </Link>
      </div>

      <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 py-10 sm:px-10 md:flex-row md:items-center">
        <div
          className="h-[220px] w-[220px] flex-shrink-0 rounded-full sm:h-[280px] sm:w-[280px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-alt) 0 2px, var(--color-card) 2px 14px)",
          }}
          aria-hidden="true"
        />
        <div className="flex-1 text-center md:text-left">
          <Eyebrow className={accent}>{verticalLabel}</Eyebrow>
          <h1 className="mb-2 font-display text-3xl font-semibold sm:text-[38px]">
            {member.name}
          </h1>
          <div className="mb-5 text-[17px] text-muted">{member.role}</div>
          <p className="mx-auto mb-6 max-w-[520px] text-[15px] leading-relaxed md:mx-0">
            {member.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Button href="/contact" variant="solid">
              Book a Consultation
            </Button>
            <Button href={verticalHref} variant="line">
              See {verticalLabel} Services
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-alt px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Background</Eyebrow>
          <h2 className="mb-5 font-display text-2xl font-semibold sm:text-[26px]">
            Bio
          </h2>
          <p className="max-w-[760px] text-[15px] leading-relaxed text-[#334155]">
            {member.bio}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10">
        <Eyebrow>Skills &amp; tools</Eyebrow>
        <h2 className="mb-6 font-display text-2xl font-semibold sm:text-[26px]">
          What I work with
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {member.skills.map((skill) => (
            <Tag key={skill} tone={member.vertical}>
              {skill}
            </Tag>
          ))}
        </div>
      </section>

      <section className="bg-alt px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mb-7 font-display text-2xl font-semibold sm:text-[26px]">
            Credentials &amp; experience
          </h2>
          <div className="flex flex-col gap-5">
            {member.experience.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={`flex flex-col justify-between gap-1 sm:flex-row sm:items-center ${
                  index < member.experience.length - 1
                    ? "border-b border-line pb-5"
                    : ""
                }`}
              >
                <div>
                  <div className="text-[15px] font-semibold">{item.title}</div>
                  <div className="text-[13px] text-muted">{item.context}</div>
                </div>
                <div className="font-mono text-[13px] text-muted">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="mb-7 font-display text-2xl font-semibold sm:text-[26px]">
          {workLabel}
        </h2>
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
          <div>
            <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
            <div className="text-[15px] font-semibold">[Project name]</div>
          </div>
        </div>
        <Link href={verticalHref} className={`font-mono text-sm hover:underline ${accent}`}>
          View all {verticalLabel} work →
        </Link>
      </section>

      <CTASection heading="Want to work with me?" />
    </>
  );
}
