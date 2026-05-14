import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
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
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Orvyn | Modern Brand Growth Agency",
    description:
      "Orvyn helps modern brands build sharper content, stronger websites, and growth systems that turn attention into trust."
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
