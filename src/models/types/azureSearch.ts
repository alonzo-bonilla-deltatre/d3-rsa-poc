import { SearchOptions } from '@azure/search-documents';

export type AzureSearchResult = {
  totalCount: number;
  forgeEntities: AzureSearchForgeEntitiesResult;
  keyPages: AzureSearchKeyPagesResult;
};

export type SearchResult = {
  count: number;
  documents: any[];
  type: string;
};

export type AzureSearchOption = SearchOptions<never> & {
  q: string;
  page: number;
  limit: number;
  keyPagesPage: number;
  keyPagesLimit: number;
  facetType: string;
  facetValue: string;
};

export type AzureSearchGroupOption = {
  items: AzureSearchGroupTypes[];
};

export type AzureSearchGroupTypes = {
  type: string;
  items: string[];
};

export type AzureSearchForgeEntitiesResult = {
  count: number;
  items: SearchResult[];
};

export type AzureSearchKeyPagesResult = {
  count: number;
  items: AzureKeyPagesIndexEntity[];
};

export type AzureKeyPagesIndexEntity = {
  Id: string;
  Title: string;
  Summary: string;
  Image: string;
  Schema_Keywords: string[];
  Schema_Abstract: string[];
  Schema_Text: string[];
  Schema_Image: string[];
  Original_Meta_Title: string;
  Original_Meta_Summary: string;
  Url: string;
  LastIndex: string;
  Culture: string;
  Tags: string[];
};
