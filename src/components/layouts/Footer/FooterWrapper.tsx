import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Footer = dynamic(() => import('@/components/layouts/Footer/Footer'));

const FooterWrapper = ({ data }: { data: ComponentProps }) => <Footer data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <FooterWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
