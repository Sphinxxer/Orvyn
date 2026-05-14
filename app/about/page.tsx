import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { MethodSection } from "@/components/method-section";
import { PrincipleCard } from "@/components/principle-card";
import { SectionShell } from "@/components/section-shell";
import { SiteFrame } from "@/components/site-frame";
import { TeamMemberCard } from "@/components/team-member-card";
import { aboutSections, principles, teamMembers } from "@/data/home";

export const metadata: Metadata = {
  title: "About | Orvyn",
  description:
    "Orvyn is built on the belief that brands should fix what is unclear, inconsistent, or weak before scaling what works."
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="border-b border-white/10 px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
            About / Philosophy
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <h1 className="text-balance text-5xl font-black leading-[0.94] text-white sm:text-7xl lg:text-8xl lg:leading-[0.92]">
              Fix first.{" "}
              <span className="block text-gold-soft">Then scale.</span>
            </h1>
            <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Growth does not come from doing more random marketing.
              </p>
              <p className="mt-6 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Orvyn was built on a simple belief: brands grow by fixing what is
                unclear, inconsistent, or weak, then scaling what actually works.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionShell className="pt-0">
        <div className="border-y border-white/10">
          {aboutSections.map((section) => (
            <article
              key={section.title}
              className="grid gap-7 border-t border-white/10 py-10 first:border-t-0 lg:grid-cols-[0.34fr_1fr] lg:gap-14 lg:py-12"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  {section.title}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-5 text-base leading-7 text-muted">{section.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <MethodSection />

      <SectionShell className="border-y border-white/10 bg-white/[0.015]">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Our Principles
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
              The thinking behind the work.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8 lg:pt-12">
            These are the rules that keep the work sharp: clarity first,
            perception matters, systems over scattered execution, and improvement
            before scale.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {principles.map((principle) => (
            <PrincipleCard key={principle.title} {...principle} />
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-soft">
            Team
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.04] text-white sm:text-5xl">
            The people behind the work.
          </h2>
          <p className="mt-6 text-base leading-7 text-muted">
            Orvyn is built with a focused team of creative and growth partners who
            bring strategy, design, content, and execution together.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </SectionShell>

      <CTASection
        title="Ready to build a sharper brand system?"
        copy="If your brand is ready to look better, communicate clearer, and grow with more intent, Orvyn is built for that."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
