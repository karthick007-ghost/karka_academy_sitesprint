import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Noto_Serif_Tamil } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import "@/styles/globals.css";

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
  themeColor: "#0F3D2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${notoTamil.variable}`}
    >
      <body className="min-h-screen bg-night-1 text-night-text antialiased selection:bg-saffron/20 flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-saffron focus:px-4 focus:py-2 focus:text-ink font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
