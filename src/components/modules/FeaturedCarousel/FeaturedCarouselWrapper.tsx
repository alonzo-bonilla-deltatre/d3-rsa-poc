import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedCarousel = dynamic(() => import('@/components/modules/FeaturedCarousel/FeaturedCarousel'));

const FeaturedCarouselWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedCarousel data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedCarouselWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
