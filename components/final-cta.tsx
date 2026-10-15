import Image from "next/image";
import { BookingLink } from "./booking-link";
import type { SelectedService } from "@/data/service-filter";
export function FinalCta({ service }: { service?: SelectedService } = {}) {
  return <section className="contact-invitation" aria-labelledby="contact-invitation-title"><div className="container contact-invitation__inner"><div><p className="eyebrow">Your next chapter</p><h2 id="contact-invitation-title">Tell us what comes next.</h2><p className="invitation-copy">Share your project. We’ll arrange a conversation.</p></div><BookingLink service={service} /><Image src="/mascot/orvyn-welcome.webp" alt="Orvyn welcoming you to a conversation" width={180} height={180} sizes="(max-width: 640px) 105px, 180px" className="welcome-mascot" /></div></section>;
}

