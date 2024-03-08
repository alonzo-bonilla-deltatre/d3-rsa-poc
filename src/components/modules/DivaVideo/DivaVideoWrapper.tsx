import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const DivaVideo = dynamic(() => import('@/components/modules/DivaVideo/DivaVideo'));

const DivaVideoWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <DivaVideo data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <DivaVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
