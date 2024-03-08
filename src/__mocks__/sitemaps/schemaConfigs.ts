import { SchemaConfig } from '@/models/types/sitemap';
import { formatDate } from '@/utilities/dateFormatter';

export const SCHEMA_CONFIG_MOCK: SchemaConfig = {
  article: {
    xmlContainer: (content) => `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
          ${content}
      </urlset>
      `,
    xmlSchema: (entity) => `
      <url>
        <loc>${entity.url}</loc>
        <news:news>
          <news:publication>
            <news:name>${entity.title}</news:name>
            <news:language>${entity.language}</news:language>
          </news:publication>
          <news:publication_date>${formatDate(entity.contentDate, 'yyyy-MM-DD')}</news:publication_date>
          <news:title>${entity.title}</news:title>
        </news:news>
        </url>
      `,
  },
  video: {
    xmlContainer: (content) => `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
          ${content}
      </urlset>
      `,
    xmlSchema: (entity) => `
      <url>
      <loc>${entity.url}</loc>
      <video:video>
        <video:thumbnail_loc>${entity.thumbnail?.thumbnailUrl}</video:thumbnail_loc>
        <video:title>${entity.title}</video:title>
        <video:description>
          ${entity.description}
        </video:description>
        <video:publication_date>${formatDate(entity.contentDate, 'yyyy-MM-DD')}</video:publication_date>
      </video:video>
    </url>
      `,
  },
};
