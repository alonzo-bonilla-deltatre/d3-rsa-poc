import { AccessibleLink, EventEntity, EventFields } from '@/models/types/forge.customEntityFields';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';

const sampleLink: AccessibleLink = {
  displayText: 'GO',
  accessibleText: 'GO',
  url: '#eventUrl',
  openInNewTab: false,
};

const sampleEventFields: EventFields = {
  backgroundEventImage: 'tag-image',
  backgroundEventImageAsset: sampleAsset,
  dateFrom: 'date',
  dateTo: 'date',
  description: '**Description of a event**',
  descriptionHtml: '',
  eventLogo: 'tag-image',
  eventLogoAsset: sampleAsset,
  eventType: 'Awards',
  eventUrl: sampleLink,
  facebookProfile: 'facebookProfile',
  headerColor: '#FF0000',
  headline: 'Headline',
  instagramProfile: '',
  mobileBackgroundEventImage: 'tag-image',
  mobileBackgroundEventImageAsset: sampleAsset,
  twitchChannel: '',
  twitterProfile: 'twitterProfile',
  venue: 'Istanbul',
  youtubeChannel: 'youtubeChannel',
};

const sampleEvent: EventEntity = {
  ...emptyDistributionEntity,
  ...sampleEventFields,
  fields: {
    ...sampleEventFields,
  },
};

export { sampleEvent, sampleLink };
