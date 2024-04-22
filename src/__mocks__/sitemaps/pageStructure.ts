import { ForgeMetadataCategoryType } from '@/models/types/forge';

export const mockPageStructureResponse = {
  data: {
    metadata: [
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_article_entity_code',
        value: 'articles',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_article_schema',
        value: 'article',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_testStory_entity_code',
        value: 'stories',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_testStory_schema',
        value: 'article',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'blacklist',
        value: '/disallowed-path',
      },
    ],
  },
};
