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

export const originalExtraSmallLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraSmall,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const originalSmallLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_small,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const originalMediumLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_medium,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const originalLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_large,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const originalExtraLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraLarge,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};
export const originalExtraExtraLargeLeft = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraExtraLarge,
  linkCssClass: leftLinkCssClass,
  imageContainerCssClass: leftImageContainerCssClass,
};

export const originalExtraSmallCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraSmall,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const originalSmallCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_small,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const originalMediumCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_medium,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const originalLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_large,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const originalExtraLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraLarge,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};
export const originalExtraExtraLargeCenter = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraExtraLarge,
  linkCssClass: centerLinkCssClass,
  imageContainerCssClass: centerImageContainerCssClass,
};

export const originalExtraSmallRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraSmall,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const originalSmallRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_small,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const originalMediumRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_medium,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const originalLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_large,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const originalExtraLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraLarge,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
export const originalExtraExtraLargeRight = {
  ...defaultView,
  imageTransformation: transformations.image_original_extraExtraLarge,
  linkCssClass: rightLinkCssClass,
  imageContainerCssClass: rightImageContainerCssClass,
};
