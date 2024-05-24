import AlbumListCarouselView from '@/components/modules/AlbumListCarousel/AlbumListCarouselView';
import { customEnrichAlbumListWithElementCount } from '@/helpers/customForgeDistributionEntityHelper';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { getEntityList } from '@/services/forgeDistributionService';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const AlbumListCarousel = async ({ data }: { data: ComponentProps }) => {
  const { skip, limit, selectionSlug } = data.properties as EditorialListModuleProps;

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
      uniqueId={albumListCarouselViewUniqueId}
      headerTitle={headerTitle}
      headerTitleHeadingLevel={headerTitleHeadingLevel}
      hideHeaderTitle={hideHeaderTitle}
    />
  );
};
export default AlbumListCarousel;
