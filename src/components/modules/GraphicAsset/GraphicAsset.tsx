import { ComponentProps } from '@/models/types/components';
import { getSingleAssetByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { ImageTransformationName, ImageTransformations } from '@/models/types/images';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

type GraphicAssetProps = {
  assetTag?: string;
  assetName?: string;
  assetLink?: string;
  assetWidth?: number;
  assetHeight?: number;
  transformation?: ImageTransformationName;
};

const GraphicAsset = async ({ data }: { data: ComponentProps }) => {
  const { assetTag, assetName, assetLink, assetWidth, assetHeight, transformation } =
    data.properties as GraphicAssetProps;
  const namedTransformation = transformation ?? ImageTransformationName.best_assets;
  const width = assetWidth ?? 50;
  const height = assetHeight ?? 50;
  const asset = (await getSingleAssetByTag(assetTag)) as GraphicAssetsDashboardItem;
  const imageTransformation = transformations[namedTransformation] as ImageTransformations;
  const link = assetLink ?? '#nolink';

  if (!asset || !asset?.assetUrl) {
    logger.log(`Cannot find GraphicAsset entity with tag ${assetTag} `, LoggerLevel.warning);
    return null;
  }

  return (
    <a
      href={link}
      className={'w-full flex justify-center'}
      aria-label={assetName ?? ''}
    >
      <div className={`max-w-[${assetWidth}px] max-h-[${assetHeight}px]`}>
        <GadAsset
          src={asset.assetUrl}
          className="max-sm:w-full"
          title={assetName ?? ''}
          transformations={imageTransformation}
          width={width}
          height={height}
        ></GadAsset>
      </div>
    </a>
  );
};
export default GraphicAsset;
