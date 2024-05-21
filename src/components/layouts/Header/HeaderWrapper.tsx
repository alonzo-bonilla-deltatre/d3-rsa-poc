import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Header = dynamic(() => import('@/components/layouts/Header/Header'));

const HeaderWrapper = ({ data }: { data: ComponentProps }) => <Header data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <HeaderWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
