import axios from 'axios';
import { getLinkRules } from '@/services/linkRuleService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { linkRules } from '@/__mocks__/linkRule';
import { LinkRuleRequest } from '@/models/types/linkRule';
import { sampleStory } from '@/__mocks__/modules/sampleStory';

const culture = process.env.CULTURE;
const environment = process.env.ENVIRONMENT;

jest.mock('axios');
jest.mock('@/utilities/logger');

const body = [
  {
    id: 'qa-story-10',
    entity: sampleStory,
    entityType: 'story',
    environment: environment,
    culture: culture,
  },
] as LinkRuleRequest[];

describe('getLinkRules', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should call the right API URL', async () => {
    // ASSERT
    (axios.post as jest.Mock).mockResolvedValue({});

    // ACT
    await getLinkRules(body);

    // ASSERT
    expect(axios.post as jest.Mock).toHaveBeenCalledWith(
      `${process.env.PAGE_BUILDER_FRONTEND_API_BASE_URL}/api/v1/LinkRules`,
      body,
      {
        headers: {
          Authorization: process.env.PAGE_BUILDER_FRONTEND_API_SECRET,
        },
      }
    );
  });

  it('should return link rules if request body object contains all the required properties', async () => {
    // ASSERT
    (axios.post as jest.Mock).mockRejectedValueOnce(linkRules);

    // ACT
    const result = await getLinkRules(body);

    // ASSERT
    expect(result?.data[0].id).not.toBeNull();
    expect(result?.data[0]?.url).not.toBeNull();
    expect(result?.data[0]?.success).not.toBeNull();
  });

  it('should return null in case of exception', async () => {
    // ASSERT
    (axios.post as jest.Mock).mockRejectedValueOnce({});

    // ACT
    const result = await getLinkRules(body);

    // ASSERT
    expect(result).toBeNull();
  });

  it('should return null in case of exception and log the response data if available', async () => {
    // ASSERT
    const errorMessage = 'Unauthorized';
    (axios.post as jest.Mock).mockRejectedValueOnce({
      status: 401,
      statusText: 'Unauthorized',
      data: {
        error: { message: errorMessage },
      },
    });

    // ACT
    const result = await getLinkRules(body);

    // ASSERT
    expect(result).toBeNull();
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching(errorMessage), LoggerLevel.error);
  });
});
