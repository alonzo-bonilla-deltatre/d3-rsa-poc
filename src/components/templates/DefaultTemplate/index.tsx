import { ComponentProps } from '@/models/types/components';
import { PageStructureData } from '@/models/types/pageStructure';
import { getFooterStructure } from '@/services/footerService';
import { getHeaderStructure } from '@/services/headerService';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import React, { use } from 'react';

const DefaultTemplate = ({ ...props }: ComponentProps) => {
  const mainSlot = 'main';
  const headerStructure = use(getHeaderStructure(props.variables, props.previewToken)) as PageStructureData;
  const headerStructureItem = headerStructure?.structure;
  const footerStructure = use(getFooterStructure(props.variables, props.previewToken)) as PageStructureData;
  const footerStructureItem = footerStructure?.structure;

  return (
    <div
      id="main-container"
      className="overflow-hidden flex flex-col justify-between min-h-[100vh]"
    >
      {/* Header */}
      {headerStructureItem && renderItem(headerStructureItem, props.variables, props.metadata, props.previewToken)}
      <main id="main">
        {renderItemsInSlot(props.items, mainSlot, props.variables, props.metadata, props.previewToken)}
      </main>
      {/* Footer */}
      {footerStructureItem && renderItem(footerStructureItem, props.variables, props.metadata, props.previewToken)}
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
