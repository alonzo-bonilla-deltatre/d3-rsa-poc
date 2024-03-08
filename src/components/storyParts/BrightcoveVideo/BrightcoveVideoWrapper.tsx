import { StoryPart } from '@/models/types/storyPart';
import BrightcoveVideo from '@/components/storyParts/BrightcoveVideo/BrightcoveVideo';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const BrightcoveVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => (
  <BrightcoveVideo data={data} />
);

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <BrightcoveVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
