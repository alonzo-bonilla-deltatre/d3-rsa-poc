import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Menu = dynamic(() => import('@/components/modules/Menu/Menu'));

const MenuWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Menu data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MenuWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
