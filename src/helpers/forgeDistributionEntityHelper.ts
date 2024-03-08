import { DistributionEntity, ForgeDistributionApiOption, ForgeEntityType } from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { LinkRuleRequest, LinkRuleResponse, LinkRuleVariation, LinkRuleVariationType } from '@/models/types/linkRule';
import { StoryPart } from '@/models/types/storyPart';
import { getLinkRules } from '@/services/linkRuleService';
import {
  customEnrichEntitiesWithGadAssetsFields,
  customEnrichEntitiesWithReferencesFields,
  customEnrichLinkRuleRequestEntity,
} from '@/helpers/customForgeDistributionEntityHelper';
import { getPageNumber } from '@/components/common/list/Pagination/PaginationHelper';

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
    templateUrl: imagePlaceholderUrl,
    format: '',
    slug: 'no_image_available',
  };

  items?.forEach((item) => {
    if (!item?.thumbnail || item?.thumbnail?.templateUrl === '') {
      item.thumbnail = fallbackImageAsset;
    }

    enrichEntitiesWithThumbnailPlaceholderRelations(item, fallbackImageAsset);

    enrichEntitiesWithThumbnailPlaceholderParts(item, fallbackImageAsset);
  });
  return items ?? [];
};

/**
 * Enriches the relations of a given entity with a fallback image asset.
 * If a relation does not have a thumbnail or the thumbnail does not have a templateUrl,
 * the fallback image asset is assigned to the thumbnail of the relation.
 *
 * @param {DistributionEntity} item - The entity whose relations are to be enriched.
 * @param {ImageAsset} fallbackImageAsset - The fallback image asset to be used.
 */
const enrichEntitiesWithThumbnailPlaceholderRelations = (item: DistributionEntity, fallbackImageAsset: ImageAsset) => {
  item.relations?.forEach((relation) => {
    if (!relation?.thumbnail || relation?.thumbnail?.templateUrl === '') {
      relation.thumbnail = fallbackImageAsset;
    }
  });
};

/**
 * Enriches the parts of a given entity with a fallback image asset.
 * If a part does not have a thumbnail, the thumbnail does not have a templateUrl, or the part type is not 'external' or 'markdown',
 * the fallback image asset is assigned to the thumbnail of the part.
 *
 * @param {DistributionEntity} item - The entity whose parts are to be enriched.
 * @param {ImageAsset} fallbackImageAsset - The fallback image asset to be used.
 */
const enrichEntitiesWithThumbnailPlaceholderParts = (item: DistributionEntity, fallbackImageAsset: ImageAsset) => {
  item.parts?.forEach((part) => {
    if (part.type != ForgeEntityType.external && part.type != ForgeEntityType.markdown) {
      if (!part?.thumbnail || !part?.thumbnail?.templateUrl || part?.thumbnail?.templateUrl === '') {
        part.thumbnail = fallbackImageAsset;
      }
    }
  });
};

/**
 * Enriches the given entities with link rules.
 *
 * This function builds a request for link rules based on the given entities and whether relations and parts should be included.
 * It then fetches the link rules based on this request.
 * If any link rules are returned, it updates the URLs of the entities based on these link rules.
 *
 * @async
 * @param {DistributionEntity[]} forgeEntities - The entities to be enriched.
 * @param {boolean} [withRelationsAndParts=false] - Whether to include relations and parts in the link rule request.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const enrichDistributionEntitiesWithLinkRules = /* istanbul ignore next */ async (
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

/**
 * Builds a request for link rules based on the given entities and whether relations and parts should be included.
 *
 * This function iterates over each entity and enriches the link rule request entity based on the given link rule variations.
 * It then adds a link rule request for the entity.
 * If relations and parts should be included, it filters out relations and parts of type 'external' and 'markdown',
 * enriches the link rule request entity for these relations and parts, and adds a link rule request for each of them.
 *
 * @param {DistributionEntity[]} entities - The entities to be included in the link rule request.
 * @param {boolean} withRelationsAndParts - Whether to include relations and parts in the link rule request.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 * @returns {LinkRuleRequest[]} The built link rule requests.
 */
const buildLinkRulesRequest = /* istanbul ignore next */ (
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
        (relation) => relation.type !== ForgeEntityType.external && relation.type !== ForgeEntityType.markdown
      );
      enrichLinkRuleRequestEntity(relations, linkRuleVariations);
      addLinkRulesForEntities(relations, linkRulesRequest);

      const parts =
        entity.parts?.filter(
          (part) => part.type !== ForgeEntityType.external && part.type !== ForgeEntityType.markdown
        ) || [];
      enrichLinkRuleRequestEntity(parts, linkRuleVariations);
      addLinkRulesForEntities(parts, linkRulesRequest);
    }
  }

  return linkRulesRequest;
};

/**
 * Enriches the given entities with link rule variations.
 *
 * This function iterates over each entity and each link rule variation.
 * Depending on the type of the variation, it assigns the variation value to the corresponding field in the entity.
 * If the variation type is 'fields', the variation value is assigned to the corresponding field in the entity's fields.
 * If the variation type is 'root', the variation value is assigned to the corresponding field in the entity itself.
 * After all variations have been applied, the function calls `customEnrichLinkRuleRequestEntity` to apply any custom enrichments.
 *
 * @param {DistributionEntity[]} entities - The entities to be enriched.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 */
const enrichLinkRuleRequestEntity = /* istanbul ignore next */ (
  entities: DistributionEntity[],
  linkRuleVariations?: LinkRuleVariation[]
) => {
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
  customEnrichLinkRuleRequestEntity(entities, linkRuleVariations);
};

/**
 * Adds a link rule request for a given entity to the provided array of link rule requests.
 *
 * This function creates a link rule request for the given entity, which includes the entity's ID, the entity itself,
 * the entity's type, and the current culture and environment. The created link rule request is then added to the
 * provided array of link rule requests.
 *
 * @param {DistributionEntity} entity - The entity for which to create a link rule request.
 * @param {LinkRuleRequest[]} linkRulesRequest - The array of link rule requests to which to add the created link rule request.
 */
const addLinkRuleRequest = /* istanbul ignore next */ (
  entity: DistributionEntity,
  linkRulesRequest: LinkRuleRequest[]
) => {
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

/**
 * Returns the entity code of the given entity if it exists, otherwise returns the entity type.
 * If neither the entity code nor the entity type exist, returns an empty string.
 *
 * @param {DistributionEntity} entity - The entity whose type or code is to be returned.
 * @returns {string} The entity code or type of the given entity, or an empty string if neither exist.
 */
const getEntityType = /* istanbul ignore next */ (entity: DistributionEntity): string =>
  entity.entityCode ?? entity.type ?? '';

/**
 * Adds a link rule request for each entity in the provided array to the provided array of link rule requests.
 *
 * This function iterates over each entity in the provided array and calls `addLinkRuleRequest` to create a link rule request
 * for the entity and add it to the provided array of link rule requests.
 *
 * @param {DistributionEntity[] | undefined} entities - The entities for which to create link rule requests.
 * @param {LinkRuleRequest[]} linkRulesRequest - The array of link rule requests to which to add the created link rule requests.
 */
const addLinkRulesForEntities = /* istanbul ignore next */ (
  entities: DistributionEntity[] | undefined,
  linkRulesRequest: LinkRuleRequest[]
) => {
  if (!entities || entities.length === 0) {
    return;
  }

  for (const entity of entities) {
    addLinkRuleRequest(entity, linkRulesRequest);
  }
};

/**
 * Updates the URLs of the given entities based on the provided link rules.
 *
 * This function iterates over each entity and updates its URL based on the link rules.
 * If the entity has any relations, it also updates the URLs of these relations.
 * If the entity has any parts that are not of type 'external' or 'markdown', it updates the URLs of these parts as well.
 *
 * @param {DistributionEntity[]} entities - The entities whose URLs are to be updated.
 * @param {LinkRuleResponse} linkRules - The link rules to use for updating the URLs.
 * @returns {DistributionEntity[]} The entities with updated URLs.
 */
const updateEntityURLs = /* istanbul ignore next */ (
  entities: DistributionEntity[],
  linkRules: LinkRuleResponse
): DistributionEntity[] => {
  for (const entity of entities) {
    updateEntityURL(entity, linkRules);

    if (!entity.relations || entity.relations.length === 0) {
      continue;
    }

    for (const relation of entity.relations) {
      updateEntityURL(relation, linkRules);
    }

    const parts = entity.parts?.filter(
      (part) => part.type !== ForgeEntityType.external && part.type !== ForgeEntityType.markdown
    );
    if (parts) {
      for (const part of parts) {
        updateEntityURL(part, linkRules);
      }
    }
  }

  return entities;
};

/**
 * Updates the URL of the given entity based on the provided link rules.
 *
 * This function finds the link rule for the given entity and updates the entity's URL based on this link rule.
 * If the entity's URL is not '#nolink' and the KEEP_LINK_RULES_LOCAL environment variable is set to 'true',
 * the function creates a new URL object from the entity's URL and updates the hostname, port, and protocol
 * based on the LINK_RULES_LOCAL_HOSTNAME, LINK_RULES_LOCAL_PORT, and LINK_RULES_LOCAL_PROTOCOL environment variables,
 * respectively. The entity's URL is then updated to the string representation of this new URL object.
 *
 * @param {DistributionEntity} entity - The entity whose URL is to be updated.
 * @param {LinkRuleResponse} linkRules - The link rules to use for updating the URL.
 */
const updateEntityURL = /* istanbul ignore next */ (entity: DistributionEntity, linkRules: LinkRuleResponse) => {
  const linkRule = linkRules.data?.find((l) => l.id === createLinkRuleId(entity));
  entity.url = linkRule?.url ?? entity.url;

  if (entity.url && entity.url !== '#nolink' && process.env.KEEP_LINK_RULES_LOCAL === 'true') {
    const url = new URL(entity.url);
    url.hostname = process.env.LINK_RULES_LOCAL_HOSTNAME ?? 'localhost';
    url.port = process.env.LINK_RULES_LOCAL_PORT ?? '3000';
    url.protocol = process.env.LINK_RULES_LOCAL_PROTOCOL ?? 'http';
    entity.url = url.toString();
  }
};

/**
 * Enriches the given entities based on the provided options.
 *
 * This function enriches the entities with references fields, GAD assets fields, a thumbnail placeholder, and link rules
 * based on the provided options. The enrichments are performed in the following order:
 * 1. References fields enrichment is performed if `options.hasReferencesFieldsInList` is true.
 * 2. GAD assets fields enrichment is performed if `options.hasGadAssetsFields` is true.
 * 3. Thumbnail placeholder enrichment is performed if `options.hasThumbnailPlaceholder` is true.
 * 4. Link rules enrichment is performed if `options.hasLinkRules` or `options.hasLinkRulesForRelationsAndParts` is true.
 *
 * @async
 * @param {DistributionEntity[]} entities - The entities to be enriched.
 * @param {ForgeDistributionApiOption} [options=null] - The options for the enrichment.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const enrichDistributionEntities = /* istanbul ignore next */ async (
  entities: DistributionEntity[],
  options: ForgeDistributionApiOption = null
): Promise<DistributionEntity[]> => {
  if (!options) {
    return entities;
  }
  // Keep this method at the first level otherwise override the other entity fields
  if (options.hasReferencesFieldsInList) {
    entities = await enrichEntitiesWithReferencesFields(entities);
  }
  if (options.hasGadAssetsFields) {
    entities = await enrichEntitiesWithGadAssetsFields(entities);
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

/**
 * This function is used to get the query string for the API.
 * @param {ForgeDistributionApiOption} options - The options for the Forge Distribution API.
 * @returns {string} The query string for the API.
 */
export const getAPIQueryString = /* istanbul ignore next */ (options: ForgeDistributionApiOption) => {
  const skip = options?.skip ?? 0;
  const limit = options?.limit ?? 0;
  const tags = options?.tags ?? '';
  const page = getPageNumber(options?.hasPagination, options?.page);
  const queryParameters = getQueryString(skip, limit, tags, page);
  return queryParameters.length ? `?${queryParameters}` : '';
};

/**
 * Constructs a query string for the API based on the provided parameters.
 * The query string can include parameters for skipping a number of items, limiting the number of items returned, and filtering by tags.
 * The function also calculates the number of items to skip based on the current page number and the limit.
 *
 * @param {number} skip - The initial number of items to skip.
 * @param {number} limit - The maximum number of items to return.
 * @param {string} tags - A comma-separated list of tags to filter by.
 * @param {number} page - The current page number.
 * @returns {string} The constructed query string.
 */
const getQueryString = /* istanbul ignore next */ (skip: number, limit: number, tags: string, page: number) => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (page > 1) {
    skip = (page - 1) * limit;
  }
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
  return queryString.join('&');
};

/**
 * This function is used to get the filtered items based on the skip and limit values.
 * @param {DistributionEntity[] | null | undefined} items - The items to be filtered.
 * @param {number} skip - The number of items to skip.
 * @param {number} limit - The maximum number of items to return.
 * @returns {DistributionEntity[]} The filtered items.
 */
export const getFilteredItems = /* istanbul ignore next */ (
  items: DistributionEntity[] | null | undefined,
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
 * This function is used to create a link rule ID for a Forge entity.
 * @param {DistributionEntity | StoryPart} forgeEntity - The Forge entity to create a link rule ID for.
 * @returns {string} The link rule ID.
 */
const createLinkRuleId = /* istanbul ignore next */ (forgeEntity: DistributionEntity | StoryPart): string => {
  return forgeEntity.entityCode
    ? `${forgeEntity.id ?? forgeEntity._entityId}-${forgeEntity.type}-${forgeEntity.entityCode}`
    : `${forgeEntity.id ?? forgeEntity._entityId}-${forgeEntity.type}`;
};

/**
 * This function is used to enrich entities with GAD assets fields.
 * @async
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
const enrichEntitiesWithGadAssetsFields = /* istanbul ignore next */ async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  await customEnrichEntitiesWithGadAssetsFields(entities);
  return entities;
};

/**
 * This function is used to enrich entities with references fields.
 * @async
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
const enrichEntitiesWithReferencesFields = /* istanbul ignore next */ async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  return customEnrichEntitiesWithReferencesFields(entities);
};
