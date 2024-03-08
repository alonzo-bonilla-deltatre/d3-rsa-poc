import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import Cta from '@/components/modules/Cta/Cta';
import { nanoid } from 'nanoid';

const CtaWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Cta data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <CtaWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
