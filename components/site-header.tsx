"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

function underlineToneClass(href: string) {
  if (href === "/build") return "bg-build";
  if (href === "/grow") return "bg-grow";
  return "bg-ink";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeTone = toneForPath(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-shadow duration-200",
        scrolled ? "border-line shadow-[0_1px_12px_rgba(15,23,42,0.06)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="group flex flex-col gap-1"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg font-bold">2gether</span>
          <Seam
            tone="gradient"
            className="w-7 transition-[width] duration-200 ease-out group-hover:w-10"
          />
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
                  "group relative py-1.5 font-mono text-xs tracking-wide text-muted uppercase transition-colors duration-150 hover:text-ink",
                  isActive && !isVertical && "text-ink",
                  isActive && link.href === "/build" && "text-build",
                  isActive && link.href === "/grow" && "text-grow-ink",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-200 ease-out group-hover:scale-x-100",
                    underlineToneClass(link.href),
                    isActive && "scale-x-100",
                  )}
                />
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
          className="flex h-10 w-10 items-center justify-center rounded border border-line transition-colors duration-150 hover:bg-alt md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 ease-out"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
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

      <div
        className={cn(
          "grid overflow-hidden border-line transition-[grid-template-rows] duration-200 ease-out md:hidden",
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0",
        )}
      >
        <nav className="flex min-h-0 flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded px-2 py-2.5 font-mono text-sm tracking-wide text-muted uppercase transition-colors duration-150 hover:bg-alt hover:text-ink",
                  isActive && "bg-alt text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="px-2 pt-2">
            <Button href="/contact" variant="solid" className="w-full">
              Contact Us
            </Button>
          </div>
        </nav>
      </div>

      {activeTone && (
        <Seam tone={activeTone} className="h-[2px] w-full rounded-none" />
      )}
    </header>
  );
}
