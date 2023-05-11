import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const GraphicAsset = dynamic(() => import('@/components/modules/GraphicAsset'));

const GraphicAssetWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <GraphicAsset {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <GraphicAssetWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
