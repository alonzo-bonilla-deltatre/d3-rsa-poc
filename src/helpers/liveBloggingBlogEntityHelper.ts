import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/constsUtility';
import { getDataVariable } from './dataVariableHelper';
import { LinkRuleRequest, LinkRuleResponse, LinkRuleVariation } from '@/models/types/linkRule';
import { StoryPart } from '@/models/types/storyPart';
import { getLinkRules } from '@/services/linkRuleService';
import { LiveBloggingBlogEntity, LiveBloggingDistributionApiOption } from '@/models/types/liveblogging';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;

/**
 * Given the entities array, check if there is the fallback image and fill, if needed
 * @param items the items to check
 * @param variables the variables from were to extract the placeholder image asset from
 * @returns the items enreached with the fallback image where needed
 */
export const enrichEntitiesWithThumbnailPlaceholder = (
  items: LiveBloggingBlogEntity[] | null,
  variables?: Variable[] | undefined
) => {
  const imagePlaceholderUrl = getDataVariable(variables, IMAGE_PLACEHOLDER);
  const fallbackImageAsset: ImageAsset = {
    title: 'no_image_available',
    templateUrl: imagePlaceholderUrl,
    format: '',
    slug: 'no_image_available',
  };

  items?.forEach((item) => {
    if (!item?.coverImage || !item?.coverImage?.templateUrl) {
      item.coverImage = fallbackImageAsset;
    }
  });
  return items ?? [];
};

/**
 * Enriches the given entities with link rules.
 *
 * This function builds a request for link rules based on the given entities and whether relations and parts should be included.
 * It then fetches the link rules based on this request.
 * If any link rules are returned, it updates the URLs of the entities based on these link rules.
 *
 * @async
 * @param {LiveBloggingBlogEntity[]} entities - The entities to be enriched.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 * @returns {Promise<LiveBloggingBlogEntity[]>} The enriched entities.
 */
export const enrichDistributionEntitiesWithLinkRules = /* istanbul ignore next */ async (
  entities: LiveBloggingBlogEntity[],
  linkRuleVariations?: LinkRuleVariation[]
): Promise<LiveBloggingBlogEntity[]> => {
  if (!entities?.length) {
    return entities;
  }

  const linkRulesRequest = buildLinkRulesRequest(entities, linkRuleVariations);
  const linkRules = await getLinkRules(linkRulesRequest);

  if (!linkRules?.data?.length) {
    return entities;
  }

  return updateEntityURLs(entities, linkRules);
};

/**
 * Enriches the given entities with link rules, thumbnail placeholders, and other options.
 *
 * @async
 * @param {LiveBloggingBlogEntity[]} entities - The entities to be enriched.
 * @param {LiveBloggingDistributionApiOption} [options=null] - The options for enrichment.
 * @returns {Promise<LiveBloggingBlogEntity[]>} The enriched entities.
 */
export const enrichDistributionEntities = /* istanbul ignore next */ async (
  entities: LiveBloggingBlogEntity[],
  options: LiveBloggingDistributionApiOption = null
): Promise<LiveBloggingBlogEntity[]> => {
  if (!options) {
    return entities;
  }

  if (options.hasThumbnailPlaceholder) {
    entities = enrichEntitiesWithThumbnailPlaceholder(entities, options.variables);
  }

  if (options.hasLinkRules) {
    entities = await enrichDistributionEntitiesWithLinkRules(entities, options.linkRuleVariations);
  }

  return entities;
};

/**
 * Returns the query string for the API based on the given skip, limit, and tags.
 *
 * @param {number} skip - The number of items to skip.
 * @param {number} limit - The maximum number of items to return.
 * @param {string} tags - The tags to include in the query.
 * @returns {string} The query string for the API.
 */
export const getQueryString = /* istanbul ignore next */ (
  skip: number,
  limit: number,
  tags?: string,
  eventId?: string
) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (skip) {
    queryString.push(`$skip=${skip}`);
  }
  if (limit) {
    queryString.push(`$limit=${limit}`);
  }
  if (tags) {
    const tagSlugs = tags?.split(',');
    tagSlugs.forEach((tag) => {
      queryString.push(`tags.slug=${tag}`);
    });
  }
  if (eventId) {
    queryString.push(`eventId=${eventId}`);
  }
  return queryString.join('&');
};

/**
 * Returns the filtered items based on the given skip and limit values.
 *
 * @param {LiveBloggingBlogEntity[] | null | undefined} items - The items to be filtered.
 * @param {number} skip - The number of items to skip.
 * @param {number} limit - The maximum number of items to return.
 * @returns {LiveBloggingBlogEntity[]} The filtered items.
 */
export const getFilteredItems = /* istanbul ignore next */ (
  items: LiveBloggingBlogEntity[] | null | undefined,
  skip: number,
  limit: number
) => {
  if (!items?.length) {
    return [];
  }
  if (skip === 0 && limit === 0) {
    return items;
  }
  return items.slice(skip, limit);
};

/**
 * Returns the link rule ID for a given entity.
 *
 * @param {LiveBloggingBlogEntity | StoryPart} entity - The entity for which to return the link rule ID.
 * @returns {string} The link rule ID for the given entity.
 */
export const createLinkRuleId = /* istanbul ignore next */ (entity: LiveBloggingBlogEntity | StoryPart): string => {
  return entity.slug;
};

/**
 * Builds a request for link rules based on the given entities and link rule variations.
 *
 * This function iterates over each entity in the provided array, enriches the link rule request entity based on the given link rule variations,
 * and adds a link rule request for the entity to the link rule requests array.
 *
 * @param {LiveBloggingBlogEntity[]} entities - The entities to be included in the link rule request.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 * @returns {LinkRuleRequest[]} The built link rule requests.
 */
const buildLinkRulesRequest = /* istanbul ignore next */ (
  entities: LiveBloggingBlogEntity[],
  linkRuleVariations?: LinkRuleVariation[]
): LinkRuleRequest[] => {
  const linkRulesRequest: LinkRuleRequest[] = [];

  for (const entity of entities) {
    enrichLinkRuleRequestEntity([entity], linkRuleVariations);
    addLinkRuleRequest(entity, linkRulesRequest);
  }

  return linkRulesRequest;
};

/**
 * Enriches the given entities with link rule variations.
 *
 * This function iterates over each entity and each link rule variation.
 * For each entity, it adds a property with the key of the link rule variation and a value of the link rule variation value.
 *
 * @param {LiveBloggingBlogEntity[]} entities - The entities to be enriched.
 * @param {LinkRuleVariation[] | undefined} linkRuleVariations - The link rule variations to use for enrichment.
 */
const enrichLinkRuleRequestEntity = /* istanbul ignore next */ (
  entities: LiveBloggingBlogEntity[],
  linkRuleVariations?: LinkRuleVariation[]
) => {
  if (entities && linkRuleVariations) {
    linkRuleVariations.forEach((variation) => {
      entities.forEach((entity) => {
        entity[variation.key] = variation.value;
      });
    });
  }
};

/**
 * Adds a link rule request for a given entity to the provided array of link rule requests.
 *
 * This function creates a link rule request for the given entity, which includes the entity's ID, the entity itself,
 * the entity's type, and the current culture and environment. The created link rule request is then added to the
 * provided array of link rule requests.
 *
 * @param {LiveBloggingBlogEntity} entity - The entity for which to create a link rule request.
 * @param {LinkRuleRequest[]} linkRulesRequest - The array of link rule requests to which to add the created link rule request.
 */
const addLinkRuleRequest = /* istanbul ignore next */ (
  entity: LiveBloggingBlogEntity,
  linkRulesRequest: LinkRuleRequest[]
) => {
  linkRulesRequest.push({
    id: createLinkRuleId(entity),
    entity,
    entityType: 'blog',
    /* @ts-ignore */
    culture,
    /* @ts-ignore */
    environment,
  });
};

/**
 * Updates the URLs of the given entities based on the provided link rules.
 *
 * This function iterates over each entity in the provided array and updates its URL based on the corresponding link rule.
 * If a link rule for an entity is not found, the entity's URL is not updated.
 *
 * @param {LiveBloggingBlogEntity[]} entities - The entities whose URLs are to be updated.
 * @param {LinkRuleResponse} linkRules - The link rules to use for updating the URLs.
 * @returns {LiveBloggingBlogEntity[]} The entities with updated URLs.
 */
const updateEntityURLs = /* istanbul ignore next */ (
  entities: LiveBloggingBlogEntity[],
  linkRules: LinkRuleResponse
): LiveBloggingBlogEntity[] => {
  for (const entity of entities) {
    updateEntityURL(entity, linkRules);
  }

  return entities;
};

/**
 * Updates the URL of the given entity based on the provided link rules.
 *
 * This function finds the link rule for the given entity in the provided link rules.
 * If a link rule is found, it updates the entity's URL with the URL from the link rule.
 * If a link rule is not found, the entity's URL is not updated.
 *
 * @param {LiveBloggingBlogEntity} entity - The entity whose URL is to be updated.
 * @param {LinkRuleResponse} linkRules - The link rules to use for updating the URL.
 */
const updateEntityURL = /* istanbul ignore next */ (entity: LiveBloggingBlogEntity, linkRules: LinkRuleResponse) => {
  const linkRule = linkRules.data?.find((l) => l.id === createLinkRuleId(entity));
  entity.url = linkRule?.url ?? entity.url;
};
