import {
  ENTITY_OPTIONS,
  expandSitemapItems,
  removeDisallowItems,
  SCHEMA_CONFIG,
  sitemapItemsManipulation,
} from '@/helpers/sitemapHelper';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata } from '@/models/types/pageStructure';
import { ApiResponse, SitemapItem } from '@/models/types/siteStructure';
import { EntityConfig } from '@/models/types/sitemap';
import { getPageStructure } from '@/services/pageService';
import { formatDate } from '@/helpers/dateHelper';
import { PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH } from '@/utilities/constsUtility';
import logger from '@/utilities/loggerUtility';
import axios from 'axios';
import { getSiteUrl } from './configurationService';
import { getAllEntities } from './forgeDistributionService';
import { ForgeDapiEntityCode, ForgeMetadataCategoryType, ForgeSitemapsMetadataKey } from '@/models/types/forge';

// The culture of the site, retrieved from environment variables
const culture = process.env.CULTURE;

// The environment of the site, retrieved from environment variables
const environment = process.env.ENVIRONMENT;

// The language of the site, retrieved from environment variables
const language = process.env.LANGUAGE;

// The secret key for the Page Builder Frontend API, retrieved from environment variables
const pageBuilderApiSecret = process.env.PAGE_BUILDER_FRONTEND_API_SECRET;

// The base URL of the Page Builder Frontend API, retrieved from environment variables
const pageBuilderBaseUrl = process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL;

/**
 * Type definition for the properties of the robots.txt file.
 * It includes arrays of sitemaps, allows, and disallows.
 */
type SitemapProps = {
  disallows: string[];
};

/**
 * Function to get the structure of a site from the Page Builder Frontend API.
 * It retrieves the page structure for the root page and gets the metadata from the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 * Otherwise, it calls `getRobotsProps` with the metadata and creates the content of the robots.txt file.
 * The content includes the user agent, allow and disallow entries, and sitemap entries.
 * The content is returned as a string.
 *
 * @returns {Promise<SitemapItem[] | null>} - The site structure or `null` if an error occurred.
 */
export async function getSiteStructureData(): Promise<SitemapItem[] | null> {
  try {
    const frontendBaseUrl = await getSiteUrl();

    const siteStructureApiUrl = new URL(
      `api/v1/Sitemap?culture=${culture}&environment=${environment}`,
      pageBuilderBaseUrl
    ).href;

    const pageStructureResponse = await getPageStructure(
      process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_URL ?? PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH
    );

    if (!pageStructureResponse) {
      throw new Error('Page structure could not be retrieved');
    }

    const { disallows } = getSiteMapProps(pageStructureResponse.data.metadata);

    const { data } = await axios.get<ApiResponse>(siteStructureApiUrl, {
      headers: { Authorization: pageBuilderApiSecret },
    });

    logger.log(
      `Retrieved SITE STRUCTURE data from PAGE BUILDER FRONTEND API ${siteStructureApiUrl}. ${JSON.stringify(data)}`,
      LoggerLevel.debug
    );

    const sitemapItems = data.data.sitemap;
    const cleanedValues = removeDisallowItems(sitemapItems, disallows);
    const expandedSitemap = await expandSitemapItems(cleanedValues);
    return sitemapItemsManipulation(expandedSitemap, frontendBaseUrl);
  } catch (error) {
    logger.log(`Error during site structure generation: ${JSON.stringify(error)}`, LoggerLevel.error);
    return null;
  }
}

/**
 * Function to get the structure of a site from the Page Builder Frontend API in XML format.
 * It retrieves the site structure and formats it as XML.
 * If the site structure cannot be retrieved, `null` is returned.
 *
 * @returns {Promise<string | null>} - The site structure in XML format or `null` if an error occurred.
 */
export async function getSiteStructureXml(): Promise<string | null> {
  try {
    const data: SitemapItem[] | null = await getSiteStructureData();

    if (!data?.length) {
      throw new Error(`Error in getSiteStructureXml. No data found`);
    }

    return xmlTemplate(
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data
        .map(
          (item) => `<url>
          <loc>${item.url.value}</loc>
          </url>`
        )
        .join('')}
          </urlset>`
    );
  } catch (error) {
    logger.log(`Error in getSiteStructureXml: ${JSON.stringify(error)}`, LoggerLevel.error);
    return null;
  }
}

/**
 * Function to get the structure of a sitemap entity from the Page Builder Frontend API in XML format.
 * It retrieves the sitemap entity and formats it as XML.
 * If the sitemap entity cannot be retrieved, `null` is returned.
 *
 * @param {string} sitemapName - The name of the sitemap entity to get.
 * @returns {Promise<string | null>} - The sitemap entity structure in XML format or `null` if an error occurred.
 */
export async function getSitemapEntityXml(sitemapName: string): Promise<string | null> {
  const entityConfig = await getSiteMapEntitiesFromMetadata();
  const entity = entityConfig.find((e) => e.name === sitemapName);

  if (!entity) return null;

  const entityCodeOptions = ENTITY_OPTIONS[entity.name] ?? {};
  const data = await getAllEntities(entity.entity_code as ForgeDapiEntityCode, {
    ...entityCodeOptions,
    hasLinkRules: true,
  });

  if (!data?.items) {
    logger.log(
      `Error in getSitemapEntityXml. No data for entity code ${entity?.entity_code} have been found`,
      LoggerLevel.warning
    );
    return null;
  }

  const schemaConfig = SCHEMA_CONFIG[entity.schema];

  if (!schemaConfig) {
    logger.log(`Error in getSitemapEntityXml. Schema ${entity?.schema} not found`, LoggerLevel.warning);
    return null;
  }

  return xmlTemplate(
    schemaConfig.xmlContainer(data.items.map((item) => schemaConfig.xmlSchema(item, language)).join(''))
  );
}

/**
 * Function to get a list of sitemaps from the Page Builder Frontend API.
 * It retrieves the site URL and a list of sitemap entities from metadata.
 * It returns an array of URLs for the sitemaps.
 *
 * @returns {Promise<string[]>} - The list of sitemap URLs.
 */
export async function getSitemapsList(): Promise<string[]> {
  const frontendBaseUrl = await getSiteUrl();
  const entityConfig = await getSiteMapEntitiesFromMetadata();

  return [
    frontendBaseUrl ? new URL('/sitemap.xml', frontendBaseUrl).href : '/sitemap.xml',
    ...entityConfig.map((config) =>
      frontendBaseUrl ? new URL(`/sitemap-${config.name}.xml`, frontendBaseUrl).href : `/sitemap-${config.name}.xml`
    ),
  ];
}

/**
 * Function to get the structure of a sitemap index from the Page Builder Frontend API in XML format.
 * It retrieves the list of sitemap URLs and formats it as XML.
 * If the list of sitemap URLs cannot be retrieved, `null` is returned.
 *
 * @returns {Promise<string | null>} - The sitemap index in XML format or `null` if an error occurred.
 */
export async function getSitemapIndexXml(): Promise<string | null> {
  const lastMod = formatDate(new Date().toString(), 'yyyy-MM-DD');
  const sitemapUrls = await getSitemapsList();

  return xmlTemplate(
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapUrls
      .map((url) => `<sitemap>\n    <loc>${url}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </sitemap>`)
      .join('\n')}
      </sitemapindex>`
  );
}

/**
 * Function to get a list of sitemap entities from metadata.
 * It retrieves the page structure for the root page and gets the metadata from the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 * Otherwise, it filters the metadata by category and key and returns a list of sitemap entities.
 *
 * @returns {Promise<EntityConfig[]>} - The list of sitemap entities or an empty array if no entities were found.
 */
export const getSiteMapEntitiesFromMetadata = async (): Promise<EntityConfig[]> => {
  const pageStructure = await getPageStructure(
    process.env.PAGE_BUILDER_FRONTEND_PAGE_BASE_URL ?? PAGE_BUILDER_FRONTEND_PAGE_BASE_PATH
  );

  type EntityMap = Record<string, Partial<EntityConfig>>;

  const cachedSitemapEntitiesData = pageStructure?.data.metadata
    .filter((item) => item.category === ForgeMetadataCategoryType.sitemaps && item.key.startsWith('sitemap_'))
    .reduce<EntityMap>((acc, item) => {
      // Extract the sitemap entity name and if it's the entity_code or schema metadata
      const [, entityName, entityType] = item.key.match(/sitemap_([^_]+)_(entity_code|schema)/) ?? [];

      if (entityName && entityType) {
        const entity = acc[entityName] || { name: entityName, entity_code: '', schema: '' };
        entity[entityType as 'entity_code' | 'schema'] = item.value;
        acc[entityName] = entity;
      }

      return acc;
    }, {});

  return cachedSitemapEntitiesData
    ? Object.values(cachedSitemapEntitiesData).filter(
        (entity): entity is EntityConfig => !!(entity as EntityConfig).entity_code && !!(entity as EntityConfig).schema
      )
    : [];
};

/**
 * Function to get the properties of the robots.txt file from metadata.
 * It filters the provided metadata by category and key and returns the properties.
 *
 * @param {Metadata[]} metadata - The metadata to use.
 * @returns {SitemapProps} - The properties of the robots.txt file.
 */
const getSiteMapProps = (metadata: Metadata[]): SitemapProps => {
  const disallowItem = metadata.find(
    (item) => item.category === ForgeMetadataCategoryType.sitemaps && item.key === ForgeSitemapsMetadataKey.blacklist
  );
  const disallows = disallowItem ? disallowItem.value.split('|').filter(Boolean) : [];

  return { disallows };
};

/**
 * Function to create an XML template.
 * It wraps the provided content in an XML declaration and returns the result.
 *
 * @param {string} content - The content to wrap in an XML declaration.
 * @returns {string} - The XML template.
 */
const xmlTemplate = (content: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  ${content}`;
};
