import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const AlbumMosaic = dynamic(() => import('@/components/modules/AlbumMosaic/AlbumMosaic'));

const MosaicPhotosWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <AlbumMosaic data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MosaicPhotosWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
