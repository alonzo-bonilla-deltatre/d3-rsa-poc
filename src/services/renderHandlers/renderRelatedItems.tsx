import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import { DistributionEntity, ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';
import { ReturnComponentRender } from '@/models/types/components';

import renderEditorialRelatedItem from '@/components/relatedItems/EditorialEntity/EditorialEntityWrapper';
import renderPromoRelatedItem from '@/components/relatedItems/Promo/PromoWrapper';

/**
 * Type definition for the keys of the `relatedItemsList` object.
 * It includes the `ForgeEntityType.story` and the `ForgeEntityCode` values for YouTube and Brightcove videos and promos.
 */
type RelatedItemsKey =
  | Extract<ForgeEntityType, ForgeEntityType.story>
  | Extract<ForgeEntityCode, ForgeEntityCode.youTubeVideo | ForgeEntityCode.brightcoveVideo | ForgeEntityCode.promo>;

/**
 * A list of related items components mapped to their respective render functions.
 * Each function takes a `DistributionEntity` and returns a `ReturnComponentRender`.
 */
const relatedItemsList: Record<RelatedItemsKey, (item: DistributionEntity) => ReturnComponentRender> = {
  [ForgeEntityType.story]: renderEditorialRelatedItem,
  [ForgeEntityCode.youTubeVideo]: renderEditorialRelatedItem,
  [ForgeEntityCode.brightcoveVideo]: renderEditorialRelatedItem,
  [ForgeEntityCode.promo]: renderPromoRelatedItem,
};

/**
 * Function to render a related item based on the provided `DistributionEntity`.
 * It uses the `type` or `entityCode` of the `DistributionEntity` to find the corresponding render function in `relatedItemsList`.
 * If a render function is found, it is called with the `DistributionEntity`.
 * If no render function is found, a warning is logged and `null` is returned.
 *
 * @param {DistributionEntity} item - The distribution entity to render.
 * @returns {ReturnComponentRender} - The rendered component or `null` if no render function was found.
 */
export const renderRelatedItem = (item: DistributionEntity): ReturnComponentRender => {
  let relItemType = item.type;
  if (relItemType === ForgeEntityType.customEntity) {
    relItemType = `${item.entityCode}` as ForgeEntityType;
  }
  const renderRelatedItem = relatedItemsList[relItemType as RelatedItemsKey];
  if (renderRelatedItem) {
    return renderRelatedItem({ ...item } as DistributionEntity);
  }
  logger.log(`Cannot render RELATED ITEM ${relItemType}`, LoggerLevel.warning);
  return null;
};
