import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Event from '@/components/storyParts/Event/Event';

const EventWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Event {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <EventWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
