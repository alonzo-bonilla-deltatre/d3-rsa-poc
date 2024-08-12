import { describe, expect, it } from '@jest/globals';
import { getPageStructure } from '@/services/pageService';
import { setPageMetadata } from '@/services/metadataService';
import { indexStructure } from '@/__mocks__/pageStructures';
import { Metadata } from 'next';
import {
  enrichPageVariables,
  generatePageMetadata,
  getPageData,
  getPageStructureFromVariablePath,
  getSiteDirection,
  isRtlSiteDirection,
} from '@/helpers/pageHelper';
import { Variable } from '@/models/types/pageStructure';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { renderMetadata } from '@/services/siteMetadataService';

jest.mock('@/services/metadataService', () => ({
  setPageMetadata: jest.fn(),
}));

jest.mock('@/services/pageService', () => ({
  getPageStructure: jest.fn(),
}));

jest.mock('@/helpers/dataVariableHelper', () => ({
  getDataVariable: jest.fn(),
}));

jest.mock('@/helpers/translationHelper', () => ({
  setSiteTranslations: jest.fn(),
}));

jest.mock('@/services/configurationService', () => ({
  setFrontendAllSiteConfiguration: jest.fn(),
}));

jest.mock('@/services/siteMetadataService', () => ({
  renderMetadata: jest.fn(),
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
    expect(await setPageMetadata).not.toHaveBeenCalled();
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
    expect(await setPageMetadata).toHaveBeenCalledTimes(1);
    expect(await setPageMetadata).toHaveBeenCalledWith(indexStructure.data.metadata);

    expect(result?.structure).toBe(indexStructure.data.structure);
    expect(result?.metadataItems).toBe(indexStructure.data.metadata);
    expect(result?.variables).toBe(indexStructure.data.variables);
    expect(result?.seoData).toBe(seoData);
  });
});

describe('enrichPageVariables', () => {
  test('should add variables to the defaultVariables array', () => {
    // ARRANGE
    const defaultVariables: Variable[] = [];
    const params = {
      pagePath: '/index',
      advId: '33647204-d890-48c8-9b4e-b589f9aecf98',
    };
    const expectedVariables: Variable[] = [
      {
        key: 'pagePath',
        type: 'keyValue',
        keyValue: {
          value: '/index',
          valueType: 'string',
        },
      },
      {
        key: 'advId',
        type: 'keyValue',
        keyValue: {
          value: '33647204-d890-48c8-9b4e-b589f9aecf98',
          valueType: 'string',
        },
      },
    ];

    // ACT
    enrichPageVariables(defaultVariables, params);

    // ASSERT
    expect(defaultVariables).toEqual(expectedVariables);
  });

  test('should not modify defaultVariables when params is an empty object', () => {
    // ARRANGE
    const defaultVariables: Variable[] = [];
    const params = {};

    // ACT
    enrichPageVariables(defaultVariables, params);

    // ASSERT
    expect(defaultVariables).toEqual([]);
  });
});

describe('generatePageMetadata', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty object when page data is not fetched successfully', async () => {
    // ACT
    const result = await generatePageMetadata({ pageName: ['pageName'] });

    // ASSERT
    expect(result).toEqual({});
  });

  it('should return metadata when page data is fetched successfully', async () => {
    // ARRANGE
    const metadata = {};
    (getPageStructure as jest.Mock).mockResolvedValueOnce(indexStructure);
    (renderMetadata as jest.Mock).mockResolvedValue(metadata);

    // ACT
    const result = await generatePageMetadata({ pageName: ['pageName'] });

    // ASSERT
    expect(result).toEqual(metadata);
  });
});

describe('getPageStructureFromVariablePath', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if path is not found in variables', async () => {
    // ARRANGE
    (getDataVariable as jest.Mock).mockReturnValue(null);

    // ACT
    const result = await getPageStructureFromVariablePath('variableName', []);

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return page structure data if path is found in variables', async () => {
    // ARRANGE
    const path = 'path';
    const pageStructureData = { data: 'data' };
    (getDataVariable as jest.Mock).mockReturnValue(path);
    (getPageStructure as jest.Mock).mockResolvedValue(pageStructureData);

    // ACT
    const result = await getPageStructureFromVariablePath('variableName', []);

    // ASSERT
    expect(result).toEqual(pageStructureData.data);
  });

  it('should return null if page structure is not found', async () => {
    // ARRANGE
    const path = 'path';
    (getDataVariable as jest.Mock).mockReturnValue(path);
    (getPageStructure as jest.Mock).mockResolvedValue(null);

    // ACT
    const result = await getPageStructureFromVariablePath('variableName', []);

    // ASSERT
    expect(result).toBeNull();
  });
});

describe('getTextDirection', () => {
  it('should return "rtl" when language is ar', () => {
    // ARRANGE
    const language = 'ar';

    // ACT
    const result = getSiteDirection(language);

    // ASSERT
    expect(result).toBe('rtl');
  });
  it('should return "ltr" when language is not ar', () => {
    // ARRANGE
    const language = 'en';

    // ACT
    const result = getSiteDirection(language);

    // ASSERT
    expect(result).toBe('ltr');
  });
});

describe('isRtlSiteDirection', () => {
  it('should return true when language is ar', () => {
    // ARRANGE
    const language = 'ar';

    // ACT
    const result = isRtlSiteDirection(language);

    // ASSERT
    expect(result).toBe(true);
  });
  it('should return false when language is not ar', () => {
    // ARRANGE
    const language = 'en';

    // ACT
    const result = isRtlSiteDirection(language);

    // ASSERT
    expect(result).toBe(false);
  });
});
