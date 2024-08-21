import { Metadata } from '@/models/types/pageStructure';
import { getSitemapsList } from '@/services/sitemapService';
import { getPageStructure } from './pageService';
import { ForgeMetadataCategoryType, ForgeRobotsMetadataKey } from '@/models/types/forge';

/**
 * Function to render an empty page.
 * It returns a `div` element with no children.
 *
 * @returns {ReturnComponentRender} - The rendered empty page.
 */
type RobotsProps = {
  sitemaps: string[];
  allows: string[];
  disallows: string[];
};

/**
 * Function to get the content of the robots.txt file.
 * It retrieves the page structure for the root page and gets the metadata from the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 * Otherwise, it calls `getRobotsProps` with the metadata and creates the content of the robots.txt file.
 * The content includes the user agent, allow and disallow entries, and sitemap entries.
 * The content is returned as a string.
 *
 * @returns {Promise<string | null>} - The content of the robots.txt file or `null` if the page structure cannot be retrieved.
 */
export const getRobotsTxt = async (): Promise<string | null> => {
  const pageStructure = await getPageStructure(process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH ?? '~/');
  if (!pageStructure) {
    return null;
  }
  const metadata: Metadata[] = pageStructure.data.metadata;

  let { allows, disallows } = getRobotsProps(metadata);
  let sitemaps: string[] = [];

  if (allows.length === 0 && disallows.length === 0) {
    disallows = ['/'];
  } else {
    sitemaps = await getSitemapsList();
  }

  const sitemapEntries: string = sitemaps.map((sitemap) => `Sitemap: ${sitemap}`).join('\n');
  const allowEntries: string[] = allows.map((allow) => `Allow: ${allow}`);
  const disallowEntries: string[] = disallows.map((disallow) => `Disallow: ${disallow}`);

  const userAgents: string[] = ['User-agent: *'];
  const entries: string[] = [...allowEntries, ...disallowEntries, sitemapEntries].filter(Boolean);

  return userAgents.concat(entries).join('\n');
};

/**
 * Function to get the properties of the robots.txt file from metadata.
 * It creates a `RobotsProps` object with empty arrays for sitemaps, allows, and disallows.
 * It iterates over the provided metadata and sets the properties of the `RobotsProps` object based on the metadata keys.
 * If a metadata item has the `robots` category and a key that matches a property of the `RobotsProps` object,
 * the property is set to the value of the metadata item split by '|'.
 * The `RobotsProps` object is returned.
 *
 * @param {Metadata[]} metadata - The metadata to use.
 * @returns {RobotsProps} - The properties of the robots.txt file.
 */
const getRobotsProps = (metadata: Metadata[]): RobotsProps => {
  const robotsProps: RobotsProps = {
    sitemaps: [] as string[],
    allows: [] as string[],
    disallows: [] as string[],
  };

  metadata.forEach((item: Metadata) => {
    if (item.category === ForgeMetadataCategoryType.robots) {
      if (item.key === ForgeRobotsMetadataKey.disallows) {
        robotsProps.disallows = item.value ? [...item.value.split('|').filter(Boolean)] : [];
      } else if (item.key === ForgeRobotsMetadataKey.allows) {
        robotsProps.allows = item.value ? [...item.value.split('|').filter(Boolean)] : [];
      }
    }
  });

  return robotsProps;
};
