import { overrideLiveBloggingMetadata } from '@/helpers/metadataHelper';
import { Variable } from '@/models/types/pageStructure';
import { Metadata as NextMetadata } from 'next';
import { getBlogEntity, getBlogPost, getBlogs } from '@/services/liveBloggingDistributionService';
import { getDataVariable } from '@/helpers/dataVariableHelper';

export const handleLiveBloggingSeoMetadata = async (
  seoData: NextMetadata,
  properties?: Record<string, unknown>,
  variables?: Variable[]
): Promise<NextMetadata> => {
  let liveBloggingPost = null;
  let blogSlug = properties?.slug?.toString() ?? '';
  const tags = (properties?.tags as string[]) ?? [];
  const eventId = properties?.eventId as string;
  if (!blogSlug && tags?.length) {
    const blogs = await getBlogs({
      tags: tags?.toString(),
      eventId: eventId,
    });
    const blog = blogs?.[0] ?? null;
    blogSlug = blog?.slug ?? blogSlug;
  }
  const postId = getDataVariable(variables, 'postid') as string;
  const liveBlogging = await getBlogEntity(blogSlug);
  if (!liveBlogging) {
    return seoData;
  }
  if (postId) {
    liveBloggingPost = await getBlogPost(blogSlug, postId);
  }
  return overrideLiveBloggingMetadata(seoData, liveBlogging, liveBloggingPost);
};
