/**
 * Supabase connection settings, read once and validated so a missing env var
 * fails loudly instead of surfacing as a vague network error.
 * Values come from Supabase → Project Settings → API Keys.
 */
function required(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing env var ${name}. See .env.example.`);
  }
  return value;
}

// NEXT_PUBLIC_* must be referenced literally so Next.js can inline them into the browser bundle.
export const supabaseUrl = () =>
  required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);

export const supabasePublishableKey = () =>
  required(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
