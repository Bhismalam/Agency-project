"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClass(hasError: boolean) {
  return `w-full rounded-lg border bg-card px-4 py-3.5 font-sans text-base text-ink outline-none transition-colors focus:border-ink ${
    hasError ? "border-red-500" : "border-line"
  }`;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function validateField(name: string, value: string): string | undefined {
    if (name === "name" && !value.trim()) return "Enter your name.";
    if (name === "email") {
      if (!value.trim()) return "Enter your email.";
      if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
    }
    if (name === "message" && !value.trim()) return "Tell us a bit about your project.";
    return undefined;
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const need = String(data.get("need") ?? "");
    const message = String(data.get("message") ?? "");

    const nextErrors: FieldErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, need, message }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-1 flex-col justify-center rounded-md border border-line bg-card p-8 text-center" role="status">
        <div className="mb-2 font-display text-xl font-semibold">
          Message sent.
        </div>
        <p className="text-sm text-muted">
          Thanks for reaching out — we&rsquo;ll reply within a few business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-4.5">
      <div>
        <label htmlFor="name" className="mb-1.5 block font-sans text-sm font-semibold">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-sans text-sm font-semibold">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="need" className="mb-1.5 block font-sans text-sm font-semibold">
          What do you need?
        </label>
        <select
          id="need"
          name="need"
          defaultValue="both"
          className="w-full rounded-lg border border-line bg-card px-4 py-3.5 font-sans text-base text-ink outline-none focus:border-ink"
        >
          <option value="build">Build — Web Dev / UI-UX / SEO Technical</option>
          <option value="grow">Grow — Marketing / Social Media / SEO Content</option>
          <option value="both">Both Build and Grow</option>
          <option value="program">Program / Internship</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="message" className="mb-1.5 block font-sans text-sm font-semibold">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your project…"
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`min-h-[120px] flex-1 resize-none ${fieldClass(Boolean(errors.message))}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full border border-ink bg-ink px-8 py-4 font-sans text-[15px] font-semibold text-paper transition-colors hover:border-build hover:bg-build disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
