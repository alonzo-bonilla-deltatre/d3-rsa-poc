import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const TestList = dynamic(() => import('@/components/modules/TestList/index'));

const TestListWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <TestList {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <TestListWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
