import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const GridList = dynamic(() => import('@/components/modules/GridList/GridList'));

const GridListWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <GridList {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <GridListWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
