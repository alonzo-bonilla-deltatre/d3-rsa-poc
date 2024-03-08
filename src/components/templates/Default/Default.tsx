import { ComponentProps } from '@/models/types/components';
import { PageStructureData } from '@/models/types/pageStructure';
import { getFooterStructure } from '@/services/footerService';
import { getHeaderStructure } from '@/services/headerService';
import { renderItemsInSlot } from '@/services/renderService';
import React, { use } from 'react';
import { getAppViewVariable } from '@/helpers/dataVariableHelper';

enum DefaultTemplateSlots {
  header = 'header',
  main = 'main',
  footer = 'footer',
}

const Default = ({ data }: { data: ComponentProps }) => {
  const headerStructure = use(getHeaderStructure(data.variables, data.previewToken)) as PageStructureData;
  const headerStructureItem = headerStructure?.structure;
  headerStructureItem?.items?.forEach((item) => {
    item.slot = DefaultTemplateSlots.header;
  });
  const footerStructure = use(getFooterStructure(data.variables, data.previewToken)) as PageStructureData;
  const footerStructureItem = footerStructure?.structure;
  footerStructureItem?.items?.forEach((item) => {
    item.slot = DefaultTemplateSlots.footer;
  });
  const appView = getAppViewVariable(data.variables);

  return (
    <div
      id="main-container"
      className="overflow-hidden flex flex-col justify-between min-h-[100vh]"
    >
      {/* Header */}
      {headerStructureItem &&
        !appView &&
        renderItemsInSlot(
          headerStructureItem.items,
          DefaultTemplateSlots.header,
          data.variables,
          data.metadata,
          data.previewToken
        )}
      <main
        id="main"
        className="grow"
      >
        {renderItemsInSlot(data.items, DefaultTemplateSlots.main, data.variables, data.metadata, data.previewToken)}
      </main>
      {/* Footer */}
      {footerStructureItem &&
        !appView &&
        renderItemsInSlot(
          footerStructureItem.items,
          DefaultTemplateSlots.footer,
          data.variables,
          data.metadata,
          data.previewToken
        )}
    </div>
  );
};

export default Default;
