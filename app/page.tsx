import type { Metadata } from "next";
import { AboutPreview } from "@/components/about-preview";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { FinalCta } from "@/components/final-cta";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFrame } from "@/components/site-frame";
import { JsonLd } from "@/components/seo/JsonLd";
import { createServicesItemListSchema, homePageSchema } from "@/data/schema";
import { homeDescription, homeTitle } from "@/data/site-metadata";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
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

export default function Home() {
  return (
    <SiteFrame>
      <JsonLd data={[homePageSchema, createServicesItemListSchema()]} />
      <HeroSection />
      <CaseStudiesPreview />
      <ServicesSection />
      <AboutPreview />
      <FinalCta />
    </SiteFrame>
  );
}

