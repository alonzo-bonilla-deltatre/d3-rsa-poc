import { DistributionEntity, Tag } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LiveBloggingBlogEntity, LiveBloggingPostEntity, LiveBloggingTagEntity } from '@/models/types/liveblogging';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';

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
  const description: string = getDescriptionField(entity);

  return {
    title,
    description,
    openGraph: {
      ...parentMetadata.openGraph,
      type: 'article',
      title,
      description,
      images: [{ url: image ?? null }],
      tags: entity?.tags && entity?.tags?.length > 0 ? entity?.tags?.map(getTagTitleOrLabel)?.join(',') : undefined,
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
export const getTagTitleOrLabel = (tag: Tag | LiveBloggingTagEntity): string => {
  if ('title' in tag) {
    return tag.title;
  } else if ('label' in tag) {
    return tag.label ?? '';
  } else if ('slug' in tag) {
    return tag.slug;
  } else {
    return '';
  }
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for a story.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 * The open graph type is set to 'article'.
 * The open graph published time set to the entity's content date.
 * The open graph modified time set to the entity's last updated date.
 * The open graph authors set to the entity's created by field.
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
  return metadata;
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for an album.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string used for the description.
 * If the entity does not have a thumbnail or the thumbnail does not have a templateUrl, null is used for the images.
 * If the entity does not have tags, null is used for the open graph tags.
 *
 * @param {Metadata} parentMetadata - The parent metadata to be overridden.
 * @param {DistributionEntity} entity - The entity whose fields are to be used for overriding.
 * @returns {Metadata} The overridden metadata.
 */
export const overrideAlbumMetadata = (parentMetadata: Metadata, entity: DistributionEntity): Metadata => {
  return overrideDefaultMetadata(parentMetadata, entity);
};

/**
 * Overrides the default metadata of a given entity with specific metadata fields for a video.
 *
 * This function takes a parent metadata object and an entity, and overrides the metadata fields with specific fields from the entity.
 * The entity's thumbnail is transformed and used for the open graph and twitter images.
 * The entity's title is used for the title and open graph title.
 * The entity's headline is used for the description and open graph description.
 * The entity's tags are mapped to their titles for DistributionEntity or label for LiveBloggingBlogEntity and used for the open graph tags.
 * If the entity does not have a headline, an empty string used for the description.
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
  return metadata;
};

/**
 * Overrides the default metadata for live blogging entities with specific metadata fields.
 *
 * This function customizes the metadata for live blogging content by using specific fields from the provided live blogging entity and optionally a post.
 * It starts with a base metadata object and applies transformations and overrides based on the properties of the live blogging entity and post.
 * The function is designed to handle cases where only a blog entity is provided or both a blog and a post entity are provided.
 * The resulting metadata includes customized titles, descriptions, and Open Graph properties tailored to the live blogging content.
 * It ensures that the metadata accurately reflects the content's current state, including its publication and last modified times.
 * This function is particularly useful for enhancing the SEO and share ability of live blogging content on social media platforms.
 *
 * @param {Metadata} parentMetadata - The initial metadata object that will be overridden with specific fields from the live blogging entity.
 * @param {LiveBloggingBlogEntity} blog - The live blogging entity containing the fields to override the parent metadata.
 * @param {LiveBloggingPostEntity} [post] - Optional. A specific post within the live blogging entity to further customize the metadata.
 * @returns {Metadata} The customized metadata object with overrides applied from the live blogging entity and optionally a post.
 */
export const overrideLiveBloggingMetadata = (
  parentMetadata: Metadata,
  blog: LiveBloggingBlogEntity | null,
  post?: LiveBloggingPostEntity | null
): Metadata => {
  if (!blog) return parentMetadata;
  const metadata = overrideDefaultMetadata(parentMetadata, blog);
  const author = post?.author?.fullName ? post?.author?.fullName : blog?.publisher;
  const image: string = getSrcWithTransformation(
    blog?.coverImage?.templateUrl,
    transformations.thumbnail_landscape_detail.desktop.transformation
  );
  metadata.title = post?.headline ? post?.headline : blog.title;
  metadata.twitter = {
    ...metadata.twitter,
    images: image ?? null,
  };
  metadata.openGraph = {
    ...metadata.openGraph,
    type: 'article',
    images: [{ url: image ?? null }],
    publishedTime: post?.timestamp ? post?.timestamp : blog?.datePublished,
    modifiedTime: post?.lastModifiedDate ? post?.lastModifiedDate : blog?.lastUpdateDate,
  } as OpenGraph;
  if (author) {
    metadata.openGraph = {
      ...metadata.openGraph,
      authors: author,
    } as OpenGraph;
  }
  return metadata;
};
