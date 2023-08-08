import { ForgeDistributionApiOption } from '@/models/types/forge';
import { ForgeApiError } from '@/models/types/errors';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import axios from 'axios';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import { addLiveBloggingWidgetConfig } from '@/helpers/liveBloggingDistributionEntityHelper';
import { getQueryString } from '@/helpers/forgeDistributionEntityHelper';

const culture = process.env.CULTURE;
const slugPlaceholder = '{slug}';
const dapiBlogUrl = process.env.LIVE_BLOGGING_DAPI_BASE_URL;
const distributionBlogDetailUrl = `api/distribution/v1/${culture}/Blogs/${slugPlaceholder}`;
const distributionBlogPostsUrl = `api/distribution/v1/${culture}/Blogs/${slugPlaceholder}/Posts`;

export const getBlogEntity = async (slug: string, showKeyMoments: boolean): Promise<LiveBloggingBlogEntity | null> => {
  let apiUrl = distributionBlogDetailUrl.replace(slugPlaceholder, slug);
  apiUrl = new URL(apiUrl, dapiBlogUrl).href;
  logger.log(`Getting Blog entity slug:${slug} data from LIVEBLOGGING DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl)
    .then(async (response) => {
      logger.log(
        `Retrieved Blog entity slug:${slug} data from LIVEBLOGGING DISTRIBUTION API ${apiUrl}. ${JSON.stringify(
          response.data
        )}`,
        LoggerLevel.debug
      );
      let result = response.data as LiveBloggingBlogEntity;
      result = addLiveBloggingWidgetConfig(result, dapiBlogUrl, culture, slug, showKeyMoments);
      return result;
    })
    .catch((response) => {
      handleError(response);
      return null;
    });
};

export const getBlogPosts = async (
  slug: string,
  showKeyMoments: boolean,
  options: ForgeDistributionApiOption = null
): Promise<LiveBloggingBlogEntity | null> => {
  const skip = options?.skip ?? 0;
  const limit = options?.limit ?? 0;
  const queryParameters = getQueryString(skip, limit, '');
  const queryString = queryParameters.length ? `?${queryParameters}` : '';
  let apiUrl = distributionBlogPostsUrl.replace(slugPlaceholder, slug) + queryString;
  apiUrl = new URL(apiUrl, dapiBlogUrl).href;
  logger.log(`Getting Blog entity slug:${slug} posts from LIVEBLOGGING DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

  return await axios
    .get(apiUrl)
    .then(async (response) => {
      logger.log(
        `Retrieved Blog entity slug:${slug} posts from LIVEBLOGGING DISTRIBUTION API ${apiUrl}. ${JSON.stringify(
          response.data
        )}`,
        LoggerLevel.debug
      );
      let result = response.data as LiveBloggingBlogEntity;
      result = addLiveBloggingWidgetConfig(result, dapiBlogUrl, culture, slug, showKeyMoments);
      return result;
    })
    .catch((response) => {
      handleError(response);
      return null;
    });
};

const handleError = (response: any) => {
  if (response?.data) {
    const error = response.data as ForgeApiError;
    let errorMessage = `LIVEBLOGGING DISTRIBUTION API Error status: ${response.status} - ${response.statusText} - Error message: ${error?.title}`;
    logger.log(errorMessage, LoggerLevel.error);
  } else {
    logger.log(`LIVEBLOGGING DISTRIBUTION API Error: ${response.message} - ${response.stack}`, LoggerLevel.error);
  }
};
