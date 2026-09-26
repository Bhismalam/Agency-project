import { Button } from "@/components/ui/button";

export function CTASection({
  heading,
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-ink px-6 py-24 text-paper sm:px-8 lg:px-10 2xl:px-16 md:py-32">
      <div className="mx-auto flex max-w-inner flex-col gap-12">
        <h2 className="max-w-[16ch] font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Button href={primaryHref} variant="white">
            {primaryLabel} <span aria-hidden="true">→</span>
          </Button>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="text-[15px] font-medium text-paper/80 underline decoration-paper/30 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
