import { TermType } from '@/models/types/translations';
import { initI18n, translate } from './i18n';
import i18n, { InitOptions } from 'i18next';
import { getTranslations } from '@/services/translationService';

jest.mock('@/services/translationService', () => {
  const actual = jest.requireActual('@/services/translationService');
  return {
    ...actual,
    getTranslations: jest.fn(),
  };
});

describe('i18n', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('initI18n', () => {
    const getTranslationsMock = getTranslations as jest.Mock;

    it('should call getTranslations', async () => {
      // ACT
      await initI18n();

      // ASSERT
      expect(getTranslationsMock).toHaveBeenCalled();
    });

    it('should call i18n.addResourceBundle', async () => {
      // ARRANGE
      getTranslationsMock.mockResolvedValueOnce({
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
      });

      // ACT
      await initI18n();

      // ASSERT
      expect(i18n.hasResourceBundle('en-gb', 'translation')).toBe(true);
      expect(i18n.hasResourceBundle('fr-fr', 'translation')).toBe(true);
    });
  });

  describe('translate', () => {
    beforeEach(() => {
      const translations = {
        'top-video-picks': {
          standard: 'Top video picks',
          short: 'Top video',
        },
      };

      const options: InitOptions = {
        lowerCaseLng: true,
        interpolation: { escapeValue: false },
        react: { useSuspense: true },
        lng: 'en-gb',
        resources: {},
        supportedLngs: ['en-gb'],
        fallbackLng: 'en-gb',
      };
      i18n.init(options);

      i18n.addResourceBundle('en-gb', 'translation', translations);
    });

    it('translate with empty key, should return key', () => {
      // ACT
      const t = translate('');

      // ASSERT
      expect(t).toEqual('');
    });

    it('translate not existing key, should return key', () => {
      // ACT
      const t = translate('not-present');

      // ASSERT
      expect(t).toEqual('not-present');
    });

    it('translate existing label, should return translation', () => {
      // ACT
      const t = translate('top-video-picks');

      // ASSERT
      expect(t).toEqual('Top video picks');
    });

    it('translate existing label abbreviated, should return translation abbreviated', () => {
      // ACT
      const t = translate('top-video-picks', TermType.short);

      // ASSERT
      expect(t).toEqual('Top video');
    });
  });
});
