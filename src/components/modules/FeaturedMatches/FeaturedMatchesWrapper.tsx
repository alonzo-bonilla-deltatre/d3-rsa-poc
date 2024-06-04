import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedMatches = dynamic(() => import('@/components/modules/FeaturedMatches/FeaturedMatches'));

const FeaturedMatchesWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedMatches data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedMatchesWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
