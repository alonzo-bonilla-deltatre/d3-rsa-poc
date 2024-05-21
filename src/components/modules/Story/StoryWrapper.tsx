import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Story = dynamic(() => import('@/components/modules/Story/Story'));

const StoryWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Story data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <StoryWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
