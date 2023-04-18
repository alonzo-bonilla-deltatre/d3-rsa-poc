import { getPage } from "@/services/pageService";
import { renderItem } from "@/services/renderService";
import { requestUrlParser } from "@/utilities/requestUrlParser";
import { initI18n } from "@/utilities/i18n";
import ThemingVariables from "@/components/common/ThemingVariables";

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  await initI18n();
  const path = requestUrlParser.getPathName(params);
  const token = searchParams?.token?.toString() ?? "";
  const pageStructureFetch = getPage(path, token);
  const pageStructure = await pageStructureFetch;
  if (!pageStructure) {
    return null;
  }

  const template = pageStructure.data.structure;
  const metadata = pageStructure.data.metadata;
  return (
    <>
      <ThemingVariables metadata={metadata} />
      {template && renderItem(template)}
    </>
  );
}
