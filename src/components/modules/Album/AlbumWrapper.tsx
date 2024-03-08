import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Album = dynamic(() => import('@/components/modules/Album/Album'));

const AlbumWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Album data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AlbumWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
