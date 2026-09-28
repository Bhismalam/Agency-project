import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaTiktok, FaGithub } from "react-icons/fa6";
import { contact, whatsappHref } from "@/lib/data/contact";

const socials = [
  { label: "WhatsApp", href: whatsappHref(), Icon: FaWhatsapp },
  { label: "Instagram", href: contact.instagram, Icon: FaInstagram },
  { label: "LinkedIn", href: contact.linkedin, Icon: FaLinkedinIn },
  { label: "TikTok", href: contact.tiktok, Icon: FaTiktok },
  { label: "GitHub", href: contact.github, Icon: FaGithub },
];

const base =
  "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-ink text-ink transition-colors duration-200";

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2.5 sm:gap-3">
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`${base} hover:bg-ink hover:text-paper`}
            >
              <Icon aria-hidden="true" size={20} />
            </a>
          ) : (
            <span
              role="img"
              aria-label={`${label} (coming soon)`}
              title={`${label} — coming soon`}
              className={`${base} border-line text-muted/50`}
            >
              <Icon aria-hidden="true" size={20} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
