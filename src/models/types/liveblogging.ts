import { Variable } from '@/models/types/pageStructure';
import { LinkRuleVariation } from '@/models/types/linkRule';

export type LiveBloggingBlogEntity = {
  slug: string;
  title: string;
  description: string;
  tags: LiveBloggingTagEntity[];
  language: string;
  dateFrom: string;
  dateTo: string;
  lastUpdateDate: string;
  timeZone: Timezone;
  totalPosts: number;
  coverImage?: CoverImageDistribution;
  presentation: LiveBloggingPresentation;
  monetization: ReadMonetization | null;
  oembed: BlogOembed | null;
  event: BlogEventInfo | null;
  widgetConfig: LiveBloggingWidgetConfig | null;
  url: string;
  [key: string]: any;
};

export type LiveBloggingTagEntity = {
  slug: string;
  id: string;
  label: string;
  extradata: object;
};

export type CoverImageDistribution = {
  templateUrl: string;
};

export type LiveBloggingAuthorEntity = {
  fullName: string;
};

export type Timezone = {
  offset: string;
};

export type KeyMoment = {
  isEnabled: boolean;
  title: string;
};

export enum PostType {
  Post,
  Advertisement,
}

export type LiveBloggingPostEntity = {
  postId: string;
  parts: LiveBloggingPostPartEntity[];
  tags: LiveBloggingTagEntity[];
  timestamp: string;
  isSticky: boolean;
  author: LiveBloggingAuthorEntity;
  keyMoment: KeyMoment;
  properties: object;
  type: PostType;
};

export type LiveBloggingPostPartEntity = {
  type: string;
  content: Record<string, unknown>;
  externalSourceReference: LiveBloggingExternalSourceReferenceEntity;
};

export type LiveBloggingPresentation = {
  keyMomentsVisible: boolean;
  showBlogDefinition: boolean;
  showTimezoneSwitch: boolean;
  paginationType: PaginationType;
  keyMomentAction: KeyMomentAction;
  postSharing: PostSharing;
};

export enum PaginationType {
  InfiniteScroll,
  LoadMore,
}
export enum KeyMomentAction {
  ScrollToPost,
  PostDetail,
}

export type PostSharing = {
  enabled: boolean;
  destinations: Record<string, boolean>;
};

export type ReadMonetization = {
  enableCompanionAd: boolean;
  targeting: Record<string, string>;
};

export type BlogOembed = {
  templateUrl: string;
};

export type BlogEventInfo = {
  eventId: string;
};

export type LiveBloggingExternalSourceReferenceEntity = {
  externalSourceType: string;
  externalSourceId: string;
};

export type LiveBloggingWidgetConfig = {
  slug: string;
  culture: string;
  baseUrl: string;
  showKeyMoments: boolean;
  blogDefinitionComponent?: unknown;
};

export type LiveBloggingDistributionApiOption = {
  hasThumbnailPlaceholder?: boolean;
  hasLinkRules?: boolean;
  skip?: number;
  limit?: number;
  tags?: string;
  variables?: Variable[];
  linkRuleVariations?: LinkRuleVariation[];
} | null;
