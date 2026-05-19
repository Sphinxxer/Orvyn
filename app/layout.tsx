import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const baseUrl = "https://orvyn.cc";

const defaultDescription =
  "Orvyn helps brands sharpen their content, website, and marketing system so they look clearer, earn trust faster, and grow with intent.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Orvyn | Modern Brand Growth Agency",
  description: defaultDescription,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/orvyn-icon.svg"
  },
  openGraph: {
    title: "Orvyn | Modern Brand Growth Agency",
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
        alt: "Orvyn — Modern Brand Growth Agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvyn | Modern Brand Growth Agency",
    description: defaultDescription,
    images: ["/og-image.png"]
  }
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orvyn",
    url: baseUrl,
    logo: `${baseUrl}/orvyn-icon.svg`,
    description:
      "Orvyn is a modern brand growth agency helping brands sharpen their content, websites, and marketing systems.",
    sameAs: [
      "https://www.instagram.com/orvyn.cc/",
      "https://www.linkedin.com/company/orvyncc/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orvyn",
    url: baseUrl
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Orvyn",
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    logo: `${baseUrl}/orvyn-icon.svg`,
    description:
      "Orvyn is a modern brand growth agency helping brands sharpen their content, websites, and marketing systems.",
    areaServed: "India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirupur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN"
    },
    serviceType: [
      "Performance Marketing",
      "Content Creation",
      "Brand Development",
      "Website Development",
      "Social Media Management",
      "End-to-End Growth Systems"
    ],
    sameAs: [
      "https://www.instagram.com/orvyn.cc/",
      "https://www.linkedin.com/company/orvyncc/"
    ]
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-ink font-sans text-white antialiased`}>
        <JsonLd data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
