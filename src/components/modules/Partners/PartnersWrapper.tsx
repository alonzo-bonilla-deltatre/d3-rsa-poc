import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Partners = dynamic(() => import('@/components/modules/Partners/Partners'));

const PartnersWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Partners {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <PartnersWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
