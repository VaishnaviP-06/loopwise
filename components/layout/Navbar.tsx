"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#second-life", label: "Second life" },
  { href: "/#why-loopwise", label: "Why LoopWise" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-gradient-to-b from-loop-bg/80 to-transparent lg:bg-none">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.02em] text-loop-text"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-loop-dark text-base leading-none text-white">
            ↻
          </span>
          <span>LoopWise</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 text-[13px] font-medium text-loop-text/80 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-loop-dark"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/analyze"
          className="hidden rounded-full bg-loop-dark px-5 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-loop-hover md:inline-flex"
        >
          Analyze an item
          <span className="ml-1.5">→</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-loop-border bg-white/80 text-loop-text backdrop-blur-sm md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-200 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-200 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="mx-4 mb-4 rounded-2xl border border-loop-border bg-white/95 px-6 py-6 shadow-sm backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col gap-4 text-[15px] font-medium text-loop-text">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="transition-colors hover:text-loop-dark"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/analyze"
            onClick={() => setIsOpen(false)}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-loop-dark px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-loop-hover"
          >
            Analyze an item
            <span className="ml-1.5">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
