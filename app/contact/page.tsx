import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project — web development, marketing, or both. We reply within a few business days.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:py-20">
      <div className="mx-auto mb-14 flex max-w-[640px] flex-col items-center gap-4 text-center">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display text-3xl font-semibold sm:text-[40px]">
          Let&rsquo;s build something together
        </h1>
        <p className="max-w-[480px] text-base leading-relaxed text-muted">
          Tell us about your project — we reply within a few business days.
        </p>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        <ContactForm />

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-1 flex-col gap-5 rounded-md border border-line bg-card p-7">
            <div>
              <Eyebrow className="mb-1.5">Email</Eyebrow>
              <div className="text-sm">[hello@domain.com]</div>
            </div>
            <div>
              <Eyebrow className="mb-1.5">Social</Eyebrow>
              <div className="text-sm text-muted">[Instagram]</div>
              <div className="text-sm text-muted">[LinkedIn]</div>
            </div>
            <div>
              <Eyebrow className="mb-1.5">Response time</Eyebrow>
              <div className="text-sm text-muted">
                [We reply within X business days]
              </div>
            </div>
            <div className="mt-auto border-t border-line pt-4">
              <p className="mb-3 text-[13px] text-muted">
                Prefer to talk directly?
              </p>
              <Button href="#" variant="line" className="w-full">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
