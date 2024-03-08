import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
const NoTemplate = dynamic(() => import('@/components/templates/NoTemplate/NoTemplate'));

const NoTemplateWrapper = ({ data }: { data: ComponentProps }) => <NoTemplate data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => <NoTemplateWrapper data={data} />;

export default render;
