import React from 'react';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { ImageAsset } from '@/models/types/images';
import Picture from '@/components/commons/Picture/Picture';

type PhotoProps = {
  className?: string;
  slug?: string;
  image?: ImageAsset;
};

const Photo = ({ className, image }: PhotoProps) => {
  if (!image) {
    return null;
  }
  const photoCssClassName = getStringProperty(className, 'w-full h-full object-cover rounded-lg');
  return (
    <Picture
      src={image.templateUrl}
      alt={image.title ?? ''}
      transformations={transformations.thumbnail_landscape_detail}
      className={photoCssClassName}
    ></Picture>
  );
};

export default Photo;
