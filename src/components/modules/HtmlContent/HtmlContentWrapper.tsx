import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import HtmlContent from '@/components/modules/HtmlContent';
// @ts-ignore
//const HtmlContent = dynamic(() => import('@/components/modules/HtmlContent'));

const HtmlContentWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <HtmlContent {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <HtmlContentWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
