import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformations';
import { Metadata } from 'next';

/*
 This function replace the whole SEO metadata
 using the story entity fields.

 You can create other function in another file
 for each component that needs to override the 
 default page metadata.
*/
export const overrideDefaultMetadata = (parentMetadata: Metadata, storyEntity: DistributionEntity) => {
  const image: string = getSrcWithTransformation(
    storyEntity.thumbnail.templateUrl,
    transformations.thumbnailGridItem.desktop
  );

  const title: string = storyEntity.title;
  const description: string = storyEntity.headline;
  const authors = storyEntity.createdBy;

  const metadata: Metadata = {
    title,
    description,
    authors: [{ name: authors }],
    openGraph: {
      type: 'article',
      images: [{ url: image ?? null }],
      publishedTime: storyEntity.contentDate,
      modifiedTime: storyEntity.lastUpdatedDate,
      authors,
      tags: storyEntity.tags?.map((t) => t.title) ?? null,
    },
    twitter: {
      title,
      description,
      images: image ?? null,
    },
  };

  return Object.assign(parentMetadata, metadata);
};
