import { nanoid } from 'nanoid';
import { DistributionEntity } from '@/models/types/forge';
import EditorialEntity from '@/components/relatedItems/EditorialEntity/EditorialEntity';

const EditorialEntityWrapper = ({ ...data }: DistributionEntity): React.ReactElement => {
  return <EditorialEntity {...data} />;
};

const render = ({ ...data }: DistributionEntity): React.ReactElement =>
  data ? (
    <EditorialEntityWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
