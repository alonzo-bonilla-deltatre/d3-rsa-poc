import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const AlbumList = dynamic(() => import('@/components/modules/AlbumList/AlbumList'));

const AlbumListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <AlbumList data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AlbumListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
