import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Hamburger = dynamic(() => import('@/components/layouts/Hamburger/Hamburger'));

const HamburgerWrapper = ({ data }: { data: ComponentProps }) => <Hamburger data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <HamburgerWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
