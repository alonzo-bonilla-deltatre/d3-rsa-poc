import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { CSSProperties } from 'react';
import Image, { getImageProps } from 'next/image';

type PictureProps = {
  src: string;
  alt: string;
  transformations: ImageTransformations;
  className?: string;
  priority?: boolean;
  imageStyle?: CSSProperties;
};

const Picture = ({
  src,
  className,
  alt,
  transformations,
  priority,
  imageStyle = {
    width: '100%',
    height: 'auto',
    aspectRatio: `${transformations.mobile.width} / ${transformations.mobile.height}`,
  },
}: PictureProps) => {
  if (!transformations || !src) {
    return null;
  }

  const desktopSrc = getSrcWithTransformation(src, transformations?.desktop.transformation);
  const tabletSrc = getSrcWithTransformation(src, transformations?.tablet.transformation);
  const mobileSrc = getSrcWithTransformation(src, transformations?.mobile.transformation);

  alt = alt ? 'image: ' + alt : 'image'; // for accessibility we specify a different alt for each image

  const common = {
    alt: alt,
    width: transformations.mobile.width,
    height: transformations.mobile.height,
  };

  const {
    props: { srcSet: srcSetMobile },
  } = getImageProps({
    ...common,
    width: transformations.mobile.width,
    height: transformations.mobile.height,
    src: mobileSrc,
  });

  const {
    props: { srcSet: srcSetTablet },
  } = getImageProps({
    ...common,
    width: transformations.tablet.width,
    height: transformations.tablet.height,
    src: tabletSrc,
  });

  const {
    props: { srcSet: srcSetDesktop },
  } = getImageProps({
    ...common,
    width: transformations?.desktop.width || transformations?.mobile.width,
    height: transformations?.desktop.height || transformations?.mobile.height,
    src: desktopSrc,
  });

  const mobileWidth = transformations?.mobile.width;
  const mobileHeight = transformations?.mobile.height;

  return (
    <picture>
      <source
        srcSet={srcSetDesktop}
        media="(min-width: 1024px)"
      ></source>
      <source
        srcSet={srcSetTablet}
        media="(min-width: 768px)"
      ></source>
      <source
        srcSet={srcSetMobile}
        media="(min-width: 640px)"
      ></source>

      <Image
        src={mobileSrc}
        width={mobileWidth}
        height={mobileHeight}
        alt={alt ?? ''}
        className={`max-w-none ${className ?? ''}`}
        style={imageStyle}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

export default Picture;
