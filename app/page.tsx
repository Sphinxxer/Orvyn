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
    "Orvyn helps modern brands build sharper content, stronger websites, and growth systems that turn attention into trust."
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
