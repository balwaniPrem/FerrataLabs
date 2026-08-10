import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { agents } from "@/content/agents";
import { industries } from "@/content/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/how-it-works", "/about", "/contact"];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r}`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...agents.map((a) => ({
      url: `${site.url}/agents/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((i) => ({
      url: `${site.url}/industries/${i.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
