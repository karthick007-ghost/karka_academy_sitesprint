import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KolamMandala } from "@/components/ornament/kolam";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center p-6 text-center bg-base text-primary transition-colors duration-200">
      <div className="relative max-w-lg w-full rounded-3xl border border-ui/15 bg-elev p-8 sm:p-12 shadow-subtle overflow-hidden space-y-6">
        {/* Decorative Background Kolam Motif */}
        <div className="flex justify-center opacity-75">
          <KolamMandala
            size={120}
            color="var(--saffron, #FF6A2B)"
            dotColor="#FFD166"
            animated={true}
          />
        </div>

        {/* Tamil Calligraphy Badge */}
        <div>
          <span
            lang="ta"
            className="inline-flex items-center gap-1.5 rounded-full border border-saffron/30 bg-saffron/10 px-4 py-1 font-tamil text-sm font-bold text-accent"
          >
            வழியில்லை • 404
          </span>
        </div>

        {/* Big Numerals & Error Description */}
        <div className="space-y-2">
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight">
            404
          </h1>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
            The route you were looking for doesn't exist or has been relocated to another corridor of our academy.
          </p>
        </div>

        {/* Magnetic Return Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              magnetic={true}
              className="font-bold shadow-subtle flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </Link>

          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              magnetic={true}
              className="font-semibold"
            >
              <Compass className="h-4 w-4 mr-2 text-accent" />
              <span>Explore Courses</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
