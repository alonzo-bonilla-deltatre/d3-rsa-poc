import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import axios from 'axios';
import {
  LiveBloggingBlogEntity,
  LiveBloggingDistributionApiOption,
  LiveBloggingPostEntity,
} from '@/models/types/liveblogging';
import { enrichDistributionEntities, getQueryString } from '@/helpers/liveBloggingBlogEntityHelper';
import { handleApiError } from '@/helpers/apiHelper';

// The culture of the site, retrieved from environment variables
const culture = process.env.CULTURE;
// The base URL of the Live Blogging Distribution API, retrieved from environment variables
const dapiBlogUrl = process.env.LIVE_BLOGGING_DAPI_BASE_URL;
// The name of the API
const apiName = 'LIVEBLOGGING DISTRIBUTION API';

// URL templates for the API endpoints
const slugPlaceholder = '{slug}';
const postIdPlaceholder = '{postId}';
const distributionBlogsUrl = `api/distribution/v1/${culture}/Blogs`;
const distributionBlogDetailUrl = `api/distribution/v1/${culture}/Blogs/${slugPlaceholder}`;
const distributionBlogPostUrl = `api/distribution/v1/${culture}/Blogs/${slugPlaceholder}/Posts/${postIdPlaceholder}`;

/**
 * Function to get a single blog entity from the Live Blogging Distribution API.
 * It replaces the slug placeholder in `distributionBlogDetailUrl` with the provided `slug`,
 * sends a GET request to the resulting URL, and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {string} slug - The slug of the blog entity to get.
 * @returns {Promise<LiveBloggingBlogEntity | null>} - The retrieved blog entity or `null` if an error occurred.
 */
export const getBlogEntity = async (slug: string): Promise<LiveBloggingBlogEntity | null> => {
  try {
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
        return response.data as LiveBloggingBlogEntity;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};

/**
 * Function to get all blogs from the Live Blogging Distribution API.
 * It sends a GET request to the `distributionBlogsUrl` endpoint,
 * and returns the response data.
 * If an error occurs during the request, it handles the error and returns `null`.
 *
 * @param {LiveBloggingDistributionApiOption | null} options - Optional options to use.
 * @returns {Promise<LiveBloggingBlogEntity[] | null>} - The retrieved blogs or `null` if an error occurred.
 */
export const getBlogs = async (
  options: LiveBloggingDistributionApiOption = null
): Promise<LiveBloggingBlogEntity[] | null> => {
  try {
    const skip = options?.skip ?? 0;
    const limit = options?.limit ?? 0;
    const queryParameters = getQueryString(skip, limit, options?.tags, options?.eventId);
    const queryString = queryParameters.length ? `?${queryParameters}` : '';
    let apiUrl = distributionBlogsUrl + queryString;
    apiUrl = new URL(apiUrl, dapiBlogUrl).href;
    logger.log(`Getting Blogs data from LIVEBLOGGING DISTRIBUTION API ${apiUrl}`, LoggerLevel.debug);

    return await axios
      .get(apiUrl)
      .then(async (response) => {
        logger.log(
          `Retrieved Blogs data from LIVEBLOGGING DISTRIBUTION API ${apiUrl}. ${JSON.stringify(response.data)}`,
          LoggerLevel.debug
        );
        let result = response.data.items as LiveBloggingBlogEntity[];
        result = await enrichDistributionEntities(result, options);
        return result;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};

export const getBlogPost = async (slug: string, postId: string): Promise<LiveBloggingPostEntity | null> => {
  try {
    let apiUrl = distributionBlogPostUrl.replace(slugPlaceholder, slug).replace(postIdPlaceholder, postId);
    apiUrl = new URL(apiUrl, dapiBlogUrl).href;
    logger.log(
      `Getting Blog entity slug:${slug} posts from LIVEBLOGGING DISTRIBUTION API ${apiUrl}`,
      LoggerLevel.debug
    );

    return await axios
      .get(apiUrl)
      .then(async (response) => {
        logger.log(
          `Retrieved Blog entity slug:${slug} posts from LIVEBLOGGING DISTRIBUTION API ${apiUrl}. ${JSON.stringify(
            response.data
          )}`,
          LoggerLevel.debug
        );
        return response.data as LiveBloggingPostEntity;
      })
      .catch((response) => {
        return handleApiError(response, apiName, apiUrl);
      });
  } catch (e) {
    return handleApiError(e, apiName);
  }
};
