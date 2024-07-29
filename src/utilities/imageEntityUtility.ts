import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';

/**
 * Retrieves the template URL of an image from a given entity.
 * The function checks for the presence of a template URL in the following order:
 * 1. `thumbnail.templateUrl`
 * 2. `image.templateUrl`
 * 3. `coverImage.templateUrl`
 *
 * If none of these properties contain a template URL, an empty string is returned.
 *
 * @param {DistributionEntity | LiveBloggingBlogEntity} entity - The entity from which to extract the template URL.
 * @returns {string} The template URL of the image, or an empty string if no template URL is found.
 */
export const getImageTemplateUrl = (entity: DistributionEntity | LiveBloggingBlogEntity): string => {
  return entity?.thumbnail?.templateUrl
    ? entity?.thumbnail?.templateUrl
    : entity?.image?.templateUrl
      ? entity?.image?.templateUrl
      : entity?.coverImage?.templateUrl
        ? entity?.coverImage?.templateUrl
        : '';
};
