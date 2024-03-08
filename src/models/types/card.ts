import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import { PartnerEntity } from './forge.customEntityFields';
import { ImageTransformations } from './images';

export type CardProps = {
  entity: DistributionEntity | LiveBloggingBlogEntity;
  sponsor?: PartnerEntity | null;
  cardDesign?: CardDesign | null;
  cardUrl?: string | null;
};
export type CardDesign =
  | {
      cardType?: CardType | null;
      options?: CardOptions;
      layout?: CardLayout | null;
      style?: CardStyle | null;
    }
  | null
  | undefined;

export type CardStyle =
  | {
      isInnerInfo?: boolean;
      isHorizontal?: boolean;
      isRounded?: boolean;
      hasBottomPolygon?: boolean;
      hasDivider?: boolean;
      hasRightPolygon?: boolean;
      removeZoom?: boolean;
      poligonColor?: string;
      cardClassName?: string;
      cardContainerClassName?: string;
      cardFigureClassName?: string;
      cardImgClassName?: string;
      cardInfoClassName?: string;
      imageTransformations?: ImageTransformations;
      className?: string;
      headingTitleClass?: string;
      rooflineClass?: string;
      dateClass?: string;
      venueClass?: string;
      authorClass?: string;
      summaryClass?: string;
      descriptionClass?: string;
    }
  | null
  | undefined;

export type CardOptions = {
  hideIcon?: boolean;
  hideRoofline?: boolean;
  hideTitle?: boolean;
  hideDate?: boolean;
  hideAuthor?: boolean;
  hideSummary?: boolean;
  hideCta?: boolean;
  headingTitle?: string;
  isFeatured?: boolean;
};

export enum CardLayout {
  Default = 'default',
  Landscape = 'landscape',
  LandscapeFull = 'landscape-full',
  LandscapeHorizontal = 'landscape-horizontal',
  ThumbMedium = 'thumb-md',
  ThumbMediumHorizontal = 'thumb-md-horizontal',
  Portrait = 'portrait',
  PortraitFull = 'portrait-full',
  SquaredFullLg = 'squared-lg-full',
  SquaredFullSm = 'squared-sm-full',
  SquaredSmallHorizontal = 'squared-sm-horizontal',
  Squared = 'squared',
  SquaredHorizontal = 'squared-horizontal',
  Vertical = 'vertical',
  VerticalFull = 'vertical-full',
}

export enum CardType {
  Default = 'Default',
  Media = 'Media',
  MediaMixed = 'MediaMixed',
  Video = 'Video',
  Album = 'Album',
  AlbumList = 'AlbumList',
  SmallNews = 'SmallNews',
  SmallestNews = 'SmallestNews',
  SmallestNewsBottomPolygon = 'SmallestNewsBottomPolygon',
  Shop = 'Shop',
  Player = 'Player',
  Event = 'Event',
  EventFeatured = 'EventFeatured',
  Promo = 'Promo',
  Social = 'Social',
  KeyPages = 'KeyPages',
}
