/* istanbul ignore file */
import { getSingleAssetByTag } from '@/services/gadService';
import { DistributionEntity, ForgeDapiEntityCode, ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';
import { getEntity } from '@/services/forgeDistributionService';
import { LinkRuleVariation } from '@/models/types/linkRule';

/**
 * Enriches the given entities with a link rule request entity.
 * If the entity type is a custom entity and the entity code is an event, the entity slug is added to the entity.
 * Otherwise, the entity tags are checked for an external source name matching a custom entity event, and if found, the tag slug is added to the entity.
 *
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @param {LinkRuleVariation[]} [linkRuleVariations] - The link rule variations to use for enrichment.
 */
export const customEnrichLinkRuleRequestEntity = (
  entities: DistributionEntity[],
  linkRuleVariations?: LinkRuleVariation[]
) => {
  if (entities?.length > 0) {
    entities.forEach((entity) => {
      if (entity.type === ForgeEntityType.customEntity && entity.entityCode === ForgeEntityCode.event) {
        entity['eventslug'] = entity.slug;
      } else {
        entity.tags.forEach((tag) => {
          if (tag.externalSourceName === `${ForgeEntityType.customEntity}.${ForgeEntityCode.event}`) {
            entity['eventslug'] = tag.slug;
          }
        });
      }
    });
  }
};

/**
 * Enriches the given entities with GAD assets fields.
 *
 * @async
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const customEnrichEntitiesWithGadAssetsFields = async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  for (const entity of entities) {
    await customEnrichEntitiesWithGadAssetsFieldsForPlayers(entity);
  }
  return entities;
};

/**
 * Enriches the given entities with references fields.
 *
 * @async
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const customEnrichEntitiesWithReferencesFields = async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  const result = [];
  for (let entity of entities) {
    let tempEntity = null;
    if (entity.entityCode === ForgeEntityCode.match) {
      tempEntity = await customEnrichEntitiesWithReferencesFieldsForMatches(tempEntity, entity);
    }
    if (entity.type === ForgeEntityType.story) {
      tempEntity = await customEnrichEntitiesWithReferencesFieldsForStories(tempEntity, entity);
    }
    if (entity.type === ForgeEntityType.customEntity && entity.entityCode === ForgeEntityCode.event) {
      tempEntity = await customEnrichEntitiesWithReferencesFieldsForEvents(tempEntity, entity);
    }
    if (tempEntity) {
      result.push(tempEntity);
    } else {
      result.push(entity);
    }
  }
  return result;
};

/**
 * Enriches the given album list entities with the count of elements.
 *
 * @async
 * @param {DistributionEntity[]} entities - The entities to enrich.
 * @returns {Promise<DistributionEntity[]>} The enriched entities.
 */
export const customEnrichAlbumListWithElementCount = async (
  entities: DistributionEntity[]
): Promise<DistributionEntity[]> => {
  const result = [];
  for (let entity of entities) {
    let tempEntity = null;
    if (entity.type === ForgeEntityType.album) {
      tempEntity = await getEntity(ForgeDapiEntityCode.albums, entity.slug);
      tempEntity = { ...entity, elementsCount: tempEntity?.elements?.length };
    }
    if (tempEntity) {
      result.push(tempEntity);
    } else {
      result.push(entity);
    }
  }
  return result;
};

/**
 * Enriches the given entity with GAD assets fields for players.
 *
 * @async
 * @param {DistributionEntity} entity - The entity to enrich.
 */
const customEnrichEntitiesWithGadAssetsFieldsForPlayers = async (entity: DistributionEntity) => {
  if (entity.entityCode === ForgeEntityCode.player && entity.fields.playerNationalityFlag) {
    entity.fields.playerNationalityFlag = await getSingleAssetByTag(entity.fields.playerNationalityFlag);
  }
};

/**
 * Enriches the given entity with references fields for matches.
 *
 * @async
 * @param {DistributionEntity | null} tempEntity - The temporary entity to enrich.
 * @param {DistributionEntity} entity - The entity to enrich.
 * @returns {Promise<DistributionEntity>} The enriched entity.
 */
const customEnrichEntitiesWithReferencesFieldsForMatches = async (
  tempEntity: DistributionEntity | null,
  entity: DistributionEntity
): Promise<DistributionEntity> => {
  tempEntity = await getEntity(ForgeDapiEntityCode.matches, entity.slug);
  if (
    tempEntity?.references &&
    tempEntity?.references?.teamHome?.length > 0 &&
    tempEntity?.references?.teamAway?.length > 0
  ) {
    tempEntity.references.teamHome[0].fields.teamLogo = tempEntity?.references?.teamHome[0].fields?.teamLogo
      ? await getSingleAssetByTag(tempEntity?.references?.teamHome[0].fields?.teamLogo)
      : null;
    tempEntity.references.teamAway[0].fields.teamLogo = tempEntity?.references?.teamAway[0].fields?.teamLogo
      ? await getSingleAssetByTag(tempEntity?.references?.teamAway[0].fields?.teamLogo)
      : null;
  }
  return tempEntity as DistributionEntity;
};

/**
 * Enriches the given entity with references fields for stories.
 *
 * @async
 * @param {DistributionEntity | null} tempEntity - The temporary entity to enrich.
 * @param {DistributionEntity} entity - The entity to enrich.
 * @returns {Promise<DistributionEntity>} The enriched entity.
 */
const customEnrichEntitiesWithReferencesFieldsForStories = async (
  tempEntity: DistributionEntity | null,
  entity: DistributionEntity
): Promise<DistributionEntity> => {
  tempEntity = await getEntity(ForgeDapiEntityCode.stories, entity.slug);
  if (tempEntity?.references && tempEntity?.references?.sponsoredBy?.length > 0) {
    tempEntity.references.sponsoredBy[0].fields.partnerLogo = tempEntity?.references?.sponsoredBy[0].fields?.partnerLogo
      ? await getSingleAssetByTag(tempEntity?.references?.sponsoredBy[0].fields?.partnerLogo)
      : null;
  }
  return tempEntity as DistributionEntity;
};

/**
 * Enriches the given entity with references fields for events.
 *
 * @async
 * @param {DistributionEntity | null} tempEntity - The temporary entity to enrich.
 * @param {DistributionEntity} entity - The entity to enrich.
 * @returns {Promise<DistributionEntity>} The enriched entity.
 */
const customEnrichEntitiesWithReferencesFieldsForEvents = async (
  tempEntity: DistributionEntity | null,
  entity: DistributionEntity
): Promise<DistributionEntity> => {
  tempEntity = await getEntity(ForgeDapiEntityCode.events, entity.slug);
  return tempEntity as DistributionEntity;
};
