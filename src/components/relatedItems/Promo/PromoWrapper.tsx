import { nanoid } from 'nanoid';
import { DistributionEntity } from '@/models/types/forge';
import Promo from '@/components/relatedItems/Promo/Promo';

const PromoWrapper = ({ ...data }: DistributionEntity): React.ReactElement => {
  return <Promo {...data} />;
};

const render = ({ ...data }: DistributionEntity): React.ReactElement =>
  data ? (
    <PromoWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
