import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
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
export const overrideDefaultMetadata = (parentMetadata: Metadata, entity: LiveBloggingBlogEntity | null) => {
  const image: string = getSrcWithTransformation(
    entity?.coverImage?.templateUrl ?? null,
    transformations.thumbnailGridItem.desktop
  );

  const title: string = entity?.title || '';
  const description: string = entity?.description || '';

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      type: 'article',
      images: [{ url: image ?? null }],
      tags: entity?.tags?.map((t) => t.label) ?? null,
    },
    twitter: {
      title,
      description,
      images: image ?? null,
    },
  };
  return metadata;
};

export const overrideLiveBloggingMetadata = (parentMetadata: Metadata, entity: LiveBloggingBlogEntity | null) => {
  const metadata = overrideDefaultMetadata(parentMetadata, entity);
  metadata.openGraph = {
    type: 'article',
    publishedTime: entity?.lastUpdateDate,
    modifiedTime: entity?.lastUpdateDate,
  } as OpenGraph;
  return Object.assign(parentMetadata, metadata);
};
