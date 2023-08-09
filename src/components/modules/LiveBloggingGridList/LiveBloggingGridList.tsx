import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import GridList from '@/components/common/list/Grid/Grid';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { getBlogs } from '@/services/liveBloggingDistributionService';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import { getFilteredItems } from '@/helpers/liveBloggingBlogEntityHelper';

type ModuleProps = {
  skip?: number;
  limit?: number;
  tags?: string;
} & HeaderTitleProps;

const LiveBloggingGridList = async ({ ...data }: ComponentProps) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink, skip, limit, tags } =
    data.properties as ModuleProps;

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

  return (
    items &&
    items.length > 0 && (
      <>
        <HeaderTitle
          headerTitle={headerTitle}
          headerTitleHeadingLevel={headerTitleHeadingLevel}
          hideHeaderTitle={hideHeaderTitle?.toString() === 'true'}
          ctaTitle={ctaTitle}
          ctaLink={ctaLink}
        ></HeaderTitle>
        <GridList items={items} />
      </>
    )
  );
};
export default LiveBloggingGridList;
