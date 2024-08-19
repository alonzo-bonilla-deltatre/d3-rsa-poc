import AlbumListCarouselView from '@/components/modules/AlbumListCarousel/AlbumListCarouselView';
import { customEnrichAlbumListWithElementCount } from '@/helpers/customForgeDistributionEntityHelper';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { getEntityList } from '@/services/forgeDistributionService';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const AlbumListCarousel = async ({ data }: { data: ComponentProps }) => {
  const { skip, limit, selectionSlug, isFullWidth } = data.properties as EditorialListModuleProps;

  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle } = data.properties as HeaderTitleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

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
      items={items}
      isFullWidth={getBooleanProperty(isFullWidth)}
      uniqueId={albumListCarouselViewUniqueId}
      headerTitle={headerTitle}
      headerTitleHeadingLevel={headerTitleHeadingLevel}
      hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
    />
  );
};
export default AlbumListCarousel;
