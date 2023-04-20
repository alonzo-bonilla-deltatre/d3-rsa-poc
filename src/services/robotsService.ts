import { Metadata } from "@/models/types/pageStructure";
import { getPageStructure } from "./pageService";

type RobotsProps = {
  sitemaps: string[];
  allows: string[];
  disallows: string[];
};

export const getRobotsTxt = async () => {
  const pageStructure = await getPageStructure("~/", "");
  if (!pageStructure) {
    return null;
  }
  const metadata: Metadata[] = pageStructure.data.metadata;

  const { sitemaps, allows, disallows } = getRobotsProps(metadata);

  const sitemapEntries:string = sitemaps
    .map((sitemap) => `Sitemap: ${sitemap}`)
    .join("\n");
  const allowEntries:string[] = allows.map((allow) => `Allow: ${allow}`);
  const disallowEntries:string[] = disallows.map((disallow) => `Disallow: ${disallow}`);

  const userAgents: string[] = ["User-agent: *"];
  const entries: string[] = [
    ...allowEntries,
    ...disallowEntries,
    sitemapEntries,
  ].filter(Boolean);

  return userAgents.concat(entries).join("\n");
};

const getRobotsProps = (metadata: Metadata[]): RobotsProps => {
  const robotsProps: RobotsProps = {
    sitemaps: [] as string[],
    allows: [] as string[],
    disallows: [] as string[],
  };

  metadata.forEach((item: Metadata) => {
    if (item.category === "seo") {
      if (item.key === "disallows") {
        robotsProps.disallows = [...item.value.split("|").filter(Boolean)];
      } else if (item.key === "allows") {
        robotsProps.allows = [...item.value.split("|").filter(Boolean)];
      } else if (item.key === "sitemaps") {
        robotsProps.sitemaps = [...item.value.split("|").filter(Boolean)];
      }
    }
  });

  return robotsProps;
};
