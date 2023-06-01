import {
  sampleBrightcoveVideoStoryPart,
  sampleQuoteStoryPart,
  sampleYoutubeStoryPart,
  sampleTwitterStoryPart,
  sampleInstagramStoryPart,
} from '@/__mocks__/entities/sampleStoryParts';
import { sampleBrightcoveVideo } from '@/__mocks__/entities/brightcoveVideo';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';
import { sampleTableStoryPart1 } from '@/__mocks__/entities/sampleTableStoryParts';
const sampleStory2 = {
  ...emptyDistributionEntity,
  type: 'story',
  _translationId: '9b8c8008-ce91-42b9-908e-8a9cbe06701a',
  _entityId: '71046099-fc69-46e6-b1fc-5d09a670b329',
  selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/stories/afl-stadium-upgrade',
  title: 'AFL stadium upgrade',
  slug: 'afl-stadium-upgrade',
  fields: {},
  summary:
    '"The Marvel Stadium Upgrade represents a $225 million investment by the Victorian Government, providing a unique opportunity to revitalise Marvel Stadium as both a world class sports and entertainment venue and a day-to-day destination within the City of Melbourne!\\n\\nWhen it was first built, the Stadium set a world benchmark but',
  thumbnail: {
    title: 'HIGHLIGHTS | Paulo Neto dominates in the eMLS League Series 1 Final by a score of 9-1',
    templateUrl:
      'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/ptbaxl0hbnjjz9eovpbj',
    thumbnailUrl:
      'https://res.cloudinary.com/forgephotos/image/private/w_250,h_250,c_thumb,g_auto,q_auto,f_jpg/forgego-sandbox/ptbaxl0hbnjjz9eovpbj',
    format: 'jpg',
    overriddenFormats: {},
    slug: 'highlights-paulo-neto-dominates-in-the-emls-league-series-1-final-by-a-sco-x8915',
    selfUrl:
      'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/photos/highlights-paulo-neto-dominates-in-the-emls-league-series-1-final-by-a-sco-x8915',
  },
  featured: 0,
  createdBy: 'FORGE Importer',
  lastUpdatedBy: 'Mario Castellani',
  lastUpdatedDate: '2023-02-08T10:01:52.197Z',
  contentDate: '2022-10-25T12:23:16Z',
  tags: [],
};

const sampleStory = {
  type: 'story',
  _translationId: '5f8c5508-2495-482f-b02a-dcdfce610740',
  _entityId: '32e14194-c069-46d7-a307-63b8bb2c8922',
  selfUrl:
    'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/stories/hurricanes-rally-past-blackhawks-season-opening-winning-streak-at-nine',
  slug: 'hurricanes-rally-past-blackhawks-season-opening-winning-streak-at-nine',
  title: 'Hurricanes rally past Blackhawks, season-opening winning streak at nine',
  tags: [],
  relations: [sampleStory2, sampleBrightcoveVideo],
  references: {},
  fields: {},
  createdBy: 'Davide Giulietti',
  lastUpdatedBy: 'naile kas',
  lastUpdatedDate: '2021-11-29T15:32:40.164Z',
  contentDate: '2021-11-08T10:46:41.679Z',
  context: {
    _translationId: '6fe98ed3-deba-4e52-9cc9-a51914e52fb4',
    _entityId: '9548e3bf-24c2-47a4-926e-e279d02ca0a3',
    type: 'tag',
    selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/tags/game-recap',
    title: 'GAME RECAP',
    slug: 'game-recap',
    neutralSlug: 'game-recap',
    externalSourceName: null,
    externalSourceReference: {},
    fields: {},
    extraData: {},
  },
  featured: 0,
  headline: 'Come back from down two, Necas scores go-ahead goal early in third',
  summary:
    'As it happened\n- Necas scores go-ahead goal early in third\n- Seth Jarvis scored his first NHL goal\n- Carolina Hurricanes extendes their season-opening winning streak to nine games',
  parts: [
    sampleBrightcoveVideoStoryPart,
    sampleQuoteStoryPart,
    sampleYoutubeStoryPart,
    sampleTwitterStoryPart,
    sampleTableStoryPart1,
    sampleInstagramStoryPart,
  ],

  thumbnail: {
    title: 'QA - Martin Necas in action',
    templateUrl:
      'https://res.cloudinary.com/forgephotos/image/private/{formatInstructions}/forgego-sandbox/onpo9nuj6hbrnf0udky9',
    thumbnailUrl:
      'https://res.cloudinary.com/forgephotos/image/private/w_250,h_250,c_thumb,g_auto,q_auto,f_jpg/forgego-sandbox/onpo9nuj6hbrnf0udky9',
    format: 'jpg',
    overriddenFormats: {},
    slug: 'cut1',
    selfUrl: 'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/photos/cut1',
  },
};

export { sampleStory, sampleStory2 };
