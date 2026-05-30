import type { Metadata } from "next";
import { AboutPreview } from "@/components/about-preview";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { FinalCta } from "@/components/final-cta";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Orvyn | Brand Growth Agency in Tirupur",
  description:
    "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen consulting, design, marketing, websites, and digital presence.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Orvyn | Brand Growth Agency in Tirupur",
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India, helping brands sharpen consulting, design, marketing, websites, and digital presence.",
    url: "/",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
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
      "Orvyn helps brands sharpen their content, websites, marketing systems, and digital presence so they look clearer, earn trust faster, and grow with intent.",
    images: ["/og-image.png"]
  }
};

export default function Home() {
  return (
    <SiteFrame>
      <HeroSection />
      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <ProblemSection />
        </div>
        <div className="order-1 lg:order-2">
          <ServicesSection />
        </div>
        <div className="order-3">
          <CaseStudiesPreview />
        </div>
        <div className="order-4">
          <AboutPreview />
        </div>
        <div className="order-5">
          <FinalCta />
        </div>
      </div>
    </SiteFrame>
  );
}
