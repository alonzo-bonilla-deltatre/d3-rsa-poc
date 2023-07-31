import { ComponentProps } from '@/models/types/components';
import { PageStructureData } from '@/models/types/pageStructure';
import { getFooterStructure } from '@/services/footerService';
import { getHeaderStructure } from '@/services/headerService';
import { renderItem, renderItemsInSlot } from '@/services/renderService';
import React, { use } from 'react';
import { getAppViewVariable } from '@/helpers/dataVariableHelper';

const Default = ({ ...props }: ComponentProps) => {
  const mainSlot = 'main';
  const headerStructure = use(getHeaderStructure(props.variables, props.previewToken)) as PageStructureData;
  const headerStructureItem = headerStructure?.structure;
  const footerStructure = use(getFooterStructure(props.variables, props.previewToken)) as PageStructureData;
  const footerStructureItem = footerStructure?.structure;
  const appView = getAppViewVariable(props.variables);

  return (
    <div
      id="main-container"
      className="overflow-hidden flex flex-col justify-between min-h-[100vh]"
    >
      {/* Header */}
      {headerStructureItem &&
        !appView &&
        renderItem(headerStructureItem, props.variables, props.metadata, props.previewToken)}
      <main
        id="main"
        className="grow"
      >
        {renderItemsInSlot(props.items, mainSlot, props.variables, props.metadata, props.previewToken)}
      </main>
      {/* Footer */}
      {footerStructureItem &&
        !appView &&
        renderItem(footerStructureItem, props.variables, props.metadata, props.previewToken)}
    </div>
  );
};

export default Default;
