import axios from 'axios';
import { getAllTranslations } from '@/services/translationService';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('axios');
jest.mock('@/utilities/loggerUtility');
jest.mock('@/helpers/translationHelper');

describe('getAllTranslations', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the right API URL', async () => {
    // ARRANGE
    (axios.get as jest.Mock).mockResolvedValue({});

    // ACT
    await getAllTranslations();

    // ASSERT
    expect(axios.get as jest.Mock).toHaveBeenCalledWith(
      `${process.env.VOCABULARY_TOOL_API_BASE_URL}/api/vocabularies/${process.env.VOCABULARY_TOOL_VOC_CODE}/i18n`
    );
  });

  it('should return null if translation object contains all the required properties', async () => {
    // ARRANGE
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        mainLanguage: 'en-gb',
      },
    });

    // ACT
    const result = await getAllTranslations();

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return translations if translation object contains all the required properties', async () => {
    // ARRANGE
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
    const result = await getAllTranslations();

    // ASSERT
    expect(result?.mainLanguage).not.toBeNull();
    expect(result?.languages).not.toBeNull();
    expect(result?.resources).not.toBeNull();
  });

  it('should return null in case of exception', async () => {
    // ARRANGE
    (axios.get as jest.Mock).mockRejectedValueOnce({});

    // ACT
    const result = await getAllTranslations();

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return null in case of exception and log the response data if available', async () => {
    // ARRANGE
    const errorMessage = 'Unauthorized';
    (axios.get as jest.Mock).mockRejectedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
      data: {
        error: { message: errorMessage },
      },
    });

    // ACT
    const result = await getAllTranslations();

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
  });

  it('should return null in case of exception and log the response', async () => {
    // ARRANGE
    const errorMessage = 'VOCABULARY TOOL API Error:';
    (axios.get as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    // ACT
    const result = await getAllTranslations();

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
  });
});
