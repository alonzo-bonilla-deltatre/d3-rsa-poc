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
