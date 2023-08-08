import { Metadata, PageStructureItemType, StructureItem, Variable } from './pageStructure';

export type ComponentProps = {
  type: PageStructureItemType;
  properties: Record<string, unknown>;
  slot: string;
  slots?: string[];
  items?: StructureItem[];
  variables?: Variable[];
  metadata?: Metadata[];
  previewToken?: string;
};

export type HeaderTitleProps = {
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
  ctaTitle?: string;
  ctaLink?: string;
};

export type LayoutProps = {
  removeSectionHtmlTag?: boolean;
  isFullScreen?: boolean;
} & HeaderTitleProps;
