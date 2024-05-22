import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformationsUtility';
import { CSSProperties } from 'react';
import Image, { getImageProps } from 'next/image';

type PictureProps = {
  src: string;
  alt: string;
  format?: string;
  transformations?: ImageTransformations;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  imageStyle?: CSSProperties;
  figureClassName?: string;
};

const Picture = ({
  src,
  alt,
  format,
  transformations,
  className,
  width,
  height,
  sizes,
  priority,
  imageStyle,
  figureClassName,
}: PictureProps) => {
  if (!src) {
    return null;
  }

  const isUnoptimizedImage = format?.endsWith('gif');

  if (!transformations) {
    return (
      <figure className={figureClassName}>
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
          unoptimized={isUnoptimizedImage}
          quality={100}
        />
      </figure>
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
    quality: 100,
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
    <figure className={figureClassName}>
      <picture>
        <source
          srcSet={!isUnoptimizedImage ? srcSetDesktop ?? desktopSrc : desktopSrc}
          media="(min-width: 1024px)"
        ></source>
        <source
          srcSet={!isUnoptimizedImage ? srcSetTablet ?? tabletSrc : tabletSrc}
          media="(min-width: 768px)"
        ></source>
        <source
          srcSet={!isUnoptimizedImage ? srcSetMobile ?? mobileSrc : mobileSrc}
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
          unoptimized={isUnoptimizedImage}
          quality={100}
        />
      </picture>
    </figure>
  );
};

export default Picture;
