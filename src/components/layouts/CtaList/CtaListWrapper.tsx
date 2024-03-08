import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const CtaList = dynamic(() => import('@/components/layouts/CtaList/CtaList'));

const CtaListWrapper = ({ data }: { data: ComponentProps }) => <CtaList data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <CtaListWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
