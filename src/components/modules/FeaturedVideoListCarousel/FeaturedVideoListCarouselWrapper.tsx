import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedVideoListCarousel = dynamic(
  () => import('@/components/modules/FeaturedVideoListCarousel/FeaturedVideoListCarousel')
);

const FeaturedVideoListCarouselWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedVideoListCarousel data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedVideoListCarouselWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
