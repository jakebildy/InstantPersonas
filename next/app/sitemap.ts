import { MetadataRoute } from "next";
import { BASE_URL, SITE_MAP } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const ensureBaseUrl = (href: string) => {
    return href.startsWith(BASE_URL)
      ? href
      : (href.startsWith("/") && href !== "/") || href.startsWith("#")
      ? `https://instantpersonas.com${href}`
      : null;
  };

  const changeFreqMap: {
    [key: string]:
      | "weekly"
      | "monthly"
      | "always"
      | "hourly"
      | "daily"
      | "yearly"
      | "never"
      | undefined;
  } = {
    tools: "weekly",
    blog: "weekly",
    else: "monthly",
  };

  const siteMapConfig: MetadataRoute.Sitemap = SITE_MAP.filter((p) =>
    ensureBaseUrl(p.href)
  ).map((pageConfig) => {
    const url = ensureBaseUrl(pageConfig.href) as string;
    const validatedBase = url?.split(BASE_URL)[1].split("/")[0];

    const changeFeq = Object.keys(changeFreqMap).includes(validatedBase)
      ? changeFreqMap[validatedBase]
      : changeFreqMap["else"];
    return {
      url: pageConfig.href,
      lastModified: new Date(),
      changeFrequency: changeFeq,
    };
  });

  return siteMapConfig;
}
