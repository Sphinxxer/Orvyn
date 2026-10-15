import type { Metadata } from "next";
import localFont from "next/font/local";
import { AnalyticsEvents } from "@/components/analytics/AnalyticsEvents";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { JsonLd } from "@/components/seo/JsonLd";
import { ExperienceMotion } from "@/components/ui/ExperienceMotion";
import { globalSchema } from "@/data/schema";
import { homeDescription, homeTitle } from "@/data/site-metadata";
import "./globals.css";

const sans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap"
});
const display = localFont({ src: "./fonts/cormorant-garamond-latin.woff2", weight: "500 600", variable: "--font-display", display: "swap", adjustFontFallback: "Times New Roman" });

const baseUrl = "https://orvyn.cc";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "branding studio India",
    "branding agency Tirupur",
    "brand strategy",
    "brand identity",
    "visual identity",
    "website design",
    "website development",
    "Shopify ecommerce",
    "social media content",
    "campaign design"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Orvyn — Branding, websites and marketing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${display.variable}`}>
        {globalSchema.map((schema) => (
          <JsonLd key={String(schema["@id"])} data={schema} />
        ))}
        <ExperienceMotion />
        {children}
        <MicrosoftClarity />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

