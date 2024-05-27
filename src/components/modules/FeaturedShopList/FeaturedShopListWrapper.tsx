import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FeaturedShopList = dynamic(() => import('@/components/modules/FeaturedShopList/FeaturedShopList'));

const FeaturedShopListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedShopList data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FeaturedShopListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
