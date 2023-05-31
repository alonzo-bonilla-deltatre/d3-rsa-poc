import axios from 'axios';
import { getFallBackTranslations, getTranslations } from '@/services/translationService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('axios');
jest.mock('@/utilities/logger');

describe('getFallBackTranslations', () => {
  test('should return fallback translations with correct culture and resources', () => {
    // ACT
    const translations = getFallBackTranslations();

    // ASSERT
    expect(translations).toEqual({
      mainLanguage: 'en-gb',
      languages: ['en-gb'],
      resources: {
        'en-gb': { translation: {} },
      },
    });
  });
});

describe('getTranslations', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the right API URL', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getTranslations();

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.VOCABULARY_TOOL_API_BASE_URL}/api/vocabularies/${process.env.VOCABULARY_TOOL_VOC_CODE}/i18n`
    );
  });

  it('should return null if translation object contains all the required properties', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        mainLanguage: 'en-gb',
      },
    });

    // ACT
    const result = await getTranslations();

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return translations if translation object contains all the required properties', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        mainLanguage: 'en-gb',
        languages: ['en-gb', 'fr-fr'],
        resources: {
          'en-gb': {
            translation: {
              contact: {
                standard: 'Contact',
                short: '',
              },
            },
          },
          'fr-fr': {
            translation: {
              contact: {
                standard: 'Contacter',
                short: '',
              },
            },
          },
        },
      },
    });

    // ACT
    const result = await getTranslations();

    // ASSERT
    expect(result?.mainLanguage).not.toBeNull();
    expect(result?.languages).not.toBeNull();
    expect(result?.resources).not.toBeNull();
  });

  it('should return null in case of exception', async () => {
    // ASSERT
    (axios.get as jest.Mock).mockRejectedValueOnce({});

    // ACT
    const result = await getTranslations();

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return null in case of exception and log the response data if available', async () => {
    // ASSERT
    const errorMessage = 'Unauthorized';
    (axios.get as jest.Mock).mockRejectedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
      data: {
        error: { message: errorMessage },
      },
    });

    // ACT
    const result = await getTranslations();

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
  });
});
