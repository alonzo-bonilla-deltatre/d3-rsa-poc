import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import HtmlContent from '@/components/modules/HtmlContent/HtmlContent';
import { nanoid } from 'nanoid';

const HtmlContentWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <HtmlContent data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <HtmlContentWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
