import { getPageStructure } from '@/services/pageService';
import { setPageMetadata } from '@/services/metadataService';
import { renderItem } from '@/services/renderService';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { initI18n } from '@/utilities/i18n';
import ThemingVariables from '@/components/common/ThemingVariables';

import { Metadata } from 'next';

export const metadata: Metadata = {};

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageName: string[]; id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await initI18n();
  const path = requestUrlParser.getPathName(params);
  const previewToken = searchParams?.token?.toString() ?? '';
  const pageStructure = await getPageStructure(path, previewToken);
  if (!pageStructure) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadataItems = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;

  // Enrich default metadata
  const seoData: Metadata | null = setPageMetadata(metadataItems);
  Object.assign(metadata, {
    title: seoData?.title,
    description: seoData?.description,
    metadataBase: seoData?.metadataBase,
    alternates: seoData?.alternates,
    authors: seoData?.authors,
    robots: seoData?.robots,
    openGraph: seoData?.openGraph,
    twitter: seoData?.twitter,
    other: seoData?.other,
  });

  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems, previewToken)}
    </>
  );
}
