"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { serviceHref } from "@/data/service-filter";
import { useServiceSelection } from "./ui/use-service-selection";

export function BackToWorkLink() {
  const { service } = useServiceSelection();
  return <Link href={serviceHref("/case-studies", service)} prefetch={false} className="text-link back-link"><ArrowLeftIcon size={18} aria-hidden="true" />Back to work</Link>;
}
