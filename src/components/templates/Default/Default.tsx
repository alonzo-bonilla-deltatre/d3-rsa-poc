import { ComponentProps } from '@/models/types/components';
import { PageStructureData } from '@/models/types/pageStructure';
import { renderItemsInSlot } from '@/services/renderService';
import React, { use } from 'react';
import { getAppViewVariable } from '@/helpers/dataVariableHelper';
import { getPageStructureFromVariablePath } from '@/helpers/pageHelper';

enum DefaultTemplateSlots {
  header = 'header',
  main = 'main',
  footer = 'footer',
}

const Default = ({ data }: { data: ComponentProps }) => {
  const headerStructure = use(
    getPageStructureFromVariablePath('inc_header', data.variables, data.previewToken)
  ) as PageStructureData;
  const headerStructureItem = headerStructure?.structure;
  headerStructureItem?.items?.forEach((item) => {
    item.slot = DefaultTemplateSlots.header;
  });
  const footerStructure = use(
    getPageStructureFromVariablePath('inc_footer', data.variables, data.previewToken)
  ) as PageStructureData;
  const footerStructureItem = footerStructure?.structure;
  footerStructureItem?.items?.forEach((item) => {
    item.slot = DefaultTemplateSlots.footer;
  });
  const appView = getAppViewVariable(data.variables);

  return (
    <div
      id="main-container"
      className="flex min-h-[100vh] flex-col justify-between overflow-hidden"
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
