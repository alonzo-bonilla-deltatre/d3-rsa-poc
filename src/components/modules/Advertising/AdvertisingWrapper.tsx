import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Advertising = dynamic(() => import('@/components/modules/Advertising/Advertising'));

const AdvertisingWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Advertising data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AdvertisingWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
