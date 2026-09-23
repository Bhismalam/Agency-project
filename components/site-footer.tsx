import Link from "next/link";
import { Seam } from "@/components/ui/seam";
import { Eyebrow } from "@/components/ui/eyebrow";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-6 py-13 sm:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-9 py-6">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-[280px]">
            <span className="font-display text-lg font-bold">2gether</span>
            <Seam tone="gradient" className="my-3.5 w-7" />
            <p className="text-sm leading-relaxed text-muted">
              One team, two disciplines — websites and the audience to fill
              them.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-2.5">
              <Eyebrow className="mb-0.5">Sitemap</Eyebrow>
              <Link href="/" className="font-mono text-xs uppercase tracking-wide text-muted hover:text-ink">
                Home
              </Link>
              <Link href="/about" className="font-mono text-xs uppercase tracking-wide text-muted hover:text-ink">
                About
              </Link>
              <Link href="/build" className="font-mono text-xs uppercase tracking-wide text-muted hover:text-ink">
                Build
              </Link>
              <Link href="/grow" className="font-mono text-xs uppercase tracking-wide text-muted hover:text-ink">
                Grow
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <Eyebrow className="mb-0.5">Contact</Eyebrow>
              <span className="text-sm text-muted">[email@domain.com]</span>
              <span className="text-sm text-muted">[Instagram / LinkedIn]</span>
              <Link href="/contact" className="font-mono text-xs uppercase tracking-wide text-ink hover:underline">
                Book a Call →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-5 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} — Agency name TBD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
