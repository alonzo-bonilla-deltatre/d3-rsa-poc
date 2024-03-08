import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const DocumentList = dynamic(() => import('@/components/modules/DocumentList/DocumentList'));

const DocumentListWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <DocumentList data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <DocumentListWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
