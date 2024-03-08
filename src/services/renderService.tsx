import React from 'react';
import { Metadata, PageStructureItemType, StructureItem, Variable } from '@/models/types/pageStructure';
import { ReturnComponentRender } from '@/models/types/components';

import { renderLayout } from './renderHandlers/renderLayout';
import { renderModule } from './renderHandlers/renderModule';
import { renderTemplate } from './renderHandlers/renderTemplate';

/**
 * Function to render a structure item based on its type.
 * It checks the type of the provided `StructureItem` and calls the corresponding render function.
 * If the `StructureItem` is `null` or its type does not match any known types, it calls `renderEmptyPage`.
 *
 * @param {StructureItem} item - The structure item to render.
 * @param {Variable[] | undefined} variables - Optional variables to pass to the render function.
 * @param {Metadata[] | undefined} metadata - Optional metadata to pass to the render function.
 * @param {string | undefined} previewToken - Optional preview token to pass to the render function.
 * @returns {ReturnComponentRender} - The rendered component.
 */
export const renderItem = (
  item: StructureItem,
  variables?: Variable[],
  metadata?: Metadata[],
  previewToken?: string
): ReturnComponentRender => {
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

/**
 * Function to render all structure items in a slot.
 * It filters the provided `StructureItem` array by slot name and calls `renderItem` for each filtered item.
 * If the `StructureItem` array is `undefined` or empty, or no items have the specified slot name, it returns `null`.
 *
 * @param {StructureItem[] | undefined} items - The structure items to render.
 * @param {string} slotName - The name of the slot to render items for.
 * @param {Variable[] | undefined} variables - Optional variables to pass to the render function.
 * @param {Metadata[] | undefined} metadata - Optional metadata to pass to the render function.
 * @param {string | undefined} previewToken - Optional preview token to pass to the render function.
 * @returns {(React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined | null)[] | null} - The rendered components or `null` if no items were found.
 */
export const renderItemsInSlot = (
  items: StructureItem[] | undefined,
  slotName: string,
  variables?: Variable[],
  metadata?: Metadata[],
  previewToken?: string
): (React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined | null)[] | null => {
  if (typeof items === 'undefined' || !items.length) {
    return null;
  }

  const itemsBySlot = items.filter((item: StructureItem) => item.slot === slotName);

  if (!itemsBySlot.length) {
    return null;
  }
  return itemsBySlot.map((item: StructureItem) => renderItem(item, variables, metadata, previewToken));
};

/**
 * Function to check if a slot has any items.
 * It filters the provided `StructureItem` array by slot name and returns `true` if any items are found.
 * If the `StructureItem` array is `undefined` or empty, or no items have the specified slot name, it returns `false`.
 *
 * @param {StructureItem[] | undefined} items - The structure items to check.
 * @param {string} slotName - The name of the slot to check for items.
 * @returns {boolean} - `true` if the slot has any items, `false` otherwise.
 */
export const hasItemsInSlot = (items: StructureItem[] | undefined, slotName: string): boolean => {
  if (typeof items === 'undefined' || !items.length) {
    return false;
  }

  const itemsBySlot = items.filter((item: StructureItem) => item.slot === slotName);

  return !!itemsBySlot.length;
};

/**
 * Function to render an empty page.
 * It returns a `div` element with no children.
 *
 * @returns {ReturnComponentRender} - The rendered empty page.
 */
const renderEmptyPage = function (): ReturnComponentRender {
  return <div />; // return empty div to not have an error on the page in the future we need to manage the page error
};
