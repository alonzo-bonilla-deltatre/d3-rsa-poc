import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
/*
 This function replaces the whole SEO metadata
 using the story entity fields.

 You can create other function in another file
 for each component that needs to override the 
 default page metadata.
*/
export const overrideDefaultMetadata = (parentMetadata: Metadata, entity: DistributionEntity) => {
  const image: string = getSrcWithTransformation(
    entity?.thumbnail?.templateUrl ?? null,
    transformations.thumbnailGridItem.desktop
  );

  const title: string = entity.title;
  const description: string = entity.headline || '';
  const authors = entity.createdBy;

  const metadata: Metadata = {
    title,
    description,
    authors: [{ name: authors }],
    openGraph: {
      type: 'article',
      images: [{ url: image ?? null }],
      tags: entity.tags?.map((t) => t.title) ?? null,
    },
    twitter: {
      title,
      description,
      images: image ?? null,
    },
  };
  return metadata;
};
export const overrideStoryMetadata = (parentMetadata: Metadata, entity: DistributionEntity) => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.openGraph = {
    type: 'article',
    publishedTime: entity.contentDate,
    modifiedTime: entity.lastUpdatedDate,
    authors: entity.createdBy,
  } as OpenGraph;
  return Object.assign(parentMetadata, metadata);
};
export const overrideAlbumMetadata = (parentMetadata: Metadata, entity: DistributionEntity) => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  return Object.assign(parentMetadata, metadata);
};
export const overrideVideoMetadata = (parentMetadata: Metadata, entity: DistributionEntity) => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.openGraph = {
    type: 'video.other',
  };
  return Object.assign(parentMetadata, metadata);
};
