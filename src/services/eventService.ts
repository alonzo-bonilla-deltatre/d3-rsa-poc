import { transform } from '@/helpers/markdownHelper';
import { DistributionEntity } from '@/models/types/forge';
import { AccessibleLink, EventEntity, EventFields } from '@/models/types/forge.customEntityFields';
import { getSingleAssetByTag } from '@/services/gadService';

export const emptyAccessibleLink: AccessibleLink = {
  displayText: '',
  accessibleText: '',
  url: '',
  openInNewTab: false,
};

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
