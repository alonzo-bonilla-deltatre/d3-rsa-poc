import dynamic from 'next/dynamic';
import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import { ReactElement } from 'react';
const DynamicGrid = dynamic(() => import('@/components/layouts/DynamicGrid/DynamicGrid'));

const renderHOC = (gridTemplate: string = '6-6') => {
  const render: ({ data }: { data: ComponentProps }) => ReactElement = ({ data }: { data: ComponentProps }) => {
    return (
      <DynamicGrid
        gridTemplate={gridTemplate}
        componentProps={data}
        key={nanoid()}
      />
    );
  };
  return render;
};

export default renderHOC;
