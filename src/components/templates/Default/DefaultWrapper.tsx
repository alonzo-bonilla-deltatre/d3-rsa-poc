import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Default = dynamic(() => import('@/components/templates/Default/Default'));

const DefaultWrapper = ({ ...data }: ComponentProps) => <Default {...data} />;

const render = ({ ...props }: ComponentProps): React.ReactElement =>
  props ? (
    <DefaultWrapper
      key={nanoid()}
      {...props}
    />
  ) : (
    <></>
  );

export default render;
