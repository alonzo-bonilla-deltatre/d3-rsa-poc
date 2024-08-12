import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const StaticText = dynamic(() => import('@/components/modules/StaticText/StaticText'));

const StaticTextWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <StaticText data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <StaticTextWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
