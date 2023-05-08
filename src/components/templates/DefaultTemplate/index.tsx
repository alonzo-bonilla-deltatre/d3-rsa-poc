import { ComponentProps } from '@/models/types/components';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import React, { use } from 'react';
import { PageStructureData } from '@/models/types/pageStructure';
import { getHeaderStructure } from '@/services/headerService';

// @ts-ignore
const Footer = dynamic(() => import('@/components/layouts/Footer'));

const DefaultTemplate = ({ ...props }: ComponentProps) => {
  const mainSlot = 'main';
  const headerStructure = use(getHeaderStructure(props.variables)) as PageStructureData;
  const headerStructureItem = headerStructure.structure;

  return (
    <div className="overflow-hidden flex flex-col justify-between min-h-[100vh]">
      {renderItem(headerStructureItem, props.variables, props.metadata)}
      <main>{renderItemsInSlot(props.items, mainSlot)}</main>
      {/* TODO: Migrate Footer with renderItem */}
      <Footer />
    </div>
  );
};

const render = ({ ...props }: ComponentProps): React.ReactElement =>
  props ? (
    <DefaultTemplate
      key={nanoid()}
      {...props}
    />
  ) : (
    <></>
  );

export default render;
