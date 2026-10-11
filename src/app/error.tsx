"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log without PII
    console.error("Application error boundary triggered:", error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h2 className="font-display text-4xl font-bold text-ink">Something went wrong</h2>
      <p className="mt-3 text-ink-2">We encountered an unexpected error. Please try again.</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent/90 shadow-sm"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-ui/30 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-elev transition-colors"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
