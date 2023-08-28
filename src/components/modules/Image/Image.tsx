import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getSingleAssetByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getImageContainerCssClass, getLinkCssClass, transformations } from '@/components/modules/Image/ImageHelper';
import ImageView from '@/components/modules/Image/ImageView';
import React from 'react';

type ModuleProps = {
  slug?: string;
  ratio?: string;
  size?: string;
  alignment?: string;
};

const Image = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Image module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    return <div />;
  }

  const imageEntity = await getEntity('page-builder-gad-asset', properties?.slug);
  const asset = (await getSingleAssetByTag(imageEntity?.fields.tag?.toString())) as GraphicAssetsDashboardItem;
  const imageTransformation =
    transformations[
      `${properties.ratio ? properties.ratio : 'landscape'}_${properties.size ? properties.size : 'large'}`
    ];
  const link = imageEntity?.fields.clickThroughUrl?.toString() ?? '#nolink';
  const caption = imageEntity?.fields.caption?.toString() ?? '';

  return imageEntity && asset && imageTransformation ? (
    <ImageView
      link={link}
      linkCssClass={getLinkCssClass(properties.alignment)}
      imageContainerCssClass={getImageContainerCssClass(properties.alignment)}
      imageTransformation={imageTransformation}
      imageEntity={imageEntity}
      asset={asset}
      caption={caption}
    />
  ) : (
    <div />
  );
};

export default Image;
