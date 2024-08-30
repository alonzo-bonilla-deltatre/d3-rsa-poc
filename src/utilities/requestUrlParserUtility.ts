/**
 * Utility for parsing request parameters.
 *
 * This utility provides a function for getting the path name from request parameters.
 *
 * @property {Function} getPathName - The function for getting the path name from request parameters.
 */
export const requestUrlParser = {
  /**
   * Returns the path name from the provided request parameters.
   *
   * This function takes an object of request parameters as input. It retrieves the pageName parameter,
   * which is an array of strings, and joins the strings with slashes to form a path.
   * If the pageName parameter is not provided, it defaults to an empty array, resulting in an empty path.
   * If the resulting path is a single slash, it returns '/index'. Otherwise, it returns the path.
   *
   * @param {Object} params - The request parameters.
   * @param {string[]} [params.pageName=[]] - The pageName parameter.
   * @returns {string} The path name.
   */
  getPathName: (params: { pageName?: string[] }): string => {
    const pageName = params.pageName ?? [];
    const url = `/${pageName.join('/')}`;
    return url === '/' ? '/index' : url;
  },
};
