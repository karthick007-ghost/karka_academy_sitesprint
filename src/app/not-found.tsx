import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h2 className="font-display text-4xl font-bold text-ink">404 - Page Not Found</h2>
      <p className="mt-3 text-ink-2">The page you were looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-md bg-forest px-6 py-2.5 text-sm font-semibold text-paper hover:bg-forest/90"
      >
        Return to Home
      </Link>
    </main>
  );
}
