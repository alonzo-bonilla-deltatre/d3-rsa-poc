import { Metadata } from "@/models/types/pageStructure";
import { getPageStructure } from "@/services/pageService";
import { requestUrlParser } from "@/utilities/requestUrlParser";


/* This file will be deprecated in v13.2 */
function getMetadata(metadata: Metadata[], category: string, key: string) {
  return metadata.find(
    (item) => item.category === category && item.key === key
  );
}

export default async function Head({
  params, searchParams
}: {
  params: { pageName: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const path = requestUrlParser.getPathName(params);
  const token = searchParams?.token?.toString() ?? "";
  const pageStructure = await getPageStructure(path, token);

  if (!pageStructure) {
    return null;
  }

  const metadata = pageStructure.data.metadata;
  const title = getMetadata(metadata, "seo", "title")?.value ?? "";

  const todo = "todo";
  return (
    <>
        <title>{title}</title>
        <meta name="path" content={path} />
        {setMetadata(metadata, "seo", "description", "description", "")}
        <meta name="author" content={todo} />
        {setMetadata(metadata, "seo", "robots", "robots", "noodp")}
        {setMetadata(metadata, " socials", "fbpages", "fb:pages", "")}
        {setMetadata(metadata, " socials", "twitterid", "twitter:site", "")}
        {setMetadata(metadata, " socials", "twitterid", "twitter:creator", "")}
        {/* //TODO add @ for twitter metadata */}
        {setMetadata(metadata, "seo", "description", "og:description", "")}
        {setMetadata(metadata, "seo", "description", "twitter:description", "")}
        <meta name="og:type" content={todo} />
        <meta name="og:site_name" content={todo} />
        <meta name="og:locale" content={todo} />
        <meta name="og:url" content={todo} />

        <meta name="og:image" content={todo} />
        <meta name="thumb" content={todo} />
        <meta name="twitter:image" content={todo} />
        <meta name="twitter:image:src" content={todo} />
        <meta name="twitter:card" content="summary_large_image" />
      </>
  );
}

const setMetadata = (metadata: Metadata[], category: string, key: string, metadataName: string, defaultValue: string | "") => {
  const metadataValue = getMetadata(metadata, category, key)?.value ?? defaultValue;
  return metadataValue && (
    <meta name={metadataName} content={metadataValue} />
  );
};
