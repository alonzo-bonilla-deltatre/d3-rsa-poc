import { transform } from '@/helpers/markdownHelper';
import { DistributionEntity } from '@/models/types/forge';
import { AccessibleLink, EventEntity, EventFields } from '@/models/types/forge.customEntityFields';
import { getSingleAssetByTag } from '@/services/gadService';

/**
 * Function to get an `EventEntity` based on the provided `DistributionEntity`.
 * It retrieves the `EventFields` from the `DistributionEntity` and transforms the `description` field to HTML.
 * It also retrieves the assets for the `mobileBackgroundEventImage`, `backgroundEventImage`, and `eventLogo` fields.
 * The `EventEntity` is created with these fields and returned.
 *
 * @param {DistributionEntity} distributionEntity - The distribution entity to use.
 * @returns {Promise<EventEntity>} - The created `EventEntity`.
 * @throws {Error} - If an error occurs while transforming the `description` or retrieving the assets.
 */
export const getEventEntity = async (distributionEntity: DistributionEntity): Promise<EventEntity> => {
  const fields = distributionEntity?.fields as EventFields;
  const descriptionHtml = await transform(fields?.description ?? '');
  const mobileBackgroundEventImageAsset = fields?.mobileBackgroundEventImage
    ? await getSingleAssetByTag(fields?.mobileBackgroundEventImage)
    : null;
  const backgroundEventImageAsset = fields?.backgroundEventImage
    ? await getSingleAssetByTag(fields?.backgroundEventImage)
    : null;
  const eventLogoAsset = fields?.eventLogo ? await getSingleAssetByTag(fields?.eventLogo) : null;

  const eventEntity = {
    ...fields,
    descriptionHtml,
    mobileBackgroundEventImageAsset,
    backgroundEventImageAsset,
    eventLogoAsset,
  } as EventEntity;

  return { ...distributionEntity, ...eventEntity };
};
