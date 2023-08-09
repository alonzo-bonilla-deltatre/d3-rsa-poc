import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const LiveBloggingGridList = dynamic(() => import('@/components/modules/LiveBloggingGridList/LiveBloggingGridList'));

const LiveBloggingGridListWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <LiveBloggingGridList {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <LiveBloggingGridListWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
