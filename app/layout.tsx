import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsEvents } from "@/components/analytics/AnalyticsEvents";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ExperienceMotion } from "@/components/ui/ExperienceMotion";
import { globalSchema } from "@/data/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const baseUrl = "https://orvyn.cc";

const defaultDescription =
  "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen branding, websites, marketing, and digital presence.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Orvyn | Brand Growth Agency in Tirupur",
  description: defaultDescription,
  keywords: [
    "brand growth agency",
    "modern internet company",
    "marketing agency in Tirupur",
    "brand growth agency India",
    "content creation agency",
    "performance marketing agency",
    "website development agency",
    "social media management agency",
    "digital marketing agency in Tirupur",
    "brand strategy",
    "brand identity",
    "website design",
    "SEO campaigns"
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
    title: "Orvyn | Brand Growth Agency in Tirupur",
    description: defaultDescription,
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orvyn brand growth agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvyn | Brand Growth Agency in Tirupur",
    description:
      "Orvyn helps brands sharpen their digital presence through branding, websites, and marketing.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-ink font-sans text-white antialiased`}>
        {globalSchema.map((schema) => (
          <JsonLd key={String(schema["@id"])} data={schema} />
        ))}
        <ExperienceMotion />
        <CustomCursor />
        {children}
        <MicrosoftClarity />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
