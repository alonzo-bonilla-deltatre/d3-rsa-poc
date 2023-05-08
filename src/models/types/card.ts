import { DistributionEntity } from '@/models/types/dapi';

export type CardProps = {
  entity: DistributionEntity;
  options: CardOptions;
  layout: string | null;
};

export type CardOptions = {
  hideIcon: boolean | false;
  hideRoofline: boolean | false;
  hideTitle: boolean | false;
  hideDate: boolean | false;
  hideAuthor: boolean | true;
  hideCta: boolean | true;
  className?: string;
};
