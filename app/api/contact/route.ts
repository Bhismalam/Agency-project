import { Resend } from "resend";

const NEED_LABELS: Record<string, string> = {
  build: "Build — Web Dev / UI-UX / SEO Technical",
  grow: "Grow — Marketing / Social Media / SEO Content",
  both: "Both Build and Grow",
  "not-sure": "Not sure yet",
};

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    need?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, need, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toAddress) {
    console.error("Contact form: missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.");
    return Response.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const needLabel = need ? (NEED_LABELS[need] ?? need) : "Not specified";

  try {
    await resend.emails.send({
      from: "2gether website <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nNeeds: ${needLabel}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact form: Resend send failed.", error);
    return Response.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
