import { getPageStructure } from '@/services/pageService';
import { setPageMetadata } from '@/services/metadataService';
import { renderItem } from '@/services/renderService';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { initI18n } from '@/utilities/i18n';
import ThemingVariables from '@/components/common/ThemingVariables';

import { Metadata } from 'next';

let seoData = {} as Metadata;
type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: MetaProps): Promise<Metadata> {
  return {
    title: seoData.title,
    description: seoData.description,
    metadataBase: seoData.metadataBase,
    alternates: seoData.alternates,
    authors: seoData.authors,
    robots: seoData.robots,
    openGraph: seoData.openGraph,
    twitter: seoData.twitter,
    other: seoData.other,
  };
}

/* SSG revalidate time */
export const revalidate = 60;

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageName: string[]; id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await initI18n();
  const path = requestUrlParser.getPathName(params);
  // const token = searchParams?.token?.toString() ?? '';
  const pageStructure = await getPageStructure(path, '');
  if (!pageStructure) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadataItems = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;

  seoData = setPageMetadata(metadataItems) as Metadata;

  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems)}
    </>
  );
}

/* SSG process */
export async function generateStaticParams() {
  return [];
}
