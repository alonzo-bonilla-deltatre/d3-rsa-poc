import { ReturnComponentRender } from '@/models/types/components';
import { StoryPart } from '@/models/types/storyPart';
import { nanoid } from 'nanoid';
import DivaVideo from '@/components/storyParts/DivaVideo/DivaVideo';

const DivaVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => {
  return <DivaVideo data={data} />;
};

const render = ({ ...data }: StoryPart): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <DivaVideoWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
