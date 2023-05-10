import { ComponentProps } from '@/models/types/components';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import React, { use } from 'react';
import { PageStructureData } from '@/models/types/pageStructure';
import { getHeaderStructure } from '@/services/headerService';
import { getFooterStructure } from '@/services/footerService';

const DefaultTemplate = ({ ...props }: ComponentProps) => {
  const mainSlot = 'main';
  const headerStructure = use(getHeaderStructure(props.variables)) as PageStructureData;
  const headerStructureItem = headerStructure.structure;
  const footerStructure = use(getFooterStructure(props.variables)) as PageStructureData;
  const footerStructureItem = footerStructure.structure;

  return (
    <div className="overflow-hidden flex flex-col justify-between min-h-[100vh]">
      {/* Header */}
      {renderItem(headerStructureItem, props.variables, props.metadata)}
      <main id="main">{renderItemsInSlot(props.items, mainSlot)}</main>
      {/* Footer */}
      {renderItem(footerStructureItem, props.variables, props.metadata)}
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
