import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import GridComponent from '@/components/commons/list/Grid/Grid';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';
import { CardsType } from '@/components/commons/cards';
import { getBlogs } from '@/services/liveBloggingDistributionService';

type LiveBloggingGridListProps = {
  itemsPerRow?: number;
} & EditorialListModuleProps &
  HeaderTitleProps;

const LiveBloggingGridList = async ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
    skip,
    limit,
    itemsPerRow,
    isFullWidth,
  } = data.properties as LiveBloggingGridListProps;

  const items = await getBlogs({
    skip,
    limit,
    variables: data.variables,
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
  });

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: getBooleanProperty(isFullWidth),
        hasFullWidthContent: getBooleanProperty(isFullWidth),
        sectionClassName: `${getBooleanProperty(isFullWidth) ? '-full-width' : 'px-2'}`,
        children: (
          <GridComponent
            items={items}
            itemsPerRow={itemsPerRow}
            cardsType={CardsType.DefaultCard}
          />
        ),
      }}
    />
  );
};
export default LiveBloggingGridList;
