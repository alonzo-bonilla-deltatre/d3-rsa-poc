/* istanbul ignore file */
import dynamic from 'next/dynamic';
import { ComponentProps } from '@/models/types/components';

// @ts-ignore
const DynamicGrid = dynamic(() => import('@/components/layouts/DynamicGrid'));

const renderHOC = (gridTemplate: string = '6-6') => {
  const render = ({ ...data }: ComponentProps) => {
    return (
      <DynamicGrid
        gridTemplate={gridTemplate}
        componentProps={data}
      />
    );
  };
  return render;
};

export default renderHOC;
