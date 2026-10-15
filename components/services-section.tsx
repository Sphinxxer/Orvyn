import Image from "next/image";
const capabilities = [
  { title: "Branding", image: "/capabilities/branding-editorial.webp", alt: "Identity sketches, typography and brand materials on a creative director's desk", description: "Find the gap, sharpen the direction, and build a brand people can understand and trust.", scope: "Strategy / Identity / Visual systems" },
  { title: "Websites", image: "/capabilities/websites-editorial.webp", alt: "A designer developing a responsive website across desktop and mobile layouts", description: "Create a digital home that explains your offer, builds trust, and makes the next step easy.", scope: "Web design / Development / Ecommerce" },
  { title: "Marketing", image: "/capabilities/marketing-editorial.webp", alt: "Campaign imagery and content being planned across a visual storyboard", description: "Turn attention into a consistent presence through content, campaigns and considered creative.", scope: "Social media / Content / Campaigns" }
];
export function ServicesSection() {
  return <section id="services" className="section capabilities container" aria-labelledby="capabilities-title"><div className="capabilities-intro" data-reveal><p className="eyebrow">Three connected capabilities</p><h2 id="capabilities-title">A clearer brand.<br className="mobile-only" /> A stronger next move.</h2><p>A brand needs a clear direction, a digital home that earns trust, and marketing that carries the same story. We bring those pieces together.</p></div><div className="capabilities-grid">{capabilities.map((item) => <article className="capability" key={item.title} data-reveal><div className="capability__image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 120px, (max-width: 1000px) 30vw, 395px" /></div><div className="capability__copy"><h3>{item.title}</h3><p>{item.description}</p><p className="capability__scope">{item.scope}</p><span className="accent-rule" aria-hidden="true" /></div></article>)}</div></section>;
}

