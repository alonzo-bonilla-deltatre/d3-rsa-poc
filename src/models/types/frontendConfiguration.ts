export type FrontendConfiguration = {
  allSites: FrontendSiteConfiguration[];
};

export type FrontendSiteConfiguration = {
  culture: string;
  environment: string;
  platform: string;
  originUrl: string;
  translation: string;
};
