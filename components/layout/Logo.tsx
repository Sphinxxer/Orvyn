import Link from "next/link";
export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return <Link href={href} className={"brand-logo " + className} aria-label="Orvyn home"><span className="brand-logo__wordmark" aria-hidden="true" /></Link>;
}

