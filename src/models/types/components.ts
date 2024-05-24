import React from 'react';
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
  isFullWidth?: boolean;
  hideModule?: boolean;
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
  textAlignment?: string;
  noTranslation?: boolean;
  ctaTitle?: string;
  ctaLink?: string;
  description?: string;
  sponsorBy?: string;
  className?: string;
  typographyClassName?: string;
};

export type EditorialListModuleProps = EditorialListProps & ModuleProps;

export type ReturnComponentRender = React.ReactElement | undefined | null;
