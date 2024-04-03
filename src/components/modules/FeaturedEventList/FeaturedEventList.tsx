import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import { getDarkClass, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { FeaturedEventListSwiper } from '@/components/modules/FeaturedEventList/FeaturedEventListSwiper';
import FeaturedEventListHeader from '@/components/modules/FeaturedEventList/FeaturedEventListHeader';
import { DistributionEntity } from '@/models/types/forge';
import { CardLayout, CardType } from '@/models/types/card';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const EventList = async ({ data }: { data: ComponentProps }) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, skip, limit, selectionSlug, isDark } =
    data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const defaultItemLimit = 5;
  const items = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit: getNumberProperty(limit, defaultItemLimit),
    variables: data.variables,
  })) as DistributionEntity[] | null;

  const cardType = CardType.EventFeatured;
  const cardLayout = CardLayout.SquaredFullSm;
  const cardDesign = getCardSettings(cardType, null, cardLayout);
  if (!items?.length) return null;

  return (
    <div className={`featured-events relative d3-section ${getDarkClass(isDark)}`}>
      <FeaturedEventListHeader
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={hideHeaderTitle}
      ></FeaturedEventListHeader>
      <div className="swiper-container--watermark">{headerTitle}</div>
      <FeaturedEventListSwiper
        slides={items}
        cardDesign={cardDesign}
      />
    </div>
  );
};
export default EventList;
