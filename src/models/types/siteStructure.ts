interface Validation {
  allowedValues?: string;
  dataPath?: string;
}

interface Parameters {
  [key: string]: {
    validation: Validation;
  };
}

interface UrlAlias {
  value: string;
  parameters: Parameters;
}

interface SitemapItem {
  url: UrlAlias;
  alias: UrlAlias;
}

interface SitemapData {
  sitemap: SitemapItem[];
}

interface ApiResponse {
  data: SitemapData;
  meta: {
    version: string;
  };
}

export type { ApiResponse, SitemapItem };
