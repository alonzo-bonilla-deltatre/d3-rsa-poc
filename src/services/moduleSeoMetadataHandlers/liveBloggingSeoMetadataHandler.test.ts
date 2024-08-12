import { Metadata as NextMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Variable } from '@/models/types/pageStructure';
import { handleLiveBloggingSeoMetadata } from '@/services/moduleSeoMetadataHandlers/liveBloggingSeoMetadataHandler';
import { getBlogEntity, getBlogPost, getBlogs } from '@/services/liveBloggingDistributionService';
import { overrideLiveBloggingMetadata } from '@/helpers/metadataHelper';
import { samplePost } from '@/__mocks__/entities/sampleLiveblogging';

jest.mock('@/services/liveBloggingDistributionService');
jest.mock('@/helpers/metadataHelper');

describe('handleLiveBloggingSeoMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns enriched seoData when blog is found by tags and eventId is provided', async () => {
    // ARRANGE
    const properties = { tags: ['tag1', 'tag2'], eventId: 'event-id' };
    const blogs = [{ slug: 'blog-slug', id: 'blog-id', title: 'Live Blogging Title' }];
    const liveBlogging = { id: 'blog-id', title: 'Live Blogging Title' };
    (getBlogs as jest.Mock).mockResolvedValue(blogs);
    (getBlogEntity as jest.Mock).mockResolvedValue(liveBlogging);
    (overrideLiveBloggingMetadata as jest.Mock).mockImplementation((seoData, blog) => ({
      ...seoData,
      title: blog.title,
    }));
    // ACT
    const result = await handleLiveBloggingSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: 'Live Blogging Title' });
  });

  it('returns original seoData when no blog is found by tags', async () => {
    // ARRANGE
    const properties = { tags: ['tag1', 'tag2'], eventId: 'event-id' };
    (getBlogs as jest.Mock).mockResolvedValue([]);
    // ACT
    const result = await handleLiveBloggingSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('returns enriched seoData with post when blog is found by eventId is provided and postid', async () => {
    // ARRANGE
    const properties = { tags: undefined, eventId: 'event-id' };
    const blogs = [{ slug: 'blog-slug', id: 'blog-id', title: 'Live Blogging Title' }];
    const liveBlogging = { id: 'blog-id', title: 'Live Blogging Title' };
    const variables = [{ key: 'postid', type: 'string', keyValue: { value: 'post-id', valueType: 'string' } }];
    (getBlogs as jest.Mock).mockResolvedValue(blogs);
    (getBlogEntity as jest.Mock).mockResolvedValue(liveBlogging);
    (getBlogPost as jest.Mock).mockResolvedValue(samplePost);
    (overrideLiveBloggingMetadata as jest.Mock).mockImplementation((seoData, blog, samplePost) => ({
      ...seoData,
      title: samplePost.headline,
    }));
    // ACT
    const result = await handleLiveBloggingSeoMetadata(seoData, properties, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: samplePost.headline });
  });
});
