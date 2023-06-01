/* istanbul ignore file */
import { FrontendConfiguration } from '@/models/types/frontendConfiguration';

const dnsSubdomain = process.env.DNS_SUB_DOMAIN as string;
const dnsDomainWithLangPlaceholder = process.env.DNS_DOMAIN_WITH_LANG_PLACEHOLDER as string;
const langPlaceholder = '{lang}';

const frontendConfiguration: FrontendConfiguration = {
  allSites: [
    {
      culture: 'en-GB',
      url: `https://${dnsDomainWithLangPlaceholder?.replace(langPlaceholder, 'en')}.${dnsSubdomain}`,
      translation: 'lang_en-gb',
    },
    {
      culture: 'fr-FR',
      url: `https://${dnsDomainWithLangPlaceholder?.replace(langPlaceholder, 'fr')}.${dnsSubdomain}`,
      translation: 'lang_fr-fr',
    },
  ],
};

export const getFrontendAllSiteConfiguration = (): FrontendConfiguration => {
  return frontendConfiguration;
};
