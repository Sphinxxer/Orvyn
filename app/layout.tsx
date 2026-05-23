import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const baseUrl = "https://orvyn.cc";

const defaultDescription =
  "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen their content, websites, marketing systems, and digital presence.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Orvyn | Brand Growth Agency & Modern Internet Company",
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
    "brand consulting",
    "website design",
    "SEO campaigns"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/orvyn-icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "Orvyn | Brand Growth Agency & Modern Internet Company",
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
    title: "Orvyn | Brand Growth Agency & Modern Internet Company",
    description:
      "Orvyn helps brands sharpen their content, websites, marketing systems, and digital presence so they look clearer, earn trust faster, and grow with intent.",
    images: ["/og-image.png"]
  }
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orvyn",
    alternateName: ["ORVYN", "Orvyn.cc"],
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen their content, websites, marketing systems, and digital presence.",
    founder: {
      "@type": "Person",
      name: "Bharath Kesav"
    },
    sameAs: [
      "https://www.instagram.com/orvyn.cc/",
      "https://www.linkedin.com/company/orvyncc/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orvyn",
    alternateName: ["ORVYN", "Orvyn.cc"],
    url: baseUrl,
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India."
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Orvyn",
    alternateName: ["ORVYN", "Orvyn.cc"],
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    logo: `${baseUrl}/favicon.svg`,
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen content, websites, marketing systems, and digital presence.",
    areaServed: ["India", "Tamil Nadu", "Tirupur"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirupur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN"
    },
    serviceType: [
      "Consulting",
      "Design",
      "Marketing",
      "Websites",
      "Performance Marketing",
      "Content Creation",
      "Brand Development",
      "Website Development",
      "Social Media Management",
      "SEO",
      "Campaigns"
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
        <CustomCursor />
        {children}
        <MicrosoftClarity />
      </body>
    </html>
  );
}
