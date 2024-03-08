import { StoryPart } from '@/models/types/storyPart';
import Oembed from '@/components/storyParts/Oembed/Oembed';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const OembedStoryPartWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Oembed data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <OembedStoryPartWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
