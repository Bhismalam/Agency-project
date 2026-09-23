import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Tag } from "@/components/ui/tag";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 py-16 sm:px-10 md:flex-row md:py-24">
        <Reveal className="flex-1">
          <Eyebrow>Agency 2gether</Eyebrow>
          <h1 className="mb-5.5 font-display text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
            One team.
            <br />
            Two disciplines.
            <br />
            Zero handoff.
          </h1>
          <p className="mb-8 max-w-[460px] text-lg leading-relaxed text-muted">
            We build the website and grow the audience that finds it — one
            coordinated team, not two vendors passing files back and forth.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href="/contact" variant="solid">
              Book a Consultation
            </Button>
            <Button href="#split" variant="line">
              See What We Do
            </Button>
          </div>
        </Reveal>
        <div className="w-full flex-1">
          <ImagePlaceholder label="[Portrait — the duo]" className="h-[320px] w-full sm:h-[420px]" />
        </div>
      </section>

      {/* Split: Build vs Grow */}
      <section id="split" className="bg-alt px-6 py-16 sm:px-10 md:py-19">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Two sides, one team</Eyebrow>
          <h2 className="mb-9 max-w-[640px] font-display text-2xl font-semibold sm:text-[30px]">
            Build what people use. Grow who finds it.
          </h2>
          <Reveal className="grid grid-cols-1 gap-[2px] overflow-hidden rounded-lg bg-line sm:grid-cols-2">
            <Link
              href="/build"
              className="flex h-auto min-h-[280px] flex-col border-l-4 border-build bg-card p-9 py-9 sm:h-[300px]"
            >
              <Eyebrow className="text-build">Build</Eyebrow>
              <div className="mb-3 font-display text-xl font-semibold leading-snug sm:text-[23px]">
                Web Development · UI/UX · Technical SEO
              </div>
              <p className="flex-grow text-sm leading-relaxed text-muted">
                Sites engineered to load fast, rank well, and hold up under
                real traffic — led by the developer half of the team.
              </p>
              <span className="font-mono text-[13px] font-medium text-build">
                Explore Build →
              </span>
            </Link>
            <Link
              href="/grow"
              className="flex h-auto min-h-[280px] flex-col border-l-4 border-grow bg-card p-9 py-9 sm:h-[300px]"
            >
              <Eyebrow className="text-grow-ink">Grow</Eyebrow>
              <div className="mb-3 font-display text-xl font-semibold leading-snug sm:text-[23px]">
                Marketing · Social Media · Content SEO
              </div>
              <p className="flex-grow text-sm leading-relaxed text-muted">
                Campaigns that turn traffic into an audience — led by the
                marketing half of the team.
              </p>
              <span className="font-mono text-[13px] font-medium text-grow-ink">
                Explore Grow →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section id="about" className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-6 py-16 sm:px-10 md:flex-row md:py-18">
        <ImagePlaceholder
          label="[Photo — working together]"
          className="h-[280px] w-full flex-1 sm:h-[340px]"
        />
        <div className="flex-1">
          <Eyebrow>Why us</Eyebrow>
          <h2 className="mb-4 font-display text-[27px] font-semibold">
            Two experts. One team.
          </h2>
          <p className="mb-6 text-[15px] leading-relaxed text-muted">
            No account manager relaying messages between a dev shop and a
            marketing shop — you talk directly to the two people doing the
            work.
          </p>
          <div className="mb-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-build" />
              <span className="text-sm font-semibold">
                [Nama Kamu] — Web Dev, UI/UX, SEO
              </span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-grow" />
              <span className="text-sm font-semibold">
                [Nama Pasangan] — Marketing, Social, SEO
              </span>
            </div>
          </div>
          <Link href="/about" className="font-mono text-xs uppercase tracking-wide hover:underline">
            Lihat profil lengkap →
          </Link>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-alt px-6 py-16 sm:px-10 md:py-19">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Portfolio preview</Eyebrow>
          <h2 className="mb-9 font-display text-2xl font-semibold sm:text-[30px]">
            Selected work, from both sides
          </h2>
          <div className="mb-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
              <div className="mb-2 text-[15px] font-semibold">[Project name]</div>
              <Tag tone="build">Build</Tag>
            </div>
            <div>
              <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
              <div className="mb-2 text-[15px] font-semibold">[Project name]</div>
              <Tag tone="grow">Grow</Tag>
            </div>
            <div>
              <ImagePlaceholder label="[Project image]" className="mb-3.5 h-[180px] w-full" />
              <div className="mb-2 text-[15px] font-semibold">[Project name]</div>
              <div className="flex gap-1.5">
                <Tag tone="build">Build</Tag>
                <Tag tone="grow">Grow</Tag>
              </div>
            </div>
          </div>
          <div className="flex gap-7">
            <Link href="/build" className="font-mono text-sm text-build hover:underline">
              View Build work →
            </Link>
            <Link href="/grow" className="font-mono text-sm text-grow-ink hover:underline">
              View Grow work →
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10">
        <Eyebrow>Social proof</Eyebrow>
        <h2 className="mb-7.5 font-display text-2xl font-semibold sm:text-[28px]">
          What clients say
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex h-[150px] flex-col justify-between rounded-md border border-line bg-card p-7">
            <div className="text-[15px] leading-snug">
              &ldquo;[Testimonial quote placeholder]&rdquo;
            </div>
            <div className="font-mono text-xs text-muted">[Name, role/company]</div>
          </div>
          <div className="flex h-[150px] flex-col justify-between rounded-md border border-line bg-card p-7">
            <div className="text-[15px] leading-snug">
              &ldquo;[Testimonial quote placeholder]&rdquo;
            </div>
            <div className="font-mono text-xs text-muted">[Name, role/company]</div>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section id="blog" className="bg-alt px-6 py-16 sm:px-10 md:py-19">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow>Insights</Eyebrow>
          <h2 className="mb-9 font-display text-2xl font-semibold sm:text-[30px]">
            Latest from the blog
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <ImagePlaceholder label="[Article image]" className="mb-3.5 h-[150px] w-full" />
              <div className="mb-1.5 text-[15px] font-semibold">[Article title]</div>
              <div className="font-mono text-[11px] text-muted">
                [Date] · <span className="text-build">Build</span>
              </div>
            </div>
            <div>
              <ImagePlaceholder label="[Article image]" className="mb-3.5 h-[150px] w-full" />
              <div className="mb-1.5 text-[15px] font-semibold">[Article title]</div>
              <div className="font-mono text-[11px] text-muted">
                [Date] · <span className="text-grow-ink">Grow</span>
              </div>
            </div>
            <div>
              <ImagePlaceholder label="[Article image]" className="mb-3.5 h-[150px] w-full" />
              <div className="mb-1.5 text-[15px] font-semibold">[Article title]</div>
              <div className="font-mono text-[11px] text-muted">
                [Date] · <span className="text-grow-ink">Grow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <CTASection heading="Ready to build & grow, together?" />
      </Reveal>
    </>
  );
}
