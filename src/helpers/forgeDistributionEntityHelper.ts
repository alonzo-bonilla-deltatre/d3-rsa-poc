import {
  DistributionEntity,
  ForgeDistributionApiOption,
  ForgeDistributionApiQueryStringOption,
  ForgeEntityType,
  ListAvailabilityOption,
  RangeOption,
  SortOptions,
} from '@/models/types/forge';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/constsUtility';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import {
  LinkRuleData,
  LinkRuleRequest,
  LinkRuleResponse,
  LinkRuleVariation,
  LinkRuleVariationType,
} from '@/models/types/linkRule';
import { StoryPart } from '@/models/types/storyPart';
import { getLinkRules } from '@/services/linkRuleService';
import {
  customEnrichEntitiesWithGadAssetsFields,
  customEnrichEntitiesWithReferencesFields,
  customEnrichLinkRuleRequestEntity,
} from '@/helpers/customForgeDistributionEntityHelper';
import { getPageNumber } from '@/helpers/paginationHelper';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { hasValidUrl } from '@/helpers/urlHelper';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;

/**
 * Given the entities array, check if there is the fallback image and fill, if needed
 * @param items the items to check
 * @param variables the variables from were to extract the placeholder image asset from
 * @returns the items enriched with the fallback image where needed
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
    if (!item?.thumbnail?.templateUrl) {
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
export const enrichEntitiesWithThumbnailPlaceholderRelations = (
  item: DistributionEntity,
  fallbackImageAsset: ImageAsset
) => {
  item.relations?.forEach((relation) => {
    if (!relation?.thumbnail?.templateUrl) {
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
export const enrichEntitiesWithThumbnailPlaceholderParts = (
  item: DistributionEntity,
  fallbackImageAsset: ImageAsset
) => {
  item.parts?.forEach((part) => {
    if (part.type != ForgeEntityType.external && part.type != ForgeEntityType.markdown) {
      if (!part?.thumbnail?.templateUrl) {
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
export const enrichDistributionEntitiesWithLinkRules = async (
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
export const buildLinkRulesRequest = (
  entities: DistributionEntity[],
  withRelationsAndParts: boolean,
  linkRuleVariations?: LinkRuleVariation[]
): LinkRuleRequest[] => {
  const linkRulesRequest: LinkRuleRequest[] = [];

  for (const entity of entities) {
    enrichLinkRuleRequestEntity([entity], linkRuleVariations);
    addLinkRuleRequest(entity, linkRulesRequest);

    if (withRelationsAndParts) {
      const relations =
        entity?.relations?.filter(
          (relation) => relation.type !== ForgeEntityType.external && relation.type !== ForgeEntityType.markdown
        ) ?? [];
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
export const enrichLinkRuleRequestEntity = (
  entities: DistributionEntity[],
  linkRuleVariations?: LinkRuleVariation[]
): void => {
  if (entities && linkRuleVariations) {
    linkRuleVariations.forEach((variation) => {
      entities.forEach((entity) => {
        switch (variation.type) {
          case LinkRuleVariationType.fields:
            if (!entity.fields) break;
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
export const addLinkRuleRequest = (entity: DistributionEntity, linkRulesRequest: LinkRuleRequest[]): void => {
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
export const getEntityType = (entity: DistributionEntity): string => entity.entityCode ?? entity.type ?? '';

/**
 * Adds a link rule request for each entity in the provided array to the provided array of link rule requests.
 *
 * This function iterates over each entity in the provided array and calls `addLinkRuleRequest` to create a link rule request
 * for the entity and add it to the provided array of link rule requests.
 *
 * @param {DistributionEntity[] | undefined} entities - The entities for which to create link rule requests.
 * @param {LinkRuleRequest[]} linkRulesRequest - The array of link rule requests to which to add the created link rule requests.
 */
export const addLinkRulesForEntities = (
  entities: DistributionEntity[] | undefined,
  linkRulesRequest: LinkRuleRequest[]
): void => {
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
export const updateEntityURLs = (entities: DistributionEntity[], linkRules: LinkRuleResponse): DistributionEntity[] => {
  for (const entity of entities) {
    updateEntityURL(entity, linkRules);

    for (const relation of entity?.relations ?? []) {
      updateEntityURL(relation, linkRules);
    }

    const parts = entity?.parts?.filter(
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
export const updateEntityURL = (entity: DistributionEntity, linkRules: LinkRuleResponse): void => {
  const linkRule: LinkRuleData | undefined = linkRules.data?.find(
    (l: LinkRuleData): boolean => l.id === createLinkRuleId(entity)
  );
  entity.url = linkRule?.url ?? entity.url;

  if (entity.url && hasValidUrl(entity.url) && process.env.KEEP_LINK_RULES_LOCAL === 'true') {
    try {
      const url: URL = new URL(entity.url);
      url.hostname = process.env.LINK_RULES_LOCAL_HOSTNAME ?? 'localhost';
      url.port = process.env.LINK_RULES_LOCAL_PORT ?? '3000';
      url.protocol = process.env.LINK_RULES_LOCAL_PROTOCOL ?? 'http';
      entity.url = url.toString();
    } catch (error) {
      logger.log('Error updating link rule URL', LoggerLevel.error);
    }
  }
};

/**
 * Enriches the given entities based on the provided options.
 *
 * This function enriches the entities with references fields, GAD assets fields, a thumbnail placeholder, and link rules
 * based on the provided options. The enrichments are performed in the following order:
 * 1. Reference fields enrichment is performed if `options.hasReferencesFieldsInList` is true.
 * 2. GAD assets fields enrichment is performed if `options.hasGadAssetsFields` is true.
 * 3. Thumbnail placeholder enrichment is performed if `options.hasThumbnailPlaceholder` is true.
 * 4. Link rules enrichment performed if `options.hasLinkRules` or `options.hasLinkRulesForRelationsAndParts` is true.
 *
 * @async
 * @param {DistributionEntity[]} entities - The entities to be enriched.
 * @param {ForgeDistributionApiOption} [options=null] - The options for the enrichment.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const enrichDistributionEntities = async (
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
export const getAPIQueryString = (options: ForgeDistributionApiOption): string => {
  const skip = options?.skip ?? 0;
  const limit = options?.limit ?? 0;
  const tags = options?.tags ?? '';
  const context = options?.context ?? '';
  const page = getPageNumber(options?.hasPagination, options?.page);
  const queryParameters = getQueryString({
    skip,
    limit,
    page,
    tags,
    context,
    fields: options?.fields,
    extraData: options?.extraData,
    sort: options?.sort,
    range: options?.range,
    listAvailability: options?.listAvailability,
  });
  return queryParameters.length ? `?${queryParameters}` : '';
};

/**
 * Constructs a sorting parameter for the API query string based on the provided sort options.
 * If no sort options are provided, the function returns undefined.
 * The constructed sorting parameter is in the format "$sort=prop:order" or "$sort=fields.field:order".
 *
 * @param {SortOptions} [sort] - The sort options to construct the parameter from.
 * @returns {string | undefined} The constructed sorting parameter for the query string, or undefined if no sort options are provided.
 *
 * @example
 * // returns "$sort=contentDate:asc"
 * getSortParams({ prop: 'contentDate', order: 'asc' });
 *
 * @example
 * // returns "$sort=fields.scheduledStartTime:asc"
 * getSortParams({ field: 'scheduledStartTime', order: 'asc' });
 */
export const getSortParams = (sort?: SortOptions): string | undefined => {
  if (!sort) {
    return undefined;
  }
  const sortOrder = sort.order ? `:${sort.order}` : '';
  if (sort.prop) {
    return `$sort=${sort.prop}${sortOrder}`;
  }
  if (sort.field) {
    return `$sort=fields.${sort.field}${sortOrder}`;
  }
};

/**
 * Constructs a range parameter for the API query string based on the provided range.
 * If no range is provided, or if the range does not have a start date and an end date, the function returns undefined.
 * The constructed range parameter is in the format "field=$range(startDate,endDate)".
 *
 * @param {RangeOption} [range] - The range to construct the parameter from.
 * @returns {string | undefined} The constructed range parameter for the query string, or undefined if no range is provided or if the range does not have a start date and an end date.
 *
 * @example
 * // returns "fieldFoo=$range(2023-10-16,2024-01-167)"
 * getRangeParams({ field: "fieldFoo", startDate: "2023-10-16", endDate: "2024-01-167" });
 */
export const getRangeParams = (range?: RangeOption): string | undefined => {
  if (!range || (!range.startDate && !range.endDate)) {
    return undefined;
  }
  return `${range.field}=$range(${range.startDate ?? ''},${range.endDate ?? ''})`;
};

/**
 * Constructs a list availability parameter for the API query string based on the provided list availability.
 * If no list availability is provided, the function returns undefined.
 * The constructed list availability parameter is in the format "_listAvailability=listAvailability".
 *
 * @param {ListAvailabilityOption} [listAvailability] - The list availability to construct the parameter from.
 * @returns {string | undefined} The constructed list availability parameter for the query string, or undefined if no list availability is provided.
 *
 * @example
 * // returns "_listAvailability=available"
 * getListAvailabilityParams("available");
 */
export const getListAvailabilityParams = (listAvailability?: ListAvailabilityOption): string | undefined => {
  if (listAvailability === undefined) {
    return undefined;
  }

  return `_listAvailability=${listAvailability}`;
};

/**
 * Constructs generic parameters for the API query string based on the provided key and extra data.
 * If no key or extra data is provided, the function returns undefined.
 * The function constructs a parameter for each key-value pair in the extra data, with the key prefixed by the provided generic key.
 *
 * @param {string} genericKey - The key to prefix each parameter with.
 * @param {Record<string, unknown> | null} [extraData=null] - The extra data to construct parameters from.
 * @returns {string[] | undefined} An array of constructed parameters for the query string, or undefined if no key or extra data is provided.
 *
 * @example
 * // returns ["fields.videoStatus=Live"]
 * getGenericParams("fields", { videoStatus: "Live" });
 */
export const getGenericParams = (genericKey: string, extraData?: Record<string, unknown>): string[] | undefined => {
  if (!extraData || !genericKey) {
    return undefined;
  }

  const queryParameters: string[] = [];
  for (const key in extraData) {
    if (extraData.hasOwnProperty(key)) {
      queryParameters.push(`${genericKey}.${key}=${extraData[key]}`);
    }
  }
  return queryParameters;
};

/**
 * Constructs a tags parameter for the API query string based on the provided tags.
 * If no tags are provided, the function returns undefined.
 * If multiple tags are provided, separated by commas, the function constructs a tags parameter for each tag.
 *
 * @param {string} [tags] - A comma-separated list of tags to filter by.
 * @returns {string[] | undefined} An array of constructed tags parameters for the query string, or undefined if no tags are provided.
 *
 * @example
 * // returns ["tags.slug=supercars", "tags.slug=test"]
 * getTagsParam("supercars,test");
 */
export const getTagsParam = (tags?: string): string[] | undefined => {
  if (!tags || tags.length === 0) {
    return undefined;
  }
  const queryParameters = [];

  if (tags.includes(',')) {
    const tagSlugs = tags.split(',');
    tagSlugs.forEach((tag) => {
      queryParameters.push(`tags.slug=${tag}`);
    });
  } else {
    queryParameters.push(`tags.slug=${tags}`);
  }
  return queryParameters;
};

/**
 * Constructs a context parameter for the API query string based on the provided context.
 * If no context is provided, the function returns undefined.
 *
 * @param {string} [context] - The context to filter by.
 * @returns {string | undefined} The constructed context parameter for the query string, or undefined if no context is provided.
 */
export const getContextParam = (context?: string): string | undefined => {
  if (!context) {
    return undefined;
  }

  return `context.slug=${context}`;
};

/**
 * Constructs a query string for the API based on the provided parameters.
 * The query string can include parameters for skipping a number of items, limiting the number of items returned, and filtering by tags.
 * The function also calculates the number of items to skip based on the current page number and the limit.
 *
 * @param {ForgeDistributionApiQueryStringOption} forgeDistributionApiQueryStringOption - An object containing the following properties:
 * @param {number} forgeDistributionApiQueryStringOption.skip - The initial number of items to skip.
 * @param {number} forgeDistributionApiQueryStringOption.limit - The maximum number of items to return.
 * @param {string} forgeDistributionApiQueryStringOption.tags - A comma-separated list of tags to filter by.
 * @param {number} forgeDistributionApiQueryStringOption.page - The current page number.
 * @param {string} forgeDistributionApiQueryStringOption.context - The context to filter by.
 * @param {Record<string, unknown>} forgeDistributionApiQueryStringOption.fields - The fields to filter by.
 * @param {Record<string, unknown>} forgeDistributionApiQueryStringOption.extraData - The extra data to filter by.
 * @param {SortOptions} forgeDistributionApiQueryStringOption.sort - The sorting options.
 * @param {RangeOption} forgeDistributionApiQueryStringOption.range - The range options for filtering.
 * @param {ListAvailabilityOption} forgeDistributionApiQueryStringOption.listAvailability - The list availability options for filtering.
 * @returns {string} The constructed query string.
 *
 * @example
 * // returns "$skip=0&$limit=10&tags.slug=supercars&tags.slug=test"
 * getQueryString({ skip: 0, limit: 10, tags: "supercars,test", page: 1 });
 */
export const getQueryString = (
  forgeDistributionApiQueryStringOption: ForgeDistributionApiQueryStringOption
): string => {
  // Should look like $skip=0&$limit=10&tags.slug=supercars&tags.slug=test
  let queryString: string[] = [];
  if (forgeDistributionApiQueryStringOption?.page && forgeDistributionApiQueryStringOption.page > 1) {
    const limit = forgeDistributionApiQueryStringOption?.limit ?? 0;
    forgeDistributionApiQueryStringOption.skip = (forgeDistributionApiQueryStringOption.page - 1) * limit;
  }
  if (forgeDistributionApiQueryStringOption?.skip) {
    queryString.push(`$skip=${forgeDistributionApiQueryStringOption.skip}`);
  }
  if (forgeDistributionApiQueryStringOption?.limit) {
    queryString.push(`$limit=${forgeDistributionApiQueryStringOption.limit}`);
  }

  const tagsParam = getTagsParam(forgeDistributionApiQueryStringOption?.tags);
  if (tagsParam) queryString = queryString.concat(tagsParam);

  const contextParam = getContextParam(forgeDistributionApiQueryStringOption?.context);
  if (contextParam) queryString = queryString.concat(contextParam);

  const fieldsOption = getGenericParams('fields', forgeDistributionApiQueryStringOption?.fields);
  if (fieldsOption) queryString = queryString.concat(fieldsOption);

  const extraDataParam = getGenericParams('tags.extraData', forgeDistributionApiQueryStringOption?.extraData);
  if (extraDataParam) queryString = queryString.concat(extraDataParam);

  const sortParam = getSortParams(forgeDistributionApiQueryStringOption?.sort ?? { prop: 'contentDate' });
  if (sortParam) queryString.push(sortParam);

  const rangeParam = getRangeParams(forgeDistributionApiQueryStringOption?.range);
  if (rangeParam) queryString.push(rangeParam);

  const listAvailabilityParam = getListAvailabilityParams(forgeDistributionApiQueryStringOption?.listAvailability);
  if (listAvailabilityParam) queryString.push(listAvailabilityParam);

  return queryString.join('&');
};

/**
 * This function is used to get the filtered items based on the skip and limit values.
 * @param {DistributionEntity[] | null | undefined} items - The items to be filtered.
 * @param {number} skip - The number of items to skip.
 * @param {number} limit - The maximum number of items to return.
 * @returns {DistributionEntity[]} The filtered items.
 */
export const getFilteredItems = (
  items: DistributionEntity[] | null | undefined,
  skip: number,
  limit: number
): DistributionEntity[] => {
  if (!items?.length) {
    return [];
  }
  if (skip === 0 && limit === 0) {
    return items;
  }
  return items.slice(skip, limit + skip);
};

/**
 * This function is used to create a link rule ID for a Forge entity.
 * @param {DistributionEntity | StoryPart} forgeEntity - The Forge entity to create a link rule ID for.
 * @returns {string} The link rule ID.
 */
export const createLinkRuleId = (forgeEntity: DistributionEntity | StoryPart): string => {
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
export const enrichEntitiesWithGadAssetsFields = async (
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
export const enrichEntitiesWithReferencesFields = async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  return customEnrichEntitiesWithReferencesFields(entities);
};
