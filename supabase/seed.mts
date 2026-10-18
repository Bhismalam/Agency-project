/**
 * One-time move of the static content in lib/data/*.ts into Supabase.
 *
 *   npm run db:seed
 *
 * Safe to re-run: rows that already exist (matched by slug) are left alone, so
 * edits made later in the dashboard are never overwritten.
 * Needs NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY and OWNER_EMAIL in .env.local.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { team } from "../lib/data/team.ts";
import { buildProjects, growProjects } from "../lib/data/portfolio.ts";
import { posts } from "../lib/data/blog.ts";
import { programs } from "../lib/data/programs.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const ownerEmail = process.env.OWNER_EMAIL?.trim().toLowerCase();
// The member who owns the agency account; defaults to the first profile in lib/data/team.ts.
const ownerSlug = process.env.OWNER_MEMBER_SLUG ?? team[0]?.slug;

if (!url || !secretKey || !ownerEmail) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY and OWNER_EMAIL in .env.local.",
  );
  process.exit(1);
}

const db = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function check<T>(label: string, result: { data: T; error: { message: string } | null }) {
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  // No error means the query succeeded; writes without .select() return no rows, which we ignore.
  return result.data as NonNullable<T>;
}

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

// ── Divisions ──
check(
  "divisions",
  await db.from("divisions").upsert(
    [
      { slug: "development", name: "Development Team", vertical: "build", sort: 0 },
      { slug: "social-media", name: "Social Media Specialist Team", vertical: "grow", sort: 1 },
    ],
    { onConflict: "slug", ignoreDuplicates: true },
  ),
);
const divisions = check("divisions", await db.from("divisions").select("id, vertical"));
const divisionFor = (vertical: string) => divisions.find((d) => d.vertical === vertical)?.id ?? null;

// ── Members ──
check(
  "members",
  await db.from("members").upsert(
    team.map((member, index) => {
      const isOwner = member.slug === ownerSlug;
      return {
        slug: member.slug,
        name: member.name,
        role_title: member.role,
        division_id: divisionFor(member.vertical),
        tagline: member.tagline,
        bio: member.bio,
        skills: member.skills,
        experience: member.experience,
        is_published: true,
        sort: index,
        // Only the owner gets a login now; the others are invited from the dashboard.
        email: isOwner ? ownerEmail : null,
        access_role: isOwner ? "owner" : "member",
      };
    }),
    { onConflict: "slug", ignoreDuplicates: true },
  ),
);

// Upload profile photos that live in /public into the media bucket.
const memberRows = check("members", await db.from("members").select("id, slug, photo_path"));
for (const member of team) {
  const row = memberRows.find((r) => r.slug === member.slug);
  if (!row || row.photo_path || !member.photo) continue;

  const file = path.join(process.cwd(), "public", member.photo);
  const ext = path.extname(file).toLowerCase();
  const objectPath = `members/${row.id}/photo${ext}`;
  check(
    `photo ${member.slug}`,
    await db.storage.from("media").upload(objectPath, await readFile(file), {
      contentType: contentTypes[ext],
      upsert: true,
    }),
  );
  check(
    `photo_path ${member.slug}`,
    await db.from("members").update({ photo_path: objectPath }).eq("id", row.id),
  );
}

// ── Projects ──
check(
  "projects",
  await db.from("projects").upsert(
    [...buildProjects, ...growProjects].map((project, index) => ({
      slug: project.slug,
      vertical: project.vertical,
      name: project.name,
      tag: project.tag,
      summary: project.summary,
      description: project.description,
      result: project.result,
      is_published: true,
      sort: index,
    })),
    { onConflict: "vertical,slug", ignoreDuplicates: true },
  ),
);

// ── Blog posts ── (paragraph arrays become Markdown paragraphs)
check(
  "posts",
  await db.from("posts").upsert(
    posts.map((post) => {
      const date = new Date(post.date);
      return {
        slug: post.slug,
        title: post.title,
        vertical: post.vertical,
        excerpt: post.excerpt,
        body: post.body.join("\n\n"),
        status: "published",
        published_at: Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
      };
    }),
    { onConflict: "slug", ignoreDuplicates: true },
  ),
);

// ── Programs ──
check(
  "programs",
  await db.from("programs").upsert(
    programs.map((program, index) => ({
      slug: program.slug,
      title: program.title,
      summary: program.summary,
      description: program.description,
      status: program.status,
      deadline: program.deadline,
      duration: program.duration,
      location: program.location,
      requirements: program.requirements,
      benefits: program.benefits,
      sort: index,
    })),
    { onConflict: "slug", ignoreDuplicates: true },
  ),
);

const counts = await Promise.all(
  ["divisions", "members", "projects", "posts", "programs"].map(async (table) => {
    const { count } = await db.from(table).select("*", { count: "exact", head: true });
    return `${table}: ${count}`;
  }),
);
console.log(`Seed done. ${counts.join(", ")}. Owner: ${ownerEmail} (${ownerSlug}).`);
