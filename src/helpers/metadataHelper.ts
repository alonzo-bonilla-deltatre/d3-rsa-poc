import { DistributionEntity, Tag } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LiveBloggingBlogEntity, LiveBloggingTagEntity } from '@/models/types/liveblogging';

/**
 * Overrides the default metadata of a given entity with specific metadata fields.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string is used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {DistributionEntity | LiveBloggingBlogEntity} entity - The entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideDefaultMetadata = (
  parentMetadata: Metadata,
  entity: DistributionEntity | LiveBloggingBlogEntity
): Metadata => {
  const image: string = getSrcWithTransformation(
    entity?.thumbnail?.templateUrl ?? null,
    transformations.thumbnail_landscape_detail.desktop.transformation
  );

  const title: string = entity.title;
  const description: string = entity.headline || '';

  return {
    title,
    description,
    openGraph: {
      ...parentMetadata.openGraph,
      type: 'article',
      title,
      description,
      images: [{ url: image ?? null }],
      tags: entity?.tags && entity?.tags.length ? entity?.tags?.map(getTagTitleOrLabel)?.join(',') : undefined,
    },
    twitter: {
      title,
      description,
      images: image ?? null,
    },
  };
};

/**
 * This function is named `getTagTitleOrLabel` and it takes a `tag` object as an argument.
 * The `tag` object can be of two types: `Tag` or `LiveBloggingTagEntity`.
 *
 * The function checks if the `tag` object has a `title` property. If it does, it returns the value of the `title` property.
 * If the `tag` object does not have a `title` property, the function then checks if it has a `label` property.
 * If it does, it returns the value of the `label` property.
 * If the `tag` object has neither a `title` nor a `label` property, the function returns an empty string.
 *
 * @param {Tag | LiveBloggingTagEntity} tag - The tag object to check.
 * @returns {string} The title or label of the tag, or an empty string if neither is present.
 */
const getTagTitleOrLabel = (tag: Tag | LiveBloggingTagEntity) => {
  if ('title' in tag) {
    return tag.title;
  } else if ('label' in tag) {
    return tag.label;
  }
  return '';
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for a story.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string is used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 * The open graph type is set to 'article'.
 * The open graph published time is set to the entity's content date.
 * The open graph modified time is set to the entity's last updated date.
 * The open graph authors are set to the entity's created by field.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {DistributionEntity} entity - The entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideStoryMetadata = (parentMetadata: Metadata, entity: DistributionEntity): Metadata => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.openGraph = {
    ...metadata.openGraph,
    type: 'article',
    publishedTime: entity.contentDate,
    modifiedTime: entity.lastUpdatedDate,
    authors: entity.createdBy,
  } as OpenGraph;
  return Object.assign(parentMetadata, metadata);
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for an album.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string is used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {DistributionEntity} entity - The entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideAlbumMetadata = (parentMetadata: Metadata, entity: DistributionEntity): Metadata => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  return Object.assign(parentMetadata, metadata);
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for a video.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string is used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 * The open graph type is set to 'video.other'.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {DistributionEntity | LiveBloggingBlogEntity} entity - The entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideVideoMetadata = (
  parentMetadata: Metadata,
  entity: DistributionEntity | LiveBloggingBlogEntity
): Metadata => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.openGraph = {
    ...metadata.openGraph,
    type: 'video.other',
  };
  return Object.assign(parentMetadata, metadata);
};

/**
 * Overrides the default metadata of a given live blogging entity with specific metadata fields.
 *
 * This function takes a parent metadata object and a live blogging entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's description is used for the description, open graph description, and twitter description.
 * The entity's tags are mapped to their labels and used for the open graph tags.
 * If the entity does not have a description, an empty string is used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 * The open graph type is set to 'article'.
 * The open graph published time and modified time are set to the entity's last updated date.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {LiveBloggingBlogEntity} entity - The live blogging entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideLiveBloggingMetadata = (parentMetadata: Metadata, entity: LiveBloggingBlogEntity): Metadata => {
  const description = entity?.description ?? '';
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.description = description;
  if (metadata.twitter) metadata.twitter.description = description;
  metadata.openGraph = {
    ...metadata.openGraph,
    type: 'article',
    publishedTime: entity?.lastUpdateDate,
    modifiedTime: entity?.lastUpdateDate,
    description: description,
  } as OpenGraph;
  return Object.assign(parentMetadata, metadata);
};
