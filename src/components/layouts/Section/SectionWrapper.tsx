import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const Section = dynamic(() => import('@/components/layouts/Section/Section'));

const SectionWrapper = ({ ...data }: ComponentProps) => <Section {...data} />;

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <SectionWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
