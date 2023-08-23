import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getSingleAssetByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { transformations, getLinkCssClass, getImageContainerCssClass } from '@/components/modules/Image/ImageHelper';
import Image from 'next/image';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';

type ModuleProps = {
  slug?: string;
  ratio?: string;
  size?: string;
  alignment?: string;
};

const ImageBlock = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Image module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    return <div />;
  }

  const imageEntity = await getEntity('page-builder-gad-asset', properties?.slug);
  const asset = (await getSingleAssetByTag(imageEntity?.fields.tag?.toString())) as GraphicAssetsDashboardItem;
  const imageTransformation = transformations[`${properties.ratio}_${properties.size}`];
  const link = imageEntity?.fields.clickThroughUrl?.toString() ?? '#nolink';
  const caption = imageEntity?.fields.caption?.toString() ?? '';

  return imageEntity && asset && imageTransformation ? (
    <a
      href={link}
      className={getLinkCssClass(properties.alignment)}
    >
      <figure
        className={`col-start-1 row-start-1 grid-element relative ${getImageContainerCssClass(properties.alignment)}`}
      >
        <Image
          width={imageTransformation.mobileWidth}
          height={imageTransformation.mobileHeight}
          alt={imageEntity?.fields.altText?.toString() ?? imageEntity.title}
          className={`w-full h-full object-cover`}
          src={getSrcWithTransformation(asset.assetUrl, imageTransformation.desktop)}
          sizes="100vw"
          style={{
            width: `${imageTransformation.mobileWidth}px`,
            height: 'auto',
          }}
          loading={'lazy'}
        />
      </figure>
      {caption && <p className="mt-8 mb-3">{caption}</p>}
    </a>
  ) : (
    <div />
  );
};

export default ImageBlock;
