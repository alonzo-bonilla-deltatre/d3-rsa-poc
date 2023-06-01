import { renderStoryPart } from '@/services/renderHandlers/renderStoryPart';
import { DistributionEntity } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';

type ModuleProps = {
  storyEntity: DistributionEntity;
};

const StoryParts = ({ ...props }: ModuleProps) => {
  const storyEntity = props.storyEntity;
  return (
    <section className="w-full container mx-auto mt-20">
      {storyEntity.parts.map((part: StoryPart) => {
        return <>{renderStoryPart(part)}</>;
      })}
    </section>
  );
};

export default StoryParts;
