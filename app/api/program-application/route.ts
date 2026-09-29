import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const portfolio = String(data.get("portfolio") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const programTitle = String(data.get("programTitle") ?? "the program").trim();
  const cv = data.get("cv");

  if (!name || !email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  let attachment: { filename: string; content: Buffer } | undefined;
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_FILE_BYTES) {
      return Response.json({ error: "File is too large — max 5MB." }, { status: 400 });
    }
    if (!ACCEPTED_TYPES.includes(cv.type)) {
      return Response.json({ error: "Use a PDF, DOC, or DOCX file." }, { status: 400 });
    }
    attachment = {
      filename: cv.name,
      content: Buffer.from(await cv.arrayBuffer()),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toAddress) {
    console.error("Program application: missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.");
    return Response.json(
      { error: "Applications aren't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const lines = [
    `Program: ${programTitle}`,
    `Name: ${name}`,
    `Email: ${email}`,
    portfolio ? `Portfolio/CV link: ${portfolio}` : null,
    "",
    message || "(no message)",
  ].filter((line): line is string => line !== null);

  try {
    await resend.emails.send({
      from: "2gether website <onboarding@resend.dev>",
      to: toAddress,
      replyTo: email,
      subject: `New application: ${programTitle}`,
      text: lines.join("\n"),
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (error) {
    console.error("Program application: Resend send failed.", error);
    return Response.json(
      { error: "Something went wrong sending your application. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
