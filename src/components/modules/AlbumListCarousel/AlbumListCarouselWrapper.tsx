import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const AlbumListCarousel = dynamic(() => import('@/components/modules/AlbumListCarousel/AlbumListCarousel'), {
  ssr: false,
});

const AlbumListCarouselWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AlbumListCarousel data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AlbumListCarouselWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
