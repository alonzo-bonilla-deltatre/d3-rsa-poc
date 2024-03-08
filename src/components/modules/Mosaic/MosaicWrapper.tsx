import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Mosaic = dynamic(() => import('@/components/modules/Mosaic/Mosaic'));

const MosaicListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Mosaic data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <MosaicListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
