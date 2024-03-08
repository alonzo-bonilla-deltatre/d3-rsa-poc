import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import AlbumListCarouselView from '@/components/modules/AlbumListCarousel/AlbumListCarouselView';
import { customEnrichAlbumListWithElementCount } from '@/helpers/customForgeDistributionEntityHelper';
import { getDarkClass, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardLayout, CardOptions, CardType } from '@/models/types/card';
import { NavButtonSize } from '@/models/types/carousel';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { getEntityList } from '@/services/forgeDistributionService';

import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { parseFieldValue } from '@/utilities/fieldValueParser';

const AlbumListCarousel = async ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    skip,
    limit,
    selectionSlug,
    ctaLink,
    ctaTitle,
    isDark,
  } = data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const hasPagination = false;
  const hasNavigation = true;

  const cardOptions = {
    hideAuthor: true,
  } as CardOptions;
  const cardType = CardType.Album;
  const cardLayout = CardLayout.VerticalFull;
  const cardDesign = getCardSettings(cardType, cardOptions, cardLayout);

  let items = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit: getNumberProperty(limit, 10),
    variables: data.variables,
  })) as DistributionEntity[];

  if (!items?.length) return null;

  items = await customEnrichAlbumListWithElementCount(items);

  const albumListCarouselViewUniqueId = selectionSlug ?? '';

  return (
    <AlbumListCarouselView
      data={{
        items: items,
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasPagination: hasPagination,
        hasNavigation: hasNavigation,
        uniqueId: albumListCarouselViewUniqueId,
        navButtonSize: NavButtonSize.Large,
        cardDesign: cardDesign,
        sectionClassName: getDarkClass(isDark),
      }}
    />
  );
};
export default AlbumListCarousel;
