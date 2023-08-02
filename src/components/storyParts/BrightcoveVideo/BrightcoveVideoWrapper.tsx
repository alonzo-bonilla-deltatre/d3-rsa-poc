import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import BrightcoveVideo from '@/components/storyParts/BrightcoveVideo/BrightcoveVideo';

const BrightcoveVideoWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <BrightcoveVideo {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <BrightcoveVideoWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
