import { describe, expect, test } from '@jest/globals';
import {
  IsHorizontal,
  IsInnerInfo,
  getAdditionalLinkAttrs,
  getCardLinkContainerTag,
  getCardSettings,
  getCardSponsor,
  getImageTransformation,
  getInfoClassName,
  getLayoutType,
  getSummary,
  overrideEntityCardDesign,
} from '@/components/commons/cards/Card/CardHelpers';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { CardLayout, CardType } from '@/models/types/card';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';

describe('getImageTransformation', (): void => {
  test('should return default transformation if name is empty', (): void => {
    // ACT
    const result = getImageTransformation(null);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_landscape_detail);
  });
  test('should return vertical transformation if name is vertical', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.Vertical);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_portrait_detail);
  });
  test('should return vertical transformation if name is VerticalFull', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.VerticalFull);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_portrait_detail);
  });
  test('should return portrait transformation if name is portrait', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.PortraitFull);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_portrait_wide_detail);
  });
  test('should return big squared transformation if name is SquaredFullLg', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.SquaredFullLg);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_square_detail);
  });
  test('should return small squared transformation if name is SquaredFullSm', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.SquaredFullSm);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_square_detail);
  });
  test('should return thumbMedium transformation if name is ThumbMedium', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.ThumbMedium);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_small_landscape_detail);
  });
  test('should return small squaredSmallHorizontal transformation if name is SquaredSmallHorizontal', (): void => {
    // ACT
    const result = getImageTransformation(CardLayout.SquaredSmallHorizontal);

    // ASSERT
    expect(result).toEqual(transformations.thumbnail_square_detail);
  });
});
describe('IsInnerInfo', (): void => {
  test('should return false if layout is empty', (): void => {
    // ACT
    const result = IsInnerInfo(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if layout is not full', (): void => {
    // ACT
    const result = IsInnerInfo(CardLayout.Portrait);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return true if layout is PortraitFull', (): void => {
    // ACT
    const result = IsInnerInfo(CardLayout.PortraitFull);
    // ASSERT
    expect(result).toEqual(true);
  });
  test('should return true if layout is LandscapeFull', (): void => {
    // ACT
    const result = IsInnerInfo(CardLayout.LandscapeFull);
    // ASSERT
    expect(result).toEqual(true);
  });
  test('should return true if layout is SquaredFullSm', (): void => {
    // ACT
    const result = IsInnerInfo(CardLayout.SquaredFullSm);
    // ASSERT
    expect(result).toEqual(true);
  });
  test('should return true if layout is SquaredFullLg', (): void => {
    // ACT
    const result = IsInnerInfo(CardLayout.SquaredFullLg);
    // ASSERT
    expect(result).toEqual(true);
  });
});
describe('getInfoClassName', (): void => {
  test('should return default info class name if name is empty', (): void => {
    // ACT
    const result = getInfoClassName(null);
    // ASSERT
    expect(result).toEqual('card__info--outer');
  });
  test('should return custom info class name if name is PortraitFull', (): void => {
    // ACT
    const result = getInfoClassName(CardLayout.PortraitFull);
    // ASSERT
    expect(result).toContain('card__info--inner');
  });
  test('should return custom info class name if name is LandscapeFull', (): void => {
    // ACT
    const result = getInfoClassName(CardLayout.LandscapeFull);
    // ASSERT
    expect(result).toContain('card__info--inner');
  });
  test('should return custom info class name if name is SquaredFullLg', (): void => {
    // ACT
    const result = getInfoClassName(CardLayout.SquaredFullLg);
    // ASSERT
    expect(result).toContain('card__info--inner');
  });
  test('should return custom info class name if name is SquaredFullSm', (): void => {
    // ACT
    const result = getInfoClassName(CardLayout.SquaredFullSm);
    // ASSERT
    expect(result).toContain('card__info--inner');
  });
  test('should return custom info class name if name is ThumbMediumHorizontal', (): void => {
    // ACT
    const result = getInfoClassName(CardLayout.ThumbMediumHorizontal);
    // ASSERT
    expect(result).toContain('card__info--outer');
  });
});
describe('getSummary', (): void => {
  // ARRANGE
  const entity = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
  };
  const entity2 = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    headline: 'my headline',
  };
  const entity3 = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.brightcoveVideo,
  };
  const entity4 = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.brightcoveVideo,
    fields: {
      description: 'my description',
    },
  };
  const entity5 = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.shopProduct,
  };
  const entity6 = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.shopProduct,
    fields: {
      description: 'my description',
    },
  };
  test('should return empty string if has no headline', (): void => {
    // ACT
    const result = getSummary(entity);
    // ASSERT
    expect(result).toEqual('');
  });
  test('should return headline if it has headline', (): void => {
    // ACT
    const result = getSummary(entity2);
    // ASSERT
    expect(result).toEqual('my headline');
  });
  test('should return empty string if has no description', (): void => {
    // ACT
    const result = getSummary(entity3);
    // ASSERT
    expect(result).toEqual('');
  });
  test('should return description if brightcovevideo has description', (): void => {
    // ACT
    const result = getSummary(entity4);
    // ASSERT
    expect(result).toEqual('my description');
  });
  test('should return description if shop-product has description', (): void => {
    // ACT
    const result = getSummary(entity6);
    // ASSERT
    expect(result).toEqual('my description');
  });
  test('should return description if shop-product has no description', (): void => {
    // ACT
    const result = getSummary(entity5);
    // ASSERT
    expect(result).toEqual('');
  });
});
describe('getLayoutType', (): void => {
  test('should return default value if property is null', (): void => {
    // ACT
    const result = getLayoutType(null);
    // ASSERT
    expect(result).toEqual(CardLayout.Portrait);
  });
  test('should return default value if property is undefined', (): void => {
    // ACT
    const result = getLayoutType(undefined);
    // ASSERT
    expect(result).toEqual(CardLayout.Portrait);
  });
  test('should return custom default value if property is null', (): void => {
    // ACT
    const result = getLayoutType(null, CardLayout.Squared);
    // ASSERT
    expect(result).toEqual(CardLayout.Squared);
  });
  test('should return custom value if property is custom', (): void => {
    // ACT
    const result = getLayoutType(CardLayout.Squared);
    // ASSERT
    expect(result).toEqual(CardLayout.Squared);
  });
});
describe('IsHorizontal', (): void => {
  test('should return false if layout is empty', (): void => {
    // ACT
    const result = IsHorizontal(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if layout is not horizontal', (): void => {
    // ACT
    const result = IsHorizontal(CardLayout.Landscape);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return true if layout is Horizontal', (): void => {
    // ACT
    const result = IsHorizontal(CardLayout.LandscapeHorizontal);
    const result2 = IsHorizontal(CardLayout.LandscapeHorizontal);
    // ASSERT
    expect(result).toEqual(true);
    expect(result2).toEqual(true);
  });
});
describe('getCardSponsor', (): void => {
  // ARRANGE
  const entity = {
    ...emptyDistributionEntity,
  };
  const partner = {
    ...emptyDistributionEntity,
    fields: {
      partnerName: 'sponsor1',
      partnerLogo: 'sponsor1Tag',
    },
  };
  const entity2 = {
    ...emptyDistributionEntity,
    references: {
      sponsoredBy: [
        { ...partner },
        {
          ...emptyDistributionEntity,
          fields: {
            partnerName: 'sponsor2',
            partnerLogo: 'sponsor2Tag',
          },
        },
      ],
    },
  };
  test('should return null if sponsor is null', (): void => {
    // ACT
    const result = getCardSponsor(entity);
    // ASSERT
    expect(result).toEqual(null);
  });
  test('should return sponsor if the entity is sponsored', (): void => {
    // ACT
    const result = getCardSponsor(entity2);
    // ASSERT
    expect(result).toEqual(partner);
  });
});
describe('getCardSettings', (): void => {
  // ARRANGE
  const defaultStyle = {
    isInnerInfo: false,
    isHorizontal: false,
    hasBottomPolygon: true,
    poligonColor: 'bg-light-blue',
    cardClassName: 'card portrait card__default  ',
    cardContainerClassName: 'card__container',
    cardImgClassName: 'card__image cutter-bottom',
    cardInfoClassName: 'card__info--outer',
    imageTransformations: transformations.thumbnail_portrait_wide_detail,
    className: 'card__media',
    headingTitleClass: 'd3-ty-heading-5',
    rooflineClass: 'd3-ty-sec-navigation',
    dateClass: 'd3-ty-tag-large',
  };
  test('should return MediaCard card if is CardType is null', (): void => {
    // ACT
    const result = getCardSettings(null, null, null);
    // ASSERT
    expect(result?.style?.cardClassName).toContain('card__media');
  });
  test('should return rounded card if is VideoCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.Video, null, null);
    // ASSERT
    expect(result?.style?.cardInfoClassName).toContain('rounded-lg');
    expect(result?.style?.cardContainerClassName).toContain('rounded-lg');
  });
  test('should return polygon card if is SmallNewsCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.SmallNews, null, null);
    // ASSERT
    expect(result?.style?.cardFigureClassName).toContain('cutter-right');
  });
  test('should return polygon card if is Promo', (): void => {
    // ACT
    const result = getCardSettings(CardType.Promo, null, null);
    // ASSERT
    expect(result?.style?.cardFigureClassName).not.toContain('cutter-bottom');
  });
  test('should return polygon card if is SmallNewsCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.SmallestNews, null, null);
    // ASSERT
    expect(result?.style?.cardFigureClassName).toContain('cutter-right');
  });
  test('shouldn-t return rounded card if is MediaCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.MediaMixed, null, null);
    // ASSERT
    expect(result?.style?.cardInfoClassName).toContain('rounded-lg');
    expect(result?.style?.cardContainerClassName).toContain('rounded-lg');
  });
  test('should return card with right polygon if is SmallNewsCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.SmallNews, null, null);
    // ASSERT
    expect(result?.style?.cardFigureClassName).toContain('cutter-right');
    expect(result?.style?.cardImgClassName).not.toContain('hover:scale-110');
  });
  test('should not remove zoom if is MediaCard', (): void => {
    // ACT
    const result = getCardSettings(CardType.Media, null, null);
    // ASSERT
    expect(result?.style?.cardImgClassName).toContain('hover:scale-110');
  });
  test('should return card with bottom polygon if is SmallestNewsBottomPolygon', (): void => {
    // ACT
    const result = getCardSettings(CardType.SmallestNewsBottomPolygon, null, null);
    // ASSERT
    expect(result?.style?.cardFigureClassName).toContain('cutter-bottom');
  });
});
describe('getAdditionalLinkAttrs', (): void => {
  // ARRANGE
  const entity = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    url: 'valid-url',
  };
  const entityWithNoLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    url: '#nolink',
  };
  const entityWithoutLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    text: 'text',
  };
  const validAttr = {
    href: 'valid-url',
    'aria-label': 'title',
  };
  test('should return valid attributes if entity is valid and has link', (): void => {
    // ACT
    const result = getAdditionalLinkAttrs(entity);
    // ASSERT
    expect(result).toEqual(validAttr);
  });
  test('should return no attributes if has #nolink or hasNoLink', (): void => {
    // ACT
    const result = getAdditionalLinkAttrs(entityWithNoLink);
    const result2 = getAdditionalLinkAttrs(entityWithoutLink);
    // ASSERT
    expect(result).toEqual({});
    expect(result2).toEqual({});
  });
});
describe('getCardLinkContainerTag', (): void => {
  // ARRANGE
  const entity = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    url: 'valid-url',
  };
  const entityWithNoLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    url: '#nolink',
  };
  const entityWithoutLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.story,
    title: 'title',
    text: 'text',
  };
  const promoWithLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.promo,
    url: '',
    fields: {
      url: {
        url: 'valid-url',
      },
    },
  };
  const promoWithoutLink = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.promo,
    url: '',
  };

  test('should return A TAG if entity is valid and has link', (): void => {
    // ACT
    const result = getCardLinkContainerTag(entity);
    // ASSERT
    expect(result).toEqual('a');
  });
  test('should return no attributes if has #nolink or hasNoLink', (): void => {
    // ACT
    const result = getCardLinkContainerTag(entityWithNoLink);
    const result2 = getCardLinkContainerTag(entityWithoutLink);
    // ASSERT
    expect(result).toEqual('div');
    expect(result2).toEqual('div');
  });
  test('should return A TAG if promo has url', (): void => {
    // ACT
    const result = getCardLinkContainerTag(promoWithLink);
    // ASSERT
    expect(result).toEqual('a');
  });
  test('should return no attributes if promo has no url', (): void => {
    // ACT
    const result = getCardLinkContainerTag(promoWithoutLink);
    // ASSERT
    expect(result).toEqual('div');
  });
});

describe('overrideEntityCardDesign', (): void => {
  // ARRANGE
  const cardDesign = {
    cardType: CardType.Default,
  };
  const cardDesignAlbum = {
    cardType: CardType.AlbumList,
  };
  const entity = {
    ...emptyDistributionEntity,
    entityCode: ForgeEntityCode.album,
    title: 'title',
    url: 'valid-url',
  };
  test('should return cardDesign if cardType is not Default', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesignAlbum, ForgeEntityCode.album);
    // ASSERT
    expect(result).toEqual(cardDesignAlbum);
  });
  test('should return album cardDesign if cardType is Album', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.album);
    // ASSERT
    expect(result?.cardType).toEqual(cardDesignAlbum.cardType);
  });
  test('should return Video cardDesign if cardType is brightcovevideo', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.brightcoveVideo);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Video);
  });
  test('should return Player cardDesign if cardType is player', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.player);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Player);
  });
  test('should return Shop cardDesign if cardType is shop-product', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.shopProduct);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Shop);
  });
  test('should return Promo cardDesign if cardType is promo', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.promo);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Promo);
  });
  test('should return Event cardDesign if cardType is event', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.event);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Event);
  });
  test('should return Media cardDesign if cardType is story', (): void => {
    // ACT
    const result = overrideEntityCardDesign(cardDesign, ForgeEntityCode.story);
    // ASSERT
    expect(result?.cardType).toEqual(CardType.Media);
  });
});
