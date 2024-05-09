import {
  KeyMomentAction,
  LiveBloggingBlogEntity,
  LiveBloggingPostEntity,
  LiveBloggingTagEntity,
  LiveBloggingWidgetConfig,
  PaginationType,
  PostType,
} from '@/models/types/liveblogging';
import { ImageAsset } from '@/models/types/images';

const sampleBlogWidgetConfig: LiveBloggingWidgetConfig = {
  slug: 'test-blog',
  culture: 'en-GB',
  baseUrl: 'https://liveblogging.test-url.com',
  showKeyMoments: true,
};

const sampleTags: LiveBloggingTagEntity[] = [
  {
    slug: 'test',
    id: 'Test-Id',
    label: 'test',
    extradata: {},
  },
];

const sampleBlog: LiveBloggingBlogEntity = {
  title: 'test blog',
  slug: 'test-blog',
  description: 'this is a test blog',
  tags: sampleTags,
  language: 'en-GB',
  dateFrom: '',
  dateTo: '',
  lastUpdateDate: '2022-01-01T00:00:00Z',
  timeZone: {
    offset: 'UTC+01:00DST',
  },
  coverImage: {
    templateUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
  },
  totalPosts: 10,
  presentation: {
    keyMomentsVisible: true,
    showBlogDefinition: true,
    showTimezoneSwitch: true,
    paginationType: PaginationType.InfiniteScroll,
    keyMomentAction: KeyMomentAction.ScrollToPost,
    postSharing: {
      enabled: true,
      destinations: {
        link: true,
        twitter: true,
        facebook: true,
        santas: true,
      },
    },
  },
  monetization: {
    targeting: {
      position: 'inline',
      size: 'leaderboard',
      type: 'blog',
      env: 'dev',
      culture: 'en-GB',
      slug: 'test-blog',
    },
    enableCompanionAd: false,
  },
  oembed: {
    templateUrl: 'https://liveblogging.test-url.com/oembed?url={url}',
  },
  event: null,
  widgetConfig: sampleBlogWidgetConfig,
  url: '',
};

const samplePost: LiveBloggingPostEntity = {
  postId: 'test-post-id',
  tags: sampleTags,
  author: {
    fullName: 'test author',
  },
  type: PostType.Post,
  isSticky: false,
  keyMoment: {
    isEnabled: false,
    title: '',
  },
  parts: [
    {
      type: 'text',
      content: {},
      externalSourceReference: {
        externalSourceId: 'test-externalSourceId',
        externalSourceType: 'test-externalSourceType',
      },
    },
  ],
  properties: {},
  timestamp: '2022-01-01T00:00:00Z',
};

const sampleBlogs: LiveBloggingBlogEntity[] = [sampleBlog];

export { sampleBlog, samplePost, sampleBlogs };
