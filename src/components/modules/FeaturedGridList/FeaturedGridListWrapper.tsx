import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedGridList = dynamic(() => import('@/components/modules/FeaturedGridList/FeaturedGridList'));

const MixedListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedGridList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MixedListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
