import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedPlayerListCarousel = dynamic(
  () => import('@/components/modules/FeaturedPlayerListCarousel/FeaturedPlayerListCarousel'),
  { ssr: false }
);

const FeaturedPlayerListCarouselWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedPlayerListCarousel data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedPlayerListCarouselWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
