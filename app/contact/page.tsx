import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/form/contact-form";
import { SiteFrame } from "@/components/site-frame";
import { BookingLink } from "@/components/booking-link";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbJsonLd } from "@/components/seo/breadcrumbs";
import { bookingUrl } from "@/data/booking";
export const metadata: Metadata = {
  title: "Contact Orvyn | Discuss Your Project",
  description: "Start a conversation about your brand, website or marketing. Request an introductory call with Orvyn.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Orvyn | Discuss Your Project", description: "Start a conversation about your brand, website or marketing. Request an introductory call with Orvyn.", url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Contact Orvyn | Discuss Your Project", description: "Start a conversation about your brand, website or marketing. Request an introductory call with Orvyn.", images: ["/opengraph-image"] }
};
export default function ContactPage() {
  return <SiteFrame footerVariant="minimal"><JsonLd data={createBreadcrumbJsonLd("Contact", "/contact")} /><section className="contact-page container"><div className="contact-page__intro"><p className="eyebrow">A good place to begin</p><h1>Let’s talk about<br />your next move.</h1><p>Tell us about your brand and what you want to build.</p>{bookingUrl ? <><BookingLink fromContact /><p>Choose a time, or send a project enquiry here.</p></> : null}<Image src="/mascot/orvyn-welcome.webp" alt="Orvyn waving hello with a laptop" width={250} height={250} sizes="(max-width: 640px) 100px, 200px" className="contact-page__mascot" /><div className="contact-direct"><a href="mailto:hello@orvyn.cc" data-analytics-event="email_contact_clicked">hello@orvyn.cc</a><p>We’ll review your brief and email you to arrange a conversation.</p></div></div><div id="inquiry" className="contact-page__form"><p className="eyebrow">Tell us a little about it</p><h2>{bookingUrl ? "Send a project enquiry." : "Request an intro call."}</h2><p>Share your details and a short project outline.</p><ContactForm submitLabel={bookingUrl ? "Send project enquiry" : "Request an intro call"} /></div></section></SiteFrame>;
}


