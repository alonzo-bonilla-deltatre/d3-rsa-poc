import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import GridList from '@/components/commons/list/Grid/Grid';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { getBlogs } from '@/services/liveBloggingDistributionService';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import { getFilteredItems } from '@/helpers/liveBloggingBlogEntityHelper';
import { CardLayout, CardType } from '@/models/types/card';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';

type LiveBloggingGridListProps = {
  skip?: number;
  limit?: number;
  tags?: string;
} & HeaderTitleProps;

const LiveBloggingGridList = async ({ data }: { data: ComponentProps }) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink, skip, limit, tags } =
    data.properties as LiveBloggingGridListProps;

  const items = getFilteredItems(
    await getBlogs({
      hasThumbnailPlaceholder: true,
      hasLinkRules: true,
      tags,
      variables: data.variables,
    }),
    getNumberProperty(skip),
    getNumberProperty(limit)
  );
  const cardType = CardType.Media;
  const cardLayout = CardLayout.Portrait;
  const cardDesign = getCardSettings(cardType, null, cardLayout);

  if (!items?.length) return null;

  return (
    <>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        ctaTitle={ctaTitle}
        ctaLink={ctaLink}
      ></HeaderTitle>
      <GridList
        items={items}
        itemsPerRow={3}
        cardDesign={cardDesign}
      />
    </>
  );
};
export default LiveBloggingGridList;
