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
    <section className="bg-ink px-6 py-20 text-center sm:px-10 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref} variant="white">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="font-mono text-sm tracking-wide text-grow-tint/90 underline decoration-transparent underline-offset-4 transition hover:decoration-current"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
