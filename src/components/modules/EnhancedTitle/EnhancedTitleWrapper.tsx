import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const EnhancedTitle = dynamic(() => import('@/components/modules/EnhancedTitle/EnhancedTitle'));

const EnhancedTitleWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <EnhancedTitle data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <EnhancedTitleWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
