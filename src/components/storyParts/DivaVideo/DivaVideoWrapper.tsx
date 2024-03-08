import { StoryPart } from '@/models/types/storyPart';
import DivaVideo from '@/components/storyParts/DivaVideo/DivaVideo';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const DivaVideoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <DivaVideo video={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <DivaVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
