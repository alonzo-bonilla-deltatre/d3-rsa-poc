//  ██████╗ ██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗
//  ██╔══██╗██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║
//  ██████╔╝██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║
//  ██╔═══╝ ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
//  ██║     ██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝
//  ╚═╝     ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝
//  This page will be used in Page preview only

import { Metadata } from 'next';
import { renderItem } from '@/services/renderService';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { initI18n } from '@/utilities/i18n';
import ThemingVariables from '@/components/common/ThemingVariables';
import { enrichPageMetadata, enrichPageVariables, getPageData } from '@/app/pageHelpers';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {};

export default async function Page({ params }: { params: { token: string; pageName: string[] } }) {
  await initI18n();
  const { token } = params;
  const path = requestUrlParser.getPathName(params);
  const pageData = await getPageData(path, token);
  if (!pageData) {
    notFound();
  }

  const { structure, metadataItems, variables, seoData } = pageData;
  enrichPageVariables(variables, { pagePath: path });
  enrichPageMetadata(metadata, seoData);

  return (
    <>
      <ThemingVariables metadata={metadataItems} />
      {structure && renderItem(structure, variables, metadataItems, token)}
    </>
  );
}
