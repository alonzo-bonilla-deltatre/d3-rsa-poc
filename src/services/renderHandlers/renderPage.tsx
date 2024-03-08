import { ReturnComponentRender } from '@/models/types/components';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { notFound } from 'next/navigation';
import ThemingVariables from '@/components/common/ThemingVariables/ThemingVariables';
import { renderItem } from '@/services/renderService';
import AppViewLinksHandler from '@/components/common/AppViewLinksHandler/AppViewLinksHandler';
import { enrichPageVariables, getPageData } from '@/app/pageHelpers';

/**
 * Renders a page based on the provided parameters.
 *
 * This function takes an object of request parameters as input. It gets the path name from the request parameters,
 * fetches the data for the page at the path, and prepares the structure, metadata, variables, and SEO data for the page.
 * If the page data is not fetched successfully, it returns null.
 *
 * @async
 * @param {Object} params - The request parameters.
 * @param {string[]} params.pageName - The pageName parameter.
 * @param {string} [params.q] - The query parameter.
 * @param {string} [params.token] - The token for fetching the page structure.
 * @param {string} [params.appView] - The appView parameter.
 * @returns {Promise<ReturnComponentRender>} The rendered page.
 */
export const renderPage = async (params: {
  pageName: string[];
  q?: string;
  token?: string;
  appView?: string;
}): Promise<ReturnComponentRender> => {
  // Destructure the parameters
  const { q, token, appView } = params;

  // Get the path name from the parameters
  const path = requestUrlParser.getPathName(params);

  // Set the preview token, defaulting to an empty string if no token is provided. The token is empty outside of the "preview" route
  const previewToken = token ?? '';

  // Set the Azure search options
  const azureSearchOption = {
    q: q ? decodeURI(q) : '',
    page: 0,
    keyPagesPage: 0,
  } as AzureSearchOption;

  // Fetch the page data
  const pageData = await getPageData(path, previewToken);

  // If no page data is fetched, call the notFound function
  if (!pageData) {
    notFound();
  }

  // Destructure the page data
  const { structure, metadataItems, variables } = pageData;

  // Enrich the page variables
  enrichPageVariables(variables, {
    pagePath: path,
    azureSearchOption: JSON.stringify(azureSearchOption, null, 2),
    appView: appView,
  });

  // Return the rendered page
  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems, previewToken)}
      <AppViewLinksHandler />
    </>
  );
};
