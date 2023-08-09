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
  slug: 'sample-blog',
  culture: 'en-GB',
  baseUrl: 'https://liveblogging.integrations-lab-forge.deltatre.digital',
  showKeyMoments: true,
};

const sampleTags: LiveBloggingTagEntity[] = [
  {
    slug: 'awards',
    id: '9a220596-d930-4689-a28b-e6186ec76017',
    label: 'awards',
    extradata: {},
  },
];

const sampleBlog: LiveBloggingBlogEntity = {
  title: 'sample blog',
  slug: 'sample-blog',
  description: 'this is a sample blog',
  tags: sampleTags,
  language: 'en-GB',
  dateFrom: '',
  dateTo: '',
  lastUpdateDate: '2022-01-11T14:15:24.126Z',
  timeZone: {
    offset: 'UTC+01:00DST',
  },
  coverImage: {
    templateUrl:
      'https://res.cloudinary.com/dqss5rlhj/image/private/{formatInstructions}/v1604563660/forgego-liveblogging/ufdhb2ndt3i7x1zre0rg',
  },
  totalPosts: 17,
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
      env: 'integration',
      culture: 'en-GB',
      slug: 'sample-blog',
    },
    enableCompanionAd: false,
  },
  oembed: {
    templateUrl: 'https://liveblogging.integrations-lab-forge.deltatre.digital/oembed?url={url}',
  },
  event: null,
  widgetConfig: sampleBlogWidgetConfig,
  url: '',
};

const samplePost: LiveBloggingPostEntity = {
  postId: 'post-id',
  tags: sampleTags,
  author: {
    fullName: 'author',
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
        externalSourceId: 'externalSourceId',
        externalSourceType: 'externalSourceType',
      },
    },
  ],
  properties: {},
  timestamp: '2022-01-11T14:15:24.126Z',
};

const sampleBlogs: LiveBloggingBlogEntity[] = [sampleBlog];

export { sampleBlog, samplePost, sampleBlogs };
