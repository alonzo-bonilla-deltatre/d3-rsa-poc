import GadAsset from '@/components/common/GadAsset/GadAsset';
import Link from '@/components/common/Link/Link';
import { DistributionEntity } from '@/models/types/forge';
import { PartnerFields } from '@/models/types/forge.customEntityFields';
import { LoggerLevel } from '@/models/types/logger';
import { getSingleAssetByTag } from '@/services/gadService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import logger from '@/utilities/logger';

type PartnerProps = {
  entity?: DistributionEntity;
  width: number;
  height: number;
  direction?: string;
  baseUrl?: string;
};

const Partner = async ({ entity, width, height, direction, baseUrl }: PartnerProps & {}) => {
  const partnerTag = entity && (entity.fields as PartnerFields).partnerLogo;
  const partnerName = entity && (entity.fields as PartnerFields).partnerName;
  const partnerLink = entity && (entity.fields as PartnerFields).partnerLink;

  if (!partnerTag) {
    logger.log('Cannot render Partner with empty logo GAD tag', LoggerLevel.warning);
    return null;
  }
  const logo = await getSingleAssetByTag(partnerTag);

  if (!logo) {
    return null;
  }

  const imageWrapperClass = direction !== 'vertical' ? 'w-full max-w-[200px] max-h-[50px]' : 'max-w-[100px]';

  if (partnerLink?.url) {
    return (
      <Link
        href={partnerLink.url}
        title={partnerLink?.accessibleText ? partnerLink.accessibleText : partnerName}
        className={`cursor-pointer relative ${imageWrapperClass}`}
        baseUrl={baseUrl}
      >
        <GadAsset
          src={logo.assetUrl}
          title={partnerName ?? ''}
          width={direction !== 'vertical' ? width : 100}
          height={direction !== 'vertical' ? height : 100}
          transformations={transformations.best_assets}
          className={'max-w-none w-full h-full object-contain'}
        />
      </Link>
    );
  }

  return (
    <div className={`relative ${imageWrapperClass}`}>
      <GadAsset
        src={logo.assetUrl}
        title={partnerName ?? ''}
        width={direction !== 'vertical' ? width : 200}
        height={direction !== 'vertical' ? height : 50}
        transformations={transformations.best_assets}
        className={'max-w-none w-full h-full object-contain'}
      />
    </div>
  );
};

export default Partner;
