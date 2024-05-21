import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
const Section = dynamic(() => import('@/components/layouts/Section/Section'));

const SectionWrapper = ({ data }: { data: ComponentProps }) => <Section data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <SectionWrapper
      key={nanoid()}
      data={data}
    />
  );
};

export default render;
