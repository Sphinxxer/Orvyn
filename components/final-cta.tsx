import Image from "next/image";
import { WhatsAppLink } from "./whatsapp-link";
import type { SelectedService } from "@/data/service-filter";
export function FinalCta({ service }: { service?: SelectedService } = {}) {
  return <section className="contact-invitation" aria-labelledby="contact-invitation-title"><div className="container contact-invitation__inner"><div><h2 id="contact-invitation-title">Let’s talk about your project.</h2><p className="invitation-copy">Tell us what you’re building and where you need help.</p></div><WhatsAppLink placement="final_invitation" service={service} /><Image src="/mascot/orvyn-welcome.webp" alt="Orvyn welcoming you to a conversation" width={180} height={180} sizes="(max-width: 640px) 105px, 180px" className="welcome-mascot" /></div></section>;
}

