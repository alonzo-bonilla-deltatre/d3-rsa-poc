/* istanbul ignore file */
import { LiveBloggingBlogEntity, LiveBloggingWidgetConfig } from '@/models/types/liveblogging';

/**
 * Adds a widget configuration to a given live blogging blog entity.
 *
 * This function creates a widget configuration object with the provided base URL, culture, slug, and showKeyMoments flag.
 * If any of these parameters are not provided, they are set to their default values ('' for strings and false for boolean).
 * The created widget configuration object is then assigned to the widgetConfig property of the given blog entity.
 *
 * @param {LiveBloggingBlogEntity} blog - The blog entity to which to add the widget configuration.
 * @param {string} [baseUrl=''] - The base URL for the widget configuration.
 * @param {string} [culture=''] - The culture for the widget configuration.
 * @param {string} [slug=''] - The slug for the widget configuration.
 * @param {boolean} [showKeyMoments=false] - The showKeyMoments flag for the widget configuration.
 * @returns {LiveBloggingBlogEntity} The blog entity with the added widget configuration.
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

/**
 * Enriches a given live blogging widget configuration with a blog definition component.
 *
 * This function creates a new widget configuration object by spreading the properties of the provided configuration
 * and adding the blog definition component to it. The new configuration object is then returned.
 *
 * @param {LiveBloggingWidgetConfig} config - The widget configuration to be enriched.
 * @param {unknown} blogDefinitionComponent - The blog definition component to add to the configuration.
 * @returns {LiveBloggingWidgetConfig} The enriched widget configuration.
 */
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
