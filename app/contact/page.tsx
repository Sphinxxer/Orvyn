import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/form/contact-form";
import { SiteFrame } from "@/components/site-frame";
import { ContactWhatsAppLink } from "@/components/form/contact-form";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd } from "@/data/site";
export const metadata: Metadata = {
  title: "Contact Orvyn | Discuss Your Project",
  description: "Discuss your brand, website or marketing on WhatsApp, or send Orvyn a project enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Orvyn | Discuss Your Project", description: "Discuss your brand, website or marketing on WhatsApp, or send Orvyn a project enquiry.", url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Contact Orvyn | Discuss Your Project", description: "Discuss your brand, website or marketing on WhatsApp, or send Orvyn a project enquiry.", images: ["/opengraph-image"] }
};
export default function ContactPage() {
  return <SiteFrame footerVariant="minimal"><JsonLd data={createBreadcrumbJsonLd("Contact", "/contact")} /><section className="contact-page container"><div className="contact-page__intro"><h1>Let’s talk about<br />your project.</h1><p>Tell us what you’re building and where you need help.</p><ContactWhatsAppLink /><Image src="/mascot/orvyn-welcome.webp" alt="Orvyn waving hello with a laptop" width={250} height={250} sizes="(max-width: 640px) 100px, 200px" className="contact-page__mascot" /><div className="contact-direct"><a href="mailto:hello@orvyn.cc" data-analytics-event="email_contact_clicked">hello@orvyn.cc</a><p>Prefer email? Send your project outline here.</p></div></div><div id="inquiry" className="contact-page__form"><h2>Prefer to send an enquiry here?</h2><p>Share your contact details. Add a project outline if you’d like.</p><ContactForm /></div></section></SiteFrame>;
}


