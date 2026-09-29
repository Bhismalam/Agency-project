"use client";

import { useState, type FormEvent } from "react";

type FieldErrors = {
  name?: string;
  email?: string;
  cv?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fieldClass(hasError: boolean) {
  return `w-full rounded-lg border bg-card px-4 py-3.5 font-sans text-base text-ink outline-none transition-colors focus:border-ink ${
    hasError ? "border-red-500" : "border-line"
  }`;
}

export function ProgramApplicationForm({
  programTitle,
  programSlug,
}: {
  programTitle: string;
  programSlug: string;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function validateFile(file: File | undefined): string | undefined {
    if (!file || file.size === 0) return undefined;
    if (file.size > MAX_FILE_BYTES) return "File is too large — max 5MB.";
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Use a PDF, DOC, or DOCX file.";
    }
    return undefined;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
    setErrors((prev) => ({ ...prev, cv: validateFile(file) }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "name" && !value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Enter your name." }));
    } else if (name === "name") {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (name === "email") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: "Enter your email." }));
      } else if (!EMAIL_PATTERN.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const cvFile = data.get("cv") as File | null;

    const nextErrors: FieldErrors = {
      name: name.trim() ? undefined : "Enter your name.",
      email: !email.trim()
        ? "Enter your email."
        : EMAIL_PATTERN.test(email)
          ? undefined
          : "Enter a valid email address.",
      cv: validateFile(cvFile && cvFile.size > 0 ? cvFile : undefined),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    data.set("programTitle", programTitle);
    data.set("programSlug", programSlug);
    if (cvFile && cvFile.size === 0) data.delete("cv");

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/program-application", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setFileName(null);
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border-t border-ink pt-6" role="status">
        <div className="mb-2 font-display text-xl font-semibold">
          Application sent.
        </div>
        <p className="max-w-[48ch] text-[15px] text-muted">
          Thanks for applying to {programTitle} — we&rsquo;ll review it and
          get back to you within a few business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid max-w-[720px] grid-cols-1 gap-4.5 border-t border-ink pt-6 sm:grid-cols-2"
    >
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

      <div className="sm:col-span-2">
        <label htmlFor="portfolio" className="mb-1.5 block font-sans text-sm font-semibold">
          Portfolio / CV link
        </label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          placeholder="https://…"
          className={fieldClass(false)}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cv" className="mb-1.5 block font-sans text-sm font-semibold">
          Upload CV (PDF, DOC, DOCX — max 5MB)
        </label>
        <label
          htmlFor="cv"
          className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3.5 font-sans text-base transition-colors hover:border-ink ${
            errors.cv ? "border-red-500" : "border-line"
          }`}
        >
          <span className={fileName ? "text-ink" : "text-muted"}>
            {fileName ?? "Choose file…"}
          </span>
          <span className="shrink-0 text-[13px] font-semibold text-build">Browse</span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="sr-only"
        />
        {errors.cv && <p className="mt-1.5 text-xs text-red-600">{errors.cv}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block font-sans text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Why this program, in a few sentences…"
          className={`min-h-[120px] resize-none ${fieldClass(false)}`}
        />
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="text-sm text-red-600 sm:col-span-2">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full border border-ink bg-ink px-8 py-4 font-sans text-[15px] font-semibold text-paper transition-colors hover:border-build hover:bg-build disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
