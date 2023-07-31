import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Footer = dynamic(() => import('@/components/layouts/Footer/Footer'));

const FooterWrapper = ({ ...data }: ComponentProps) => {
  return <Footer {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <FooterWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
