import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Promo = dynamic(() => import('@/components/modules/Promo/Promo'));

const PromoWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Promo data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <PromoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
