import { ReturnComponentRender } from '@/models/types/components';
import { StoryPart } from '@/models/types/storyPart';
import { nanoid } from 'nanoid';
import JWPlayerVideo from '@/components/storyParts/JWPlayerVideo/JWPlayerVideo';

const JWPlayerVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => {
  return <JWPlayerVideo data={data} />;
};

const render = ({ ...data }: StoryPart): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <JWPlayerVideoWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
