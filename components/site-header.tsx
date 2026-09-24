"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Seam } from "@/components/ui/seam";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/build", label: "Build" },
  { href: "/grow", label: "Grow" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function toneForPath(pathname: string) {
  if (pathname.startsWith("/build")) return "build";
  if (pathname.startsWith("/grow")) return "grow";
  return null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeTone = toneForPath(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex flex-col gap-1" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-bold">2gether</span>
          <Seam tone="gradient" className="w-7" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isVertical = link.href === "/build" || link.href === "/grow";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-xs tracking-wide text-muted uppercase transition-colors hover:text-ink",
                  isActive && !isVertical && "text-ink",
                  isActive && link.href === "/build" && "text-build",
                  isActive && link.href === "/grow" && "text-grow-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="solid">
            Contact Us
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded border border-line md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M1 4H17M1 9H17M1 14H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2.5 font-mono text-sm tracking-wide text-muted uppercase hover:bg-alt hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-2 pt-2">
            <Button href="/contact" variant="solid" className="w-full">
              Contact Us
            </Button>
          </div>
        </nav>
      )}

      {activeTone && (
        <Seam tone={activeTone} className="h-[2px] w-full rounded-none" />
      )}
    </header>
  );
}
