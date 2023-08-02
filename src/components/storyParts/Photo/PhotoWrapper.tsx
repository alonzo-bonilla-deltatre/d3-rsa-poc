import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Photo from '@/components/storyParts/Photo/Photo';

const PhotoWrapper = ({ ...data }: StoryPart): React.ReactElement => {
  return <Photo {...data} />;
};

const render = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <PhotoWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
