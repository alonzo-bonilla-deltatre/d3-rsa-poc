import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getSingleAssetByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageTransformations } from '@/models/types/images';
import { transformations } from '@/utilities/cloudinaryTransformations';
import Picture from '@/components/common/Picture/Picture';

type ModuleProps = {
  slug?: string;
  ratio?: string;
  assetWidth?: number;
  assetHeight?: number;
};

const Image = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    logger.log('Cannot render Image module with empty slug', LoggerLevel.warning);
    return <div />;
  }

  const namedTransformation = properties.ratio ? `image${properties.ratio}` : 'imageLandscape';
  const imageEntity = await getEntity('page-builder-gad-asset', properties?.slug);
  const asset = (await getSingleAssetByTag(imageEntity?.fields.tag?.toString())) as GraphicAssetsDashboardItem;
  const imageTransformation = transformations[namedTransformation] as ImageTransformations;
  const link = imageEntity?.fields.clickThroughUrl?.toString() ?? '#nolink';
  const caption = imageEntity?.fields.caption?.toString() ?? '';

  return imageEntity && asset ? (
    <a href={link}>
      <figure className="col-start-1 row-start-1">
        <Picture
          src={asset.assetUrl}
          className="w-full h-full object-cover"
          transformations={imageTransformation}
          alt={imageEntity?.fields.altText?.toString() ?? imageEntity.title}
        />
      </figure>
      {caption && <p className="mt-8 mb-3">{caption}</p>}
    </a>
  ) : (
    <div />
  );
};

export default Image;
