/* istanbul ignore file */
import { FrontendConfiguration } from '@/models/types/frontendConfiguration';

const environment = process.env.ENVIRONMENT as string;

const frontendConfiguration: FrontendConfiguration = {
  allSites: [
    {
      culture: 'en-GB',
      environment: environment,
      platform: 'default',
      originUrl: 'https://react-fe-en-poc.integrations-lab-forge.deltatre.digital',
      translation: 'lang_en-gb',
    },
    {
      culture: 'fr-FR',
      environment: environment,
      platform: 'default',
      originUrl: 'https://react-fe-fr-poc.integrations-lab-forge.deltatre.digital',
      translation: 'lang_fr-fr',
    },
  ],
};

export const getFrontendAllSiteConfiguration = (): FrontendConfiguration => {
  return frontendConfiguration;
};
