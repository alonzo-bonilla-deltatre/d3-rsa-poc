import { renderMetadata } from '@/services/siteMetadataService';
import { PageStructureItemType, StructureItem, Variable } from '@/models/types/pageStructure';
import { Metadata as NextMetadata } from 'next';
import { sampleAlbum } from '@/__mocks__/entities/sampleAlbum';
import { handleAlbumMosaicSeoMetadata } from '@/services/moduleSeoMetadataHandlers/albumMosaicSeoMetadataHandler';

jest.mock('@/services/forgeDistributionService');
jest.mock('@/services/liveBloggingDistributionService');
jest.mock('@/services/moduleSeoMetadataHandlers/albumMosaicSeoMetadataHandler');
jest.mock('@/helpers/metadataHelper');
jest.mock('@/helpers/dataVariableHelper');

describe('renderMetadata', () => {
  // ARRANGE
  const seoData: NextMetadata = { title: 'Default Title' };
  const variables: Variable[] = [];

  it('returns seoData when item is null', async () => {
    // ACT
    const result = await renderMetadata(null as any, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for template item', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.template,
      items: [],
      key: { id: '1', namespace: 'namespace' },
      properties: {},
    };
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for layout item', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.layout,
      items: [],
      key: { id: '1', namespace: 'namespace' },
      properties: {},
    };
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for nested items empty', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.template,
      items: [undefined as any],
      key: { id: '1', namespace: 'namespace' },
      properties: {},
    };
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for nested items', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.template,
      items: [
        {
          type: PageStructureItemType.layout,
          items: [
            {
              type: PageStructureItemType.module,
              key: { id: 'AlbumMosaic', namespace: 'namespace' },
              properties: { slug: 'album-slug' },
            },
          ],
          key: { id: '1', namespace: 'namespace' },
          properties: {},
        },
      ],
      key: { id: '1', namespace: 'namespace' },
      properties: {},
    };
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for module item', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.module,
      key: { id: 'AlbumMosaic', namespace: 'namespace' },
      properties: { slug: sampleAlbum.slug },
    };
    (handleAlbumMosaicSeoMetadata as jest.Mock).mockResolvedValue({
      ...seoData,
      title: sampleAlbum.title,
    });
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: sampleAlbum.title });
  });

  it('handles error in handler seo module', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.module,
      key: { id: 'AlbumMosaic', namespace: 'namespace' },
      properties: { slug: 'album-slug' },
    };
    (handleAlbumMosaicSeoMetadata as jest.Mock).mockRejectedValue(new Error('Error fetching entity'));
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('handles missing slug in module item', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.module,
      key: { id: 'AlbumMosaic', namespace: 'namespace' },
      properties: { preventSettingMetadata: false },
    };
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual(seoData);
  });

  it('enriches metadata for module item', async () => {
    // ARRANGE
    const item: StructureItem = {
      type: PageStructureItemType.module,
      key: { id: 'AlbumMosaic', namespace: 'namespace' },
      properties: { slug: sampleAlbum.slug },
    };
    (handleAlbumMosaicSeoMetadata as jest.Mock).mockResolvedValue({
      ...seoData,
      title: sampleAlbum.title,
    });
    // ACT
    const result = await renderMetadata(item, seoData, variables);
    // ASSERT
    expect(result).toEqual({ ...seoData, title: sampleAlbum.title });
  });
});
