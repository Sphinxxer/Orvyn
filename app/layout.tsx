import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orvyn-trial2.vercel.app"),
  title: "Orvyn | Modern Brand Growth Agency",
  description:
    "Orvyn helps modern brands build sharper content, stronger websites, and growth systems that turn attention into trust.",
  icons: {
    icon: "/orvyn-icon.svg"
  },
  openGraph: {
    title: "Orvyn | Modern Brand Growth Agency",
    description:
      "Orvyn helps modern brands build sharper content, stronger websites, and growth systems that turn attention into trust.",
    siteName: "Orvyn",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orvyn - Modern Brand Growth Agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvyn | Modern Brand Growth Agency",
    description:
      "Orvyn helps modern brands build sharper content, stronger websites, and growth systems that turn attention into trust.",
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
      </body>
    </html>
  );
}
