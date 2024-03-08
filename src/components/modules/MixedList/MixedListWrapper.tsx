import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const MixedList = dynamic(() => import('@/components/modules/MixedList/MixedList'));

const MixedListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <MixedList data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MixedListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
