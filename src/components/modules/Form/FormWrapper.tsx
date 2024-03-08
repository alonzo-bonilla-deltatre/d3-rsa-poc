import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Form = dynamic(() => import('@/components/modules/Form/Form'));

const FormWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <Form data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <FormWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
