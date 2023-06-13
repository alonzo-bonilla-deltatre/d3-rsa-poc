import { DistributionEntity, ForgeDistributionApiOption } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { getDataVariable } from './dataVariableHelper';
import { LinkRuleRequest } from '@/models/types/linkRule';
import { StoryPart } from '@/models/types/storyPart';
import { getLinkRules } from '@/services/linkRuleService';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;

/**
 * Given the entities array, check if there is the fallback image and fill, if needed
 * @param items the items to check
 * @param variables the variables from were to extract the placeholder image asset from
 * @returns the items enreached with the fallback image where needed
 */
export const enrichEntitiesWithThumbnailPlaceholder = (
  items: DistributionEntity[] | null,
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
    if (!item?.thumbnail || !item?.thumbnail?.templateUrl || item?.thumbnail?.templateUrl === '') {
      item.thumbnail = fallbackImageAsset;
    }

    item.relations?.forEach((relation) => {
      if (!relation?.thumbnail || !relation?.thumbnail?.templateUrl || relation?.thumbnail?.templateUrl === '') {
        relation.thumbnail = fallbackImageAsset;
      }
    });

    item.parts?.forEach((part) => {
      if (part.type != 'external' && part.type != 'markdown') {
        if (!part?.thumbnail || !part?.thumbnail?.templateUrl || part?.thumbnail?.templateUrl === '') {
          part.thumbnail = fallbackImageAsset;
        }
      }
    });
  });
  return items || [];
};

export const enrichDistributionEntitiesWithLinkRules = async (
  forgeEntities: DistributionEntity[],
  withRelationsAndParts: boolean = false
): Promise<DistributionEntity[]> => {
  const linkRulesRequest: LinkRuleRequest[] = [];

  if (!forgeEntities || forgeEntities.length == 0) {
    return forgeEntities;
  }

  forgeEntities.forEach((entity: DistributionEntity) => {
    linkRulesRequest.push({
      id: createLinkRuleId(entity),
      entity: entity,
      entityType: entity.entityCode ? entity.entityCode : entity.type,
      culture: culture,
      environment: environment,
    } as LinkRuleRequest);
    if (withRelationsAndParts) {
      if (entity.relations && entity.relations.length > 0) {
        entity.relations.forEach((relation) => {
          linkRulesRequest.push({
            id: createLinkRuleId(relation),
            entity: relation,
            entityType: relation.entityCode ? relation.entityCode : relation.type,
            culture: culture,
            environment: environment,
          } as LinkRuleRequest);
        });
      }
      if (entity.parts && entity.parts.length > 0) {
        entity.parts.forEach((part) => {
          if (part.type != 'external' && part.type != 'markdown') {
            linkRulesRequest.push({
              id: createLinkRuleId(part),
              entity: part,
              entityType: part.entityCode ? part.entityCode : part.type,
              culture: culture,
              environment: environment,
            } as LinkRuleRequest);
          }
        });
      }
    }
  });

  const linkRules = await getLinkRules(linkRulesRequest);

  if (!linkRules || !linkRules.data || linkRules.data.length == 0) {
    return forgeEntities;
  }

  forgeEntities.forEach((entity) => {
    const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(entity));
    if (linkRule) {
      entity.url = linkRule.url;
    }

    if (withRelationsAndParts) {
      if (entity.relations && entity.relations.length > 0) {
        entity.relations.forEach((relation) => {
          const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(relation));
          if (linkRule) {
            relation.url = linkRule.url;
          }
        });
      }
      if (entity.parts && entity.parts.length > 0) {
        entity.parts.forEach((part) => {
          if (entity.type != 'external' && entity.type != 'markdown') {
            const linkRule = linkRules?.data.find((l) => l.id === createLinkRuleId(part));
            if (linkRule) {
              part.url = linkRule.url;
            }
          }
        });
      }
    }
  });

  return forgeEntities;
};

export const enrichDistributionEntities = async (
  entities: DistributionEntity[],
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity[]> => {
  if (!options) {
    return entities;
  }

  if (options.hasThumbnailPlaceholder) {
    entities = enrichEntitiesWithThumbnailPlaceholder(entities, options.variables);
  }

  if (options.hasLinkRules || options.hasLinkRulesForRelationsAndParts) {
    entities = await enrichDistributionEntitiesWithLinkRules(entities, options.hasLinkRulesForRelationsAndParts);
  }

  return entities;
};

export const getQueryString = (skip: number, limit: number, tags: string) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (skip) {
    queryString.push(`$skip=${skip}`);
  }
  if (limit) {
    queryString.push(`$limit=${limit}`);
  }
  if (tags?.length && tags.includes(',')) {
    const tagSlugs = tags.split(',');
    tagSlugs.forEach((tag) => {
      queryString.push(`tags.slug=${tag}`);
    });
  }
  return queryString.join('&');
};

export const getFilteredItems = (items: DistributionEntity[] | null | undefined, limit: number) => {
  if (!items?.length) {
    return [];
  }
  if (limit === 0) {
    return items;
  }
  return items.slice(0, limit);
};

export const createLinkRuleId = (forgeEntity: DistributionEntity | StoryPart): string => {
  return forgeEntity.entityCode
    ? `${forgeEntity._entityId}-${forgeEntity.type}-${forgeEntity.entityCode}`
    : `${forgeEntity._entityId}-${forgeEntity.type}`;
};
