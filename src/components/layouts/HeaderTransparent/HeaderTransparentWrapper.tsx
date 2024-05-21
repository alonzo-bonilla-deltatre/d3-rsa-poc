import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const HeaderTransparent = dynamic(() => import('@/components/layouts/HeaderTransparent/HeaderTransparent'));

const HeaderTransparentWrapper = ({ data }: { data: ComponentProps }) => <HeaderTransparent data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <HeaderTransparentWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
