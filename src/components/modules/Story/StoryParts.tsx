import { renderStoryPart } from '@/services/renderHandlers/renderStoryPart';
import { DistributionEntity } from "@/models/types/dapi";
import { StoryPart } from "@/models/types/storyPart";
import { nanoid } from "nanoid";

type ModuleProps = {
    storyEntity: DistributionEntity;
};

const StoryParts = ({ ...props }: ModuleProps) => {
    const storyEntity = props.storyEntity;
    return(
        <section className="w-full container mx-auto mt-20">
        {storyEntity.parts.map((part: StoryPart) => {
          return (
            <>
              <div
                key={nanoid()}
                className="mx-20 mt-20 col-start-1"
              >
                {renderStoryPart(part)}
              </div>
            </>
          );
        })}
      </section>
    );
};

export default StoryParts;