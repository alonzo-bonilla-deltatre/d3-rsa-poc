import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const EditorialList = dynamic(() => import('@/components/modules/EditorialList/EditorialList'));

const EditorialListWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <EditorialList {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <EditorialListWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
