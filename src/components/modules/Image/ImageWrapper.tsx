import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const ImageComponent = dynamic(() => import('@/components/modules/Image/Image'));

const ImageWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <ImageComponent data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <ImageWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
