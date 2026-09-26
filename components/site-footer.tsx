import Link from "next/link";
import { Seam } from "@/components/ui/seam";

const linkClass = "text-[15px] text-muted transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink px-6 pt-14 pb-8 sm:px-8 lg:px-10 2xl:px-16">
      <div className="mx-auto flex max-w-inner flex-col gap-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <Seam size={20} />
              <span className="font-display text-2xl font-semibold tracking-[-0.03em]">2gether</span>
            </div>
            <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-muted">
              One team, two disciplines — websites and the audience to fill
              them.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[13px] font-semibold">Studio</div>
            <Link href="/" className={linkClass}>Home</Link>
            <Link href="/about" className={linkClass}>About</Link>
            <Link href="/blog" className={linkClass}>Blog</Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[13px] font-semibold">Work</div>
            <Link href="/build" className={`${linkClass} hover:!text-build`}>Build</Link>
            <Link href="/grow" className={`${linkClass} hover:!text-grow-ink`}>Grow</Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[13px] font-semibold">Contact</div>
            <span className="text-[15px] text-muted">[email@domain.com]</span>
            <span className="text-[15px] text-muted">[Instagram / LinkedIn]</span>
            <Link href="/contact" className="text-[15px] font-semibold underline underline-offset-[6px] hover:text-build">
              Start a project →
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-line pt-6 text-[13px] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Agency 2gether. All rights reserved.</span>
          <span>Bali, Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
