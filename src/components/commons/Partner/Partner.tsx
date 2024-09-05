import GadAsset from '@/components/commons/GadAsset/GadAsset';
import Link from '@/components/commons/Link/Link';
import { DistributionEntity } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getSingleAssetByTag } from '@/services/gadService';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import logger from '@/utilities/loggerUtility';

type PartnerProps = {
  entity?: DistributionEntity;
  width: number;
  height: number;
  direction?: string;
  baseUrl?: string;
};

const Partner = async ({ entity, width, height, direction, baseUrl }: PartnerProps & {}) => {
  const partnerLogo = entity?.fields?.partnerLogo;
  const partnerName = entity?.fields?.partnerName;
  const partnerLink = entity?.fields?.partnerLink;

  if (!partnerLogo) {
    logger.log('Cannot render Partner with empty logo GAD tag', LoggerLevel.warning);
    return null;
  }
  const logo = await getSingleAssetByTag(partnerLogo);

  if (!logo) {
    return null;
  }

  const imageWrapperClass = direction !== 'vertical' ? 'w-full max-w-[200px] max-h-[50px]' : 'max-w-[100px]';

  if (partnerLink?.url) {
    return (
      <Link
        href={partnerLink.url}
        title={partnerLink?.accessibleText ? partnerLink.accessibleText : partnerName}
        className={`relative cursor-pointer ${imageWrapperClass}`}
        baseUrl={baseUrl}
      >
        <GadAsset
          src={logo.assetUrl}
          title={partnerName ?? ''}
          width={direction !== 'vertical' ? width : 100}
          height={direction !== 'vertical' ? height : 100}
          transformations={transformations.best_assets}
          className="h-full w-full max-w-none object-contain"
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
        className="h-full w-full max-w-none object-contain"
      />
    </div>
  );
};

export default Partner;
