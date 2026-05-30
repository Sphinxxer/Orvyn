import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { MethodSection } from "@/components/method-section";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";
import { TeamMemberCard } from "@/components/team-member-card";
import { teamMembers } from "@/data/home";
import { createFaqSchema } from "@/data/schema";

const aboutPrinciples = [
  {
    title: "Clarity before activity",
    description: "More output does not help if the direction is unclear."
  },
  {
    title: "Perception matters",
    description: "How a brand looks and speaks affects how much people trust it."
  },
  {
    title: "Systems over random execution",
    description: "Content, websites, ads, and branding should support each other."
  },
  {
    title: "Improve before scaling",
    description: "Scaling works better when the foundation is strong enough to carry growth."
  }
];

const aboutFaqs = [
  {
    question: "What does Orvyn do?",
    answer:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India. Orvyn helps brands fix, build, and market their digital presence through consulting, design, marketing, and websites."
  },
  {
    question: "Is Orvyn a garment manufacturing company?",
    answer:
      "No. Orvyn is a brand growth agency and modern internet company based in Tirupur, India. Orvyn helps brands with consulting, design, marketing, websites, and digital presence."
  },
  {
    question: "Where is Orvyn based?",
    answer: "Orvyn is based in Tirupur, India, and works with brands across India."
  },
  {
    question: "How does Orvyn work with brands?",
    answer:
      "Orvyn first understands where the brand stands, what feels unclear, and what needs to improve. From there, the right mix of consulting, design, marketing, and website work is shaped around the brand's needs."
  },
  {
    question: "How many projects does Orvyn onboard?",
    answer:
      "Orvyn works with a limited number of new projects each month so every brand gets focused direction and execution."
  }
];

export const metadata: Metadata = {
  title: "About | Orvyn",
  description:
    "Orvyn is a brand growth agency and modern internet company based in Tirupur, India. It helps brands fix, build, and market their digital presence through consulting, design, marketing, and websites.",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "About | Orvyn",
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India. It helps brands fix, build, and market their digital presence through consulting, design, marketing, and websites.",
    url: "/about",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Orvyn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Orvyn",
    description:
      "Orvyn is a brand growth agency and modern internet company based in Tirupur, India. It helps brands fix, build, and market their digital presence through consulting, design, marketing, and websites.",
    images: ["/og-image.png"]
  }
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <JsonLd data={[createBreadcrumbJsonLd("About", "/about"), createFaqSchema(aboutFaqs)]} />
      <section className="border-b border-white/10 px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            About / Philosophy
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h1 className="text-balance text-5xl font-black leading-[0.94] text-white sm:text-7xl lg:text-8xl lg:leading-[0.92]">
              Fix first. <span className="block text-gold-soft">Then scale.</span>
            </h1>
            <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Growth gets stronger when the brand gets clearer.
              </p>
              <p className="mt-6 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Orvyn is a brand growth agency and modern internet company based
                in Tirupur, India, built on a simple belief: before a brand
                scales, it needs to be clear enough to be trusted, remembered,
                and chosen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionShell className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-7 rounded-[2rem] bg-white/[0.022] px-6 py-8 sm:px-8 lg:grid-cols-[0.34fr_1fr] lg:gap-14 lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
              What we believe
            </p>
          </div>
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Clarity comes before growth.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Most brands do not struggle because they are not doing enough. They
              struggle because their message, visuals, content, and website are
              not working in one clear direction.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Orvyn exists to sharpen that foundation{" \u2014 "}so every post, page,
              campaign, and creative decision has a clearer role.
            </p>
          </div>
        </div>
      </SectionShell>

      <MethodSection />

      <SectionShell className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Team
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              The people behind the work.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">
            A focused team bringing strategy, production, design, and execution
            together.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3 lg:gap-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="bg-white/[0.012] py-14 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Principles
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
              Principles we work by.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPrinciples.map((principle) => (
              <article
                key={principle.title}
                className="rounded-2xl bg-coal/65 p-5 transition duration-200 hover:bg-graphite/70"
              >
                <div className="mb-5 h-px w-9 bg-gold" aria-hidden="true" />
                <h3 className="text-xl font-semibold leading-tight text-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-0">
        <div className="grid gap-7 rounded-[2rem] border border-white/10 bg-coal/55 px-6 py-7 sm:px-8 lg:grid-cols-[0.34fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-soft">
              A quick clarification
            </p>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-7 text-white/78">
              Orvyn is a brand growth agency and modern internet company based
              in Tirupur, India. It is not a garment manufacturing company,
              apparel production unit, stitching partner, or clothing production
              business.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
              The work is focused on consulting, design, marketing, websites,
              and digital presence for brands that want to grow with more
              clarity.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Common questions
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">
              How Orvyn thinks and works.
            </h2>
          </div>
          <div className="divide-y divide-white/10 rounded-[2rem] bg-coal/55 px-5 sm:px-7">
            {aboutFaqs.map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="text-base font-semibold leading-6 text-white">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <CTASection
        title="Ready to build a sharper brand system?"
        copy="If your brand is ready to look clearer, communicate better, and grow with more intent, Orvyn is built for that."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
