import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Promo = dynamic(() => import('@/components/modules/Promo/index'));

const PromoWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Promo {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <PromoWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
