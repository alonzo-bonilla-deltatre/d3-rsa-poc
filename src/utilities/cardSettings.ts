import { CardDesign, CardType } from '@/models/types/card';

/**
 * Card design settings for different types of cards.
 *
 * Each card design setting includes style and options.
 * The style includes the CSS class names for different parts of the card and whether the card is rounded.
 * The options include whether to hide the author and summary.
 *
 * @typedef {Object} CardDesign
 * @property {Object} style - The style settings for the card.
 * @property {string} style.cardClassName - The CSS class name for the card.
 * @property {string} style.headingTitleClass - The CSS class name for the heading title.
 * @property {string} style.rooflineClass - The CSS class name for the roofline.
 * @property {string} style.summaryClass - The CSS class name for the summary.
 * @property {string} style.dateClass - The CSS class name for the date.
 * @property {boolean} style.isRounded - Whether the card is rounded.
 * @property {Object} options - The options for the card.
 * @property {boolean} options.hideAuthor - Whether to hide the author.
 * @property {boolean} options.hideSummary - Whether to hide the summary.
 */

export const VideoCard: CardDesign = {
  style: {
    cardClassName: 'card__video',
    headingTitleClass: 'd3-ty-body-large',
    rooflineClass: 'd3-ty-heading-4 text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
  },
};
export const ShopCard: CardDesign = {
  style: {
    cardClassName: 'card__shop',
    headingTitleClass: 'd3-ty-body-large',
    rooflineClass: 'd3-ty-heading-4 text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};
export const PlayerCard: CardDesign = {
  style: {
    cardClassName: 'card__player',
    headingTitleClass: 'd3-ty-body-large my-3',
    rooflineClass: 'd3-ty-heading-4 text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};
export const MediaCard: CardDesign = {
  style: {
    cardClassName: 'card__media',
    headingTitleClass: 'd3-ty-body-large',
    rooflineClass: 'd3-ty-tag-large text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: false,
    hasBottomPolygon: false,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};
export const EventCard: CardDesign = {
  style: {
    cardClassName: 'card__event',
    headingTitleClass: 'd3-ty-body-large my-3',
    rooflineClass: 'd3-ty-heading-4 text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};
export const EventCardFeatured: CardDesign = {
  style: {
    cardClassName: 'featured card portrait event--feat',
    cardContainerClassName: 'card__container event',
    headingTitleClass: 'd3-ty-heading-4',
    rooflineClass: 'd3-ty-heading-4 text-greyscale-white',
    summaryClass: 'd3-ty-description',
    dateClass: 'd3-ty-tag-large',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
    isFeatured: true,
  },
};
export const MediaCardMixed: CardDesign = {
  style: {
    cardClassName: 'card__media-mixed',
    headingTitleClass: 'd3-ty-heading-5 line-clamp-2',
    rooflineClass: 'card__info-roofline d3-ty-tag-large',
    dateClass: 'd3-ty-tag-small',
    hasBottomPolygon: false,
    hasDivider: true,
    isRounded: true,
    cardInfoClassName: 'w-full',
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};
export const AlbumCard: CardDesign = {
  style: {
    cardClassName: 'card__album',
    headingTitleClass: 'd3-ty-heading-3',
    isRounded: true,
  },
  options: {
    hideAuthor: true,
    hideDate: true,
    hideSummary: true,
  },
};
export const AlbumListCard: CardDesign = {
  style: {
    cardClassName: 'card__album-list even:translate-y-14 lg:even:translate-y',
    headingTitleClass: 'd3-ty-heading-4',
    isRounded: true,
    dateClass: 'd3-ty-tag-small',
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
    hideDate: false,
  },
};
export const SmallNewsCard: CardDesign = {
  style: {
    cardClassName: 'card__small-news',
    headingTitleClass: 'd3-ty-heading-5 line-clamp-3',
    rooflineClass: 'card__info-roofline d3-ty-tag-large lg:mb-2',
    dateClass: 'd3-ty-tag-small mt-1 lg:mt-3',
    cardContainerClassName: 'card__container w-1/2',
    cardInfoClassName: 'card__info--outer ml-2 lg:ml-4 w-1/2',
    hasRightPolygon: true,
    removeZoom: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};

export const SmallestNewsCard: CardDesign = {
  style: {
    cardClassName: 'card__smallest-news mb-2 lg:mb-4',
    headingTitleClass: 'd3-ty-heading-6 line-clamp-3',
    rooflineClass: 'card__info-roofline d3-ty-tag-large',
    dateClass: 'd3-ty-tag-small',
    cardContainerClassName: 'card__container w-1/3',
    cardInfoClassName: 'ml-2 lg:ml-4 w-2/3',
    hasRightPolygon: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};

export const SmallestNewsBottomPolygon: CardDesign = {
  style: {
    cardClassName: 'card__smallest-news mb-2 lg:mb-4',
    headingTitleClass: 'd3-ty-heading-6 line-clamp-3',
    rooflineClass: 'card__info-roofline d3-ty-tag-large',
    dateClass: 'd3-ty-tag-small',
    cardContainerClassName: 'card__container w-1/3',
    cardInfoClassName: 'ml-2 lg:ml-4 w-2/3',
    hasBottomPolygon: true,
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};

export const KeyPagesCard: CardDesign = {
  style: {
    cardClassName: 'card__media-mixed',
    headingTitleClass: 'd3-ty-heading-5 line-clamp-2',
    rooflineClass: 'card__info-roofline d3-ty-tag-large',
    dateClass: 'd3-ty-tag-small',
    hasBottomPolygon: false,
    hasDivider: true,
    isRounded: true,
    cardInfoClassName: 'w-full',
    cardFigureClassName: 'max-h-[80px] sm:max-h-[100px] md:max-h-[128px] xl:max-h-[180px]',
    cardImgClassName: 'max-h-[80px] sm:max-h-[100px] md:max-h-[128px] xl:max-h-[180px] object-contain',
  },
  options: {
    hideAuthor: true,
    hideSummary: true,
  },
};

/**
 * Returns the card design settings for a given card type.
 *
 * This function takes a card type as input and returns the corresponding card design settings.
 * If the card type is not provided, it returns the default card design settings.
 *
 * @param {CardType | null | undefined} type - The card type.
 * @returns {CardDesign} The card design settings for the given card type.
 */
export const getCardSettingFromType = (type: CardType | null | undefined): CardDesign => {
  switch (type) {
    case CardType.Video:
      return VideoCard;
    case CardType.Shop:
      return ShopCard;
    case CardType.Player:
      return PlayerCard;
    case CardType.Social:
    case CardType.Promo:
      return MediaCard;
    case CardType.Event:
      return EventCard;
    case CardType.EventFeatured:
      return EventCardFeatured;
    case CardType.Media:
      return MediaCard;
    case CardType.MediaMixed:
      return MediaCardMixed;
    case CardType.Album:
      return AlbumCard;
    case CardType.AlbumList:
      return AlbumListCard;
    case CardType.SmallNews:
      return SmallNewsCard;
    case CardType.SmallestNews:
      return SmallestNewsCard;
    case CardType.SmallestNewsBottomPolygon:
      return SmallestNewsBottomPolygon;
    case CardType.KeyPages:
      return KeyPagesCard;
  }
  return MediaCard;
};
