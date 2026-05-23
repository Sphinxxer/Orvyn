import type { Metadata } from "next";
import { ContactForm } from "@/components/form/contact-form";
import { SectionShell } from "@/components/section-shell";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Contact | Orvyn",
  description:
    "Start a project with Orvyn and build a sharper digital presence for your brand through content, websites, brand direction, and marketing systems.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact | Orvyn",
    description:
      "Start a project with Orvyn and build a sharper digital presence for your brand through content, websites, brand direction, and marketing systems.",
    url: "/contact",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Orvyn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Orvyn",
    description:
      "Start a project with Orvyn and build a sharper digital presence for your brand through content, websites, brand direction, and marketing systems.",
    images: ["/og-image.png"]
  }
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <JsonLd data={createBreadcrumbJsonLd("Contact", "/contact")} />
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
                Tell us where your brand is today, what feels unclear, and what
                you want to build next.
              </p>
              <p className="mt-5 max-w-md text-sm leading-6 text-gold-soft/85">
                Orvyn only onboards a limited number of new projects each month
                so every brand gets focused direction and execution.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-coal/60 px-5 py-7 lg:px-6 lg:py-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-soft">
                What happens next
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  "We review your inquiry",
                  "We understand where the brand stands",
                  "We suggest the clearest next move"
                ].map((item, index) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <span className="min-w-8 font-semibold text-gold-soft/90">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gold-soft/65" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </SectionShell>
    </SiteFrame>
  );
}
