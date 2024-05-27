import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const HeroSwiper = dynamic(() => import('@/components/modules/HeroSwiper/HeroSwiper'), { ssr: false });

const HeroSwiperWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <HeroSwiper data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <HeroSwiperWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
