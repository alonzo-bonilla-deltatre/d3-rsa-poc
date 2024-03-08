import axios, { RawAxiosRequestHeaders } from 'axios';

// Default error message when the fetch operation fails
export const errorMessage = 'Unable to retrieve data from api. Please try again later.';

/**
 * Function to create a fetcher for GET requests.
 * The fetcher takes a URL and optional headers, sends a GET request to the URL with the headers,
 * and returns the response data.
 * If an error occurs during the request, it throws an error with the error message or a default error message.
 *
 * @template T - The type of the response data.
 * @param {RawAxiosRequestHeaders} [headers] - Optional headers to include in the request.
 * @returns {(url: string) => Promise<T | null>} - The fetcher function.
 */
const fetcher =
  <T>(headers?: RawAxiosRequestHeaders) =>
  (url: string): Promise<T | null> => {
    return axios
      .get(url, {
        headers: headers,
      })
      .then(async (response) => {
        return response.data;
      })

      .catch((e) => {
        let message;
        if (e instanceof Error) message = e.message;
        /* istanbul ignore next */
        throw new Error(message ?? errorMessage);
      });
  };
export { fetcher };
