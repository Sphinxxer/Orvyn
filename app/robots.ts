import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // ChatGPT search discovery; GPTBot training preferences are separate.
      { userAgent: "OAI-SearchBot", allow: "/" }
    ],
    sitemap: "https://orvyn.cc/sitemap.xml"
  };
}


