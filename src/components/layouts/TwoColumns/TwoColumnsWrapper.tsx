import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const TwoColumns = dynamic(() => import('@/components/layouts/TwoColumns'));

const TwoColumnsWrapper = ({ ...data }: ComponentProps) => <TwoColumns {...data} />;

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <TwoColumnsWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;

