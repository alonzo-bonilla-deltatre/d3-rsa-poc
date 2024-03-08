import { ForgeMetadataCategoryType } from '@/models/types/forge';

export const mockPageStructureResponse = {
  data: {
    metadata: [
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_article_entitycode',
        value: 'articles',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_article_schema',
        value: 'article',
      },
      {
        category: ForgeMetadataCategoryType.sitemaps,
        key: 'sitemap_testStory_entitycode',
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
