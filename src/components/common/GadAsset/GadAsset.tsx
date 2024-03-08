import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import Image from 'next/image';
import { CSSProperties } from 'react';

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
    <Image
      src={desktopSrc}
      alt={title ?? ''}
      width={width}
      height={height}
      className={`max-w-none w-full h-full object-contain ${className ? className : ''} `}
      loading={'lazy'}
      style={imageStyle}
    />
  );
};

export default GadAsset;
