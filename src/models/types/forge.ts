import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { StoryPart } from '@/models/types/storyPart';
import { LinkRuleVariation } from '@/models/types/linkRule';

export type DistributionEntity = {
  id: string;
  type: ForgeEntityType;
  _translationId: string;
  _entityId: string;
  selfUrl: string;
  slug: string;
  title: string;
  headline?: string;
  description?: string;
  tags?: Tag[];
  relations?: DistributionEntity[];
  references?: { [key: string]: DistributionEntity[] };
  fields?: Record<string, any>;
  createdBy: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  contentDate: string;
  context?: Tag | null;
  featured: number;
  thumbnail: ImageAsset | null;
  image?: ImageAsset;
  parts?: StoryPart[];
  entityCode?: ForgeEntityCode;
  url?: string;
  [key: string]: any;
};

export type AlbumEntity = DistributionEntity & {
  description?: string;
  elements?: DistributionEntity[] | null;
};

export type PagedResult = {
  pagination: Pagination;
  meta: {
    apiVersion: string;
    generatedAt: string;
  };
  items: DistributionEntity[];
};
export type Pagination = {
  nextUrl?: string;
  previousUrl?: string;
  maxItems: number;
  page: number;
  hasPagination?: boolean;
};

export type Tag = {
  _translationId: string;
  _entityId: string;
  type: string;
  selfUrl: string;
  title: string;
  slug: string;
  neutralSlug: string;
  externalSourceName: string | null;
  externalSourceReference: Record<string, unknown>;
  fields: Record<string, unknown>;
  extraData: any;
};

export type ForgeDistributionApiOption =
  | ({
      hasThumbnailPlaceholder?: boolean;
      hasLinkRules?: boolean;
      hasLinkRulesForRelationsAndParts?: boolean;
      hasReferencesFieldsInList?: boolean;
      hasGadAssetsFields?: boolean;
      hasPagination?: boolean;
      variables?: Variable[];
      linkRuleVariations?: LinkRuleVariation[];
    } & ForgeDistributionApiQueryStringOption)
  | null;

export type ForgeDistributionApiQueryStringOption = {
  skip?: number;
  limit?: number;
  page?: number;
  tags?: string;
  fields?: Record<string, unknown>;
  extraData?: Record<string, unknown>;
  sort?: SortOptions;
  range?: RangeOption;
  context?: string;
  listAvailability?: ListAvailabilityOption;
} | null;

export type SortOptions = {
  prop?: string;
  field?: string;
  order?: SortOrder;
};

export type RangeOption = {
  field: string;
  startDate?: string;
  endDate?: string;
};

export enum ListAvailabilityOption {
  public = 0,
  unlisted = 1,
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ForgeMetadataCategoryType {
  seo = 'seo',
  languages = 'languages',
  sitemaps = 'sitemaps',
  socials = 'socials',
  pwa = 'pwa',
  theming = 'theming',
  robots = 'robots',
}

export type ForgeMetadataKeyType =
  | ForgeSEOMetadataKey
  | ForgeLanguagesMetadataKey
  | ForgeSitemapsMetadataKey
  | ForgeSocialsMetadataKey
  | ForgePwaMetadataKey
  | ForgeThemingMetadataKey
  | ForgeRobotsMetadataKey;

export enum ForgeSEOMetadataKey {
  siteName = 'sitename',
  description = 'description',
  image = 'image',
  robots = 'robots',
  title = 'title',
}

export enum ForgeLanguagesMetadataKey {
  en_gb_culture = 'en_gb_culture',
  en_gb_voc_tag = 'en_gb_voc_tag',
  en_gb_url = 'en_gb_url',
  fr_fr_culture = 'fr_fr_culture',
  fr_fr_voc_tag = 'fr_fr_voc_tag',
  fr_fr_url = 'fr_fr_url',
  es_es_culture = 'es_es_culture',
  es_es_voc_tag = 'es_es_voc_tag',
  es_es_url = 'es_es_url',
  de_de_culture = 'de_de_culture',
  de_de_voc_tag = 'de_de_voc_tag',
  de_de_url = 'de_de_url',
  ar_sa_culture = 'ar_sa_culture',
  ar_sa_voc_tag = 'ar_sa_voc_tag',
  ar_sa_url = 'ar_sa_url',
}

export enum ForgeSitemapsMetadataKey {
  blacklist = 'blacklist',
  sitemap_article_entitycode = 'sitemap_article_entitycode',
  sitemap_article_schema = 'sitemap_article_schema',
  sitemap_video_entitycode = 'sitemap_video_entitycode',
  sitemap_video_schema = 'sitemap_video_schema',
}

export enum ForgeSocialsMetadataKey {
  fbappid = 'fbappid',
  fbpages = 'fbpages',
  twitterid = 'twitterid',
}

export enum ForgeRobotsMetadataKey {
  disallows = 'disallows',
  allows = 'allows',
  sitemaps = 'sitemaps',
}

export enum ForgeThemingMetadataKey {
  colorPrimary = 'color-primary',
  colorSecondary = 'color-secondary',
}

export enum ForgePwaMetadataKey {
  iosStoreUrl = 'iosStoreUrl',
  iosAppId = 'iosAppId',
  androidPlayStoreUrl = 'androidPlayStoreUrl',
  androidPlayStoreId = 'androidPlayStoreId',
  icon = 'icon',
  name = 'name',
  shortName = 'shortName',
  startUrl = 'startUrl',
  display = 'display',
  backgroundColor = 'backgroundColor',
  themeColor = 'themeColor',
  scope = 'scope',
}

export enum ForgeEntityType {
  photo = 'photo',
  document = 'document',
  album = 'album',
  story = 'story',
  selection = 'selection',
  tag = 'tag',
  customEntity = 'customentity',
  external = 'external',
  internal = 'internal',
  markdown = 'markdown',
}

export enum ForgeExternalEntityType {
  storyPartQuote = 'story-part-quote',
  storyPartTable = 'story-part-table',
  oembed = 'oembed',
  storyPartPhoto = 'story-part-photo',
}

export enum ForgeDapiEntityCode {
  photos = 'photos',
  documents = 'documents',
  albums = 'albums',
  stories = 'stories',
  selections = 'selections',
  tags = 'tags',
  divaVideos = 'divavideos',
  pageBuilderTextEditors = 'page-builder-text-editors',
  pageBuilderGadAssets = 'page-builder-gad-assets',
  brightcoveVideos = 'brightcovevideos',
  shopProducts = 'shop-products',
  partners = 'partners',
  promos = 'promos',
  events = 'events',
  teams = 'teams',
  players = 'players',
  matches = 'matches',
  socials = 'socials',
  accordions = 'accordions',
  forms = 'forms',
  youTubeVideos = 'youtubevideos',
}

export enum ForgeEntityCode {
  photo = 'photo',
  document = 'document',
  album = 'album',
  story = 'story',
  selection = 'selection',
  tag = 'tag',
  divaVideo = 'divavideo',
  pageBuilderTextEditor = 'page-builder-text-editor',
  pageBuilderGadAsset = 'page-builder-gad-asset',
  brightcoveVideo = 'brightcovevideo',
  shopProduct = 'shop-product',
  partner = 'partner',
  promo = 'promo',
  event = 'event',
  team = 'team',
  player = 'player',
  match = 'match',
  social = 'social',
  accordion = 'accordion',
  form = 'form',
  youTubeVideo = 'youtubevideo',
}
