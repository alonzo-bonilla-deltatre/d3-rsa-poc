import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedEventList = dynamic(() => import('@/components/modules/FeaturedEventList/FeaturedEventList'), { ssr: false });

const FeaturedEventListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedEventList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedEventListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
