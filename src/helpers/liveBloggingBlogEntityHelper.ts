import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
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
const enrichEntitiesWithThumbnailPlaceholder = (
  items: LiveBloggingBlogEntity[] | null,
  variables?: Variable[] | undefined
) => {
  const imagePlaceholderUrl = getDataVariable(variables, IMAGE_PLACEHOLDER);
  const fallbackImageAsset: ImageAsset = {
    title: 'no_image_available',
    templateUrl: imagePlaceholderUrl ?? '',
    format: '',
    slug: 'no_image_available',
  };

  items?.forEach((item) => {
    if (!item?.coverImage || !item?.coverImage?.templateUrl || item?.coverImage?.templateUrl === '') {
      item.coverImage = fallbackImageAsset;
    }
  });
  return items || [];
};

/* istanbul ignore next */
const enrichDistributionEntitiesWithLinkRules = async (
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

/* istanbul ignore next */
const buildLinkRulesRequest = (
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

/* istanbul ignore next */
const enrichLinkRuleRequestEntity = (entities: LiveBloggingBlogEntity[], linkRuleVariations?: LinkRuleVariation[]) => {
  if (entities && linkRuleVariations) {
    linkRuleVariations.forEach((variation) => {
      entities.forEach((entity) => {
        entity[variation.key] = variation.value;
      });
    });
  }
};

/* istanbul ignore next */
const addLinkRuleRequest = (entity: LiveBloggingBlogEntity, linkRulesRequest: LinkRuleRequest[]) => {
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

/* istanbul ignore next */
const updateEntityURLs = (
  entities: LiveBloggingBlogEntity[],
  linkRules: LinkRuleResponse
): LiveBloggingBlogEntity[] => {
  for (const entity of entities) {
    updateEntityURL(entity, linkRules);
  }

  return entities;
};

/* istanbul ignore next */
const updateEntityURL = (entity: LiveBloggingBlogEntity, linkRules: LinkRuleResponse) => {
  const linkRule = linkRules.data?.find((l) => l.id === createLinkRuleId(entity));
  entity.url = linkRule?.url ?? entity.url;
};

/* istanbul ignore next */
const enrichDistributionEntities = async (
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

/* istanbul ignore next */
const getQueryString = (skip: number, limit: number, tags: string) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (skip) {
    queryString.push(`$skip=${skip}`);
  }
  if (limit) {
    queryString.push(`$limit=${limit}`);
  }
  if (tags) {
    const tagSlugs = tags.split(',');
    tagSlugs.forEach((tag) => {
      queryString.push(`tags.slug=${tag}`);
    });
  }
  return queryString.join('&');
};

/* istanbul ignore next */
const getFilteredItems = (items: LiveBloggingBlogEntity[] | null | undefined, skip: number, limit: number) => {
  if (!items?.length) {
    return [];
  }
  if (skip === 0 || limit === 0) {
    return items;
  }
  return items.slice(skip, limit);
};

/* istanbul ignore next */
const createLinkRuleId = (entity: LiveBloggingBlogEntity | StoryPart): string => {
  return entity.slug;
};

export {
  enrichEntitiesWithThumbnailPlaceholder,
  enrichDistributionEntitiesWithLinkRules,
  enrichDistributionEntities,
  getQueryString,
  getFilteredItems,
  createLinkRuleId,
};
