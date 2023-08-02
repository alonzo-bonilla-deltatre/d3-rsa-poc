import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Text = dynamic(() => import('@/components/modules/Text/Text'));

const TextWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Text {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <TextWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
