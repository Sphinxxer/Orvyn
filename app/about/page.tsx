import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { MethodSection } from "@/components/method-section";
import { SectionShell } from "@/components/section-shell";
import { SiteFrame } from "@/components/site-frame";
import { TeamMemberCard } from "@/components/team-member-card";
import { teamMembers } from "@/data/home";

export const metadata: Metadata = {
  title: "About | Orvyn",
  description:
    "Orvyn is built on the belief that brands should fix what is unclear, inconsistent, or weak before scaling what works."
};

export default function AboutPage() {
  return (
    <SiteFrame>
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
                A brand grows better when the direction is clear.
              </p>
              <p className="mt-6 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Orvyn helps fix what feels unclear before building what needs to
                scale.
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
              Most brands do not need more activity. They need sharper direction.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              We align the message, visuals, content, and website so every next
              move has a clearer role.
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
            A focused team shaping how brands look, communicate, and grow with
            intent.
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3 lg:gap-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </SectionShell>

      <CTASection
        title="Ready to build a sharper brand system?"
        copy="If your brand needs more clarity, stronger execution, and growth with intent, Orvyn is built for that."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </SiteFrame>
  );
}
