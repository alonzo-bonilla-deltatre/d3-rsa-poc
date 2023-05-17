import { getPageStructure } from '@/services/pageService';
import { renderItem } from '@/services/renderService';
import { requestUrlParser } from '@/utilities/requestUrlParser';
import { initI18n } from '@/utilities/i18n';
import ThemingVariables from '@/components/common/ThemingVariables';

/* SSG revalidate time */
export const revalidate = 300;
export const runtime = 'edge';

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await initI18n();
  const path = requestUrlParser.getPathName(params);
  //const token = searchParams?.token?.toString() ?? '';
  const pageStructure = await getPageStructure(path, '');
  if (!pageStructure) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadata = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;
  return (
    <>
      <ThemingVariables metadata={metadata} />
      {structure && renderItem(structure, variables, metadata)}
    </>
  );
}

/* SSG process */
export async function generateStaticParams() {
  return [];
}
