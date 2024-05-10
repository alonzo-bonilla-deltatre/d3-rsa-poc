/* istanbul ignore file */
import { DistributionEntity, ForgeDapiEntityCode, ForgeEntityType } from '@/models/types/forge';
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
  // Add here your custom code to enrich the entities with a link rule request entity.
  // if (entities?.length > 0) {
  //   entities.forEach((entity) => {
  //     if (entity.type === ForgeEntityType.customEntity && entity.entityCode === ForgeEntityCode.event) {
  //       entity['eventslug'] = entity.slug;
  //     } else {
  //       entity.tags?.forEach((tag) => {
  //         if (tag.externalSourceName === `${ForgeEntityType.customEntity}.${ForgeEntityCode.event}`) {
  //           entity['eventslug'] = tag.slug;
  //         }
  //       });
  //     }
  //   });
  // }
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
  // Add here your custom code to enrich the entities with GAD assets fields.
  // for (const entity of entities) {
  //   await customEnrichEntitiesWithGadAssetsFieldsForPlayers(entity);
  // }
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
    // Add here your custom code to enrich the entities with references fields.
    // if (entity.type === ForgeEntityType.story) {
    //   tempEntity = await customEnrichEntitiesWithReferencesFieldsForStories(tempEntity, entity);
    // }
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