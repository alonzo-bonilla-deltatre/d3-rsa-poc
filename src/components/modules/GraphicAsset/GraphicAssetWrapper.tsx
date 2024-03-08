import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const GraphicAsset = dynamic(() => import('@/components/modules/GraphicAsset/GraphicAsset'));

const GraphicAssetWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <GraphicAsset data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <GraphicAssetWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
