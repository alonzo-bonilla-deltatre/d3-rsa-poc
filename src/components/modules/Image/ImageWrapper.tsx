import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Image = dynamic(() => import('@/components/modules/Image/Image'));

const ImageWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Image {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <ImageWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
