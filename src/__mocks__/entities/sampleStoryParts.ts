import { DistributionEntity, ForgeEntityCode, ForgeEntityType, ForgeExternalEntityType } from '@/models/types/forge';
import { StoryPart } from '@/models/types/storyPart';

//********** EMPTY ************/
const emptyDistributionEntity: DistributionEntity = {
  id: '',
  fields: {},
  createdBy: '',
  type: ForgeEntityType.customEntity,
  _translationId: '',
  _entityId: '',
  selfUrl: '',
  slug: '',
  title: '',
  headline: '',
  tags: [],
  relations: [],
  references: {},
  lastUpdatedBy: '',
  lastUpdatedDate: '',
  contentDate: '',
  context: {
    _translationId: '',
    _entityId: '',
    type: '',
    selfUrl: '',
    title: '',
    slug: '',
    neutralSlug: '',
    externalSourceName: null,
    externalSourceReference: {},
    fields: {},
    extraData: {},
  },
  featured: 0,
  thumbnail: {
    title: '',
    templateUrl: '',
    format: '',
    slug: '',
  },
  image: {
    title: '',
    templateUrl: '',
    format: '',
    slug: '',
  },
  parts: [],
  entityCode: ForgeEntityCode.story,
};

const emptyDistributionEntityStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  content: '',
  externalType: ForgeExternalEntityType.storyPartPhoto,
  inputUrl: '',
};

//********** PHOTO ************/
const partialPhotoPart: StoryPart = {
  ...emptyDistributionEntity,
  content: undefined,
  type: ForgeEntityType.photo,
  image: {
    title: 'TestTitle',
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
    format: 'png',
    slug: 'TestSlug',
  },
  externalType: ForgeExternalEntityType.storyPartPhoto,
  inputUrl: '',
  url: '',
};

const samplePhotoStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialPhotoPart,
};

//********** QUOTE ************/
const partialQuotePart = {
  type: ForgeEntityType.external,
  content: {
    quote: 'This is a test quote.',
    author: 'Test Author',
  },
  externalType: ForgeExternalEntityType.storyPartQuote,
  inputUrl: '',
};

const sampleQuoteStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialQuotePart,
};

//********** YOUTUBE ************/
const partialYouTubePart = {
  type: ForgeEntityType.external,
  content: {
    title: 'Test Video Title',
    author_name: 'Test Author',
    author_url: 'https://www.youtube.com/@TestAuthor',
    type: 'video',
    height: 270,
    width: 480,
    version: '1.0',
    provider_name: 'YouTube',
    provider_url: 'https://www.youtube.com/',
    thumbnail_height: 360,
    thumbnail_width: 480,
    thumbnail_url: 'https://test.url.com/test-thumbnail.jpg',
    html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/testVideoId?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Test Video Title"></iframe>',
  },
  externalType: ForgeExternalEntityType.oembed,
  inputUrl: 'https://www.youtube.com/watch?v=testVideoId',
};
const sampleYoutubeStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialYouTubePart,
};

//********** TWITTER ************/
const partialTwitterPart = {
  type: ForgeEntityType.external,
  content: {
    url: 'https://twitter.com/TestUser/status/1234567890',
    author_name: 'Test User',
    author_url: 'https://twitter.com/TestUser',
    type: 'rich',
    width: 550,
    version: '1.0',
    provider_name: 'Twitter',
    provider_url: 'https://twitter.com',
    html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This is a test tweet.</p>&mdash; Test User (@TestUser) <a href="https://twitter.com/TestUser/status/1234567890?ref_src=twsrc%5Etfw">January 1, 2022</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
    cache_age: '3153600000',
  },
  externalType: ForgeExternalEntityType.oembed,
  inputUrl: 'https://twitter.com/TestUser/status/1234567890?s=20',
};

const sampleTwitterStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialTwitterPart,
};

//********** INSTAGRAM ************/
const partialInstagramPart = {
  type: ForgeEntityType.external,
  content: {
    author_name: 'TestAuthor',
    type: 'rich',
    width: 658,
    version: '1.0',
    provider_name: 'Instagram',
    provider_url: 'https://www.instagram.com/',
    html: '',
    thumbnail_url: 'https://test.url.com/test-thumbnail.jpg',
    thumbnail_width: 480,
    thumbnail_height: 360,
  },
  externalType: ForgeExternalEntityType.oembed,
  inputUrl: 'https://www.instagram.com/p/TestPostId',
};

const sampleInstagramStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialInstagramPart,
};

//********** BRIGHTCOVE ************/
const partialBrightcoveVideoPart = {
  type: ForgeEntityType.customEntity,
  _translationId: 'TestTranslationId',
  _entityId: 'TestEntityId',
  selfUrl: 'https://test.url.com/content/en-gb/brightcovevideos/TestVideo',
  title: 'Test Video Title',
  slug: 'test-video-title',
  fields: {
    duration: '12345',
    brightcoveAccountId: 'TestAccountId',
    brightcoveId: 'TestBrightcoveId',
  },
  entityCode: ForgeEntityCode.brightcoveVideo,
  thumbnail: {
    title: 'Test Thumbnail Title',
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
    thumbnailUrl: 'https://test.url.com/image/private/w_250,h_250,c_thumb,g_auto,q_auto,f_jpg/v0000000000/Test.png',
    format: 'jpg',
    overriddenFormats: {},
    slug: 'test-thumbnail-title',
    selfUrl: 'https://test.url.com/content/en-gb/photos/test-thumbnail-title',
  },
  featured: 0,
  createdBy: 'Test User',
  lastUpdatedBy: 'Test User',
  lastUpdatedDate: '2022-01-01T00:00:00Z',
  contentDate: '2022-01-01T00:00:00Z',
  tags: [],
};

const sampleBrightcoveVideoStoryPart: StoryPart = {
  ...emptyDistributionEntity,
  ...emptyDistributionEntityStoryPart,
  ...partialBrightcoveVideoPart,
};

export {
  emptyDistributionEntity,
  emptyDistributionEntityStoryPart,
  sampleBrightcoveVideoStoryPart,
  sampleQuoteStoryPart,
  sampleYoutubeStoryPart,
  sampleTwitterStoryPart,
  sampleInstagramStoryPart,
  samplePhotoStoryPart,
};
