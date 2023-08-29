import { ComponentProps } from '@/models/types/components';
import dynamic from 'next/dynamic';

// @ts-ignore
const FocusOn = dynamic(() => import('@/components/modules/FocusOn/FocusOn'));

const FocusOnWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <FocusOn {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement => (data ? <FocusOnWrapper {...data} /> : <></>);

export default render;
