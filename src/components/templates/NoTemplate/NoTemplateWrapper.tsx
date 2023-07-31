import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';

// @ts-ignore
const NoTemplate = dynamic(() => import('@/components/templates/NoTemplate/NoTemplate'));

const NoTemplateWrapper = ({ ...data }: ComponentProps) => <NoTemplate {...data} />;

const render = ({ ...props }: ComponentProps): React.ReactElement =>
  props ? (
    <NoTemplateWrapper
      key={nanoid()}
      {...props}
    />
  ) : (
    <></>
  );

export default render;
