import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Text = dynamic(() => import('@/components/modules/Text/Text'));

const TextWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Text data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <TextWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
