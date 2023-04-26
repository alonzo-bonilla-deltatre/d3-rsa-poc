import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Mosaic = dynamic(() => import('@/components/modules/Mosaic'));

const MosaicListWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Mosaic {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <MosaicListWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
