import type { Metadata } from "next";
import { AboutPreview } from "@/components/about-preview";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { FinalCta } from "@/components/final-cta";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Orvyn | Modern Brand Growth Agency",
  description:
    "Orvyn helps brands sharpen their content, website, and marketing system so they look clearer, earn trust faster, and grow with intent."
};

export default function Home() {
  return (
    <SiteFrame>
      <HeroSection />
      <ProblemSection />
      <CaseStudiesPreview />
      <ServicesSection />
      <AboutPreview />
      <FinalCta />
    </SiteFrame>
  );
}
