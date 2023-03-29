import { PageStructureItemType, StructureItem } from "./pageStructure";

export type ComponentProps = {
  type: PageStructureItemType;
  properties: Record<string, unknown>;
  slot: string;
  slots?: string[];
  items?: StructureItem[];
}