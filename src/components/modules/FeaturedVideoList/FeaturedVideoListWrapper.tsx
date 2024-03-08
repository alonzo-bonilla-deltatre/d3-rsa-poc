import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedVideoList = dynamic(() => import('@/components/modules/FeaturedVideoList/FeaturedVideoList'));

const FeaturedVideoListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedVideoList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedVideoListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
