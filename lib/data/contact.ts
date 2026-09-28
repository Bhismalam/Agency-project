/**
 * Studio contact details — the single place to edit when any of this changes.
 * Used by /contact and the site footer.
 */
export const contact = {
  email: "bagusbhismantara27@gmail.com",
  // Indonesian number 085111044817 in wa.me's international format (no
  // leading 0, country code 62 prepended).
  whatsapp: "6285111044817",
  // TODO: fill in the full profile URLs once ready (e.g. "https://instagram.com/yourhandle").
  // Icons with a null URL show as greyed-out on /contact until a URL is set.
  instagram: null as string | null,
  linkedin: null as string | null,
  tiktok: null as string | null,
  github: null as string | null,
  responseTime: "We usually reply within 1–2 business days.",
};

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
