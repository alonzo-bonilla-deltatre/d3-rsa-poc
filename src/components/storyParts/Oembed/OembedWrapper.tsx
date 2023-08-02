import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Oembed from '@/components/storyParts/Oembed/Oembed';

const OembedStoryPartWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Oembed {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <OembedStoryPartWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
