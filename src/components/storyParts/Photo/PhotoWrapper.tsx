import { StoryPart } from '@/models/types/storyPart';
import Photo from '@/components/storyParts/Photo/Photo';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const PhotoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => (
  <Photo
    slug={data.slug}
    image={data.image}
  />
);

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <PhotoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
