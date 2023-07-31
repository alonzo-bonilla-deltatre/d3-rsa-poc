import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Event = dynamic(() => import('@/components/modules/Event/Event'));

const EventWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Event {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <EventWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
