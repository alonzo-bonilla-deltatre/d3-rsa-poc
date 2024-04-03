import {
  setSiteTranslations,
  getSiteTranslations,
  translate,
  deleteSiteTranslations,
} from '@/helpers/translationHelper';
import { getAllTranslations } from '@/services/translationService';
import logger from '@/utilities/loggerUtility';

jest.mock('@/services/translationService');
jest.mock('@/utilities/loggerUtility');

describe('translationHelper', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should set site translations', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    await setSiteTranslations();
    const siteTranslations = await getSiteTranslations();

    // ASSERT
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should get site translations when already set', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    await setSiteTranslations();
    const siteTranslations = await getSiteTranslations();

    // ASSERT
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should get site translations when not set', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    const siteTranslations = await getSiteTranslations();
    // ASSERT
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should delete site translations and return undefined', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    await setSiteTranslations();
    let siteTranslations = await getSiteTranslations();

    // ASSERT
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);

    // ACT
    const deletedTranslations = deleteSiteTranslations();
    // ASSERT
    expect(deletedTranslations).toBeUndefined();
  });

  it('should set site translations when not set', async () => {
    // ARRANGE
    deleteSiteTranslations();
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    const siteTranslations = await getSiteTranslations();

    // ASSERT
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should return key when key is empty', () => {
    // ACT
    const result = translate();
    // ASSERT
    expect(result).toEqual('');
  });

  it('should return key when key is not found', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    await setSiteTranslations();
    const result = translate('notfound');

    // ASSERT
    expect(result).toEqual('notfound');
    expect(logger.log).toHaveBeenCalled();
  });

  it('should return translation when key is found', async () => {
    // ARRANGE
    const mockTranslations = {
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
    };
    (getAllTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    // ACT
    await setSiteTranslations();
    const result = translate('contact');

    // ASSERT
    expect(result).toEqual('Contact');
  });
});
