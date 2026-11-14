import { JsonLd } from "@/components/seo/JsonLd";
import { homePageSchema } from "@/data/site";
import type { Metadata } from "next";
import { ApprovedHome } from "@/components/approved-home";
import { homeDescription, homeTitle } from "@/data/site";
import "./approved-home.css";
export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "Orvyn",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Orvyn — Branding, websites and marketing"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"]
  }
};

export default function Home(){return <><JsonLd data={homePageSchema}/><ApprovedHome/></>;}
