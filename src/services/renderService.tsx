import { Metadata, PageStructureItemType, StructureItem, Variable } from '@/models/types/pageStructure';
import { nanoid } from 'nanoid';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { renderLayout } from './renderHandlers/renderLayout';
import { renderModule } from './renderHandlers/renderModule';
import { renderTemplate } from './renderHandlers/renderTemplate';

export const renderItem = (
  item: StructureItem,
  variables?: Variable[],
  metadata?: Metadata[],
  previewToken?: string
): React.ReactElement => {
  if (!item) {
    return renderEmptyPage();
  }

  if (item.type === PageStructureItemType.template) {
    return renderTemplate(item, variables, metadata, previewToken);
  }

  if (item.type === PageStructureItemType.layout) {
    return renderLayout(item, variables, metadata, previewToken);
  }

  if (item.type === PageStructureItemType.module) {
    return renderModule(item, variables, metadata, previewToken);
  }
  return renderEmptyPage();
};

export const renderItemsInSlot = (
  items: StructureItem[] | undefined,
  slotName: string,
  variables?: Variable[],
  metadata?: Metadata[],
  previewToken?: string
): ReactElement<any, string | JSXElementConstructor<any>>[] | null => {
  if (typeof items === 'undefined' || !items.length) {
    return null;
  }

  const itemsBySlot = items.filter((item: StructureItem) => item.slot === slotName);

  if (!itemsBySlot.length) {
    return null;
  }
  return itemsBySlot.map((item: StructureItem) => renderItem(item, variables, metadata, previewToken));
};

const renderEmptyPage = function (): React.ReactElement {
  return <div key={nanoid()} />; // return empty div to not have an error on the page in the future we need to manage the page error
};
