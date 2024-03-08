import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Hero = dynamic(() => import('@/components/modules/Hero/Hero'));

const HeroWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Hero data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <HeroWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
