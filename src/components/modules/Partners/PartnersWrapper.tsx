import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Partners = dynamic(() => import('@/components/modules/Partners/Partners'));

const PartnersWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Partners data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <PartnersWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
