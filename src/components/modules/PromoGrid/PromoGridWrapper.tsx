import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const PromoGrid = dynamic(() => import('@/components/modules/PromoGrid/index'));

const PromoGridWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <PromoGrid {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <PromoGridWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
