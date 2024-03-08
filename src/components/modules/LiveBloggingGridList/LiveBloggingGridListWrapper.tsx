import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const LiveBloggingGridList = dynamic(() => import('@/components/modules/LiveBloggingGridList/LiveBloggingGridList'));

const LiveBloggingGridListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <LiveBloggingGridList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <LiveBloggingGridListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
