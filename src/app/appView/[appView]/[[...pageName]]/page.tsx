import { renderItem } from '@/services/renderService';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { initI18n } from '@/utilities/i18n';
import ThemingVariables from '@/components/common/ThemingVariables';

import { Metadata } from 'next';
import { enrichPageMetadata, enrichPageVariables, getPageData } from '@/app/pageHelpers';
import { notFound } from 'next/navigation';
import { AzureSearchOption } from '@/models/types/azureSearch';

export const metadata: Metadata = {};

/* SSG revalidate time */
export const revalidate = 60;

/* SSG process */
export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: { appView: string; pageName: string[] } }) {
  await initI18n();
  const { appView } = params;
  const path = requestUrlParser.getPathName(params);
  const previewToken = ''; // The token is empty outside of the "preview" route
  const azureSearchOption = {
    q: '',
    page: 0,
    facetType: '',
    facetValue: '',
  } as AzureSearchOption;
  const pageData = await getPageData(path, previewToken);
  if (!pageData) {
    notFound();
  }
  const { structure, metadataItems, variables, seoData } = pageData;
  enrichPageVariables(variables, {
    pagePath: path,
    azureSearchOption: JSON.stringify(azureSearchOption, null, 2),
    appView: appView,
  });
  enrichPageMetadata(metadata, seoData);

  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems, previewToken)}
    </>
  );
}
