import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const TestDetail = dynamic(() => import('@/components/modules/TestDetail/index'));

const TestDetailWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <TestDetail {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <TestDetailWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
