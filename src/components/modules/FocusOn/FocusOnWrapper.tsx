import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const FocusOn = dynamic(() => import('@/components/modules/FocusOn/FocusOn'));

const FocusOnWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <FocusOn data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FocusOnWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
