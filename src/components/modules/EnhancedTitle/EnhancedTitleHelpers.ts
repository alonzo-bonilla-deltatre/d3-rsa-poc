import { WrapperWithBackgroundProps } from '@/components/common/WrapperWithBackground/WrapperWithBackground';
import { DistributionEntity } from '@/models/types/forge';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';

export const getGradientClasses = (contentAlignment: string | undefined): string => {
  const alignmentClassName: Record<string, string> = {
    left: 'before:from-black before:bg-gradient-to-r lg:before:right-1/2',
    center:
      'before:bg-[linear-gradient(to_right,rgba(23,23,23,0.4)_0%,rgba(23,23,23,0.7)_20%,rgba(23,23,23,0.7)_80%,rgba(23,23,23,0.4)_100%)] lg:before:bg-[linear-gradient(to_right,rgba(23,23,23,0)_0%,rgba(23,23,23,0.6)_20%,rgba(23,23,23,0.8)_40%,rgba(23,23,23,0.8)_60%,rgba(23,23,23,0.6)_80%,rgba(23,23,23,0)_100%)]',
    right: 'before:from-black before:bg-gradient-to-l lg:before:left-1/2',
  };
  const defaultClasses = 'before:content-[""] before:absolute before:inset-0';
  if (!contentAlignment) {
    return `${defaultClasses} ${alignmentClassName['left']}`;
  }
  return `${defaultClasses} ${alignmentClassName[contentAlignment]}`;
};

export const getGadAssetBgSizeClasses = (size: string | undefined): string => {
  const sizeClassName: Record<string, string> = {
    small: 'min-h-[100px] lg:min-h-[150px]',
    medium: 'min-h-[150px] lg:min-h-[220px]',
    large: 'min-h-[200px] lg:min-h-[300px]',
  };
  if (!size) {
    return sizeClassName['large'];
  }
  return sizeClassName[size];
};

export const getGadAssetBgSize = (size: string | undefined): number => {
  const sizeClassName: Record<string, string> = {
    small: '150',
    medium: '180',
    large: '200',
  };
  if (!size) {
    return Number(sizeClassName['large']);
  }
  return Number(sizeClassName[size]);
};
export const getGadAssetBgSizeMobile = (size: string | undefined): number => {
  const sizeClassName: Record<string, string> = {
    small: '100',
    medium: '110',
    large: '120',
  };
  if (!size) {
    return Number(sizeClassName['large']);
  }
  return Number(sizeClassName[size]);
};
export const getPhotoBgSizeClasses = (size: string | undefined): string => {
  const sizeClassName: Record<string, string> = {
    small: 'min-h-[180px] lg:min-h-[210px]',
    medium: 'min-h-[200px] lg:min-h-[320px]',
    large: 'min-h-[350px] lg:min-h-[450px]',
  };
  if (!size) {
    return sizeClassName['large'];
  }
  return sizeClassName[size];
};

export const setPhotoBackground = (
  imageEntity: DistributionEntity,
  imageTransformation: ImageTransformations,
  additionalClasses: string,
  hasMenu: boolean | '' | undefined
) => {
  const src = imageEntity.image?.templateUrl;
  return {
    imageUrl: getSrcWithTransformation(src, imageTransformation?.desktop.transformation),
    imageMobileUrl: getSrcWithTransformation(src, imageTransformation?.mobile.transformation),
    additionalClasses: `${additionalClasses}`,
    clippedBackground: !hasMenu,
  } as WrapperWithBackgroundProps;
};
export const setGadAssetBackground = (
  asset: GraphicAssetsDashboardItem,
  imageTransformation: ImageTransformations,
  size: string | undefined
) => {
  return {
    imageUrl: getSrcWithTransformation(asset.assetUrl, imageTransformation.desktop.transformation),
    imageMobileUrl: getSrcWithTransformation(asset.assetUrl, imageTransformation.mobile.transformation),
    size: getGadAssetBgSize(size),
    sizeMobile: getGadAssetBgSizeMobile(size),
    position: 'bottom-right',
    sizeClass: 'bg-cover',
    additionalClasses: 'bg-transparent',
  } as WrapperWithBackgroundProps;
};
export const setDefaultBackground = () => {
  return {
    imageUrl: '/assets/article-header-background.svg',
    imageMobileUrl: '/assets/article-header-background.svg',
    size: 200,
    sizeMobile: 120,
    position: 'bottom-right',
    sizeClass: 'bg-cover',
    additionalClasses: 'bg-transparent',
  } as WrapperWithBackgroundProps;
};
