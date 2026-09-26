import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CTASection } from "@/components/ui/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { ArticleCard } from "@/components/article-card";
import { posts } from "@/lib/data/blog";
import { buildProjects, growProjects } from "@/lib/data/portfolio";
import { buildServices, growServices } from "@/lib/data/services";

const wrap = "mx-auto max-w-site px-6 sm:px-8 lg:px-10 2xl:px-16";

export default function HomePage() {
  const work = [
    ...buildProjects.map((p) => ({ ...p, href: `/build/portfolio/${p.slug}` })),
    ...growProjects.slice(0, 1).map((p) => ({ ...p, href: `/grow/portfolio/${p.slug}` })),
  ];

  return (
    <>
      {/* Hero */}
      <section className={`${wrap} pt-14 pb-16 md:pt-24 md:pb-24`}>
        <h1 className="font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          One team.
          <br />
          Two disciplines.
          <br />
          Zero handoff.
        </h1>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-[52ch] text-xl leading-relaxed text-muted">
            We build the website and grow the audience that finds it — one
            coordinated team, not two vendors passing files back and forth.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="solid">
              Book a Consultation <span aria-hidden="true">→</span>
            </Button>
            <Button href="#split" variant="line">
              See What We Do
            </Button>
          </div>
        </div>
      </section>

      {/* Build | Grow — the two fields */}
      <section id="split" className="grid grid-cols-1 md:grid-cols-2">
        <Link
          href="/build"
          className="group flex min-h-[460px] flex-col justify-between bg-build py-6 pr-6 pl-site text-white sm:py-10 sm:pr-10 md:min-h-[560px]"
        >
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-display text-[clamp(3.5rem,14vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Build
            </h2>
            <span
              aria-hidden="true"
              className="mt-2 text-4xl transition-transform duration-300 ease-out group-hover:translate-x-2"
            >
              →
            </span>
          </div>
          <div>
            <p className="mb-8 max-w-[36ch] text-lg leading-relaxed text-white/85">
              Sites engineered to load fast, rank well, and hold up under real
              traffic — led by the developer half of the team.
            </p>
            <ul className="border-t border-white/40">
              {buildServices.map((s) => (
                <li key={s.slug} className="border-b border-white/25 py-3 font-display text-xl font-medium tracking-[-0.01em]">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </Link>

        <Link
          href="/grow"
          className="group flex min-h-[460px] flex-col justify-between bg-grow py-6 pl-6 pr-site text-ink sm:py-10 sm:pl-10 md:min-h-[560px]"
        >
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-display text-[clamp(3.5rem,14vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
              Grow
            </h2>
            <span
              aria-hidden="true"
              className="mt-2 text-4xl transition-transform duration-300 ease-out group-hover:translate-x-2"
            >
              →
            </span>
          </div>
          <div>
            <p className="mb-8 max-w-[36ch] text-lg leading-relaxed text-ink/85">
              Campaigns that turn traffic into an audience — led by the
              marketing half of the team.
            </p>
            <ul className="border-t border-ink/50">
              {growServices.map((s) => (
                <li key={s.slug} className="border-b border-ink/25 py-3 font-display text-xl font-medium tracking-[-0.01em]">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </section>

      {/* Selected work */}
      <section className={`${wrap} py-24 md:py-32`}>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-[14ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
            Selected work
          </h2>
          <div className="flex gap-6 text-[15px] font-semibold">
            <Link href="/build/portfolio" className="text-build underline underline-offset-[6px]">
              All Build work
            </Link>
            <Link href="/grow/portfolio" className="text-grow-ink underline underline-offset-[6px]">
              All Grow work
            </Link>
          </div>
        </div>
        <ul className="border-t border-ink">
          {work.map((project) => (
            <li key={`${project.vertical}-${project.slug}`} className="border-b border-line">
              <Link
                href={project.href}
                className={`group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 transition-[padding,background-color] duration-300 ease-out hover:px-4 md:grid-cols-[2fr_1fr_auto] md:py-8 ${
                  project.vertical === "build" ? "hover:bg-build hover:text-white" : "hover:bg-grow hover:text-ink"
                }`}
              >
                <span className="font-display text-2xl font-semibold tracking-[-0.025em] md:text-4xl">
                  {project.name}
                </span>
                <span className="col-start-1 text-[15px] opacity-70 md:col-start-auto">
                  {project.vertical === "build" ? "Build" : "Grow"} · {project.tag}
                </span>
                <span aria-hidden="true" className="col-start-2 row-start-1 text-2xl transition-transform duration-300 group-hover:translate-x-1 md:col-start-auto md:row-start-auto">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* The duo */}
      <section className="bg-alt px-6 py-24 sm:px-8 lg:px-10 2xl:px-16 md:py-32">
        <div className="mx-auto grid max-w-inner items-center gap-12 md:grid-cols-2 md:gap-20">
          <ImagePlaceholder
            label="[Photo — working together]"
            className="aspect-[4/3] w-full"
          />
          <Reveal>
            <h2 className="mb-6 max-w-[12ch] font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
              Two experts. One team.
            </h2>
            <p className="mb-10 max-w-[46ch] text-lg leading-relaxed text-muted">
              No account manager relaying messages between a dev shop and a
              marketing shop — you talk directly to the two people doing the
              work.
            </p>
            <ul className="mb-10 border-t border-ink">
              <li className="flex items-center gap-4 border-b border-line py-5">
                <span className="h-4 w-4 shrink-0 rounded-full bg-build" />
                <span className="text-lg font-semibold">
                  Bagus Bhismantara
                  <span className="block text-[15px] font-normal text-muted">
                    Web Dev, UI/UX Designer, Database &amp; CMS
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-4 border-b border-line py-5">
                <span className="h-4 w-4 shrink-0 rounded-full bg-grow" />
                <span className="text-lg font-semibold">
                  Engrasia Ivanna
                  <span className="block text-[15px] font-normal text-muted">
                    Marketing, Social Media Specialist, SEO
                  </span>
                </span>
              </li>
            </ul>
            <Link href="/about" className="text-[15px] font-semibold underline underline-offset-[6px] hover:text-build">
              Lihat profil lengkap →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Blog teaser */}
      <section className={`${wrap} py-24 md:py-32`}>
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] font-semibold tracking-[-0.035em]">
            Latest from the blog
          </h2>
          <Link href="/blog" className="hidden text-[15px] font-semibold underline underline-offset-[6px] hover:text-build sm:block">
            View all posts →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CTASection heading="Ready to build & grow, together?" />
    </>
  );
}
