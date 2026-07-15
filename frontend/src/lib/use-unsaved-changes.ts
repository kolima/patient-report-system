"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type PendingNavigation = { kind: "href"; href: string } | { kind: "history"; delta: number };

interface UseUnsavedChangesGuardOptions {
  isDirty: boolean;
  onSave: () => Promise<boolean>;
}

/**
 * Single unsaved-changes guard for Settings and the template editor.
 * Intercepts same-origin link clicks, browser back/forward, and tab close.
 */
export function useUnsavedChangesGuard({ isDirty, onSave }: UseUnsavedChangesGuardOptions) {
  const router = useRouter();
  const allowNavigationRef = useRef(false);
  const dirtyRef = useRef(isDirty);
  const sentinelPushedRef = useRef(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState<PendingNavigation | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  dirtyRef.current = isDirty;

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setPending(null);
  }, []);

  const navigateHref = useCallback(
    (href: string) => {
      allowNavigationRef.current = true;
      sentinelPushedRef.current = false;
      router.push(href);
    },
    [router],
  );

  const navigateHistory = useCallback((delta: number) => {
    allowNavigationRef.current = true;
    sentinelPushedRef.current = false;
    window.history.go(delta);
  }, []);

  const completePending = useCallback(
    (nav: PendingNavigation) => {
      if (nav.kind === "href") {
        navigateHref(nav.href);
      } else {
        navigateHistory(nav.delta);
      }
    },
    [navigateHref, navigateHistory],
  );

  const requestNavigation = useCallback(
    (href: string) => {
      if (!isDirty || allowNavigationRef.current) {
        navigateHref(href);
        return;
      }
      setPending({ kind: "href", href });
      setDialogOpen(true);
    },
    [isDirty, navigateHref],
  );

  const handleSaveAndLeave = useCallback(async () => {
    if (!pending) return;
    setIsSaving(true);
    try {
      const saved = await onSave();
      if (saved) {
        const nav = pending;
        closeDialog();
        completePending(nav);
      }
    } finally {
      setIsSaving(false);
    }
  }, [pending, onSave, closeDialog, completePending]);

  const handleContinue = useCallback(() => {
    if (!pending) return;
    const nav = pending;
    closeDialog();
    completePending(nav);
  }, [pending, closeDialog, completePending]);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (event: MouseEvent) => {
      if (allowNavigationRef.current) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setPending({
        kind: "href",
        href: `${url.pathname}${url.search}${url.hash}`,
      });
      setDialogOpen(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDirty]);

  // Push a history sentinel while dirty so Back/Forward can be intercepted.
  useEffect(() => {
    if (!isDirty) {
      sentinelPushedRef.current = false;
      return;
    }

    if (!sentinelPushedRef.current) {
      window.history.pushState({ unsavedGuard: true }, "", window.location.href);
      sentinelPushedRef.current = true;
    }

    const handlePopState = () => {
      if (allowNavigationRef.current || !dirtyRef.current) return;

      // Stay on the page and ask; continue uses history.go(-1) past the sentinel.
      window.history.pushState({ unsavedGuard: true }, "", window.location.href);
      sentinelPushedRef.current = true;
      setPending({ kind: "history", delta: -1 });
      setDialogOpen(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) {
      allowNavigationRef.current = false;
    }
  }, [isDirty]);

  return {
    dialogOpen,
    isSaving,
    handleSaveAndLeave,
    handleContinue,
    closeDialog,
    requestNavigation,
  };
}
