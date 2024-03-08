import { DistributionEntity } from '@/models/types/forge';
import Promo from '@/components/relatedItems/Promo/Promo';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';

const PromoWrapper = ({ data }: { data: DistributionEntity }): ReturnComponentRender => <Promo data={data} />;

const render = ({ ...data }: DistributionEntity): ReturnComponentRender => (
  <PromoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
