import { Metadata } from "@/models/types/pageStructure";
import { getPage } from "@/services/pageService";
import { requestUrlParser } from "@/utilities/requestUrlParser";


/* This file will be deprecated in v13.2 */
const getMetadata = (metadata: Metadata[], category: string, key: string) => {
  return metadata.find(
    (item) => item.category === category && item.key === key
  );
};

export default async function Head({
  params, searchParams
}: {
  params: { pageName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const path = requestUrlParser.getPathName(params);
  const token = searchParams?.token?.toString() ?? "";
  const pageStructureFetch = getPage(path, token);
  const [pageStructure] = await Promise.all([pageStructureFetch]);
  if(!pageStructure)
  {
    return null;
  }

  const metadata = pageStructure.data.metadata;
  const title = getMetadata(metadata, "seo", "title")?.value ?? "";
  const description = getMetadata(metadata, "seo", "description")?.value ?? "";
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
