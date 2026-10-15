import { getImageProps } from "next/image";
import Link from "next/link";
import { BookingLink } from "./booking-link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
export function HeroSection() {
  const desktop = getImageProps({ src: "/mascot/orvyn-hero-wide.webp", alt: "", width: 1920, height: 800, sizes: "100vw" }).props;
  const mobile = getImageProps({ src: "/mascot/orvyn-working.webp", alt: "Orvyn, our studio mascot, working on a laptop", width: 210, height: 210, sizes: "(min-width: 641px) 280px, 210px", loading: "eager", fetchPriority: "high", className: "hero-scene__image" }).props;
  return <section className="home-hero" aria-labelledby="hero-title"><picture className="hero-scene"><source media="(min-width: 1101px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />{/* Next's optimized image props let the browser download only the matching art direction. */}<img {...mobile} alt={mobile.alt} /></picture><div className="container hero-content"><p className="eyebrow">Independent brand growth studio</p><h1 id="hero-title"><span>Good brands</span><span>deserve a better</span><span>presence.</span></h1><p className="hero-description">Brand identity, ecommerce and marketing<br className="desktop-only" /> for ambitious Indian brands.</p><div className="hero-actions"><BookingLink /><Link href="/case-studies" prefetch={false} className="text-link">Explore our work<ArrowRightIcon size={17} weight="light" aria-hidden="true" /></Link></div></div></section>;
}

