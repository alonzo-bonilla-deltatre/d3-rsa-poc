import ThemingVariables from '@/components/common/ThemingVariables';
import { renderItem } from '@/services/renderService';
import { initI18n } from '@/utilities/i18n';
import { requestUrlParser } from '@/utilities/requestUrlParser';

import { enrichPageMetadata, enrichPageVariables, getPageData } from '@/app/pageHelpers';
import { AzureSearchOption } from '@/models/types/azureSearch';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {};

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await initI18n();
  const path = requestUrlParser.getPathName(params);
  const azureSearchOption = {
    q: searchParams?.q?.toString() ?? '',
    page: parseInt(searchParams?.page?.toString() ?? '0'),
    facetType: searchParams?.facetType?.toString() ?? '',
    facetValue: searchParams?.facetValue?.toString() ?? '',
  } as AzureSearchOption;
  const previewToken = ''; // The token is empty outside of the "preview" route
  const pageData = await getPageData(path, previewToken);
  if (!pageData) {
    notFound();
  }
  const { structure, metadataItems, variables, seoData } = pageData;
  enrichPageVariables(variables, { pagePath: path, azureSearchOption: JSON.stringify(azureSearchOption, null, 2) });
  enrichPageMetadata(metadata, seoData);

  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems, previewToken)}
    </>
  );
}
