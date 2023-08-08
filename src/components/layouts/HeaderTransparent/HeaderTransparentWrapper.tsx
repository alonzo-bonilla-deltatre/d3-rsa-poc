import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const HeaderTransparent = dynamic(() => import('@/components/layouts/HeaderTransparent/HeaderTransparent'));

const HeaderTransparentWrapper = ({ ...data }: ComponentProps) => <HeaderTransparent {...data} />;

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <HeaderTransparentWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
