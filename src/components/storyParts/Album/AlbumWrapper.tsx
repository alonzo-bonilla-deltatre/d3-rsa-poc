import { StoryPart } from '@/models/types/storyPart';
import dynamic from 'next/dynamic';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';
const Album = dynamic(() => import('@/components/storyParts/Album/Album'));

const AlbumWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Album data={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <AlbumWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
