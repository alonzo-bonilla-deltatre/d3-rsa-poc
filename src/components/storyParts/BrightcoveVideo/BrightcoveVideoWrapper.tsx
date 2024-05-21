import { ReturnComponentRender } from '@/models/types/components';
import { StoryPart } from '@/models/types/storyPart';
import { nanoid } from 'nanoid';
import BrightcoveVideo from '@/components/storyParts/BrightcoveVideo/BrightcoveVideo';

const BrightcoveVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => {
  return <BrightcoveVideo data={data} />;
};

const render = ({ ...data }: StoryPart): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <BrightcoveVideoWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
