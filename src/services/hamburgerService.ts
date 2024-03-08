import { Variable } from '@/models/types/pageStructure';
import { getPageStructure } from '@/services/pageService';
import { getDataVariable } from '@/helpers/dataVariableHelper';

/**
 * Function to get the structure of the hamburger menu.
 * It retrieves the `inc_hamburger` data variable from the provided `variables`.
 * If `inc_hamburger` is not found or is empty, `null` is returned.
 * Otherwise, it retrieves the page structure for the `inc_hamburger` source and returns the `data` property of the structure.
 * If the page structure cannot be retrieved, `null` is returned.
 *
 * @param {Variable[] | undefined} variables - The variables to use.
 * @param {string | undefined} previewToken - The preview token to use.
 * @returns {Promise<any | null>} - The hamburger menu structure or `null` if it cannot be retrieved.
 */
export const getHamburgerStructure = async (variables: Variable[] | undefined, previewToken: string | undefined) => {
  const headerSource = getDataVariable(variables, 'inc_hamburger');

  if (headerSource === null || !headerSource?.length) {
    return null;
  }

  const headerStructure = await getPageStructure(headerSource, previewToken);
  return headerStructure?.data ?? null;
};
