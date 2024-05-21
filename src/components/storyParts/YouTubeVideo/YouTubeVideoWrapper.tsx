import { ReturnComponentRender } from '@/models/types/components';
import { StoryPart } from '@/models/types/storyPart';
import { nanoid } from 'nanoid';
import YouTubeVideo from '@/components/storyParts/YouTubeVideo/YouTubeVideo';

const YouTubeVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => {
  return <YouTubeVideo data={data} />;
};

const render = ({ ...data }: StoryPart): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <YouTubeVideoWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
