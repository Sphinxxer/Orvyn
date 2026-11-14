import type { SelectedService } from "./service-filter";

export const whatsappNumber = "918824604112";
export const whatsappLabel = "Discuss your project on WhatsApp";
export type WhatsAppContext = {
  service?: SelectedService;
  project?: { id: string; client: string };
};

export function whatsappMessage({ service, project }: WhatsAppContext = {}) {
  if (project) return `Hi Orvyn, I saw your work for ${project.client}. I’d like to discuss a similar project for my business.`;
  if (service) return `Hi Orvyn, I’m interested in ${service} for my business. I’d like to discuss a project.`;
  return "Hi Orvyn, I’d like to discuss a project for my business.";
}

export function whatsappHref(context: WhatsAppContext = {}) {
  const search = new URLSearchParams({ text: whatsappMessage(context) });
  return `https://wa.me/${whatsappNumber}?${search.toString()}`;
}
