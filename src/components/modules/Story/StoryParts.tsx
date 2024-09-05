import { renderStoryPart } from '@/services/renderHandlers/renderStoryPart';
import { DistributionEntity } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';

type StoryPartsProps = {
  storyEntity: DistributionEntity;
};

const StoryParts = ({ storyEntity }: StoryPartsProps) => {
  return (
    <>
      {storyEntity?.parts?.map((part: StoryPart, index: number) => {
        return (
          <div
            key={index}
            className="mb-8 last:mb-0 lg:mb-10"
          >
            {renderStoryPart(part)}
          </div>
        );
      })}
    </>
  );
};

export default StoryParts;
