import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About",
  description: "Two people, one agency — the story behind 2gether.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto flex max-w-[720px] flex-col items-center gap-4 px-6 py-16 text-center sm:px-10 md:py-20">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-display text-3xl font-semibold sm:text-[42px]">
          Two people, one agency
        </h1>
        <p className="max-w-[560px] text-base leading-relaxed text-muted">
          [Subtext — the short version of why you two started this together]
        </p>
      </section>

      <section className="bg-alt px-6 py-16 sm:px-10 md:py-18">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 md:flex-row">
          <ImagePlaceholder
            label="[Image — the two of you, candid]"
            className="h-[280px] w-full flex-1 sm:h-[360px]"
          />
          <div className="flex-1">
            <Eyebrow>Our story</Eyebrow>
            <p className="text-base leading-relaxed text-[#334155]">
              [Paragraph — how you met/decided to team up, why dev + marketing
              together makes sense, what you believe about how agencies
              should work]
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:py-18">
        <Eyebrow>The team</Eyebrow>
        <h2 className="mb-9 font-display text-[28px] font-semibold">
          Meet the two of us
        </h2>
        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <Link
              key={member.slug}
              href={`/about/${member.slug}`}
              className="flex gap-5 rounded-md border border-line bg-card p-7"
            >
              <div
                className="h-[110px] w-[110px] flex-shrink-0 rounded-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, var(--color-alt) 0 2px, var(--color-card) 2px 14px)",
                }}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <div className="mb-1 font-display text-lg font-semibold">
                  {member.name}
                </div>
                <div
                  className={`mb-2.5 text-[13px] ${
                    member.vertical === "build" ? "text-build" : "text-grow-ink"
                  }`}
                >
                  {member.role}
                </div>
                <p className="flex-grow text-[13px] leading-relaxed text-muted">
                  {member.tagline}
                </p>
                <span
                  className={`font-mono text-[13px] font-medium ${
                    member.vertical === "build" ? "text-build" : "text-grow-ink"
                  }`}
                >
                  View full profile →
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="bg-alt px-6 py-16 sm:px-10 md:py-18">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>How we work together</Eyebrow>
          <h2 className="mb-9 font-display text-2xl font-semibold sm:text-[26px]">
            What you get with two specialists, one team
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-[15px] font-semibold">
                Direct communication
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                No account manager in between — you talk to the people doing
                the work.
              </p>
            </div>
            <div>
              <div className="mb-2 text-[15px] font-semibold">
                No handoff friction
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                One team sees the whole project, from build to growth.
              </p>
            </div>
            <div>
              <div className="mb-2 text-[15px] font-semibold">
                Shared accountability
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                Nobody points fingers at &ldquo;the other vendor&rdquo; — it&rsquo;s
                just us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Want to work with both of us?" />
    </>
  );
}
