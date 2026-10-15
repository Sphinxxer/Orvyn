import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
export default function NotFound() {
  return <SiteFrame><section className="container page-intro"><p className="eyebrow">404 · a little off course</p><h1>Let’s find<br />your way back.</h1><p>This page isn’t here. Our work is a good place to start.</p><Link className="button button--primary" href="/case-studies">Explore our work</Link></section></SiteFrame>;
}

