import { transform } from '@/helpers/markdownHelper';
import { getEventEntity } from '@/services/eventService';
import { getEntity } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import { sampleAsset } from '@/__mocks__/components/sampleGadAsset';
import { sampleEvent, sampleLink } from '@/__mocks__/entities/sampleEvents';
import {
  emptyDistributionEntityWithEmptyFields,
  emptyDistributionEntityWithNullFields,
} from '@/__mocks__/entities/sampleStoryParts';

jest.mock('@/helpers/markdownHelper', () => ({
  transform: jest.fn(),
}));

jest.mock('@/services/forgeDistributionService', () => ({
  getEntity: jest.fn(),
}));

jest.mock('@/services/gadService', () => ({
  getSingleAssetByTag: jest.fn(),
}));

describe('getEventEntity function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns empty entity if initial entity is empty', async (): Promise<void> => {
    // ARRANGE
    (transform as jest.Mock).mockResolvedValueOnce('');
    const entity = emptyDistributionEntityWithEmptyFields;
    (getEntity as jest.Mock).mockResolvedValueOnce(entity);
    (getSingleAssetByTag as jest.Mock).mockResolvedValue(null);
    // ACT
    const eventEntity = await getEventEntity(emptyDistributionEntityWithEmptyFields);
    // ASSERT
    expect(eventEntity.headline).toBe('');
    expect(eventEntity.eventType).toBe('');
    expect(eventEntity.headerColor).toBe('');
    expect(eventEntity.dateFrom).toBe('');
    expect(eventEntity.dateTo).toBe('');
    expect(eventEntity.venue).toBe('');
    expect(eventEntity.eventUrl).toBeNull();
    expect(eventEntity.facebookProfile).toBe('');
    expect(eventEntity.instagramProfile).toBe('');
    expect(eventEntity.twitterProfile).toBe('');
    expect(eventEntity.youtubeChannel).toBe('');
    expect(eventEntity.twitchChannel).toBe('');
    expect(eventEntity.description).toBe('');
    expect(eventEntity.descriptionHtml).toBe('');
    expect(eventEntity.mobileBackgroundEventImage).toBe('');
    expect(eventEntity.mobileBackgroundEventImageAsset).toBeNull();
    expect(eventEntity.backgroundEventImage).toBe('');
    expect(eventEntity.backgroundEventImageAsset).toBeNull();
    expect(eventEntity.eventLogo).toBe('');
    expect(eventEntity.eventLogoAsset).toBeNull();
  });

  it('returns filled entity if initial entity is not empty', async (): Promise<void> => {
    // ARRANGE
    (transform as jest.Mock).mockResolvedValueOnce('');
    const entity = sampleEvent;
    (getEntity as jest.Mock).mockResolvedValueOnce(entity);
    (getSingleAssetByTag as jest.Mock).mockResolvedValue(sampleAsset);
    // ACT
    const eventEntity = await getEventEntity(sampleEvent);
    // ASSERT
    expect(eventEntity.backgroundEventImage).toBe('tag-image');
    expect(eventEntity.backgroundEventImageAsset).toEqual(sampleAsset);
    expect(eventEntity.dateFrom).toBe('date');
    expect(eventEntity.dateTo).toBe('date');
    expect(eventEntity.description).toBe('**Description of a event**');
    expect(eventEntity.descriptionHtml).toBe('');
    expect(eventEntity.eventLogo).toBe('tag-image');
    expect(eventEntity.eventLogoAsset).toEqual(sampleAsset);
    expect(eventEntity.eventType).toBe('Awards');
    expect(eventEntity.eventUrl).toEqual(sampleLink);
    expect(eventEntity.facebookProfile).toBe('facebookProfile');
    expect(eventEntity.headerColor).toBe('#FF0000');
    expect(eventEntity.headline).toBe('Headline');
    expect(eventEntity.instagramProfile).toBe('');
    expect(eventEntity.mobileBackgroundEventImage).toBe('tag-image');
    expect(eventEntity.mobileBackgroundEventImageAsset).toEqual(sampleAsset);
    expect(eventEntity.twitchChannel).toBe('');
    expect(eventEntity.twitterProfile).toBe('twitterProfile');
    expect(eventEntity.venue).toBe('Istanbul');
    expect(eventEntity.youtubeChannel).toBe('youtubeChannel');
  });
});

it('returns entity with null properties if initial entity has null properties', async (): Promise<void> => {
  // ARRANGE
  (transform as jest.Mock).mockResolvedValueOnce('');
  const entity = emptyDistributionEntityWithNullFields;
  (getEntity as jest.Mock).mockResolvedValueOnce(entity);
  (getSingleAssetByTag as jest.Mock).mockResolvedValue(null);
  // ACT
  const eventEntity = await getEventEntity(emptyDistributionEntityWithNullFields);
  // ASSERT
  expect(eventEntity.headline).toBeNull();
  expect(eventEntity.eventType).toBeNull();
  expect(eventEntity.headerColor).toBeNull();
  expect(eventEntity.dateFrom).toBe('');
  expect(eventEntity.dateTo).toBe('');
  expect(eventEntity.venue).toBeNull();
  expect(eventEntity.eventUrl).toBeNull();
  expect(eventEntity.facebookProfile).toBeNull();
  expect(eventEntity.instagramProfile).toBeNull();
  expect(eventEntity.twitterProfile).toBeNull();
  expect(eventEntity.youtubeChannel).toBeNull();
  expect(eventEntity.twitchChannel).toBeNull();
  expect(eventEntity.description).toBeNull();
  expect(eventEntity.descriptionHtml).toBe('');
  expect(eventEntity.mobileBackgroundEventImage).toBeNull();
  expect(eventEntity.mobileBackgroundEventImageAsset).toBeNull();
  expect(eventEntity.backgroundEventImage).toBeNull();
  expect(eventEntity.backgroundEventImageAsset).toBeNull();
  expect(eventEntity.eventLogo).toBeNull();
  expect(eventEntity.eventLogoAsset).toBeNull();
});
