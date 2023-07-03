import { AccessibleLink, EventEntity, EventFields } from '@/models/types/dapi.customEntityFields';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';

const sampleLink: AccessibleLink = {
  displayText: 'GO',
  accessibleText: 'GO',
  url: '#eventUrl',
  openInNewTab: false,
};

const sampleEventFields: EventFields = {
  eventType: 'Awards',
  headline: 'Headline',
  mobileBackgroundEventImage: 'tag-image',
  backgroundEventImage: 'tag-image',
  eventLogo: 'tag-image',
  dateFrom: 'date',
  dateTo: 'date',
  description: '**Description of a event**',
  venue: 'Istanbul',
  facebookProfile: 'facebookProfile',
  twitterProfile: 'twitterProfile',
  youtubeChannel: 'youtubeChannel',
  headerColor: '#FF0000',
  url: sampleLink,
  descriptionHtml: '',
  instagramProfile: '',
  twitchChannel: '',
  mobileBackgroundEventImageAsset: sampleAsset,
  backgroundEventImageAsset: sampleAsset,
  eventLogoAsset: sampleAsset,
};

const sampleEvent: EventEntity = {
  ...emptyDistributionEntity,
  ...sampleEventFields,
  fields: {
    ...sampleEventFields,
  },
};

export { sampleEvent, sampleLink };
