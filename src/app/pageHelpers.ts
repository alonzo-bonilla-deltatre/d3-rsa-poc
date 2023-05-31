import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import { setPageMetadata } from '@/services/metadataService';
import { getPageStructure } from '@/services/pageService';
import { Metadata as NextMetadata } from 'next';

export const getPageData = async (
  path: string,
  token: string
): Promise<{
  structure: StructureItem;
  metadataItems: Metadata[];
  variables: Variable[];
  seoData: NextMetadata | null;
} | null> => {
  const pageStructure = await getPageStructure(path, token);
  if (!pageStructure?.data) {
    return null;
  }

  const structure = pageStructure.data.structure;
  const metadataItems = pageStructure.data.metadata;
  const variables = pageStructure.data.variables;

  const seoData: NextMetadata | null = setPageMetadata(metadataItems);

  return {
    structure,
    metadataItems,
    variables,
    seoData,
  };
};

export const enrichPageMetadata = (metadata: Metadata | {}, seoData: NextMetadata | null) => {
  if (seoData) {
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
  }
};
