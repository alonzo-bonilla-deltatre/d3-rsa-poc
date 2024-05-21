import { renderStoryPart } from '@/services/renderHandlers/renderStoryPart';
import { DistributionEntity } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';

type StoryPartsProps = {
  storyEntity: DistributionEntity;
};

const StoryParts = ({ storyEntity }: StoryPartsProps) => {
  return (
    <div className="mb-8 lg:mb-10">
      {storyEntity?.parts?.map((part: StoryPart, index: number) => {
        return (
          <div
            key={index}
            className="mb-8 lg:mb-10"
          >
            {renderStoryPart(part)}
          </div>
        );
      })}
    </div>
  );
};

export default StoryParts;
