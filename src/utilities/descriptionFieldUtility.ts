import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';

/**
 * Function to get the description field from an entity object.
 * The entity object can be of type DistributionEntity or LiveBloggingBlogEntity.
 * The function checks for the existence of the 'description' field first.
 * If 'description' field is not present, it checks for the 'headline' field.
 * If 'headline' field is also not present, it checks for the 'description' field inside 'fields'.
 * If none of these fields are present, it returns an empty string.
 *
 * @param {DistributionEntity | LiveBloggingBlogEntity} entity - The entity object from which to get the description.
 * @returns {string} The description field from the entity object or an empty string if no description field is found.
 */
export const getDescriptionField = (entity: DistributionEntity | LiveBloggingBlogEntity) => {
  return entity?.description
    ? entity.description
    : entity?.headline
      ? entity.headline
      : entity?.fields?.description
        ? entity.fields.description
        : '';
};
