import {FrontendConfiguration} from "@/models/types/frontendConfiguration";
import {initI18n, translate} from "@/utilities/i18n";

const frontendConfiguration: FrontendConfiguration = {
  allSites: [
    {
      culture: "en-GB",
      environment: "sandbox",
      platform: "default",
      originUrl: "https://react-fe-en-poc.integrations-lab-forge.deltatre.digital",
      translation: translate(`lang_en-gb`)
    },
    {
      culture: "fr-FR",
      environment: "sandbox",
      platform: "default",
      originUrl: "https://react-fe-fr-poc.integrations-lab-forge.deltatre.digital",
      translation: translate(`lang_fr-fr`)
    }
  ]
};

export const getFrontendAllSiteConfiguration = async (): Promise<FrontendConfiguration> => {
  await initI18n();
  return frontendConfiguration
};