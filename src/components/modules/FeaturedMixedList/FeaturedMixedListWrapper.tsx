import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedMixedList = dynamic(() => import('@/components/modules/FeaturedMixedList/FeaturedMixedList'));

const MixedListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedMixedList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MixedListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
