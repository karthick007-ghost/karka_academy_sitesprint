import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Fraunces, Instrument_Sans, Noto_Serif_Tamil } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CursorFollower } from "@/components/cursor/cursor-follower";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://karka.academy"),
  title: {
    default: "Karka AI & Tech Academy | Learn First. Pay When Hired.",
    template: "%s | Karka Academy",
  },
  description:
    "AI-first software and data career training in Nagercoil, Tamil Nadu. Real client internships, live mentors, and transparent Pay After Placement.",
  authors: [{ name: "Karka AI & Tech Academy" }],
  keywords: [
    "Karka Academy",
    "Pay After Placement",
    "Coding bootcamp Nagercoil",
    "AI courses Tamil Nadu",
    "Full stack development Nagercoil",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://karka.academy",
    siteName: "Karka AI & Tech Academy",
    title: "Karka AI & Tech Academy | Learn First. Pay When Hired.",
    description:
      "Modern AI-driven tech education in Nagercoil. Master software development, UI/UX, and data engineering with ₹0 upfront tuition.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karka AI & Tech Academy | Learn First. Pay When Hired.",
    description: "AI-first career training in Nagercoil with verified Pay After Placement.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value as "system" | "light" | "dark" | undefined;
  const initialTheme = themeCookie === "dark" || themeCookie === "light" ? themeCookie : undefined;

  return (
    <html
      lang="en"
      data-theme={initialTheme || "light"}
      className={`${fraunces.variable} ${instrumentSans.variable} ${notoTamil.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-base text-primary antialiased selection:bg-accent/20 flex flex-col font-sans transition-colors duration-150">
        <ThemeProvider defaultTheme={themeCookie || "system"} initialResolvedTheme={initialTheme}>
          <ScrollProgress />
          <CursorFollower />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent font-semibold"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
