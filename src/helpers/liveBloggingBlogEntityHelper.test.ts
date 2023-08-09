import {
  KeyMomentAction,
  LiveBloggingBlogEntity,
  LiveBloggingTagEntity,
  PaginationType,
} from '@/models/types/liveblogging';
import { Variable } from '@/models/types/pageStructure';
import { enrichEntitiesWithThumbnailPlaceholder } from './liveBloggingBlogEntityHelper';
import { ImageAsset } from '@/models/types/images';

const fallbackImageAsset: ImageAsset = {
  title: 'no_image_available',
  templateUrl:
    'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/sandbox-integrations/react-poc/d3-placeholder_d8r7kc',
  format: '',
  slug: 'no_image_available',
};

const fallbackImageAssetWithoutTemplateUrl: ImageAsset = {
  title: 'Thumbnail 1',
  templateUrl: '',
  format: 'jpg',
  slug: 'thumbnail-1',
};

const mockedVariables: Variable[] = [
  {
    type: 'keyValue',
    key: 'inc_header',
    keyValue: {
      value: '~/test/react-poc/library/_header',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_footer',
    keyValue: {
      value: '~/test/react-poc/library/_footer',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'image_placeholder',
    keyValue: {
      value:
        'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/s--s2uj4h43--/v1684849708/sandbox-integrations/react-poc/d3-placeholder_d8r7kc',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'sitename',
    keyValue: {
      value: 'FORGE GO',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_amp_header',
    keyValue: {
      value: '~/_libraries/_ampheader',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'user_profile',
    keyValue: {
      value: '/account/profile/overview',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'hello',
    keyValue: {
      value: 'val in english parent',
      valueType: 'string',
    },
  },
  {
    type: 'keyValue',
    key: 'inc_hamburger',
    keyValue: {
      value: '~/test/react-poc/library/_hamburgher',
      valueType: 'string',
    },
  },
];

const tag1: LiveBloggingTagEntity = {
  id: 'tag-1',
  label: 'Tag 1',
  slug: 'tag-1',
  extradata: {},
};

const tag2: LiveBloggingTagEntity = {
  id: 'tag-2',
  label: 'Tag 2',
  slug: 'tag-2',
  extradata: {},
};

const mockedEntities: LiveBloggingBlogEntity[] = [
  {
    title: 'sample blog 1',
    slug: 'sample-blog-1',
    description: 'this is a sample blog',
    tags: [tag1, tag2],
    language: 'en-GB',
    dateFrom: '',
    dateTo: '',
    lastUpdateDate: '2022-01-11T14:15:24.126Z',
    timeZone: {
      offset: 'UTC+01:00DST',
    },
    coverImage: fallbackImageAsset,
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
    widgetConfig: null,
    url: '',
  },
  {
    title: 'sample blog 2',
    slug: 'sample-blog-2',
    description: 'this is a sample blog',
    tags: [tag1, tag2],
    language: 'en-GB',
    dateFrom: '',
    dateTo: '',
    lastUpdateDate: '2022-01-11T14:15:24.126Z',
    timeZone: {
      offset: 'UTC+01:00DST',
    },
    coverImage: fallbackImageAsset,
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
    widgetConfig: null,
    url: '',
  },
];

const mockedEntitiesWithIncompleteThumbnail = [
  {
    ...mockedEntities[0],
    coverImage: fallbackImageAssetWithoutTemplateUrl,
  },
  {
    ...mockedEntities[1],
    coverImage: fallbackImageAssetWithoutTemplateUrl,
  },
];

describe('enrichEntitiesWithThumbnailPlaceholder function', () => {
  it('should return an empty array if items are null', () => {
    const entities = enrichEntitiesWithThumbnailPlaceholder(null, mockedVariables);
    expect(entities).toStrictEqual([]);
  });

  it('should return an empty array if items are empty array', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder([], mockedVariables);
    expect(result).toEqual([]);
  });

  it('should set fallbackImageAsset as thumbnail for entities with empty string as per thumbnail "templateUrl" property', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntitiesWithIncompleteThumbnail, mockedVariables);
    expect(result).toStrictEqual(mockedEntities);
  });

  it('should return the original entities are with a valid placeholder', () => {
    const result = enrichEntitiesWithThumbnailPlaceholder(mockedEntities, mockedVariables);
    expect(result).toEqual(result);
  });
});
