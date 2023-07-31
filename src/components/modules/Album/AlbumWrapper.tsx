import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Album = dynamic(() => import('@/components/modules/Album/Album'));

const AlbumWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Album {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <AlbumWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
