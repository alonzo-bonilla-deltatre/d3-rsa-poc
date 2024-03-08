import React from 'react';
import Picture from '@/components/common/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { ImageAsset } from '@/models/types/images';

type PhotoProps = {
  className?: string;
  slug?: string;
  image?: ImageAsset;
};

const Photo = ({ className, slug, image }: PhotoProps) => {
  if (!slug || !image) {
    return null;
  }
  const photoCssClassName = getStringProperty(className, 'w-full h-full object-cover rounded-lg');
  return (
    <figure>
      <Picture
        src={image.templateUrl}
        alt={image.title ?? ''}
        transformations={transformations.thumbnail_wide_detail}
        className={photoCssClassName}
      ></Picture>
    </figure>
  );
};

export default Photo;
