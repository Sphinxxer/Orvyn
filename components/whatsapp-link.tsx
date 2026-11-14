import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { whatsappHref, whatsappLabel, type WhatsAppContext } from "@/data/whatsapp";

type Props = WhatsAppContext & {
  placement: string;
  label?: string;
  className?: string;
};

export function WhatsAppLink({ placement, service, project, label = whatsappLabel, className = "button button--primary" }: Props) {
  return <a href={whatsappHref({ service, project })} target="_blank" rel="noopener noreferrer"
    className={className} data-analytics-event="whatsapp_enquiry_clicked"
    data-analytics-placement={placement} data-analytics-service={service?.toLowerCase()} data-analytics-project={project?.id}>
    {label}<ArrowUpRightIcon size={17} weight="light" aria-hidden="true" />
    <span className="sr-only"> (opens WhatsApp in a new tab)</span>
  </a>;
}
