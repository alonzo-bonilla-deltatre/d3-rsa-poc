import { getBooleanPropertyDefault, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardDesign, CardLayout, CardOptions, CardStyle, CardType } from '@/models/types/card';
import { DistributionEntity, ForgeEntityCode } from '@/models/types/forge';
import { PartnerEntity } from '@/models/types/forge.customEntityFields';
import { ImageTransformations } from '@/models/types/images';
import { getCardSettingFromType } from '@/utilities/cardSettingsUtility';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import React from 'react';

export const getImageTransformation = (name: CardLayout | null): ImageTransformations => {
  switch (name) {
    case CardLayout.Vertical:
    case CardLayout.VerticalFull:
      return transformations.thumbnail_portrait_detail;
    case CardLayout.SquaredFullLg:
      return transformations.thumbnail_square_detail;
    case CardLayout.SquaredFullSm:
    case CardLayout.Squared:
    case CardLayout.SquaredHorizontal:
      return transformations.thumbnail_square_detail;
    case CardLayout.Portrait:
    case CardLayout.PortraitFull:
      return transformations.thumbnail_portrait_wide_detail;
    case CardLayout.ThumbMedium:
    case CardLayout.ThumbMediumHorizontal:
      return transformations.thumbnail_small_landscape_detail;
    case CardLayout.SquaredSmallHorizontal:
      return transformations.thumbnail_square_detail;
    default:
      return transformations.thumbnail_landscape_detail;
  }
};
export const IsInnerInfo = (name: CardLayout | null): boolean => {
  switch (name) {
    case CardLayout.SquaredFullLg:
    case CardLayout.SquaredFullSm:
    case CardLayout.PortraitFull:
    case CardLayout.LandscapeFull:
    case CardLayout.VerticalFull:
      return true;
    default:
      return false;
  }
};
export const IsHorizontal = (name: CardLayout | null): boolean => {
  return !(
    name !== CardLayout.LandscapeHorizontal &&
    name !== CardLayout.ThumbMediumHorizontal &&
    name !== CardLayout.SquaredSmallHorizontal &&
    name !== CardLayout.SquaredHorizontal
  );
};
export const getInfoClassName = (name: CardLayout | null): string => {
  switch (name) {
    case CardLayout.SquaredFullLg:
    case CardLayout.SquaredFullSm:
    case CardLayout.PortraitFull:
    case CardLayout.LandscapeFull:
    case CardLayout.VerticalFull:
      return 'card__info--inner dark';
    case CardLayout.ThumbMediumHorizontal:
    case CardLayout.LandscapeHorizontal:
    case CardLayout.SquaredHorizontal:
    case CardLayout.SquaredSmallHorizontal:
      return 'card__info--outer ml-2 lg:ml-4';
    default:
      return 'card__info--outer';
  }
};

export const getSummary = (entity: DistributionEntity | LiveBloggingBlogEntity): string => {
  switch (entity.entityCode) {
    case ForgeEntityCode.brightcoveVideo:
    case ForgeEntityCode.divaVideo:
      return entity?.fields?.description ? entity.fields?.description : '';
    case ForgeEntityCode.shopProduct:
      return entity?.fields?.description ? entity.fields?.description : '';
    default:
      return entity?.headline ? entity.headline : '';
  }
};

export const getLayoutType = (
  propertyValue: CardLayout | null | undefined,
  defaultValue: CardLayout = CardLayout.Portrait
): CardLayout => {
  return propertyValue ?? defaultValue;
};

const getCardOptions = (options: CardOptions | null | undefined): CardOptions => {
  return {
    hideIcon: getBooleanPropertyDefault(options?.hideIcon, false),
    hideRoofline: getBooleanPropertyDefault(options?.hideRoofline, false),
    hideTitle: getBooleanPropertyDefault(options?.hideTitle, false),
    hideDate: getBooleanPropertyDefault(options?.hideDate, false),
    hideAuthor: getBooleanPropertyDefault(options?.hideAuthor, true),
    hideCta: getBooleanPropertyDefault(options?.hideCta, false),
    hideSummary: getBooleanPropertyDefault(options?.hideSummary, false),
    headingTitle: options?.headingTitle,
  };
};

export const getCardSettings = (
  type: CardType | null | undefined,
  options: CardOptions | null | undefined,
  layout: CardLayout | null | undefined,
  cardClassName?: string | undefined
): CardDesign => {
  const cardType = type === undefined || !type ? CardType.Default : type;
  const cardOptions = getCardOptions(options);
  const cardLayout = getLayoutType(layout, CardLayout.Portrait);
  const cardClassNameByType = `card__${cardType?.toLowerCase()} ${getStringProperty(cardClassName)}`;
  const cardStyle = getCardStyle(cardLayout, cardClassNameByType);
  const additionalSettings = getCardSettingFromType(cardType);
  let settings = {
    cardType: cardType,
    options: {
      ...cardOptions,
      ...additionalSettings?.options,
    },
    layout: cardLayout,
    style: {
      ...cardStyle,
      ...additionalSettings?.style,
    },
  } as CardDesign;
  if (settings) {
    settings.style = addRoundedStyle(settings.style);
    settings.style = addBottomPolygonStyle(settings.style);
    settings.style = addRightPolygonStyle(settings.style);
    settings.style = removeZoomStyle(settings.style);
  }
  return settings;
};
const addRoundedStyle = (style: CardStyle): CardStyle => {
  if (!style || (style && !style.isRounded)) {
    return style;
  }
  const roundedClassName = 'rounded-lg';
  style.cardInfoClassName = `${style.cardInfoClassName} ${roundedClassName}`;
  style.cardContainerClassName = `${style.cardContainerClassName} ${roundedClassName}`;
  return style;
};
const addBottomPolygonStyle = (style: CardStyle): CardStyle => {
  if (!style || (style && !style.hasBottomPolygon)) {
    return style;
  }
  style.cardContainerClassName = `${style.cardContainerClassName} ${getStringProperty(style.poligonColor)}`;
  style.cardFigureClassName = 'cutter-bottom';
  return style;
};
const addRightPolygonStyle = (style: CardStyle): CardStyle => {
  if (!style || (style && !style.hasRightPolygon)) {
    return style;
  }
  style.cardContainerClassName = `${style.cardContainerClassName} ${getStringProperty(style.poligonColor)}`;
  style.cardFigureClassName = 'cutter-right';
  return style;
};
const removeZoomStyle = (style: CardStyle): CardStyle => {
  if (style && !style.removeZoom) {
    style.cardImgClassName = `${style.cardImgClassName} hover:scale-110  transition duration-300`;
    style.cardFigureClassName = `${style.cardFigureClassName} overflow-hidden`;
    return style;
  } else {
    return style;
  }
};

const getCardStyle = (layout: CardLayout, className: string | undefined): CardStyle => {
  const isInnerInfo = IsInnerInfo(layout);
  const isHorizontal = IsHorizontal(layout);
  const cClassName = getStringProperty(className, '');
  const cardClassName = `card ${layout} ${cClassName}`;
  const cardContainerClassName = `card__container`;
  const cardFigureClassName = '';
  const cardImgClassName = `block h-full w-full object-cover object-center`;
  const cardInfoClassName = getInfoClassName(layout);
  const imageTransformations = getImageTransformation(layout);
  return {
    isInnerInfo,
    isHorizontal,
    cardClassName,
    cardContainerClassName,
    cardFigureClassName,
    cardImgClassName,
    cardInfoClassName,
    imageTransformations,
    className: cClassName,
  } as CardStyle;
};

export const getCardSponsor = (entity: DistributionEntity): PartnerEntity | null => {
  return entity?.references?.sponsoredBy &&
    entity?.references?.sponsoredBy?.length > 0 &&
    entity?.references?.sponsoredBy[0]
    ? (entity?.references?.sponsoredBy[0] as PartnerEntity)
    : null;
};

const getEntityUrl = (entity: DistributionEntity) => {
  let entityUrl = entity.url;
  if (entity.entityCode === ForgeEntityCode.promo) {
    entityUrl = entity.fields?.url?.url;
  }
  return getStringProperty(entityUrl);
};
const hasValidCardUrl = (entity: DistributionEntity) => {
  const entityUrl = getEntityUrl(entity);
  return entityUrl && entityUrl !== '#nolink';
};

export const getAdditionalLinkAttrs = (entity: DistributionEntity) => {
  const hasCardUrl = hasValidCardUrl(entity);
  return {
    ...(hasCardUrl ? { href: getEntityUrl(entity) } : undefined),
    ...(hasCardUrl ? { 'aria-label': entity.title } : undefined),
  };
};

export const getCardLinkContainerTag = (entity: DistributionEntity): keyof React.JSX.IntrinsicElements => {
  const hasCardUrl = hasValidCardUrl(entity);
  return hasCardUrl ? 'a' : 'div';
};

const getCardTypeByEntityCode = (entityCode: string): CardType => {
  switch (entityCode) {
    case ForgeEntityCode.album:
      return CardType.AlbumList;
    case ForgeEntityCode.brightcoveVideo:
    case ForgeEntityCode.youTubeVideo:
    case ForgeEntityCode.divaVideo:
      return CardType.Video;
    case ForgeEntityCode.player:
      return CardType.Player;
    case ForgeEntityCode.shopProduct:
      return CardType.Shop;
    case ForgeEntityCode.promo:
      return CardType.Promo;
    case ForgeEntityCode.event:
      return CardType.Event;
    default:
      return CardType.Media;
  }
};

export const overrideEntityCardDesign = (cardDesign: CardDesign, entityCode: string): CardDesign => {
  if (cardDesign?.cardType !== CardType.Default) {
    return cardDesign;
  }
  const customCardType = getCardTypeByEntityCode(entityCode);
  return getCardSettings(customCardType, cardDesign?.options, cardDesign?.layout);
};
