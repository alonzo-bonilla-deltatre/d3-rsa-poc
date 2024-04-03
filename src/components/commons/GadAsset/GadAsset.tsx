import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformationsUtility';
import { CSSProperties } from 'react';
import Picture from '@/components/commons/Picture/Picture';

type GadAssetProps = {
  src: string;
  width: number;
  height: number;
  title: string;
  transformations: ImageTransformations;
  className?: string;
  imageStyle?: CSSProperties;
};

const GadAsset = ({ src, width, height, title, transformations, className, imageStyle }: GadAssetProps) => {
  const canRender = transformations;
  const desktopSrc = getSrcWithTransformation(src, transformations?.desktop.transformation);

  if (!canRender) {
    return null;
  }

  return (
    <Picture
      src={desktopSrc}
      alt={title ?? 'image'}
      width={width}
      height={height}
      className={className}
      priority={false}
      imageStyle={imageStyle}
    />
  );
};

export default GadAsset;
