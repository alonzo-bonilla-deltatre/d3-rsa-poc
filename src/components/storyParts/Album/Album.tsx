import { StoryPart } from '@/models/types/storyPart';
import { Album as AlbumComponent } from '@/components/common/Album/Album';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { getEntity } from '@/services/forgeDistributionService';

const Album = async ({ data }: { data: StoryPart }) => {
  if (!data) return null;
  const entity = (await getEntity(ForgeDapiEntityCode.albums, data.slug)) as DistributionEntity;
  if (!entity) return null;
  const uniqueId = entity.slug;

  return (
    <AlbumComponent
      albumEntity={entity}
      uniqueId={uniqueId}
      isStoryPart={true}
    />
  );
};

export default Album;
