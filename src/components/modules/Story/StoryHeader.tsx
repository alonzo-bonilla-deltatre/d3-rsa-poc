import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type StoryHeaderProps = {
  storyEntity: DistributionEntity;
};

type StoryHeaderDefaultImage = {
  width: number;
  height: number;
  url: string;
};

const StoryHeader = ({ storyEntity }: StoryHeaderProps) => {
  const defaultThumbnail = {
    width: 300,
    height: 250,
    url: '/assets/default-thumbnail.jpg',
  } as StoryHeaderDefaultImage;

  const imageUrl = getSrcWithTransformation(
    storyEntity.thumbnail?.templateUrl ? storyEntity?.thumbnail?.templateUrl : defaultThumbnail.url,
    transformations.story_header_background.desktop.transformation
  );

  return (
    <ModuleContainer
      isFullWidth
      className="relative first:mt-0 lg:first:mt-0"
    >
      <div
        className="min-h-[40svh] bg-[length:100vh] bg-fixed bg-top bg-no-repeat md:min-h-[60svh] md:bg-cover lg:min-h-[80svh]"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      ></div>
    </ModuleContainer>
  );
};

export default StoryHeader;
