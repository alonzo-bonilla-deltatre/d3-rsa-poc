import { PageStructureItemType, StructureItem } from "@/models/types/pageStructure";
import React, { JSXElementConstructor, ReactElement } from "react";
import { renderLayout } from "./renderHandlers/renderLayout";
import { renderModule } from "./renderHandlers/renderModule";
import { renderTemplate } from "./renderHandlers/renderTemplate";
import {nanoid} from "nanoid";

export const renderItem = (item: StructureItem): React.ReactElement => {
  function renderEmptyPage():React.ReactElement {
    return <div key={nanoid()} />; // return empty div to not have an error on the page in the future we need to manage the page error
  }

  if (!item) {
    return renderEmptyPage();
  }
  if (item.type === PageStructureItemType.template) {
    return renderTemplate(item);
  }

  if (item.type === PageStructureItemType.layout) {
    return renderLayout(item);
  }

  if (item.type === PageStructureItemType.module) {
    return renderModule(item);
  }
  return renderEmptyPage();
};

export const renderItemsInSlot = (
  items: StructureItem[] | undefined,
  slotName: string
): ReactElement<any, string | JSXElementConstructor<any>>[] | null => {
  if (typeof items === "undefined" || !items.length) {
    return null;
  }

  const itemsBySlot = items.filter(
    (item: StructureItem) => item.slot === slotName
  );

  if (!itemsBySlot.length) {
    return null;
  }
  return itemsBySlot.map((item: StructureItem) => renderItem(item));
};


