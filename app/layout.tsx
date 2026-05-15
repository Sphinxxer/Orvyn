import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orvyn.cc"),
  title: "Orvyn | Modern Brand Growth Agency",
  description:
    "Orvyn helps brands sharpen their content, website, and marketing system so they look clearer, earn trust faster, and grow with intent.",
  icons: {
    icon: "/orvyn-icon.svg"
  },
  openGraph: {
    title: "Orvyn | Modern Brand Growth Agency",
    description:
      "Orvyn helps brands sharpen their content, website, and marketing system so they look clearer, earn trust faster, and grow with intent.",
    siteName: "Orvyn",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orvyn — Modern Brand Growth Agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvyn | Modern Brand Growth Agency",
    description:
      "Orvyn helps brands sharpen their content, website, and marketing system so they look clearer, earn trust faster, and grow with intent.",
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
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
