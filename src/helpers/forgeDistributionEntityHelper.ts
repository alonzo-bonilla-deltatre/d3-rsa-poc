import { DistributionEntity, ForgeDistributionApiOption } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { getDataVariable } from './dataVariableHelper';
import { LinkRuleRequest, LinkRuleResponse, LinkRuleVariation, LinkRuleVariationType } from '@/models/types/linkRule';
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
const enrichEntitiesWithThumbnailPlaceholder = (
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

/* istanbul ignore next */
const enrichDistributionEntitiesWithLinkRules = async (
  forgeEntities: DistributionEntity[],
  withRelationsAndParts: boolean = false,
  linkRuleVariations?: LinkRuleVariation[]
): Promise<DistributionEntity[]> => {
  if (!forgeEntities?.length) {
    return forgeEntities;
  }

  const linkRulesRequest = buildLinkRulesRequest(forgeEntities, withRelationsAndParts, linkRuleVariations);
  const linkRules = await getLinkRules(linkRulesRequest);

  if (!linkRules?.data?.length) {
    return forgeEntities;
  }

  return updateEntityURLs(forgeEntities, linkRules);
};

/* istanbul ignore next */
const buildLinkRulesRequest = (
  entities: DistributionEntity[],
  withRelationsAndParts: boolean,
  linkRuleVariations?: LinkRuleVariation[]
): LinkRuleRequest[] => {
  const linkRulesRequest: LinkRuleRequest[] = [];

  for (const entity of entities) {
    enrichLinkRuleRequestEntity([entity], linkRuleVariations);
    addLinkRuleRequest(entity, linkRulesRequest);

    if (withRelationsAndParts) {
      const relations = entity.relations?.filter(
        (relation) => relation.type !== 'external' && relation.type !== 'markdown'
      );
      enrichLinkRuleRequestEntity(relations, linkRuleVariations);
      addLinkRulesForEntities(relations, linkRulesRequest);

      const parts = entity.parts?.filter((part) => part.type !== 'external' && part.type !== 'markdown');
      enrichLinkRuleRequestEntity(parts, linkRuleVariations);
      addLinkRulesForEntities(parts, linkRulesRequest);
    }
  }

  return linkRulesRequest;
};

/* istanbul ignore next */
const enrichLinkRuleRequestEntity = (entities: DistributionEntity[], linkRuleVariations?: LinkRuleVariation[]) => {
  if (entities && linkRuleVariations) {
    linkRuleVariations.forEach((variation) => {
      entities.forEach((entity) => {
        switch (variation.type) {
          case LinkRuleVariationType.fields:
            entity.fields[variation.key] = variation.value;
            break;
          case LinkRuleVariationType.root:
            entity[variation.key] = variation.value;
            break;
        }
      });
    });
  }
  // Global link rule enrich
  // Example
  // entities.forEach((entity) => {
  //   if (entity.type === 'story') {
  //     entity.tags.forEach((tag) => {
  //       if (tag.externalSourceName === 'customentity.event') {
  //         entity['eventSlug'] = tag.slug;
  //       }
  //     });
  //   }
  // });
};

/* istanbul ignore next */
const addLinkRuleRequest = (entity: DistributionEntity, linkRulesRequest: LinkRuleRequest[]) => {
  linkRulesRequest.push({
    id: createLinkRuleId(entity),
    entity,
    entityType: getEntityType(entity),
    /* @ts-ignore */
    culture,
    /* @ts-ignore */
    environment,
  });
};

/* istanbul ignore next */
const getEntityType = (entity: DistributionEntity): string => entity.entityCode ?? entity.type;

/* istanbul ignore next */
const addLinkRulesForEntities = (entities: DistributionEntity[] | undefined, linkRulesRequest: LinkRuleRequest[]) => {
  if (!entities || entities.length === 0) {
    return;
  }

  for (const entity of entities) {
    addLinkRuleRequest(entity, linkRulesRequest);
  }
};

/* istanbul ignore next */
const updateEntityURLs = (entities: DistributionEntity[], linkRules: LinkRuleResponse): DistributionEntity[] => {
  for (const entity of entities) {
    updateEntityURL(entity, linkRules);

    if (!entity.relations || entity.relations.length === 0) {
      continue;
    }

    for (const relation of entity.relations) {
      updateEntityURL(relation, linkRules);
    }

    const parts = entity.parts?.filter((part) => part.type !== 'external' && part.type !== 'markdown');
    if (parts) {
      for (const part of parts) {
        updateEntityURL(part, linkRules);
      }
    }
  }

  return entities;
};

/* istanbul ignore next */
const updateEntityURL = (entity: DistributionEntity, linkRules: LinkRuleResponse) => {
  const linkRule = linkRules.data?.find((l) => l.id === createLinkRuleId(entity));
  entity.url = linkRule?.url ?? entity.url;
};

/* istanbul ignore next */
const enrichDistributionEntities = async (
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
    entities = await enrichDistributionEntitiesWithLinkRules(
      entities,
      options.hasLinkRulesForRelationsAndParts,
      options.linkRuleVariations
    );
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
const getFilteredItems = (items: DistributionEntity[] | null | undefined, skip: number, limit: number) => {
  if (!items?.length) {
    return [];
  }
  if (skip === 0 && limit === 0) {
    return items;
  }
  return items.slice(skip, limit);
};

/* istanbul ignore next */
const createLinkRuleId = (forgeEntity: DistributionEntity | StoryPart): string => {
  return forgeEntity.entityCode
    ? `${forgeEntity.id ?? forgeEntity._entityId}-${forgeEntity.type}-${forgeEntity.entityCode}`
    : `${forgeEntity.id ?? forgeEntity._entityId}-${forgeEntity.type}`;
};

export {
  enrichEntitiesWithThumbnailPlaceholder,
  enrichDistributionEntitiesWithLinkRules,
  enrichDistributionEntities,
  getQueryString,
  getFilteredItems,
  createLinkRuleId,
};
