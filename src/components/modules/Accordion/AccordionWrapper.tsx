import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Accordion = dynamic(() => import('@/components/modules/Accordion/Accordion'));

const AccordionWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Accordion data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <AccordionWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
