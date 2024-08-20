import { ReactElement } from 'react';
import {
  Metadata,
  PageStructureItemKey,
  PageStructureItemType,
  StructureItem,
  Variable,
} from '@/models/types/pageStructure';

export type ComponentProps = {
  type: PageStructureItemType;
  properties: Record<string, unknown>;
  slot: string;
  slots?: string[];
  items?: StructureItem[];
  itemKey?: PageStructureItemKey;
  variables?: Variable[];
  metadata?: Metadata[];
  previewToken?: string;
};

export type LayoutProps = {
  removeSectionHtmlTag?: boolean;
  isFullWidth?: boolean;
  hideLayout?: boolean;
};

export type ModuleProps = {
  slug?: string;
  isFullWidth?: boolean;
  hideModule?: boolean;
  preventSettingMetadata?: boolean;
};

export type EditorialListProps = {
  selectionSlug?: string;
  skip?: number;
  limit?: number;
};

export type HeaderTitleProps = {
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
  ctaTitle?: string;
  ctaLink?: string;
};

export type FeaturedHeaderTitleProps = {
  description?: string;
  sponsorBy?: string;
} & HeaderTitleProps;

export type EditorialListModuleProps = EditorialListProps & ModuleProps;

export type ReturnComponentRender = ReactElement | undefined | null;
