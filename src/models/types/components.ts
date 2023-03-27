import { ItemType, StructureItem } from "./pageStructure";

export type ComponentProps = {
  type: ItemType;
  properties: Record<string, unknown>;
  slot: string;
  slots?: string[];
  items?: StructureItem[];
}