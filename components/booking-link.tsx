import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { bookingLabel, bookingUrl } from "@/data/booking";
import { serviceHref, type SelectedService } from "@/data/service-filter";
export function BookingLink({ className = "", fromContact = false, service }: { className?: string; fromContact?: boolean; service?: SelectedService }) {
  const content = <>{bookingLabel}<ArrowRightIcon size={17} weight="light" aria-hidden="true" /></>;
  return bookingUrl ? (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={"button button--primary " + className} data-analytics-event="booking_link_clicked">{content}<span className="sr-only"> (opens in a new tab)</span></a>
  ) : (
    <Link href={fromContact ? "#inquiry" : serviceHref("/contact", service, "#inquiry")} prefetch={false} className={"button button--primary " + className} data-analytics-event="intro_call_request_clicked">{content}</Link>
  );
}

