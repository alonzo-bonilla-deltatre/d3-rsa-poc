import { SitemapItem } from '@/models/types/siteStructure';
import { EntityCodeOptions, SchemaConfig } from '@/models/types/sitemap';
import { formatDate } from '@/helpers/dateHelper';

const removeDisallowItems = (items: SitemapItem[], disallowedValues: string[]): SitemapItem[] => {
  return items.filter((item) => !disallowedValues.some((disallowedValue) => item.url.value.includes(disallowedValue)));
};

const sitemapItemsManipulation = (items: SitemapItem[], frontendBaseUrl: string): SitemapItem[] => {
  return items.map((item) => {
    const updatedUrlValue = item.url.value.replace('~', frontendBaseUrl);
    return {
      ...item,
      url: {
        ...item.url,
        value: updatedUrlValue,
      },
    };
  });
};

async function expandSitemapItem(item: SitemapItem): Promise<SitemapItem[]> {
  const { value: urlValue, parameters } = item.url;

  // Extracts parameter names enclosed in curly braces from a sitemap path and creates an array of these names. If no matches are found, an empty array is returned.
  const parameterNames = urlValue.match(/{([\w-]+)}/g)?.map((match) => match.slice(1, -1)) ?? [];

  if (parameterNames.length === 0) {
    return [item];
  }

  const parameterValuesArray = [];

  for (const parameterName of parameterNames) {
    const { dataPath, allowedValues } = parameters[parameterName].validation;

    if (dataPath || !allowedValues) {
      return []; // If a parameter has a valued dataPath or no allowed values, we exclude the item itself since we're not able to retrieve dataPaths currently
    }

    parameterValuesArray.push(allowedValues.split(','));
  }

  const generateURLs = (currentUrl: string, remainingParameters: string[], remainingValues: string[][]): string[] => {
    if (remainingParameters.length === 0) {
      return [currentUrl];
    }

    const [currentParameter, ...restParameters] = remainingParameters;
    const [currentValues, ...restValues] = remainingValues;

    const urls: string[] = [];

    for (const value of currentValues) {
      const newUrl = currentUrl.replace(`{${currentParameter}}`, value);
      urls.push(...generateURLs(newUrl, restParameters, restValues));
    }

    return urls;
  };

  const allPossibleUrls = generateURLs(urlValue, parameterNames, parameterValuesArray);

  return allPossibleUrls.map((url) => ({
    ...item,
    url: {
      ...item.url,
      value: url,
    },
  }));
}

async function expandSitemapItems(sitemapItems: SitemapItem[]): Promise<SitemapItem[]> {
  const expandedItemsPromises = sitemapItems.map(expandSitemapItem);
  const expandedItemsArrays = await Promise.all(expandedItemsPromises);
  return expandedItemsArrays.flat();
}

const cleanStringForXML = (input: string) => {
  if (!input) return '';
  return input.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      /* istanbul ignore next */
      default:
        return char;
    }
  });
};

/* istanbul ignore next */
const SCHEMA_CONFIG: SchemaConfig = {
  article: {
    xmlContainer: (content) => `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${content}
    </urlset>
    `,
    xmlSchema: (entity, language) => `
    <url>
      <loc>${entity.url}</loc>
      <news:news>
        <news:publication>
          <news:name>${cleanStringForXML(entity.title)}</news:name>
          <news:language>${language}</news:language>
        </news:publication>
        <news:publication_date>${formatDate(entity.contentDate, 'yyyy-MM-DD')}</news:publication_date>
        <news:title>${cleanStringForXML(entity.title)}</news:title>
      </news:news>
      </url>
    `,
  },
  video: {
    xmlContainer: (content) => `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
          ${content}
      </urlset>
      `,
    xmlSchema: (entity) => `
      <url>
      <loc>${entity.url}</loc>
      <video:video>
        <video:thumbnail_loc>${entity.thumbnail?.thumbnailUrl}</video:thumbnail_loc>
        <video:title>${cleanStringForXML(entity.title)}</video:title>
        <video:description>
        ${cleanStringForXML(entity.fields?.description || '')}
        </video:description>
        <video:publication_date>${formatDate(entity.contentDate, 'yyyy-MM-DD')}</video:publication_date>
      </video:video>
    </url>
    `,
  },
};

const ENTITY_OPTIONS: EntityCodeOptions = {};

export {
  ENTITY_OPTIONS,
  SCHEMA_CONFIG,
  cleanStringForXML,
  expandSitemapItem,
  expandSitemapItems,
  removeDisallowItems,
  sitemapItemsManipulation,
};
