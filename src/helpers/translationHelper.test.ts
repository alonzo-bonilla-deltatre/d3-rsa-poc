import {
  setSiteTranslations,
  getSiteTranslations,
  translate,
  deleteSiteTranslations,
} from '@/helpers/translationHelper';
import { getAllTranslations } from '@/services/translationService';
import logger from '@/utilities/logger';

jest.mock('@/services/translationService');
jest.mock('@/utilities/logger');

describe('translationHelper', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should set site translations', async () => {
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

    await setSiteTranslations();

    const siteTranslations = await getSiteTranslations();
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should get site translations when already set', async () => {
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

    await setSiteTranslations();

    const siteTranslations = await getSiteTranslations();
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should get site translations when not set', async () => {
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

    const siteTranslations = await getSiteTranslations();
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should delete site translations and return undefined', async () => {
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

    await setSiteTranslations();

    let siteTranslations = await getSiteTranslations();
    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);

    const deletedTranslations = deleteSiteTranslations();
    expect(deletedTranslations).toBeUndefined();
  });

  it('should set site translations when not set', async () => {
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

    const siteTranslations = await getSiteTranslations();

    expect(siteTranslations).toEqual(mockTranslations.resources['en-gb'].translation);
  });

  it('should return key when key is empty', () => {
    const result = translate();
    expect(result).toEqual('');
  });

  it('should return key when key is not found', async () => {
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

    await setSiteTranslations();

    const result = translate('notfound');
    expect(result).toEqual('notfound');
    expect(logger.log).toHaveBeenCalled();
  });

  it('should return translation when key is found', async () => {
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

    await setSiteTranslations();

    const result = translate('contact');
    expect(result).toEqual('Contact');
  });
});
