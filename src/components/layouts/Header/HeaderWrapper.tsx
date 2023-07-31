import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Header = dynamic(() => import('@/components/layouts/Header/Header'));

const HeaderWrapper = ({ ...data }: ComponentProps) => <Header {...data} />;

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <HeaderWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
