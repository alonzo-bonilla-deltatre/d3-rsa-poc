import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const HeroStatic = dynamic(() => import('@/components/modules/HeroStatic/HeroStatic'));

const HeroStaticWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <HeroStatic data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <HeroStaticWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
