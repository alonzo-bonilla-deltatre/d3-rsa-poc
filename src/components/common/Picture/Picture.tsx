import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { CSSProperties } from 'react';
import Image, { getImageProps } from 'next/image';

type PictureProps = {
  src: string;
  alt: string;
  transformations?: ImageTransformations;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  imageStyle?: CSSProperties;
};

const Picture = ({
  src,
  className,
  alt,
  transformations,
  width,
  height,
  sizes,
  priority,
  imageStyle,
}: PictureProps) => {
  if (!src) {
    return null;
  }

  if (!transformations) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={imageStyle}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    );
  }

  const desktopSrc = getSrcWithTransformation(src, transformations?.desktop.transformation);
  const tabletSrc = getSrcWithTransformation(src, transformations?.tablet.transformation);
  const mobileSrc = getSrcWithTransformation(src, transformations?.mobile.transformation);

  alt = alt ? 'image: ' + alt : 'image'; // for accessibility we specify a different alt for each image

  const common = {
    alt: alt,
    width: width ?? transformations.mobile.width,
    height: height ?? transformations.mobile.height,
  };

  const {
    props: { srcSet: srcSetMobile },
  } = getImageProps({
    ...common,
    width: width ?? transformations.mobile.width,
    height: height ?? transformations.mobile.height,
    src: mobileSrc,
  });

  const {
    props: { srcSet: srcSetTablet },
  } = getImageProps({
    ...common,
    width: width ?? transformations.tablet.width,
    height: height ?? transformations.tablet.height,
    src: tabletSrc,
  });

  const {
    props: { srcSet: srcSetDesktop },
  } = getImageProps({
    ...common,
    width: width ?? transformations?.desktop.width,
    height: height ?? transformations?.desktop.height,
    src: desktopSrc,
  });

  const mobileWidth = width ?? transformations?.mobile.width;
  const mobileHeight = height ?? transformations?.mobile.height;

  return (
    <picture>
      <source
        srcSet={srcSetDesktop ?? desktopSrc}
        media="(min-width: 1024px)"
      ></source>
      <source
        srcSet={srcSetTablet ?? tabletSrc}
        media="(min-width: 768px)"
      ></source>
      <source
        srcSet={srcSetMobile ?? mobileSrc}
        media="(min-width: 640px)"
      ></source>

      <Image
        src={mobileSrc}
        width={mobileWidth}
        height={mobileHeight}
        alt={alt}
        className={className}
        style={imageStyle}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

export default Picture;
