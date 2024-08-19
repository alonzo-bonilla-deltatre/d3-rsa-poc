import { StoryPart } from '@/models/types/storyPart';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';
import Event from '@/components/storyParts/Event/Event';

const EventWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Event data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <EventWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
