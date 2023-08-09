import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';

export type CardProps = {
  entity: DistributionEntity | LiveBloggingBlogEntity;
  options: CardOptions;
  layout?: string | null;
};

export type CardOptions = {
  hideIcon: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideDate: boolean;
  hideAuthor: boolean;
  hideCta: boolean;
  className?: string;
};
