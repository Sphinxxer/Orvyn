import type { Metadata } from "next";
import { ContactForm } from "@/components/form/contact-form";
import { SectionShell } from "@/components/section-shell";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Contact | Orvyn",
  description:
    "Start a project with Orvyn and build a sharper digital presence for your brand."
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <SectionShell className="pt-28 sm:pt-36 lg:pt-44">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <aside className="space-y-6">
            <div className="border-t border-gold pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
                Contact / Start a Project
              </p>
              <h1 className="mt-6 text-balance text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Tell us what you are trying to build.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-muted">
                Share where your brand is now, what feels unclear, and what you
                want to improve next.
              </p>
            </div>

            <div className="border-y border-white/10 py-7 lg:py-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                What happens next
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  "We review your inquiry",
                  "We understand your current brand situation",
                  "We suggest the right next step"
                ].map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="font-semibold text-gold-soft/90">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <ContactForm />
        </div>
      </SectionShell>
    </SiteFrame>
  );
}
