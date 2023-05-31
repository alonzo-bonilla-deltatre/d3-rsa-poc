import { getPageStructure } from '@/services/pageService';
import { setPageMetadata } from '@/services/metadataService';
import { indexStructure } from '../__mocks__/pageStructures';
import { Metadata } from 'next';
import { enrichPageMetadata, getPageData } from './pageHelpers';

jest.mock('@/services/metadataService', () => ({
  setPageMetadata: jest.fn(),
}));

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

describe('getPageData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call notFound if pageStructure response is not valid', async () => {
    // ARRANGE
    (getPageStructure as jest.Mock).mockResolvedValueOnce(null);

    // ACT
    await getPageData('/index', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    // ASSERT
    expect(setPageMetadata).not.toHaveBeenCalled();
  });

  it('should fetch page data successfully', async () => {
    // ARRANGE
    const seoData = {
      title: 'Homepage',
      description: 'The website description',
    } as Metadata;

    (getPageStructure as jest.Mock).mockResolvedValueOnce(indexStructure);
    (setPageMetadata as jest.Mock).mockReturnValueOnce(seoData);

    // ACT
    const result = await getPageData('/index', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

    // ASSERT
    expect(setPageMetadata).toHaveBeenCalledTimes(1);
    expect(setPageMetadata).toHaveBeenCalledWith(indexStructure.data.metadata);

    expect(result?.structure).toBe(indexStructure.data.structure);
    expect(result?.metadataItems).toBe(indexStructure.data.metadata);
    expect(result?.variables).toBe(indexStructure.data.variables);
    expect(result?.seoData).toBe(seoData);
  });
});

describe('enrichPageMetadata', () => {
  it('should assign metadata properties when seoData is provided', () => {
    const metadata = {};
    const seoData = {
      title: 'Page Title',
      description: 'Page Description',
      metadataBase: 'Page Metadata Base',
      alternates: ['Alternate 1', 'Alternate 2'],
      authors: ['Author 1', 'Author 2'],
      robots: 'noindex',
      openGraph: { ogProperty: 'OG Property' },
      twitter: { twitterProperty: 'Twitter Property' },
      other: { customProperty: 'Custom Property' },
    } as unknown as Metadata;

    enrichPageMetadata(metadata, seoData);

    expect(metadata).toEqual({
      title: 'Page Title',
      description: 'Page Description',
      metadataBase: 'Page Metadata Base',
      alternates: ['Alternate 1', 'Alternate 2'],
      authors: ['Author 1', 'Author 2'],
      robots: 'noindex',
      openGraph: { ogProperty: 'OG Property' },
      twitter: { twitterProperty: 'Twitter Property' },
      other: { customProperty: 'Custom Property' },
    });
  });

  it('should not assign metadata properties when seoData is null', () => {
    const metadata = {};
    const seoData = null;

    enrichPageMetadata(metadata, seoData);

    expect(metadata).toEqual({});
  });
});
