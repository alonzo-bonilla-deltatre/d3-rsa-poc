import { ApiResponse, SitemapItem } from '@/models/types/siteStructure';

export const mockSitemapItems: SitemapItem[] = [
  {
    url: {
      value: 'allowed-url',
      parameters: {},
    },
    alias: {
      value: 'alias-allowed-url',
      parameters: {},
    },
  },
  {
    url: {
      value: 'disallowed-url',
      parameters: {},
    },
    alias: {
      value: 'alias-disallowed-url',
      parameters: {},
    },
  },
  {
    url: { value: 'https://example.com/page-1', parameters: {} },
    alias: { value: '/page-1', parameters: {} },
  },
  {
    url: { value: 'https://example.com/page-2', parameters: {} },
    alias: { value: '/page-2', parameters: {} },
  },
];

export const mockApiResponse: ApiResponse = {
  data: { sitemap: mockSitemapItems },
  meta: {
    version: '1.0',
  },
};
