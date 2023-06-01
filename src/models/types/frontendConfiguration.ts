export type FrontendConfiguration = {
  allSites: FrontendSiteConfiguration[];
};

export type FrontendSiteConfiguration = {
  culture: string;
  url: string;
  translation: string;
};
