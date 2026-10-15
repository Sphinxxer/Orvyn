import Image from "next/image";
import Link from "next/link";
export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return <Link href={href} className={"brand-logo " + className} aria-label="Orvyn home"><Image src="/orvyn-icon.svg" alt="" width={36} height={36} className="brand-logo__mark" /><span>ORVYN</span></Link>;
}

