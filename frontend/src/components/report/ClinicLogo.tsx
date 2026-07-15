"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface ClinicLogoProps {
  src: string;
  alt: string;
  name?: string;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ClinicLogo({ src, alt, name, className }: ClinicLogoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = Boolean(src) && failedSrc === src;

  if (!src || failed) {
    if (!name) return null;
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-md bg-slate-200 font-semibold text-slate-600 text-sm",
          className,
        )}
        role="img"
        aria-label={alt || `${name} logo`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={240}
      height={80}
      unoptimized
      className={cn("inline-block w-fit max-w-full object-contain", className)}
      style={{ width: "auto" }}
      onError={() => setFailedSrc(src)}
    />
  );
}
