/**
 * Studio contact details — the single place to edit when any of this changes.
 * Used by /contact and the site footer.
 */
export const contact = {
  email: "bagusbhismantara27@gmail.com",
  // Indonesian number 085111044817 in wa.me's international format (no
  // leading 0, country code 62 prepended).
  whatsapp: "6285111044817",
  // TODO: replace with real handles once ready.
  instagram: null as string | null,
  linkedin: null as string | null,
  responseTime: "We usually reply within 1–2 business days.",
};

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
