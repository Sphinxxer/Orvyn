import Image from "next/image";
const steps = [{ title: "Understand", copy: "Understand your brief and current presence." }, { title: "Sharpen", copy: "Establish a clear direction for the work." }, { title: "Build", copy: "Develop the agreed identity, website or content." }, { title: "Refine", copy: "Review the details and prepare for handover." }];
export function AboutPreview() {
  return <section id="studio" className="approach-surface" aria-labelledby="approach-title"><div className="section approach container"><div className="approach-intro" data-reveal><div><p className="eyebrow">Our approach</p><h2 id="approach-title">Fix first. Then scale.</h2><p>We understand what needs to change, then bring the right pieces together.</p></div><Image src="/mascot/orvyn-presenting.webp" alt="Orvyn introducing our studio's approach" width={210} height={210} sizes="(max-width: 640px) 95px, 180px" className="approach-mascot" /></div><ol className="approach-steps">{steps.map((step, index) => <li key={step.title} data-reveal><span className="step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></div></section>;
}

