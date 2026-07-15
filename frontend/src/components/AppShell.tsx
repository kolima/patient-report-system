"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Select, SelectItem } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { useClinic } from "@/lib/clinic-context";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/templates", label: "Templates" },
  { href: "/report", label: "Patient Report" },
  { href: "/settings", label: "Clinic Settings" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { clinics, clinicId, setClinicId, loading, error } = useClinic();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/templates" ? pathname === "/templates" || pathname.startsWith("/templates/") : pathname === href;

  return (
    <div className="min-h-screen">
      <header className="app-header-enter sticky top-0 z-30 border-app-border border-b bg-app-surface/90 backdrop-blur-md">
        <div className="h-0.5 bg-gradient-to-r from-app-primary via-app-accent to-app-accent/40" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-5">
            <Link
              href="/templates"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2"
            >
              <Image
                src="/logos/longevitix.svg"
                alt="Longevitix"
                width={148}
                height={16}
                className="h-4 w-auto transition-opacity group-hover:opacity-80 sm:h-[1.125rem]"
                priority
              />
              <span className="hidden h-4 w-px bg-app-border sm:block" aria-hidden="true" />
              <span className="hidden font-medium text-[11px] text-app-text uppercase tracking-[0.14em] sm:inline">
                Report Builder
              </span>
            </Link>
            <nav className="hidden gap-0.5 md:flex" aria-label="Main navigation">
              {NAV_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2",
                    isActive(href) ? "font-medium text-app-heading" : "text-app-text hover:text-app-heading",
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-app-accent"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md px-2 py-1.5 text-app-text text-sm hover:bg-app-accent-soft/60 hover:text-app-heading md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Menu
            </button>
            <label htmlFor="clinic-switcher" className="sr-only">
              Select clinic
            </label>
            {loading ? (
              <Skeleton className="h-9 w-40" />
            ) : clinicId ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-[11px] text-app-text uppercase tracking-[0.12em] sm:inline">Clinic</span>
                <Select
                  id="clinic-switcher"
                  className="max-w-[12rem] sm:max-w-xs"
                  value={clinicId}
                  disabled={clinics.length === 0}
                  onValueChange={setClinicId}
                >
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ) : null}
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            className="border-app-border border-t px-4 py-2 md:hidden"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm",
                  isActive(href) ? "bg-app-accent-soft font-medium text-app-heading" : "text-app-text",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {error && (
          <div className="border-app-border border-t px-4 py-2">
            <Alert variant="error">{error}</Alert>
          </div>
        )}
      </header>
      <main className="app-page-enter">{children}</main>
    </div>
  );
}
