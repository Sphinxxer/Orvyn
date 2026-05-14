import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/form/contact-field";
import { SectionShell } from "@/components/section-shell";
import { SiteFrame } from "@/components/site-frame";
import { budgetRanges, contactNeeds } from "@/data/home";

export const metadata: Metadata = {
  title: "Contact | Orvyn",
  description:
    "Start a project with Orvyn and build a sharper digital presence for your brand."
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <SectionShell className="pt-28 sm:pt-36 lg:pt-44">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <aside className="space-y-5">
            <div className="border-t border-gold pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-soft sm:text-sm">
                Contact / Start a Project
              </p>
              <h1 className="mt-6 text-balance text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Tell us what you are trying to build.
              </h1>
              <p className="mt-5 text-base leading-7 text-muted">
                Share where your brand is now, what feels unclear, and what you
                want to improve next.
              </p>
            </div>

            <div className="border-y border-white/10 py-7">
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
                    <span className="font-semibold text-gold-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <form
            className="border border-white/10 bg-coal p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10"
            aria-label="Project inquiry form"
          >
            <FormGroup title="Your details">
              <TextField label="Name" name="name" type="text" autoComplete="name" required />
              <TextField label="Email" name="email" type="email" autoComplete="email" required />
              <TextField
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                autoComplete="tel"
              />
            </FormGroup>

            <FormGroup title="Brand context" className="mt-9">
              <TextField
                label="Business / Brand Name"
                name="brand"
                type="text"
                autoComplete="organization"
              />
              <TextField
                label="Website or Instagram link"
                name="link"
                type="url"
                placeholder="https://"
              />
            </FormGroup>

            <FormGroup title="Project needs" className="mt-9">
              <SelectField
                label="What do you need help with?"
                name="need"
                options={contactNeeds}
                placeholder="Select a service"
                required
              />
              <SelectField
                label="Budget range"
                name="budget"
                options={budgetRanges}
                placeholder="Select a range"
              />
              <TextAreaField label="Message" name="message" className="md:col-span-2" required />
            </FormGroup>

            <button
              type="button"
              className="mt-10 inline-flex min-h-12 w-full items-center justify-center border border-gold bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_18px_48px_rgba(200,169,90,0.13)] transition duration-200 hover:-translate-y-0.5 hover:border-gold-soft hover:bg-gold-soft focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink active:translate-y-0 sm:w-auto"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </SectionShell>
    </SiteFrame>
  );
}

function FormGroup({
  title,
  className = "",
  children
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={`border-t border-white/10 pt-6 first:border-t-0 first:pt-0 ${className}`}>
      <legend className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
        {title}
      </legend>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">{children}</div>
    </fieldset>
  );
}
