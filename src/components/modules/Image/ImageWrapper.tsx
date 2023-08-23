import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const ImageComponent = dynamic(() => import('@/components/modules/Image/Image'));

const ImageWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <ImageComponent {...data} />;
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
