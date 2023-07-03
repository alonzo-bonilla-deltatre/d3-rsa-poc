import { DistributionEntity } from './forge';
import { GraphicAssetsDashboardItem } from './gad';

export type CustomPromoFields = {
  description: string;
  url: {
    displayText: string;
    url: string;
    openInNewTab: boolean;
  };
  callToAction1Link: {
    displayText: string;
    url: string;
    openInNewTab: boolean;
  };
  callToAction2Link: {
    displayText: string;
    url: string;
    openInNewTab: boolean;
  };
};

export type AccessibleLink = {
  displayText: string;
  accessibleText: string;
  url: string;
  openInNewTab: boolean;
};

export type GrandPrixFields = {
  headline: string;
  dateFrom: string;
  dateTo: string;
  circuit: string;
  city: string;
  country: string;
  buyTicket: AccessibleLink;
  eventDetails: AccessibleLink;
  enableTickets: boolean;
  enableDetails: boolean;
};

export type PartnerFields = {
  PartnerLink: AccessibleLink;
  PartnerLogo: string;
  PartnerName: string;
};

export type EventEntity = DistributionEntity & EventFields;
export type EventFields = {
  backgroundEventImage: string | null;
  backgroundEventImageAsset: GraphicAssetsDashboardItem | null;
  dateFrom: string;
  dateTo: string;
  description: string | null;
  descriptionHtml: string;
  eventLogo: string | null;
  eventLogoAsset: GraphicAssetsDashboardItem | null;
  eventType: string | null;
  eventUrl: AccessibleLink | null;
  facebookProfile: string | null;
  headerColor: string | null;
  headline: string | null;
  instagramProfile: string | null;
  mobileBackgroundEventImage: string | null;
  mobileBackgroundEventImageAsset: GraphicAssetsDashboardItem | null;
  twitchChannel: string | null;
  twitterProfile: string | null;
  venue: string | null;
  youtubeChannel: string | null;
};
