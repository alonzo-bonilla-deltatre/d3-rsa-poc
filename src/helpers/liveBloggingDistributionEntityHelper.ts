/* istanbul ignore file */
import { LiveBloggingBlogEntity, LiveBloggingWidgetConfig } from '@/models/types/liveblogging';

/**
 * Given the entities array, check if there is the fallback image and fill, if needed
 * @returns the items enreached with the fallback image where needed
 * @param blog
 * @param baseUrl
 * @param culture
 * @param slug
 * @param showKeyMoments
 */

export const addLiveBloggingWidgetConfig = (
  blog: LiveBloggingBlogEntity,
  baseUrl?: string,
  culture?: string,
  slug?: string,
  showKeyMoments?: boolean
): LiveBloggingBlogEntity => {
  blog.widgetConfig = {
    slug: slug ?? '',
    culture: culture ?? '',
    baseUrl: baseUrl ?? '',
    showKeyMoments: showKeyMoments ?? false,
    // blogDefinitionComponent : null
  };
  return blog;
};

export const enrichLiveBloggingWidgetConfig = (
  config: LiveBloggingWidgetConfig,
  blogDefinitionComponent: unknown
): LiveBloggingWidgetConfig => {
  config = {
    ...config,
    blogDefinitionComponent,
  };
  return config;
};
