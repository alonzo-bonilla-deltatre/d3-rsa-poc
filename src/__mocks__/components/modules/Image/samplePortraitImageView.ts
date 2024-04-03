import {
  centerImageContainerCssClass,
  centerLinkCssClass,
  defaultView,
  leftImageContainerCssClass,
  leftLinkCssClass,
  rightImageContainerCssClass,
  rightLinkCssClass,
} from '@/__mocks__/components/modules/Image/sampleImageView';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';

export const portraitExtraSmallLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraSmall,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const portraitSmallLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_small,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const portraitMediumLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_medium,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const portraitLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_large,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const portraitExtraLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraLarge,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const portraitExtraExtraLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraExtraLarge,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};

export const portraitExtraSmallCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraSmall,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const portraitSmallCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_small,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const portraitMediumCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_medium,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const portraitLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_large,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const portraitExtraLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraLarge,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const portraitExtraExtraLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraExtraLarge,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};

export const portraitExtraSmallRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraSmall,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const portraitSmallRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_small,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const portraitMediumRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_medium,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const portraitLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_large,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const portraitExtraLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraLarge,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const portraitExtraExtraLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_portrait_extraExtraLarge,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
