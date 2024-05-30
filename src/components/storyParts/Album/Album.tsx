import { StoryPart } from '@/models/types/storyPart';
import { AlbumCarousel } from '@/components/commons/AlbumCarousel/AlbumCarousel';
import { getEntity } from '@/services/forgeDistributionService';
import { AlbumEntity, ForgeDapiEntityCode } from '@/models/types/forge';

const Album = async ({ data }: { data: StoryPart }) => {
  if (!data) return null;
  const entity = (await getEntity(ForgeDapiEntityCode.albums, data.slug)) as AlbumEntity;
  if (!entity) return null;
  const uniqueId = entity.slug;

  return (
    <AlbumCarousel
      albumEntity={entity}
      uniqueId={uniqueId}
      isStoryPart={true}
      hasNavigation
      hasPagination
    />
  );
};

export default Album;
