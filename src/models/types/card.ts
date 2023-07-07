import { DistributionEntity } from '@/models/types/forge';

export type CardProps = {
  entity: DistributionEntity;
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
