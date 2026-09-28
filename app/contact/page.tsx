import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { contact, whatsappHref } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project — web development, marketing, or both. We reply within a few business days.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-site px-6 pt-16 pb-24 sm:px-8 lg:px-10 2xl:px-16 md:pt-24 md:pb-32">
      <div className="mb-16 flex flex-col gap-6">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.5rem,11vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          Let&rsquo;s build something together
        </h1>
        <p className="max-w-[52ch] text-xl leading-relaxed text-muted">
          Tell us about your project — we reply within a few business days.
        </p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <ContactForm />

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-1 flex-col gap-5 border-t border-ink pt-6">
            <div>
              <Eyebrow className="mb-1.5">Email</Eyebrow>
              <a href={`mailto:${contact.email}`} className="text-lg font-medium hover:text-build">
                {contact.email}
              </a>
            </div>
            <div>
              <Eyebrow className="mb-3">Social</Eyebrow>
              <SocialLinks />
            </div>
            <div>
              <Eyebrow className="mb-1.5">Response time</Eyebrow>
              <div className="text-lg text-muted">{contact.responseTime}</div>
            </div>
            <div className="mt-auto border-t border-line pt-4">
              <p className="mb-3 text-[13px] text-muted">
                Prefer to talk directly?
              </p>
              <Button href={whatsappHref("Hi, I'd like to schedule a call about a project.")} variant="line" className="w-full">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
